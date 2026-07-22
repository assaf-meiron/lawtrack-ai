FROM python:3.12-slim

WORKDIR /app

# system deps for pdfplumber (pdfminer) — none strictly required, but keep image lean
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY pipeline ./pipeline

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
