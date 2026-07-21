import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Radar, Activity, Upload, ArrowLeft, ChevronDown, Filter, Download,
  CheckCircle2, AlertTriangle, AlertCircle, SlidersHorizontal, Clock,
  FileText, Gavel, FilePlus, Building2, Layers, Loader2, Flag,
  ShieldCheck, X, RefreshCw, Plus, ExternalLink, Search, Check,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Design tokens — neutrals via inline style, classification via Tailwind
 * ------------------------------------------------------------------ */
const T = {
  paper: "#f4f4f2", panel: "#ffffff", ink: "#191917", ink2: "#3a3833",
  muted: "#6f6d68", faint: "#9a978f", line: "#e7e6e2", line2: "#d9d7d1",
  signal: "#0e7490", signalSoft: "#ecfeff",
};

/* the only saturated color in the product — the change taxonomy */
const TYPE = {
  supported: {
    label: "Aligned", cardLabel: "Aligned — no action", Icon: CheckCircle2,
    dot: "#059669", text: "text-emerald-700", chipBg: "bg-emerald-50", chipBorder: "border-emerald-200",
    markBg: "#d1fae5", markLine: "#10b981", ring: "#10b981", pinBg: "#059669",
  },
  config: {
    label: "Config", cardLabel: "Configuration change", Icon: SlidersHorizontal,
    dot: "#d97706", text: "text-amber-700", chipBg: "bg-amber-50", chipBorder: "border-amber-200",
    markBg: "#fef3c7", markLine: "#f59e0b", ring: "#f59e0b", pinBg: "#d97706",
  },
  gap: {
    label: "Gap", cardLabel: "Engine capability gap", Icon: AlertCircle,
    dot: "#2563eb", text: "text-blue-700", chipBg: "bg-blue-50", chipBorder: "border-blue-200",
    markBg: "#dbeafe", markLine: "#3b82f6", ring: "#3b82f6", pinBg: "#2563eb",
  },
  conflict: {
    label: "Conflict", cardLabel: "Conflict — policy out of compliance", Icon: AlertTriangle,
    dot: "#dc2626", text: "text-red-700", chipBg: "bg-red-50", chipBorder: "border-red-200",
    markBg: "#fee2e2", markLine: "#ef4444", ring: "#ef4444", pinBg: "#dc2626",
  },
};
const TYPE_ORDER = ["conflict", "gap", "config", "supported"];

/* ------------------------------------------------------------------ *
 * Pay policies — the comparison target (the second input)
 * ------------------------------------------------------------------ */
const POLICIES = [
  { id: "br-retail", flag: "🇧🇷", name: "Brazil — Retail Standard", sub: "CCT Comércio SP" },
  { id: "br-botic", flag: "🇧🇷", name: "Brazil — Boticário Franchises", sub: "Franquias" },
  { id: "br-log", flag: "🇧🇷", name: "Brazil — Logistics", sub: "Transporte SP" },
  { id: "fr-syntec", flag: "🇫🇷", name: "France — Syntec Baseline", sub: "CCN 1486" },
  { id: "mx-retail", flag: "🇲🇽", name: "Mexico — Retail Baseline", sub: "LFT" },
  { id: "de-eh", flag: "🇩🇪", name: "Germany — Einzelhandel NRW", sub: "Tarifvertrag" },
];
const policyName = (id) => POLICIES.find((p) => p.id === id)?.name || "—";

/* helper: a marked run inside a paragraph */
const m = (t, c) => ({ t, c });

/* ------------------------------------------------------------------ *
 * Documents — metadata + rendered source ("PDF") + gap analysis
 * ------------------------------------------------------------------ */
