FROM python:3.11-slim

WORKDIR /app

# Install runtime dependencies only
COPY requirements-prod.txt .
RUN pip install --no-cache-dir -r requirements-prod.txt

# App source
COPY . .

# The platform provides $PORT (Render/Fly/Railway); default to 8000 locally.
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}"]
