import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Send, Loader2, Copy, Check, Sparkles, HelpCircle, FileDown, ArrowRight, Scale, Trash2,
} from "lucide-react";
import * as api from "./api.js";
import { T } from "./shared.jsx";

/* Ask — the advisory counterpart to the review queue.

   Review answers "this document arrived, what does it change?". This answers the question that comes
   before any document exists: how does time & attendance actually work in this country? Answers are
   grounded in the jurisdiction's support memo (see backend/app/advisor.py), so every value carries the
   article it came from.

   Two things shape the UI. First, **the follow-up is the feature**: a customer asking "what's the
   overtime premium?" doesn't know that the band pivots on a weekly running total, or that a night
   shift moves the divisor — so every answer offers its own next questions as one-click chips.
   Second, **answers have to leave the room**: a compliance answer is worth nothing sitting in a chat
   log, so any single answer copies as cited markdown, and the conversation exports as a handover note. */

const STARTER_FALLBACK = [
  "What is the overtime premium I should pay?",
  "How many days off is an employee entitled to?",
];

export default function AdvisorScreen({ fireToast }) {
  const [coverage, setCoverage] = useState(null);
  const [turns, setTurns] = useState([]);   // {role, content, followups?, clarification?}
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState(null);
  const [summarizing, setSummarizing] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const jur = coverage?.jurisdictions?.[0] || null;

  useEffect(() => {
    api.advisorCoverage().then(setCoverage).catch((e) => fireToast(e.message, "error"));
  }, [fireToast]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, busy, summary]);

  // Only role/content go back to the model — followups and clarifications are UI state, and echoing
  // them into the transcript would have the advisor answering its own suggestions.
  const history = useMemo(
    () => turns.map((t) => ({ role: t.role, content: t.content })),
    [turns],
  );

  async function send(text) {
    const message = (text ?? draft).trim();
    if (!message || busy || !jur) return;
    setDraft("");
    setSummary(null);
    const sent = [...turns, { role: "user", content: message }];
    setTurns(sent);
    setBusy(true);
    try {
      const res = await api.advisorAsk(jur.code, history, message);
      setTurns([...sent, {
        role: "assistant", content: res.answer,
        followups: res.followups || [], clarification: res.clarification || null,
      }]);
    } catch (e) {
      // Keep the question on screen and hand back the text — a failed turn shouldn't lose what they typed.
      setTurns(turns);
      setDraft(message);
      fireToast(e.message, "error");
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  async function makeSummary() {
    if (!turns.length || summarizing) return;
    setSummarizing(true);
    try {
      const res = await api.advisorSummary(jur.code, history);
      setSummary(res.summary);
      await copy(res.summary);
      fireToast("Summary copied to the clipboard.", "ready");
    } catch (e) {
      fireToast(e.message, "error");
    } finally {
      setSummarizing(false);
    }
  }

  async function copyTranscript() {
    const md = transcriptMarkdown(turns, jur);
    const ok = await copy(md);
    fireToast(ok ? "Conversation copied as markdown." : "Could not access the clipboard.", ok ? "ready" : "error");
  }

  if (!coverage) {
    return (
      <div className="px-6 py-16 flex items-center gap-2 text-sm" style={{ color: T.muted }}>
        <Loader2 size={16} className="animate-spin" /> Loading the advisor…
      </div>
    );
  }
  if (!jur) {
    return (
      <div className="mx-auto px-6 py-16" style={{ maxWidth: 720 }}>
        <div className="rounded-xl p-8 text-center text-sm" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
          No jurisdiction is configured for the advisor yet.
        </div>
      </div>
    );
  }

  const starters = jur.starters?.length ? jur.starters : STARTER_FALLBACK;

  return (
    <div className="mx-auto flex flex-col" style={{ maxWidth: 880, height: "calc(100vh - 61px)" }}>
      {/* header — what it knows, and how to get the answers out */}
      <div className="px-6 pt-5 pb-3 flex items-start justify-between gap-4 shrink-0">
        <div className="min-w-0">
          <div className="text-lg font-semibold tracking-tight flex items-center gap-2" style={{ color: T.ink }}>
            Ask
            <span className="uppercase tracking-wider rounded px-1.5 py-0.5" style={{ fontSize: 9, background: T.aiSoft, color: "#6d5bd0" }}>
              AI · Preview
            </span>
          </div>
          <div className="text-xs mt-0.5 flex items-center gap-1.5 flex-wrap" style={{ color: T.muted }}>
            <span style={{ fontSize: 13 }}>{jur.flag}</span>
            <span><strong style={{ color: T.ink2, fontWeight: 600 }}>{jur.country}</strong> · {jur.law}</span>
            <span style={{ color: T.line2 }}>·</span>
            <span>{jur.rule_count} rules in the reference</span>
          </div>
        </div>
        {turns.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <SmallButton onClick={copyTranscript} Icon={Copy} label="Copy chat" />
            <SmallButton onClick={makeSummary} Icon={summarizing ? Loader2 : FileDown} spin={summarizing}
              label={summarizing ? "Summarising…" : "Copy summary"} primary />
            <SmallButton onClick={() => { setTurns([]); setSummary(null); }} Icon={Trash2} label="" title="Clear the conversation" />
          </div>
        )}
      </div>

      {/* transcript */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-2">
        {turns.length === 0 ? (
          <Empty jur={jur} starters={starters} onPick={send} />
        ) : (
          <div className="flex flex-col gap-4 pt-1">
            {turns.map((t, i) => (
              t.role === "user"
                ? <UserTurn key={i} text={t.content} />
                : <AnswerTurn key={i} turn={t} onFollow={send} busy={busy} fireToast={fireToast} />
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-xs" style={{ color: T.muted }}>
                <Sparkles size={13} color={T.signal} />
                <span>Checking the {jur.country} reference…</span>
                <Loader2 size={12} className="animate-spin" />
              </div>
            )}
            {summary && <SummaryCard markdown={summary} fireToast={fireToast} />}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* composer */}
      <div className="px-6 pb-5 pt-3 shrink-0">
        <div className="flex items-end gap-2 rounded-xl px-3 py-2.5"
          style={{ background: "#fff", border: `1px solid ${T.line2}`, boxShadow: "0 1px 3px rgba(35,40,56,0.05)" }}>
          <textarea
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              // Enter sends; Shift+Enter is a newline — the convention every chat surface uses.
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            placeholder={`Ask anything about time & attendance in ${jur.country}…`}
            className="flex-1 resize-none outline-none text-sm leading-relaxed"
            style={{ color: T.ink, maxHeight: 140, minHeight: 24 }}
          />
          <button onClick={() => send()} disabled={!draft.trim() || busy}
            className="flex items-center justify-center rounded-lg shrink-0 transition-transform active:scale-95"
            style={{
              width: 32, height: 32,
              background: !draft.trim() || busy ? T.line2 : T.signal,
              color: !draft.trim() || busy ? T.muted : "#fff",
            }}>
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          </button>
        </div>
        <div className="mt-2 text-xs flex items-center gap-1.5" style={{ color: T.faint }}>
          <Scale size={11} />
          Grounded in the {jur.country} requirements reference — every value cites its article. A cited
          draft for expert review, not legal advice.
        </div>
      </div>
    </div>
  );
}

function Empty({ jur, starters, onPick }) {
  return (
    <div className="pt-8 pb-4">
      <div className="flex items-center justify-center rounded-2xl mx-auto"
        style={{ width: 48, height: 48, background: T.aiSoft }}>
        <Sparkles size={22} color="#6d5bd0" />
      </div>
      <div className="mt-4 text-center">
        <div className="text-xl font-semibold tracking-tight" style={{ color: T.ink }}>
          What do you need to know about {jur.country}?
        </div>
        <div className="mt-1.5 text-sm" style={{ color: T.muted, maxWidth: 460, marginInline: "auto" }}>
          Overtime bands, rest days, night shifts, holidays, banked hours — answered from the{" "}
          {jur.rule_count}-rule {jur.law} reference, with the article cited every time.
        </div>
      </div>
      <div className="mt-6 grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {starters.map((q) => (
          <button key={q} onClick={() => onPick(q)}
            className="text-left rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white"
            style={{ background: "#fff", border: `1px solid ${T.line}`, color: T.ink2 }}>
            <span className="flex items-start gap-2.5">
              <HelpCircle size={15} color={T.signal} className="shrink-0" style={{ marginTop: 1 }} />
              {q}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function UserTurn({ text }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={{ background: T.ink, color: "#fff", maxWidth: "78%", borderBottomRightRadius: 6 }}>
        {text}
      </div>
    </div>
  );
}

function AnswerTurn({ turn, onFollow, busy, fireToast }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="rounded-2xl px-4 py-3.5 relative group"
        style={{ background: "#fff", border: `1px solid ${T.line}`, borderBottomLeftRadius: 6 }}>
        <Markdown text={turn.content} />
        <CopyButton
          text={turn.content}
          fireToast={fireToast}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ top: 8, right: 8 }}
        />
      </div>

      {turn.clarification && (
        <div className="rounded-xl px-3.5 py-2.5 text-xs flex items-start gap-2"
          style={{ background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" }}>
          <HelpCircle size={13} className="shrink-0" style={{ marginTop: 1 }} />
          <span>{turn.clarification}</span>
        </div>
      )}

      {turn.followups?.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, fontWeight: 700 }}>
            Ask next
          </div>
          <div className="flex flex-col gap-1.5 items-start">
            {turn.followups.map((q) => (
              <button key={q} onClick={() => onFollow(q)} disabled={busy}
                className="flex items-center gap-1.5 rounded-full pl-3 pr-2.5 py-1.5 text-xs font-medium text-left transition-colors"
                style={{ background: T.signalSoft, border: `1px solid #cfe8fd`, color: "#0b6fbd", opacity: busy ? 0.5 : 1 }}>
                {q} <ArrowRight size={11} className="shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ markdown, fireToast }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: `1px solid ${T.signal}` }}>
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: T.signalSoft, borderBottom: `1px solid #cfe8fd` }}>
        <FileDown size={13} color="#0b6fbd" />
        <span className="text-xs font-semibold" style={{ color: "#0b6fbd" }}>Handover note — copied to your clipboard</span>
        <span className="ml-auto"><CopyButton text={markdown} fireToast={fireToast} /></span>
      </div>
      <div className="px-4 py-3.5"><Markdown text={markdown} /></div>
    </div>
  );
}

/* ---- clipboard ---- */

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context; on plain http://<host> it throws. Fall back to a
    // hidden textarea + execCommand, which still works there — the demo runs over http.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyButton({ text, fireToast, className = "", style }) {
  const [done, setDone] = useState(false);
  return (
    <button
      title="Copy this answer"
      className={`flex items-center gap-1 rounded-md px-2 py-1 ${className}`}
      style={{ background: "#fff", border: `1px solid ${T.line2}`, color: done ? "#047857" : T.muted, fontSize: 10.5, ...style }}
      onClick={async (e) => {
        e.stopPropagation();
        const ok = await copy(text);
        if (!ok) return fireToast?.("Could not access the clipboard.", "error");
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}>
      {done ? <Check size={11} /> : <Copy size={11} />} {done ? "Copied" : "Copy"}
    </button>
  );
}

/* The whole conversation as markdown — a paste-ready record, questions and cited answers in order. */
function transcriptMarkdown(turns, jur) {
  const lines = [
    `# Time & attendance — ${jur.country}`,
    "",
    `Answered from the ${jur.law} requirements reference via LawTrack AI. A cited draft for expert review.`,
    "",
  ];
  turns.forEach((t) => {
    if (t.role === "user") {
      lines.push(`## Q. ${t.content}`, "");
    } else {
      lines.push(t.content, "");
      if (t.clarification) lines.push(`> **Clarification needed:** ${t.clarification}`, "");
    }
  });
  return lines.join("\n").trim() + "\n";
}

/* A deliberately small markdown renderer: headings, bullets, blockquotes, bold/italic/code/links —
   the only constructs the advisor's answers and summaries use. Pulling in a markdown library to
   render six of them would be more surface than the feature. Text is inserted as text nodes, never
   as HTML.

   It walks *lines*, not blank-line-separated blocks. A summary comes back as a heading immediately
   followed by its bullets with no blank line between them, and block-at-a-time parsing classified
   that whole group as one paragraph — printing a literal "## What applies -" on screen. */
function Markdown({ text }) {
  const nodes = [];
  let para = [];       // consecutive plain lines → one paragraph
  let bullets = [];    // consecutive "- " lines → one list
  let quote = [];      // consecutive "> " lines → one blockquote

  const flush = () => {
    if (para.length) {
      nodes.push({ kind: "p", text: para.join(" ") });
      para = [];
    }
    if (bullets.length) {
      nodes.push({ kind: "ul", items: [...bullets] });
      bullets = [];
    }
    if (quote.length) {
      nodes.push({ kind: "quote", text: quote.join(" ") });
      quote = [];
    }
  };

  String(text || "").split("\n").forEach((raw) => {
    const line = raw.trim();
    if (!line) return flush();

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flush();
      nodes.push({ kind: "h", text: heading[2] });
      return;
    }
    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      if (para.length || quote.length) flush();
      bullets.push(bullet[1]);
      return;
    }
    if (line.startsWith(">")) {
      if (para.length || bullets.length) flush();
      quote.push(line.replace(/^>\s?/, ""));
      return;
    }
    if (bullets.length) {
      // a wrapped continuation of the bullet above, not a new paragraph
      bullets[bullets.length - 1] += ` ${line}`;
      return;
    }
    if (quote.length) flush();
    para.push(line);
  });
  flush();

  return (
    <div className="flex flex-col gap-2 text-sm leading-relaxed" style={{ color: T.ink }}>
      {nodes.map((n, i) => {
        if (n.kind === "h") {
          return (
            <div key={i} className="font-semibold" style={{ color: T.ink, fontSize: 14, marginTop: i ? 5 : 0 }}>
              <Inline text={n.text} />
            </div>
          );
        }
        if (n.kind === "ul") {
          return (
            <ul key={i} className="flex flex-col gap-1.5 pl-1">
              {n.items.map((item, li) => (
                <li key={li} className="flex gap-2">
                  <span style={{ color: T.signal, lineHeight: 1.6 }}>•</span>
                  <span><Inline text={item} /></span>
                </li>
              ))}
            </ul>
          );
        }
        if (n.kind === "quote") {
          return (
            <div key={i} className="rounded-lg px-3 py-2 text-xs"
              style={{ background: "#f7f9fc", borderLeft: `3px solid ${T.line2}`, color: T.ink2 }}>
              <Inline text={n.text} />
            </div>
          );
        }
        return <p key={i}><Inline text={n.text} /></p>;
      })}
    </div>
  );
}

/* **bold**, *italic*, `code` and [label](url) — tokenised, so nothing is ever set as innerHTML.
   Italics matter here beyond polish: the answers set every Spanish legal term in them
   (*jornada nocturna*, *mixta*), so without this the citations read with stray asterisks. Bold is
   matched before italic in the alternation, so `**x**` never falls through to the single-star rule. */
function Inline({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        if (/^\*\*[^*]+\*\*$/.test(p)) {
          return <strong key={i} style={{ fontWeight: 600, color: T.ink }}>{p.slice(2, -2)}</strong>;
        }
        if (/^\*[^*\n]+\*$/.test(p)) {
          return <em key={i} style={{ fontStyle: "italic" }}>{p.slice(1, -1)}</em>;
        }
        if (/^`[^`]+`$/.test(p)) {
          return (
            <code key={i} className="rounded px-1"
              style={{ background: "#eef2ff", color: "#4338ca", fontSize: "0.87em", fontFamily: "ui-monospace, monospace" }}>
              {p.slice(1, -1)}
            </code>
          );
        }
        const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a key={i} href={link[2]} target="_blank" rel="noreferrer"
              style={{ color: T.signal, textDecoration: "underline" }}>{link[1]}</a>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function SmallButton({ onClick, Icon, label, title, primary, spin }) {
  return (
    <button onClick={onClick} title={title || label}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-transform active:scale-95"
      style={primary
        ? { background: T.signal, color: "#fff" }
        : { background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
      <Icon size={13} className={spin ? "animate-spin" : undefined} /> {label}
    </button>
  );
}