const DOCS = {
  "br-cct-sp-2026": {
    title: "CCT Comércio Varejista — São Paulo",
    subtitle: "Convenção Coletiva de Trabalho 2026/2027",
    family: "CCT Comércio Varejista SP", country: "Brazil", flag: "🇧🇷",
    jurisdiction: "São Paulo, BR", kind: "CCT", lang: "pt",
    source: "Sindicato dos Comerciários de SP", detected: "Today · 09:12",
    why: "New 2026/2027 convention registered at MTE. 8 clauses affect calculation, incl. a hours-bank window conflict.",
    policyId: "br-retail",
    header: {
      parties: "SINDICATO DOS EMPREGADOS NO COMÉRCIO DE SÃO PAULO  ·  SINDICATO DO COMÉRCIO VAREJISTA DO ESTADO DE SÃO PAULO",
      reg: "Registro MTE nº SP002143/2026", term: "Vigência: 01/01/2026 a 31/12/2026",
    },
    pages: [
      [
        { kind: "para", body: ["Pelo presente instrumento, as entidades sindicais acima qualificadas celebram a presente Convenção Coletiva de Trabalho, estipulando as condições de trabalho previstas nas cláusulas seguintes, aplicáveis à categoria do comércio varejista na base territorial das entidades convenentes."] },
        { kind: "clause", num: "Cláusula 1ª", title: "Vigência e Abrangência", changes: [], body: [
          ["A presente Convenção Coletiva de Trabalho vigorará pelo prazo de 12 (doze) meses, aplicando-se a todos os empregados no comércio varejista representados pelas entidades convenentes, na base territorial do Estado de São Paulo, independentemente da forma de contratação."] ] },
        { kind: "clause", num: "Cláusula 2ª", title: "Reajuste Salarial", changes: [], body: [
          ["Os salários da categoria serão reajustados no percentual correspondente à variação acumulada do índice oficial de preços no período, aplicado sobre os salários vigentes no mês anterior à data-base, compensadas as antecipações espontaneamente concedidas."] ] },
        { kind: "clause", num: "Cláusula 3ª", title: "Piso Salarial da Categoria", changes: [], body: [
          ["Fica assegurado o piso salarial da categoria, vedada a admissão de empregado com remuneração inferior ao valor estabelecido, ressalvadas as jornadas contratadas em regime de tempo parcial, reduzidas proporcionalmente."] ] },
        { kind: "clause", num: "Cláusula 4ª", title: "Vale-Refeição e Cesta Básica", changes: [], body: [
          ["As empresas fornecerão vale-refeição ou vale-alimentação a seus empregados, sem natureza salarial, nos termos do Programa de Alimentação do Trabalhador (PAT), facultada a coparticipação do empregado no limite legal."] ] },
        { kind: "clause", num: "Cláusula 5ª", title: "Vale-Transporte", changes: [], body: [
          ["O vale-transporte será concedido a todos os empregados que dele necessitarem para o deslocamento residência-trabalho e vice-versa, observado o desconto legal máximo de 6% (seis por cento) sobre o salário-base."] ] },
      ],
      [
        { kind: "clause", num: "Cláusula 6ª", title: "Assistência Médica e Odontológica", changes: [], body: [
          ["As empresas manterão plano de assistência médica e odontológica em benefício de seus empregados, facultada a coparticipação nas condições definidas entre as partes, sem que tais valores integrem a remuneração para quaisquer fins."] ] },
        { kind: "clause", num: "Cláusula 7ª", title: "Gratificação de Função", changes: [], body: [
          ["Ao empregado que exercer função de confiança será devida gratificação de função não inferior a 40% (quarenta por cento) do salário do cargo efetivo, incorporável na forma da lei e da jurisprudência aplicável."] ] },
        { kind: "clause", num: "Cláusula 8ª", title: "Uniformes e Equipamentos de Proteção", changes: [], body: [
          ["Quando exigido o uso de uniforme, este será fornecido gratuitamente pelo empregador, assim como os equipamentos de proteção individual necessários ao exercício das atividades, mediante recibo e substituição quando danificados."] ] },
        { kind: "clause", num: "Cláusula 9ª", title: "Estabilidade Provisória", changes: [], body: [
          ["Fica assegurada estabilidade provisória à empregada gestante, desde a confirmação da gravidez até 5 (cinco) meses após o parto, e ao empregado a 12 (doze) meses da aquisição do direito à aposentadoria, desde que conte com mais de 5 (cinco) anos de vínculo com a empresa."] ] },
      ],
      [
        { kind: "clause", num: "Cláusula 10ª", title: "Jornada de Trabalho", changes: ["c1"], body: [
          ["A duração normal do trabalho será de ", m("44 (quarenta e quatro) horas semanais", "c1"), ", não excedendo 8 (oito) horas diárias, ressalvadas as hipóteses de compensação e de jornada reduzida previstas nesta Convenção."] ] },
        { kind: "clause", num: "Cláusula 11ª", title: "Horas Extraordinárias", changes: ["c2"], body: [
          ["As horas extraordinárias serão remuneradas com adicional de ", m("60% (sessenta por cento) para as duas primeiras horas diárias e 80% (oitenta por cento) para as horas subsequentes", "c2"), ", calculado sobre o valor da hora normal."],
          ["Para efeito de apuração, será observado o registro individual de cada marcação de ponto, vedado o cômputo por médias ou totais."] ] },
        { kind: "clause", num: "Cláusula 12ª", title: "Adicional Noturno", changes: ["c3"], body: [
          ["O trabalho noturno, prestado entre 22h e 5h, terá adicional de ", m("25% (vinte e cinco por cento)", "c3"), " sobre a hora diurna, computada a hora noturna como de 52 (cinquenta e dois) minutos e 30 (trinta) segundos."] ] },
        { kind: "clause", num: "Cláusula 13ª", title: "Intervalo Intrajornada", changes: ["c4"], body: [
          ["Na hipótese de concessão parcial do intervalo intrajornada, será devido o pagamento, de natureza indenizatória, ", m("apenas do período suprimido, com acréscimo de 50% (cinquenta por cento)", "c4"), ", nos termos do art. 71, §4º, da CLT."] ] },
      ],
      [
        { kind: "clause", num: "Cláusula 14ª", title: "Banco de Horas", changes: ["c5"], body: [
          ["As horas excedentes poderão ser compensadas mediante banco de horas, ", m("com prazo máximo de compensação de 6 (seis) meses", "c5"), ", findo o qual as horas não compensadas serão quitadas como extraordinárias, com o respectivo adicional."] ] },
        { kind: "clause", num: "Cláusula 15ª", title: "Descanso Semanal Remunerado", changes: ["c6"], body: [
          ["O valor das ", m("horas extraordinárias habituais integrará a base de cálculo do descanso semanal remunerado", "c6"), " (DSR), na forma da Súmula nº 172 do TST."] ] },
        { kind: "clause", num: "Cláusula 16ª", title: "Tolerância de Marcação", changes: ["c7"], body: [
          ["Serão desconsideradas as variações de ", m("até 5 (cinco) minutos por marcação, limitadas a 10 (dez) minutos diários", "c7"), ", não computadas como jornada extraordinária, nos termos do art. 58, §1º, da CLT."] ] },
        { kind: "clause", num: "Cláusula 17ª", title: "Trabalho aos Domingos e Feriados", changes: ["c8"], body: [
          ["O trabalho aos domingos e feriados, quando não compensado por folga na mesma semana, será remunerado ", m("em dobro", "c8"), ", sem prejuízo da remuneração do descanso semanal."] ] },
      ],
      [
        { kind: "clause", num: "Cláusula 18ª", title: "Contribuição Assistencial", changes: [], body: [
          ["Os empregadores descontarão dos empregados, em favor do sindicato profissional, a contribuição assistencial aprovada em assembleia geral da categoria, assegurado ao trabalhador o direito de oposição no prazo e na forma da lei."] ] },
        { kind: "clause", num: "Cláusula 19ª", title: "Comissão de Conciliação Prévia", changes: [], body: [
          ["As partes reconhecem a Comissão de Conciliação Prévia como instância de tentativa de solução dos conflitos individuais do trabalho, sem prejuízo do livre acesso ao Poder Judiciário."] ] },
        { kind: "clause", num: "Cláusula 20ª", title: "Multa por Descumprimento", changes: [], body: [
          ["O descumprimento de qualquer cláusula desta Convenção sujeitará a parte infratora ao pagamento de multa equivalente a 1 (um) piso salarial da categoria, por empregado prejudicado e por infração, revertida em favor da parte prejudicada."] ] },
        { kind: "clause", num: "Cláusula 21ª", title: "Disposições Gerais", changes: [], body: [
          ["Os casos omissos serão resolvidos pelas entidades convenentes mediante negociação, prevalecendo, no que não contrariar esta Convenção, as disposições legais aplicáveis à categoria."] ] },
        { kind: "para", body: ["E, por estarem assim justas e convencionadas, firmam as partes o presente instrumento para que produza seus jurídicos e legais efeitos."] },
      ],
    ],
    changes: [
      { id: "c1", type: "supported", clause: "Cláusula 10ª", title: "Weekly hours 44h / 8h daily",
        change: "Standard journey of 44h weekly, 8h daily. Matches the active policy exactly.",
        current: "44h weekly · 8h daily", required: "44h weekly · 8h daily",
        mapping: "Journey → weekly & daily limits", confidence: 98,
        action: "No action. Policy is already aligned." },
      { id: "c2", type: "config", clause: "Cláusula 11ª", title: "Overtime bands raised to 60% / 80%",
        change: "New tiered overtime: first 2 daily hours at +60%, subsequent hours at +80%.",
        current: "First 2h +50% · after +70%", required: "First 2h +60% · after +80%",
        mapping: "Overtime → premium bands (additive-on-base)", confidence: 96,
        action: "Update the two OT band multipliers. Rounding stays at the punch level per the clause — daily/weekly totals are unaffected." },
      { id: "c3", type: "config", clause: "Cláusula 12ª", title: "Night premium raised to 25%",
        change: "Night premium set above the CLT floor; reduced 52′30″ night hour unchanged.",
        current: "Night premium +20% (CLT floor)", required: "Night premium +25%",
        mapping: "Night premium → rate", confidence: 97,
        action: "Raise the night premium rate to 25%. Reduced-hour handling already matches." },
      { id: "c4", type: "gap", clause: "Cláusula 13ª", title: "Partial intrajornada — indemnify suppressed portion only",
        change: "Post-reform rule: pay only the suppressed portion of the meal break, +50%, as indemnity.",
        current: "Engine pays the full interval as penalty", required: "Indemnify suppressed minutes only, +50%",
        mapping: "Intrajornada → partial-suppression indemnity — not supported", confidence: 89,
        action: "Engine capability gap. Log to the Roseman backlog; handle manually until the partial-suppression case ships." },
      { id: "c5", type: "conflict", clause: "Cláusula 14ª", title: "Hours-bank window is 6 months — policy says 12",
        change: "Agreement caps the bank compensation cycle at 6 months; the active policy is set to 12.",
        current: "Expiry window: 12 months", required: "Expiry window: 6 months",
        mapping: "Hours Bank → cycle expiry window", confidence: 95,
        action: "Policy is out of compliance. Set the expiry window to 6 months and recompute open-balance exposure before the next cycle closes." },
      { id: "c6", type: "config", clause: "Cláusula 15ª", title: "DSR reflex on habitual overtime",
        change: "Habitual OT must feed the DSR base (Súmula 172). Currently disabled.",
        current: "DSR-over-OT reflex: off", required: "DSR-over-OT reflex: on",
        mapping: "DSR → habitual-OT reflex accumulation", confidence: 92,
        action: "Enable the DSR reflex on habitual OT. Note it compounds with the new bands in Cláusula 11ª (c2)." },
      { id: "c7", type: "supported", clause: "Cláusula 16ª", title: "Punch tolerance 5 min / 10 min daily",
        change: "Statutory tolerance window. Matches the engine's configured tolerance.",
        current: "5 min per punch · 10 min daily", required: "5 min per punch · 10 min daily",
        mapping: "Punch tolerance window", confidence: 99,
        action: "No action. Aligned." },
      { id: "c8", type: "config", clause: "Cláusula 17ª", title: "Sunday & holiday pay — double",
        change: "Uncompensated Sunday/holiday work paid at double (100% additional).",
        current: "Sunday premium +50%", required: "Sunday/holiday +100% (double) when uncompensated",
        mapping: "Sunday/Holiday premium → rate", confidence: 90,
        action: "Set the Sunday/holiday premium to 100% additional for days not offset by a same-week rest day." },
    ],
  },

  "fr-syntec-2026": {
    title: "Syntec — CCN 1486", subtitle: "Avenant 2026 · heures & forfait",
    family: "Syntec — CCN 1486", country: "France", flag: "🇫🇷",
    jurisdiction: "France", kind: "Amendment", lang: "fr",
    source: "Legifrance", detected: "Today · 07:40",
    why: "Avenant published. Overtime bands and forfait-jours provisions updated for the branch.",
    policyId: "fr-syntec",
    header: { parties: "FÉDÉRATION SYNTEC  ·  ORGANISATIONS SYNDICALES DE SALARIÉS", reg: "IDCC 1486 — Avenant nº 47", term: "Applicable au 01/03/2026" },
    pages: [
      [
        { kind: "para", body: ["Le présent avenant modifie les dispositions de la convention collective nationale des bureaux d'études techniques (Syntec) relatives à la durée du travail."] },
        { kind: "clause", num: "Article 1", title: "Champ d'application", changes: [], body: [
          ["Le présent avenant s'applique à l'ensemble des salariés relevant de la convention collective nationale des bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseil (IDCC 1486)."] ] },
        { kind: "clause", num: "Article 2", title: "Durée du travail", changes: [], body: [
          ["La durée légale du travail effectif est fixée à 35 heures par semaine. Les modalités d'aménagement sur l'année sont définies par accord d'entreprise, dans le respect des dispositions de branche."] ] },
        { kind: "clause", num: "Article 3", title: "Heures supplémentaires", changes: ["c1"], body: [
          ["Les heures supplémentaires donnent lieu à une majoration de ", m("25 % pour les huit premières heures et 50 % au-delà", "c1"), ", calculée sur le taux horaire de base."] ] },
        { kind: "clause", num: "Article 4", title: "Forfait annuel en jours", changes: ["c3"], body: [
          ["Le personnel autonome peut être soumis à un ", m("forfait de 218 jours travaillés par an, avec suivi de la charge de travail", "c3"), ", à l'exclusion de tout décompte horaire."] ] },
      ],
      [
        { kind: "clause", num: "Article 5", title: "Repos quotidien", changes: ["c2"], body: [
          ["Chaque salarié bénéficie d'un ", m("repos quotidien minimal de 11 heures consécutives", "c2"), " entre deux journées de travail."] ] },
        { kind: "clause", num: "Article 6", title: "Contingent d'heures supplémentaires", changes: ["c4"], body: [
          ["Au-delà du ", m("contingent annuel de 220 heures, une contrepartie obligatoire en repos est due", "c4"), ", en sus des majorations prévues à l'article 3."] ] },
        { kind: "clause", num: "Article 7", title: "Compte épargne-temps", changes: [], body: [
          ["Les salariés peuvent affecter à un compte épargne-temps les jours de repos non pris, dans les limites et selon les modalités fixées par accord d'entreprise."] ] },
        { kind: "clause", num: "Article 8", title: "Date d'effet et durée", changes: [], body: [
          ["Le présent avenant entre en vigueur à sa date d'application et est conclu pour une durée indéterminée. Il pourra être révisé ou dénoncé dans les conditions légales."] ] },
        { kind: "para", body: ["Fait à Paris, en un nombre suffisant d'exemplaires originaux pour dépôt auprès des services compétents."] },
      ],
    ],
    changes: [
      { id: "c1", type: "config", clause: "Article 3", title: "Overtime bands 25% / 50%",
        change: "First 8 overtime hours at +25%, beyond at +50%.",
        current: "Flat +25%", required: "+25% (first 8h) · +50% (beyond)",
        mapping: "Overtime → premium bands (additive-on-base)", confidence: 95,
        action: "Split the OT rate into two bands." },
      { id: "c2", type: "supported", clause: "Article 5", title: "Daily rest 11 hours",
        change: "Minimum 11h consecutive daily rest — matches policy.",
        current: "11h daily rest", required: "11h daily rest",
        mapping: "Rest rules → daily minimum", confidence: 98, action: "No action. Aligned." },
      { id: "c3", type: "gap", clause: "Article 4", title: "Forfait-jours (218 days) tracking",
        change: "Day-based annual forfait with workload monitoring, no hourly count.",
        current: "Hours-based tracking only", required: "Day-count forfait with charge monitoring",
        mapping: "Forfait-jours — not supported", confidence: 87,
        action: "Engine capability gap. Day-based forfait is unmodeled; log to backlog." },
      { id: "c4", type: "conflict", clause: "Article 6", title: "OT contingent 220h + mandatory rest counterpart",
        change: "Annual contingent of 220h with a mandatory compensatory-rest counterpart above it.",
        current: "Contingent set to 130h · no comp-rest", required: "220h contingent · comp-rest above",
        mapping: "OT contingent + compensatory rest", confidence: 91,
        action: "Contingent is misconfigured. Set to 220h and enable the compensatory-rest counterpart." },
    ],
  },

  "br-botic-2026": {
    title: "CCT Boticário", subtitle: "Convenção 2026/2027 · franquias",
    family: "CCT Boticário", country: "Brazil", flag: "🇧🇷",
    jurisdiction: "BR (nacional)", kind: "CCT", lang: "pt",
    source: "Sindicato do Comércio", detected: "Yesterday",
    why: "Franchise convention renewal detected. Extracting clauses…",
    policyId: "br-botic",
    header: { parties: "SINDICATO DO COMÉRCIO  ·  GRUPO BOTICÁRIO", reg: "Registro MTE nº PR001902/2026", term: "Vigência: 01/02/2026 a 31/01/2027" },
    pages: [
      [
        { kind: "para", body: ["Pelo presente instrumento, o sindicato profissional e o Grupo Boticário celebram a presente Convenção Coletiva de Trabalho, aplicável aos empregados das franquias na base territorial das entidades convenentes, nos termos das cláusulas seguintes."] },
        { kind: "clause", num: "Cláusula 1ª", title: "Vigência e Abrangência", changes: [], body: [
          ["A presente Convenção vigorará por 12 (doze) meses a contar da data-base, aplicando-se a todos os empregados das unidades franqueadas representadas pelas entidades convenentes."] ] },
        { kind: "clause", num: "Cláusula 2ª", title: "Reajuste Salarial", changes: [], body: [
          ["Os salários serão reajustados pelo índice acumulado do período, aplicado sobre a remuneração vigente no mês anterior à data-base, compensadas as antecipações concedidas."] ] },
        { kind: "clause", num: "Cláusula 3ª", title: "Piso Salarial", changes: [], body: [
          ["Fica assegurado o piso salarial da categoria, vedada a contratação por valor inferior, ressalvadas as jornadas parciais reduzidas proporcionalmente."] ] },
        { kind: "clause", num: "Cláusula 4ª", title: "Vale-Alimentação", changes: [], body: [
          ["As empresas concederão vale-alimentação de natureza não salarial, nos termos do PAT, facultada a coparticipação do empregado no limite legal."] ] },
        { kind: "clause", num: "Cláusula 5ª", title: "Vale-Transporte", changes: [], body: [
          ["O vale-transporte será concedido aos empregados que dele necessitarem, com desconto legal máximo de 6% (seis por cento) sobre o salário-base."] ] },
        { kind: "clause", num: "Cláusula 6ª", title: "Assistência Médica", changes: [], body: [
          ["As empresas manterão plano de assistência médica em benefício dos empregados, facultada a coparticipação nas condições ajustadas entre as partes."] ] },
        { kind: "clause", num: "Cláusula 7ª", title: "Comissões de Venda", changes: [], body: [
          ["As comissões sobre vendas, quando pactuadas, integram a remuneração para todos os efeitos legais e serão apuradas mensalmente, com demonstrativo entregue ao empregado."] ] },
      ],
      [
        { kind: "clause", num: "Cláusula 8ª", title: "Horas Extraordinárias", changes: ["c1"], body: [
          ["As horas extraordinárias serão remuneradas com adicional de ", m("65% (sessenta e cinco por cento)", "c1"), " sobre a hora normal."] ] },
        { kind: "clause", num: "Cláusula 9ª", title: "Intervalo e Alimentação", changes: ["c2"], body: [
          ["Fica assegurado o ", m("intervalo intrajornada de 1 (uma) hora", "c2"), " para refeição e descanso nas jornadas superiores a seis horas."] ] },
        { kind: "clause", num: "Cláusula 10ª", title: "Acúmulo de Função", changes: ["c3"], body: [
          ["O empregado que exercer cumulativamente funções distintas fará jus a ", m("adicional de acúmulo de função de 20%", "c3"), " sobre o salário-base."] ] },
        { kind: "clause", num: "Cláusula 11ª", title: "Multa por Descumprimento", changes: [], body: [
          ["O descumprimento de qualquer cláusula sujeitará a parte infratora a multa equivalente a 1 (um) piso salarial por empregado prejudicado, revertida em favor da parte prejudicada."] ] },
        { kind: "clause", num: "Cláusula 12ª", title: "Disposições Gerais", changes: [], body: [
          ["Os casos omissos serão dirimidos pelas entidades convenentes, prevalecendo, no que não contrariar esta Convenção, a legislação aplicável à categoria."] ] },
        { kind: "para", body: ["E, por estarem assim justas e acordadas, firmam as partes o presente instrumento para que produza seus efeitos legais."] },
      ],
    ],
    changes: [
      { id: "c1", type: "config", clause: "Cláusula 8ª", title: "Overtime premium 65%",
        change: "Single OT premium of +65%.", current: "+60%", required: "+65%",
        mapping: "Overtime → premium rate", confidence: 94, action: "Update the OT premium rate." },
      { id: "c2", type: "supported", clause: "Cláusula 9ª", title: "Meal break 1 hour",
        change: "1h intrajornada for shifts over 6h — matches policy.",
        current: "1h meal break", required: "1h meal break",
        mapping: "Intrajornada → minimum", confidence: 96, action: "No action. Aligned." },
      { id: "c3", type: "gap", clause: "Cláusula 10ª", title: "Function-accumulation premium 20%",
        change: "Premium for concurrently holding distinct roles.",
        current: "Not modeled", required: "+20% on base for accumulation",
        mapping: "Function-accumulation premium — not supported", confidence: 85,
        action: "Engine capability gap. Log to backlog." },
    ],
  },

  "br-log-2026": {
    title: "CCT Logística e Transporte — SP", subtitle: "Convenção 2026",
    family: "CCT Logística e Transporte SP", country: "Brazil", flag: "🇧🇷",
    jurisdiction: "São Paulo, BR", kind: "CCT", lang: "pt",
    source: "SETCESP", detected: "Yesterday",
    why: "Transport convention detected. Driver waiting-time treatment conflicts with the logistics policy.",
    policyId: "br-log",
    header: { parties: "SINDICATO DOS TRABALHADORES EM TRANSPORTES  ·  SETCESP", reg: "Registro MTE nº SP004410/2026", term: "Vigência: 01/01/2026 a 31/12/2026" },
    pages: [
      [
        { kind: "para", body: ["Pelo presente instrumento, o Sindicato dos Trabalhadores em Transportes e o SETCESP celebram a presente Convenção Coletiva de Trabalho, aplicável aos trabalhadores em transporte e logística na base territorial das entidades convenentes."] },
        { kind: "clause", num: "Cláusula 1ª", title: "Vigência e Abrangência", changes: [], body: [
          ["A presente Convenção vigorará por 12 (doze) meses a contar da data-base, aplicando-se a motoristas, ajudantes e demais empregados das empresas de transporte e logística representadas."] ] },
        { kind: "clause", num: "Cláusula 2ª", title: "Reajuste Salarial", changes: [], body: [
          ["Os salários serão reajustados pelo índice acumulado do período, aplicado sobre a remuneração vigente no mês anterior à data-base, compensadas as antecipações concedidas."] ] },
        { kind: "clause", num: "Cláusula 3ª", title: "Piso Salarial de Motoristas e Ajudantes", changes: [], body: [
          ["Ficam assegurados os pisos salariais das funções de motorista e de ajudante, vedada a contratação por valor inferior ao estabelecido para cada categoria funcional."] ] },
        { kind: "clause", num: "Cláusula 4ª", title: "Diárias de Viagem", changes: [], body: [
          ["As diárias destinadas a alimentação e pernoite em viagem não integram a remuneração, desde que não excedam 50% (cinquenta por cento) do salário mensal, nos termos da lei."] ] },
        { kind: "clause", num: "Cláusula 5ª", title: "Seguro de Vida em Grupo", changes: [], body: [
          ["As empresas manterão seguro de vida e acidentes pessoais em grupo em favor dos empregados, com cobertura mínima estabelecida em cláusula específica."] ] },
      ],
      [
        { kind: "clause", num: "Cláusula 6ª", title: "Tempo de Espera", changes: ["c1"], body: [
          ["Para motoristas profissionais, o ", m("tempo de espera não será computado como jornada, sendo indenizado à razão de 30% do salário-hora", "c1"), ", nos termos da Lei nº 13.103/2015."] ] },
        { kind: "clause", num: "Cláusula 7ª", title: "Adicional Noturno", changes: ["c2"], body: [
          ["O adicional noturno será de ", m("20% (vinte por cento)", "c2"), ", com hora noturna reduzida de 52min30s."] ] },
        { kind: "clause", num: "Cláusula 8ª", title: "Horas Extraordinárias", changes: ["c3"], body: [
          ["As horas extras serão pagas com adicional de ", m("50% para as duas primeiras e 70% para as demais", "c3"), "."] ] },
        { kind: "clause", num: "Cláusula 9ª", title: "Tempo de Direção e Descanso", changes: [], body: [
          ["Serão observados os limites de tempo de direção e os intervalos de descanso previstos na legislação de trânsito e na Lei nº 13.103/2015, assegurado o repouso diário mínimo."] ] },
        { kind: "clause", num: "Cláusula 10ª", title: "Multa por Descumprimento", changes: [], body: [
          ["O descumprimento de qualquer cláusula sujeitará a parte infratora a multa equivalente a 1 (um) piso salarial por empregado prejudicado, revertida em favor da parte prejudicada."] ] },
        { kind: "para", body: ["E, por estarem assim justas e acordadas, firmam as partes o presente instrumento para que produza seus efeitos legais."] },
      ],
    ],
    changes: [
      { id: "c1", type: "conflict", clause: "Cláusula 6ª", title: "Driver waiting time — not journey, indemnified 30%",
        change: "Waiting time excluded from the journey, paid as a 30% indemnity (Lei 13.103).",
        current: "Waiting time counted as journey", required: "Excluded · indemnify at 30% of hourly wage",
        mapping: "Journey → waiting-time treatment", confidence: 88,
        action: "Policy is out of compliance — it books waiting time into the journey. Reclassify as indemnified time." },
      { id: "c2", type: "supported", clause: "Cláusula 7ª", title: "Night premium 20%",
        change: "Night premium at the floor with reduced hour — matches.",
        current: "+20% · 52′30″", required: "+20% · 52′30″",
        mapping: "Night premium → rate", confidence: 95, action: "No action. Aligned." },
      { id: "c3", type: "config", clause: "Cláusula 8ª", title: "Overtime bands 50% / 70%",
        change: "Tiered OT: +50% first two hours, +70% after.",
        current: "Flat +50%", required: "+50% / +70%",
        mapping: "Overtime → premium bands", confidence: 93, action: "Split OT into two bands." },
    ],
  },

  "de-eh-2026": {
    title: "Tarifvertrag Einzelhandel NRW", subtitle: "Entgelttarifvertrag 2026",
    family: "Tarifvertrag Einzelhandel NRW", country: "Germany", flag: "🇩🇪",
    jurisdiction: "Nordrhein-Westfalen, DE", kind: "CCT", lang: "de",
    source: "ver.di / HDE", detected: "Last week",
    why: "Regional retail tariff. Reviewed and reconciled against the German policy.",
    policyId: "de-eh", reviewedWhen: "Reviewed 3 days ago · A. Levi",
    header: { parties: "ver.di  ·  HANDELSVERBAND NRW", reg: "Entgelt-TV Einzelhandel NRW", term: "Gültig ab 01.04.2026" },
    pages: [
      [
        { kind: "clause", num: "§ 1", title: "Geltungsbereich", changes: [], body: [
          ["Dieser Tarifvertrag gilt für alle Beschäftigten des Einzelhandels im Tarifgebiet Nordrhein-Westfalen, soweit sie unter den fachlichen und persönlichen Geltungsbereich fallen."] ] },
        { kind: "clause", num: "§ 2", title: "Entgelt und Eingruppierung", changes: [], body: [
          ["Die monatlichen Entgelte richten sich nach den Gehalts- und Lohngruppen der Entgelttabelle. Die Eingruppierung erfolgt nach der überwiegend ausgeübten Tätigkeit."] ] },
        { kind: "clause", num: "§ 3", title: "Regelmäßige Arbeitszeit", changes: [], body: [
          ["Die regelmäßige wöchentliche Arbeitszeit beträgt 37,5 Stunden ausschließlich der Pausen. Die Verteilung erfolgt nach betrieblicher Vereinbarung."] ] },
        { kind: "clause", num: "§ 4", title: "Mehrarbeitszuschlag", changes: ["c2"], body: [
          ["Für Mehrarbeit wird ein ", m("Zuschlag von 25 %", "c2"), " auf den Stundenlohn gewährt."] ] },
      ],
      [
        { kind: "clause", num: "§ 5", title: "Nachtzuschlag", changes: ["c1"], body: [
          ["Für Nachtarbeit nach 20:00 Uhr wird ein ", m("Zuschlag von 20 %", "c1"), " gezahlt."] ] },
        { kind: "clause", num: "§ 6", title: "Ruhezeit", changes: ["c3"], body: [
          ["Zwischen zwei Arbeitstagen ist eine ", m("Ruhezeit von 11 Stunden", "c3"), " einzuhalten."] ] },
        { kind: "clause", num: "§ 7", title: "Urlaub", changes: [], body: [
          ["Der Erholungsurlaub beträgt 36 Werktage im Kalenderjahr. Der Urlaubsanspruch entsteht anteilig nach der Beschäftigungsdauer im Kalenderjahr."] ] },
        { kind: "clause", num: "§ 8", title: "Inkrafttreten und Kündigung", changes: [], body: [
          ["Dieser Tarifvertrag tritt zum genannten Datum in Kraft und kann mit einer Frist von drei Monaten zum Monatsende gekündigt werden."] ] },
      ],
    ],
    changes: [
      { id: "c1", type: "supported", clause: "§ 5", title: "Night surcharge 20%",
        change: "Night surcharge after 20:00 — matches policy.",
        current: "+20% after 20:00", required: "+20% after 20:00",
        mapping: "Night premium → rate", confidence: 96, action: "No action. Aligned." },
      { id: "c2", type: "config", clause: "§ 4", title: "Overtime surcharge 25%",
        change: "Mehrarbeit surcharge set to +25%.", current: "+20%", required: "+25%",
        mapping: "Overtime → surcharge rate", confidence: 92, action: "Raise the surcharge to 25%." },
      { id: "c3", type: "supported", clause: "§ 6", title: "Daily rest 11 hours",
        change: "11h between working days — matches.",
        current: "11h rest", required: "11h rest",
        mapping: "Rest rules → daily minimum", confidence: 98, action: "No action. Aligned." },
    ],
  },

  "br-pec-6x1": {
    title: "PL Fim da Escala 6x1", subtitle: "Projeto de Lei · jornada semanal",
    family: "PL Escala 6x1 (Federal)", country: "Brazil", flag: "🇧🇷",
    jurisdiction: "BR (federal)", kind: "Law", lang: "pt",
    source: "Câmara dos Deputados", detected: "3 days ago",
    why: "Draft bill advancing in committee. Would cap the week at 40h and bar the 6x1 scale — affects every Brazil policy.",
    policyId: "br-retail", scope: "Affects all Brazil policies",
    header: { parties: "CONGRESSO NACIONAL — PROJETO DE LEI", reg: "PL nº 1.105/2025 (em tramitação)", term: "Sujeito a período de transição" },
    pages: [[
      { kind: "para", body: ["Projeto de lei que altera a Consolidação das Leis do Trabalho para dispor sobre a duração máxima da jornada e a vedação da escala 6x1. Texto em tramitação — sujeito a alterações."] },
      { kind: "clause", num: "Art. 1º", title: "Jornada máxima semanal", changes: ["c1"], body: [
        ["A duração do trabalho não excederá ", m("40 (quarenta) horas semanais, vedada a escala 6x1", "c1"), ", sem redução de salário."] ] },
      { kind: "clause", num: "Art. 2º", title: "Transição", changes: ["c2"], body: [
        ["A adaptação observará ", m("período de transição por setor, mediante negociação coletiva", "c2"), ", na forma do regulamento."] ] },
      { kind: "clause", num: "Art. 3º", title: "Regulamentação", changes: [], body: [
        ["O Poder Executivo regulamentará esta Lei no prazo de 180 (cento e oitenta) dias, dispondo sobre os critérios de fiscalização e as hipóteses de jornada especial."] ] },
      { kind: "clause", num: "Art. 4º", title: "Vigência", changes: [], body: [
        ["Esta Lei entra em vigor na data de sua publicação, produzindo efeitos após o decurso do período de transição de que trata o art. 2º."] ] },
    ]],
    changes: [
      { id: "c1", type: "conflict", clause: "Art. 1º", title: "Weekly cap 40h · 6x1 barred",
        change: "Caps the week at 40h and prohibits the 6x1 scale, no pay cut.",
        current: "Policies at 44h · 6x1 permitted", required: "40h cap · 6x1 removed",
        mapping: "Journey → weekly limit + shift-pattern rules", confidence: 90,
        action: "High-impact. Every Brazil policy would breach the cap. Model a 40h variant and stage per the transition rules — do not apply before enactment." },
      { id: "c2", type: "config", clause: "Art. 2º", title: "Sector transition window",
        change: "Sector-specific transition via collective bargaining.",
        current: "No transition handling", required: "Effective-date staging per sector",
        mapping: "Effective-date & transition handling", confidence: 82,
        action: "Prepare an effective-date staging path; hold until CBA-level transition terms are published." },
    ],
  },

  "mx-40h": {
    title: "Reforma Jornada 40 Horas", subtitle: "Reforma constitucional · jornada",
    family: "Reforma Jornada 40h (Federal)", country: "Mexico", flag: "🇲🇽",
    jurisdiction: "MX (federal)", kind: "Law", lang: "es",
    source: "Diario Oficial de la Federación", detected: "5 days ago",
    why: "Constitutional reform. 48→40h phase-in through 2030 — affects Mexico policies.",
    policyId: "mx-retail", scope: "Affects Mexico policies",
    header: { parties: "CÁMARA DE DIPUTADOS — REFORMA CONSTITUCIONAL", reg: "Reforma art. 123 (fracc. I)", term: "Implementación gradual 2026–2030" },
    pages: [[
      { kind: "para", body: ["Decreto por el que se reforman diversas disposiciones de la Constitución Política de los Estados Unidos Mexicanos y de la Ley Federal del Trabajo en materia de jornada laboral. Texto sujeto a implementación gradual."] },
      { kind: "clause", num: "Art. 123", title: "Jornada máxima", changes: ["c1"], body: [
        ["Se establece la ", m("reducción progresiva de la jornada máxima de 48 a 40 horas semanales", "c1"), ", de manera escalonada hasta 2030."] ] },
      { kind: "clause", num: "Art. 71", title: "Prima dominical", changes: ["c2"], body: [
        ["Los trabajadores que presten servicio en domingo tendrán derecho a una ", m("prima dominical del 25%", "c2"), " sobre el salario ordinario."] ] },
      { kind: "clause", num: "Transitorio Primero", title: "Entrada en vigor", changes: [], body: [
        ["El presente Decreto entrará en vigor al día siguiente de su publicación en el Diario Oficial de la Federación."] ] },
      { kind: "clause", num: "Transitorio Segundo", title: "Implementación escalonada", changes: [], body: [
        ["La reducción de la jornada máxima se aplicará de manera escalonada, disminuyendo una hora por año hasta alcanzar las 40 horas semanales a más tardar en 2030, conforme al calendario que emita la autoridad laboral."] ] },
    ]],
    changes: [
      { id: "c1", type: "conflict", clause: "Art. 123", title: "Weekly cap 48h → 40h phase-in",
        change: "Staged reduction of the maximum week from 48h to 40h by 2030.",
        current: "Policy at 48h", required: "Phased reduction to 40h by 2030",
        mapping: "Journey → weekly limit (time-phased)", confidence: 89,
        action: "Plan a multi-year, time-phased weekly cap. Stage each step to its statutory effective date." },
      { id: "c2", type: "config", clause: "Art. 71", title: "Sunday premium 25%",
        change: "Prima dominical of 25% on ordinary wage.",
        current: "Sunday premium not set", required: "+25% Sunday premium",
        mapping: "Sunday premium → rate", confidence: 88, action: "Set the Sunday premium to 25%." },
    ],
  },
};

/* mid-year addendum — same CBA family as the flagship (for By-CBA grouping) */
DOCS["br-cct-sp-adit"] = {
  title: "CCT Comércio Varejista SP — Aditivo salarial", subtitle: "Aditivo 2026 · reajuste",
  family: "CCT Comércio Varejista SP", country: "Brazil", flag: "🇧🇷",
  jurisdiction: "São Paulo, BR", kind: "Amendment", lang: "pt",
  source: "FecomercioSP", detected: "2 h ago",
  why: "Mid-year salary addendum published. Revises the overtime base — re-analysis recommended.",
  policyId: "br-retail",
  header: { parties: "SINDICATO DOS COMERCIÁRIOS  ·  FECOMERCIOSP", reg: "Aditivo à CCT SP002143/2026", term: "Vigência a partir de 01/07/2026" },
  pages: [[
    { kind: "para", body: ["Pelo presente Termo Aditivo à Convenção Coletiva de Trabalho vigente, as entidades convenentes ajustam a revisão salarial e as demais condições a seguir estipuladas."] },
    { kind: "clause", num: "Cláusula 1ª", title: "Reajuste Salarial", changes: ["a1"], body: [
      ["Fica estabelecido o ", m("novo piso salarial de R$ 1.820,00 (mil, oitocentos e vinte reais)", "a1"), " para a categoria, a partir da vigência deste aditivo."] ] },
    { kind: "clause", num: "Cláusula 2ª", title: "Base de Cálculo das Horas Extras", changes: ["a2"], body: [
      ["Para o cálculo das horas extraordinárias, a base de incidência ", m("passa a compreender também o adicional de assiduidade", "a2"), ", quando habitualmente pago."] ] },
    { kind: "clause", num: "Cláusula 3ª", title: "Vigência do Aditivo", changes: [], body: [
      ["O presente aditivo vigora a partir de 1º de julho de 2026, mantidas as demais cláusulas da Convenção Coletiva de Trabalho em vigor até o término de sua vigência."] ] },
    { kind: "clause", num: "Cláusula 4ª", title: "Ratificação", changes: [], body: [
      ["Ficam ratificadas todas as demais cláusulas e condições da Convenção Coletiva de Trabalho vigente, naquilo que não conflitarem com o presente aditivo."] ] },
    { kind: "para", body: ["E, por estarem assim ajustadas, firmam as partes o presente termo aditivo para que produza seus efeitos legais."] },
  ]],
  changes: [
    { id: "a1", type: "config", clause: "Cláusula 1ª", title: "New salary floor R$ 1,820.00",
      change: "Category salary floor raised, changing the hourly base used across premiums.",
      current: "Floor R$ 1,640.00", required: "Floor R$ 1,820.00",
      mapping: "Base wage → hourly base", confidence: 96,
      action: "Update the salary floor. All rate-derived premiums recompute from the new hourly base." },
    { id: "a2", type: "config", clause: "Cláusula 2ª", title: "OT base now includes assiduity premium",
      change: "Habitual assiduity premium must fold into the overtime calculation base.",
      current: "OT base = base wage only", required: "OT base = base wage + assiduity premium",
      mapping: "Overtime → base composition (fold-into-base)", confidence: 88,
      action: "Add the habitual assiduity premium to the OT base before applying the band multipliers." },
  ],
};

/* radar order */
const RADAR_ORDER = [
  "br-cct-sp-2026", "br-cct-sp-adit", "br-botic-2026", "br-log-2026",
  "br-pec-6x1", "fr-syntec-2026", "mx-40h", "de-eh-2026",
];
/* radar-only fallback entries (none needed — all live in DOCS) */
const RADAR_EXTRA = {};
const docMeta = (id) => DOCS[id] || RADAR_EXTRA[id];

const KIND_ICON = { CCT: FileText, Law: Gavel, Amendment: FilePlus };

/* count changes by type */
function counts(id) {
  const d = DOCS[id]; if (!d) return null;
  const c = { total: d.changes.length, conflict: 0, gap: 0, config: 0, supported: 0 };
  d.changes.forEach((x) => (c[x.type] += 1));
  c.action = c.conflict + c.gap + c.config;
  return c;
}

/* ================================================================== *
 * App
 * ================================================================== */
export default function App() {
  const [screen, setScreen] = useState("radar"); // 'radar' | 'review'
  const [docId, setDocId] = useState(null);
  const [groupBy, setGroupBy] = useState("country"); // 'country' | 'cba'
  const [statuses, setStatuses] = useState(() => {
    const s = {};
    RADAR_ORDER.forEach((id) => {
      s[id] = { "br-cct-sp-2026": "ready", "br-cct-sp-adit": "new", "br-botic-2026": "analyzing",
        "br-log-2026": "ready", "br-pec-6x1": "new", "fr-syntec-2026": "ready",
        "mx-40h": "new", "de-eh-2026": "reviewed" }[id];
    });
    return s;
  });
  const [manual, setManual] = useState([]); // manually uploaded doc ids
  const [reviews, setReviews] = useState({}); // { docId: { changeId: 'accepted'|'flagged' } }
  const [toast, setToast] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  // ambient agent: Boticário finishes analyzing shortly after load
  useEffect(() => {
    const t = setTimeout(() => {
      setStatuses((s) => (s["br-botic-2026"] === "analyzing" ? { ...s, "br-botic-2026": "ready" } : s));
      fireToast("Analysis ready — CCT Boticário", "ready");
    }, 3600);
    return () => clearTimeout(t);
  }, []);

  function fireToast(msg, tone = "neutral") {
    setToast({ msg, tone, id: Date.now() });
    setTimeout(() => setToast((cur) => (cur && cur.msg === msg ? null : cur)), 2600);
  }
  function openReview(id) {
    if (!DOCS[id]) return;
    setDocId(id); setScreen("review");
  }
  function analyzeDoc(id) {
    setStatuses((s) => ({ ...s, [id]: "analyzing" }));
    fireToast(`Analyzing ${docMeta(id).title}…`, "neutral");
    setTimeout(() => {
      setStatuses((s) => ({ ...s, [id]: "ready" }));
      fireToast("Analysis ready", "ready");
      if (DOCS[id]) openReview(id);
    }, 1900);
  }
  function setReview(dId, cId, val) {
    setReviews((r) => {
      const cur = { ...(r[dId] || {}) };
      cur[cId] = cur[cId] === val ? undefined : val;
      return { ...r, [dId]: cur };
    });
  }
  function doUpload(policyId) {
    setUploadOpen(false);
    const id = "manual-1";
    // clone flagship content under a manual identity; compare against the
    // pay-policy template the user picked in the upload modal (required)
    DOCS[id] = { ...DOCS["br-cct-sp-2026"], title: "Contrato Coletivo (upload manual)",
      subtitle: "Documento enviado manualmente", family: "Uploads manuais",
      source: "Upload manual", detected: "agora",
      why: `Uploaded by user · compared to ${policyName(policyId)}.`, policyId };
    if (!manual.includes(id)) setManual((mn) => [id, ...mn]);
    setStatuses((s) => ({ ...s, [id]: "analyzing" }));
    fireToast("Analyzing uploaded document…", "neutral");
    setTimeout(() => {
      setStatuses((s) => ({ ...s, [id]: "ready" }));
      fireToast("Analysis ready", "ready");
      openReview(id);
    }, 2100);
  }

  return (
    <div className="min-h-screen w-full" style={{ background: T.paper, color: T.ink,
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {screen === "radar" ? (
        <RadarScreen
          groupBy={groupBy} setGroupBy={setGroupBy} statuses={statuses}
          manual={manual} onOpen={openReview} onAnalyze={analyzeDoc}
          onUpload={() => setUploadOpen(true)}
        />
      ) : (
        <ReviewScreen
          docId={docId} statuses={statuses} reviews={reviews[docId] || {}}
          onBack={() => setScreen("radar")} onReview={setReview} fireToast={fireToast}
        />
      )}

      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)} onConfirm={doUpload} />}
      {toast && <Toast toast={toast} />}
    </div>
  );
}

/* ================================================================== *
 * Radar screen — the agent dashboard
 * ================================================================== */
function RadarScreen({ groupBy, setGroupBy, statuses, manual, onOpen, onAnalyze, onUpload }) {
  const allIds = [...manual, ...RADAR_ORDER];
  const newCount = allIds.filter((id) => statuses[id] === "new").length;
  const readyCount = allIds.filter((id) => statuses[id] === "ready").length;

  // grouping
  const groups = useMemo(() => {
    const g = {};
    allIds.forEach((id) => {
      const meta = docMeta(id);
      const key = groupBy === "country" ? `${meta.flag}  ${meta.country}` : meta.family;
      (g[key] = g[key] || []).push(id);
    });
    // order groups: those with 'new' first, then ready, keep insertion-ish
    return Object.entries(g);
  }, [groupBy, manual.join(",")]);

  return (
    <div className="mx-auto" style={{ maxWidth: 1180 }}>
      {/* top bar */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: T.ink }}>
            <Radar size={22} color="#fff" strokeWidth={2} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight" style={{ color: T.ink }}>LawTrack AI</div>
            <div className="text-xs" style={{ color: T.muted }}>day.io · Roseman calculation engine</div>
          </div>
        </div>
        <LiveStatus newCount={newCount} />
      </div>

      {/* controls */}
      <div className="px-6 pb-2 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <SegToggle value={groupBy} onChange={setGroupBy}
            options={[{ v: "country", label: "By country", Icon: Building2 }, { v: "cba", label: "By CBA", Icon: Layers }]} />
          <div className="text-xs" style={{ color: T.muted }}>
            <span className="font-semibold" style={{ color: T.ink }}>{allIds.length}</span> documents ·{" "}
            <span className="font-semibold" style={{ color: T.ink }}>{readyCount}</span> ready ·{" "}
            <span className="font-semibold" style={{ color: T.ink }}>{newCount}</span> new
          </div>
        </div>
        <button onClick={onUpload}
          className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-white transition-transform active:scale-95"
          style={{ background: T.ink }}>
          <Upload size={16} /> Upload PDF
        </button>
      </div>

      {/* legend */}
      <div className="px-6 pb-3 flex items-center gap-4 flex-wrap">
        {TYPE_ORDER.map((k) => (
          <div key={k} className="flex items-center gap-1.5 text-xs" style={{ color: T.muted }}>
            <span className="inline-block rounded-full" style={{ width: 9, height: 9, background: TYPE[k].dot }} />
            {TYPE[k].label}
          </div>
        ))}
      </div>

      {/* grouped list */}
      <div className="px-6 pb-16">
        {groups.map(([label, ids]) => (
          <div key={label} className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-sm font-semibold tracking-tight" style={{ color: T.ink2 }}>{label}</div>
              <div className="h-px flex-1" style={{ background: T.line }} />
              <div className="text-xs" style={{ color: T.faint }}>{ids.length}</div>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
              {ids.map((id) => (
                <RadarCard key={id} id={id} status={statuses[id]} onOpen={onOpen} onAnalyze={onAnalyze} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SegToggle({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-lg p-0.5" style={{ background: "#eceae5", border: `1px solid ${T.line}` }}>
      {options.map((o) => {
        const on = value === o.v; const Icon = o.Icon;
        return (
          <button key={o.v} onClick={() => onChange(o.v)}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            style={{ background: on ? "#fff" : "transparent", color: on ? T.ink : T.muted,
              boxShadow: on ? "0 1px 2px rgba(0,0,0,0.08)" : "none" }}>
            <Icon size={14} /> {o.label}
          </button>
        );
      })}
    </div>
  );
}

function LiveStatus({ newCount }) {
  return (
    <div className="flex items-center gap-3 rounded-full pl-3 pr-4 py-1.5"
      style={{ background: T.signalSoft, border: `1px solid #a5f3fc` }}>
      <span className="relative flex" style={{ width: 10, height: 10 }}>
        <span className="absolute inline-flex rounded-full opacity-60 animate-ping" style={{ width: 10, height: 10, background: T.signal }} />
        <span className="relative inline-flex rounded-full" style={{ width: 10, height: 10, background: T.signal }} />
      </span>
      <div className="text-xs leading-tight">
        <div className="font-semibold" style={{ color: "#155e75" }}>Agent active · monitoring 34 sources</div>
        <div style={{ color: "#0e7490" }}>Last scan 4 min ago · {newCount} new to review</div>
      </div>
    </div>
  );
}

function RadarCard({ id, status, onOpen, onAnalyze }) {
  const meta = docMeta(id);
  const c = counts(id);
  const KindIcon = KIND_ICON[meta.kind] || FileText;
  const clickable = status === "ready" || status === "reviewed";

  return (
    <div
      className="rounded-xl overflow-hidden transition-shadow"
      style={{ background: T.panel, border: `1px solid ${T.line}`,
        boxShadow: status === "new" ? "0 1px 2px rgba(0,0,0,0.04)" : "0 1px 3px rgba(0,0,0,0.05)",
        opacity: status === "reviewed" ? 0.82 : 1 }}
    >
      {/* header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 32, height: 32, background: "#f3f2ef", border: `1px solid ${T.line}` }}>
              <KindIcon size={16} color={T.ink2} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-snug truncate" style={{ color: T.ink }}>{meta.title}</div>
              <div className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: T.muted }}>
                <span className="uppercase tracking-wide" style={{ fontSize: 10 }}>{meta.kind}</span>
                <span style={{ color: T.line2 }}>·</span>
                <span className="truncate">{meta.jurisdiction}</span>
              </div>
            </div>
          </div>
          <StatusPill status={status} />
        </div>

        {/* agent reasoning */}
        <div className="mt-3 text-xs leading-relaxed" style={{ color: T.ink2 }}>{meta.why}</div>

        {/* source line */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs" style={{ color: T.faint }}>
          <Search size={12} /> <span className="truncate">{meta.source}</span>
          <span style={{ color: T.line2 }}>·</span>
          <Clock size={12} /> <span>{meta.detected}</span>
        </div>
      </div>

      {/* footer: target policy + summary + action */}
      <div className="px-4 py-3 flex items-center justify-between gap-2" style={{ borderTop: `1px solid ${T.line}`, background: "#faf9f7" }}>
        <div className="min-w-0">
          <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint }}>
            {meta.scope ? "Scope" : "Target policy"}
          </div>
          <div className="text-xs font-medium truncate" style={{ color: T.ink2 }}>
            {meta.scope || policyName(meta.policyId)}
          </div>
        </div>

        {status === "ready" && c && (
          <div className="flex items-center gap-2 shrink-0">
            <MiniCounts c={c} />
            <button onClick={() => onOpen(id)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white active:scale-95 transition-transform"
              style={{ background: T.ink }}>Review</button>
          </div>
        )}
        {status === "reviewed" && (
          <button onClick={() => onOpen(id)}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform shrink-0"
            style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>View</button>
        )}
        {status === "analyzing" && (
          <div className="flex items-center gap-1.5 text-xs shrink-0" style={{ color: T.muted }}>
            <Loader2 size={14} className="animate-spin" /> Extracting clauses…
          </div>
        )}
        {status === "new" && (
          <button onClick={() => onAnalyze(id)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform shrink-0"
            style={{ background: "#fff", border: `1px solid ${T.ink}`, color: T.ink }}>
            <RefreshCw size={13} /> Analyze
          </button>
        )}
      </div>

      {status === "reviewed" && meta.reviewedWhen && (
        <div className="px-4 py-1.5 text-xs flex items-center gap-1.5" style={{ color: T.faint, background: "#faf9f7", borderTop: `1px solid ${T.line}` }}>
          <Check size={12} /> {meta.reviewedWhen}
        </div>
      )}
    </div>
  );
}

function MiniCounts({ c }) {
  const parts = [];
  if (c.conflict) parts.push(["conflict", c.conflict]);
  if (c.gap) parts.push(["gap", c.gap]);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold" style={{ color: T.ink2 }}>{c.total}</span>
      {parts.map(([k, n]) => (
        <span key={k} className="inline-flex items-center gap-1 text-xs" style={{ color: TYPE[k].dot }}>
          <span className="inline-block rounded-full" style={{ width: 7, height: 7, background: TYPE[k].dot }} />{n}
        </span>
      ))}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    new: { label: "New", bg: T.ink, color: "#fff", pulse: true },
    analyzing: { label: "Analyzing", bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
    ready: { label: "Ready", bg: "#ecfdf5", color: "#047857", border: "#a7f3d0" },
    reviewed: { label: "Reviewed", bg: "#f3f2ef", color: T.muted, border: T.line2 },
  };
  const s = map[status] || map.new;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shrink-0"
      style={{ background: s.bg, color: s.color, border: s.border ? `1px solid ${s.border}` : "none" }}>
      {s.pulse && <span className="inline-block rounded-full animate-pulse" style={{ width: 6, height: 6, background: "#fff" }} />}
      {status === "analyzing" && <Loader2 size={11} className="animate-spin" />}
      {s.label}
    </span>
  );
}

/* ================================================================== *
 * Review screen — split source (marked PDF) + gap map
 * ================================================================== */
function ReviewScreen({ docId, statuses, reviews, onBack, onReview, fireToast }) {
  const doc = DOCS[docId];
  const [active, setActive] = useState(null);
  const [filters, setFilters] = useState({ conflict: true, gap: true, config: true, supported: true });
  const [policyId, setPolicyId] = useState(doc.policyId);
  const [reanalyzing, setReanalyzing] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const spanRefs = useRef({}); // changeId -> element in the source
  const cardRefs = useRef({}); // changeId -> element in the panel
  const leftPane = useRef(null);
  const rightPane = useRef(null);

  const c = counts(docId);

  function selectFromSource(cId) {
    setActive(cId);
    const el = cardRefs.current[cId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function selectFromCard(cId) {
    setActive(cId);
    const el = spanRefs.current[cId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function toggleFilter(k) { setFilters((f) => ({ ...f, [k]: !f[k] })); }
  function changePolicy(id) {
    setPolicyId(id); setPolicyOpen(false); setReanalyzing(true);
    fireToast(`Re-analyzing against ${policyName(id)}… (demo)`, "neutral");
    setTimeout(() => setReanalyzing(false), 900);
  }
  function approveAligned() {
    doc.changes.filter((x) => x.type === "supported").forEach((x) => {
      if (reviews[x.id] !== "accepted") onReview(docId, x.id, "accepted");
    });
    fireToast("Aligned clauses accepted", "ready");
  }

  const visible = doc.changes.filter((x) => filters[x.type]);

  return (
    <div className="h-screen flex flex-col" style={{ background: T.paper }}>
      {/* header */}
      <div className="px-5 py-3 flex items-center justify-between gap-4 shrink-0" style={{ background: T.panel, borderBottom: `1px solid ${T.line}` }}>
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onBack} className="flex items-center justify-center rounded-lg shrink-0 active:scale-95 transition-transform"
            style={{ width: 34, height: 34, border: `1px solid ${T.line2}`, background: "#fff" }}>
            <ArrowLeft size={17} color={T.ink2} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold truncate" style={{ color: T.ink }}>{doc.flag} {doc.title}</span>
              <span className="uppercase tracking-wide rounded px-1.5 py-0.5 shrink-0" style={{ fontSize: 9, background: "#f3f2ef", color: T.muted, border: `1px solid ${T.line}` }}>{doc.kind}</span>
            </div>
            <div className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: T.muted }}>
              <Search size={11} /> {doc.source}<span style={{ color: T.line2 }}>·</span><Clock size={11} /> {doc.detected}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* policy selector — the comparison input */}
          <div className="relative">
            <div className="uppercase tracking-wider text-right mb-0.5" style={{ fontSize: 9, color: T.faint }}>Compared to policy</div>
            <button onClick={() => setPolicyOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium"
              style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink }}>
              {policyName(policyId)} <ChevronDown size={15} color={T.muted} />
            </button>
            {policyOpen && (
              <div className="absolute right-0 mt-1 rounded-xl overflow-hidden z-20" style={{ background: "#fff", border: `1px solid ${T.line2}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", width: 280 }}>
                {POLICIES.map((p) => (
                  <button key={p.id} onClick={() => changePolicy(p.id)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-gray-50"
                    style={{ borderBottom: `1px solid ${T.line}` }}>
                    <span>{p.flag}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium truncate" style={{ color: T.ink }}>{p.name}</span>
                      <span className="block text-xs" style={{ color: T.faint }}>{p.sub}</span>
                    </span>
                    {p.id === policyId && <Check size={15} color={T.ink} className="ml-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => fireToast("Gap report exported (demo)", "ready")}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium mt-4"
            style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
            <Download size={15} /> Export gap report
          </button>
        </div>
      </div>

      {doc.reviewedWhen && (
        <div className="px-5 py-2 text-xs flex items-center gap-2 shrink-0" style={{ background: "#f3f2ef", color: T.muted, borderBottom: `1px solid ${T.line}` }}>
          <ShieldCheck size={14} /> This document was already reconciled — {doc.reviewedWhen}
        </div>
      )}

      {/* summary / filter strip */}
      <div className="px-5 py-2.5 flex items-center gap-2 flex-wrap shrink-0" style={{ background: T.panel, borderBottom: `1px solid ${T.line}` }}>
        <span className="text-xs font-semibold mr-1" style={{ color: T.ink2 }}>
          {c.total} changes · {c.action} need action
        </span>
        {TYPE_ORDER.map((k) => {
          const n = c[k]; if (!n) return null;
          const on = filters[k]; const tt = TYPE[k];
          return (
            <button key={k} onClick={() => toggleFilter(k)}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-opacity"
              style={{ background: on ? tt.markBg : "#f6f5f3", color: on ? tt.dot : T.faint,
                border: `1px solid ${on ? tt.markLine : T.line}`, opacity: on ? 1 : 0.6 }}>
              <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: tt.dot }} />
              {tt.label} · {n}
            </button>
          );
        })}
        <div className="flex-1" />
        {c.supported > 0 && (
          <button onClick={approveAligned}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium"
            style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" }}>
            <CheckCircle2 size={14} /> Accept aligned ({c.supported})
          </button>
        )}
      </div>

      {/* split */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT — source viewer */}
        <div ref={leftPane} className="flex-1 min-w-0 overflow-y-auto" style={{ background: "#eeede9" }}>
          <div className="mx-auto py-6 px-6" style={{ maxWidth: 720 }}>
            <div className="mb-3 flex items-center gap-2 text-xs" style={{ color: T.muted }}>
              <FileText size={13} /> Source document — marked in place, never rewritten
            </div>
            <SourceViewer doc={doc} active={active} onSelect={selectFromSource} spanRefs={spanRefs} filters={filters} />
          </div>
        </div>

        {/* divider */}
        <div style={{ width: 1, background: T.line2 }} />

        {/* RIGHT — gap map */}
        <div ref={rightPane} className="overflow-y-auto shrink-0 relative" style={{ width: 440, background: T.panel }}>
          {reanalyzing && (
            <div className="absolute inset-x-0 top-0 z-10">
              <div className="h-0.5 animate-pulse" style={{ background: T.signal }} />
              <div className="px-5 py-2 text-xs flex items-center gap-2" style={{ color: T.signal, background: T.signalSoft }}>
                <Loader2 size={13} className="animate-spin" /> Re-analyzing against {policyName(policyId)}…
              </div>
            </div>
          )}
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2 text-xs" style={{ color: T.muted }}>
              <Layers size={13} /> Required changes vs {policyName(policyId)}
            </div>

            {visible.length === 0 ? (
              <div className="rounded-xl p-8 text-center text-sm" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
                No changes match this filter. Turn a category back on above.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {visible.map((ch) => (
                  <ChangeCard key={ch.id} ch={ch} num={doc.changes.findIndex((x) => x.id === ch.id) + 1}
                    active={active === ch.id} review={reviews[ch.id]}
                    onSelect={() => selectFromCard(ch.id)}
                    onReview={(val) => onReview(docId, ch.id, val)}
                    cardRefs={cardRefs} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- source viewer (renders the "PDF" pages with in-place marks) --- */
function SourceViewer({ doc, active, onSelect, spanRefs, filters }) {
  const changeType = (cId) => doc.changes.find((x) => x.id === cId)?.type;
  const numOf = (cId) => doc.changes.findIndex((x) => x.id === cId) + 1;

  const renderSegs = (segs) =>
    (Array.isArray(segs) ? segs : [segs]).map((s, i) => {
      if (typeof s === "string") return <span key={i}>{s}</span>;
      const type = changeType(s.c);
      const tt = TYPE[type];
      const dimmed = !filters[type];
      const isActive = active === s.c;
      return (
        <span
          key={i}
          ref={(el) => (spanRefs.current[s.c] = el)}
          onClick={() => onSelect(s.c)}
          className="cursor-pointer rounded-sm transition-all"
          style={{
            background: dimmed ? "transparent" : tt.markBg,
            boxShadow: dimmed ? "none" : `inset 0 -2px 0 0 ${tt.markLine}`,
            padding: "1px 2px",
            outline: isActive ? `2px solid ${tt.ring}` : "none",
            outlineOffset: isActive ? "1px" : 0,
            opacity: dimmed ? 0.55 : 1,
          }}
        >
          {s.t}
        </span>
      );
    });

  return (
    <div className="flex flex-col gap-4">
      {doc.pages.map((page, pi) => (
        <div key={pi} className="rounded-sm" style={{ background: "#fffdf9", border: `1px solid ${T.line2}`, boxShadow: "0 6px 20px rgba(0,0,0,0.10)" }}>
          {/* page body */}
          <div className="px-10 py-9" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "#26241f" }}>
            {pi === 0 && (
              <div className="text-center mb-7 pb-5" style={{ borderBottom: `2px solid #26241f` }}>
                <div className="uppercase" style={{ fontSize: 11, letterSpacing: 1.5, color: "#4a4740" }}>{doc.header.parties}</div>
                <div className="mt-3 font-bold" style={{ fontSize: 19 }}>{doc.subtitle}</div>
                <div className="mt-2 text-xs" style={{ color: "#6b675e" }}>{doc.header.reg} · {doc.header.term}</div>
              </div>
            )}
            {page.map((b, bi) => {
              if (b.kind === "para")
                return <p key={bi} className="mb-4 leading-7" style={{ fontSize: 14.5, textAlign: "justify" }}>{renderSegs(b.body[0])}</p>;
              // clause block: margin gutter (pins) + content
              return (
                <div key={bi} className="mb-5 grid" style={{ gridTemplateColumns: "34px 1fr", gap: 8 }}>
                  <div className="flex flex-col items-center gap-1.5 pt-0.5">
                    {b.changes.map((cId) => {
                      const type = changeType(cId); const tt = TYPE[type];
                      const isActive = active === cId; const dimmed = !filters[type];
                      return (
                        <button key={cId} onClick={() => onSelect(cId)}
                          title={tt.cardLabel}
                          className="flex items-center justify-center rounded-full font-semibold transition-transform active:scale-90"
                          style={{ width: 22, height: 22, fontSize: 11, color: "#fff",
                            background: tt.pinBg, opacity: dimmed ? 0.4 : 1,
                            boxShadow: isActive ? `0 0 0 3px ${tt.markBg}` : "none",
                            fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                          {numOf(cId)}
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ fontSize: 13.5, letterSpacing: 0.3 }}>
                      {b.num} — {b.title}
                    </div>
                    {b.body.map((para, pj) => (
                      <p key={pj} className="mb-2 leading-7" style={{ fontSize: 14.5, textAlign: "justify" }}>{renderSegs(para)}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {/* page footer */}
          <div className="px-10 py-2 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${T.line}`, color: "#9a968c", fontFamily: 'Georgia, serif' }}>
            <span>{doc.header.reg}</span>
            <span>Página {pi + 1} de {doc.pages.length}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- change card (right panel) ---- */
function ChangeCard({ ch, num, active, review, onSelect, onReview, cardRefs }) {
  const tt = TYPE[ch.type];
  const Icon = tt.Icon;
  return (
    <div
      ref={(el) => (cardRefs.current[ch.id] = el)}
      onClick={onSelect}
      className="rounded-xl cursor-pointer transition-all"
      style={{
        background: active ? tt.markBg : "#fff",
        border: `1px solid ${active ? tt.markLine : T.line}`,
        outline: active ? `2px solid ${tt.ring}` : "none", outlineOffset: active ? "-1px" : 0,
        boxShadow: active ? `0 4px 16px ${tt.markBg}` : "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* header */}
      <div className="p-3.5 pb-2.5 flex items-start gap-2.5">
        <div className="flex items-center justify-center rounded-full font-semibold shrink-0"
          style={{ width: 22, height: 22, fontSize: 11, background: tt.pinBg, color: "#fff" }}>{num}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Icon size={13} color={tt.dot} />
            <span className="uppercase tracking-wider font-semibold" style={{ fontSize: 9.5, color: tt.dot }}>{tt.cardLabel}</span>
          </div>
          <div className="text-sm font-semibold mt-1 leading-snug" style={{ color: T.ink }}>{ch.title}</div>
        </div>
        <span className="shrink-0 rounded px-1.5 py-0.5 text-xs" style={{ background: "#f6f5f3", color: T.muted, border: `1px solid ${T.line}` }}>{ch.clause}</span>
      </div>

      {/* change description */}
      <div className="px-3.5 pb-3 text-xs leading-relaxed" style={{ color: T.ink2 }}>{ch.change}</div>

      {/* before / after */}
      <div className="mx-3.5 mb-3 rounded-lg overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
        <div className="flex items-stretch">
          <div className="flex-1 p-2.5" style={{ background: "#faf9f7" }}>
            <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: T.faint }}>Current policy</div>
            <div className="text-xs font-medium" style={{ color: T.muted }}>{ch.current}</div>
          </div>
          <div className="flex items-center px-1.5" style={{ background: "#faf9f7", color: T.faint }}>→</div>
          <div className="flex-1 p-2.5" style={{ background: tt.markBg }}>
            <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: tt.dot }}>Required</div>
            <div className="text-xs font-semibold" style={{ color: tt.dot }}>{ch.required}</div>
          </div>
        </div>
      </div>

      {/* mapping + confidence */}
      <div className="px-3.5 pb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Layers size={12} color={T.faint} />
          <span className="text-xs truncate" style={{ color: T.muted }}>{ch.mapping}</span>
        </div>
        <Confidence value={ch.confidence} />
      </div>

      {/* action */}
      <div className="px-3.5 py-2.5 text-xs leading-relaxed" style={{ borderTop: `1px solid ${T.line}`, color: T.ink2, background: active ? "transparent" : "#faf9f7" }}>
        <span className="font-semibold" style={{ color: T.ink }}>Recommended · </span>{ch.action}
      </div>

      {/* review controls */}
      <div className="px-3.5 py-2.5 flex items-center gap-2" style={{ borderTop: `1px solid ${T.line}` }}>
        <button onClick={(e) => { e.stopPropagation(); onReview("accepted"); }}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
          style={{ background: review === "accepted" ? "#ecfdf5" : "#fff", color: review === "accepted" ? "#047857" : T.muted,
            border: `1px solid ${review === "accepted" ? "#a7f3d0" : T.line2}` }}>
          <Check size={13} /> {review === "accepted" ? "Accepted" : "Accept"}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onReview("flagged"); }}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
          style={{ background: review === "flagged" ? "#fef2f2" : "#fff", color: review === "flagged" ? "#b91c1c" : T.muted,
            border: `1px solid ${review === "flagged" ? "#fecaca" : T.line2}` }}>
          <Flag size={13} /> {review === "flagged" ? "Flagged" : "Flag for review"}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className="ml-auto flex items-center gap-1 text-xs font-medium" style={{ color: T.signal }}>
          Show in document <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}

function Confidence({ value }) {
  const color = value >= 95 ? "#059669" : value >= 90 ? "#d97706" : "#dc2626";
  return (
    <div className="flex items-center gap-1.5 shrink-0" title="Extraction confidence — verify against the source">
      <div className="rounded-full overflow-hidden" style={{ width: 34, height: 5, background: "#eceae5" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color }} />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{value}%</span>
    </div>
  );
}

/* ---- upload modal (manual trigger) ----
 * Manual upload has no monitored context, so the user MUST pick which
 * pay-policy template the document is compared against — the selection
 * gates the Analyze action. (Auto-detected renewals skip this: the agent
 * already knows the affected policy.) */
function UploadModal({ onClose, onConfirm }) {
  const [policyId, setPolicyId] = useState(null);
  const [policyOpen, setPolicyOpen] = useState(false);
  const selected = POLICIES.find((p) => p.id === policyId);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(25,25,23,0.45)" }} onClick={onClose}>
      <div className="rounded-2xl" style={{ background: "#fff", width: 460, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }} onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.line}` }}>
          <div className="text-base font-semibold" style={{ color: T.ink }}>Upload a document</div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100"><X size={18} color={T.muted} /></button>
        </div>
        <div className="p-5">
          <div className="rounded-xl flex flex-col items-center justify-center text-center py-9 px-4"
            style={{ border: `2px dashed ${T.line2}`, background: "#faf9f7" }}>
            <div className="flex items-center justify-center rounded-full mb-3" style={{ width: 44, height: 44, background: T.ink }}>
              <Upload size={20} color="#fff" />
            </div>
            <div className="text-sm font-medium" style={{ color: T.ink }}>Drop a CBA or law PDF here</div>
            <div className="text-xs mt-1" style={{ color: T.faint }}>PDF · up to 40 MB · Portuguese, French, Spanish, German</div>
          </div>

          {/* required — choose the pay-policy template to compare against */}
          <div className="mt-4">
            <div className="uppercase tracking-wider mb-1 flex items-center gap-1" style={{ fontSize: 9, color: T.faint }}>
              Compare to pay policy <span style={{ color: "#dc2626" }}>*</span>
            </div>
            <div className="relative">
              <button onClick={() => setPolicyOpen((o) => !o)}
                className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-left"
                style={{ background: "#fff", border: `1px solid ${selected ? T.line2 : "#e6b8b8"}`, color: selected ? T.ink : T.faint }}>
                {selected
                  ? (<><span>{selected.flag}</span><span className="font-medium">{selected.name}</span></>)
                  : <span>Choose a pay-policy template…</span>}
                <ChevronDown size={15} color={T.muted} className="ml-auto" />
              </button>
              {policyOpen && (
                <div className="absolute left-0 right-0 mt-1 rounded-xl overflow-y-auto z-20" style={{ background: "#fff", border: `1px solid ${T.line2}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", maxHeight: 232 }}>
                  {POLICIES.map((p) => (
                    <button key={p.id} onClick={() => { setPolicyId(p.id); setPolicyOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-gray-50"
                      style={{ borderBottom: `1px solid ${T.line}` }}>
                      <span>{p.flag}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium truncate" style={{ color: T.ink }}>{p.name}</span>
                        <span className="block text-xs" style={{ color: T.faint }}>{p.sub}</span>
                      </span>
                      {p.id === policyId && <Check size={15} color={T.ink} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {!selected && <div className="text-xs mt-1.5" style={{ color: T.faint }}>Required — pick which policy this document is compared against.</div>}
          </div>

          <div className="mt-4 flex items-center justify-end">
            <button onClick={() => selected && onConfirm(policyId)} disabled={!selected}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform"
              style={{ background: selected ? T.ink : T.line2, cursor: selected ? "pointer" : "not-allowed", opacity: selected ? 1 : 0.7 }}>
              Analyze document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- toast ---- */
function Toast({ toast }) {
  const tone = toast.tone === "ready" ? { bg: "#059669", Icon: CheckCircle2 } : { bg: T.ink, Icon: Activity };
  const Icon = tone.Icon;
  return (
    <div className="fixed z-50 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white"
      style={{ bottom: 20, left: "50%", transform: "translateX(-50%)", background: tone.bg, boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}>
      <Icon size={16} /> {toast.msg}
    </div>
  );
}
