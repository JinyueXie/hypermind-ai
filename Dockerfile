FROM python:3.12-slim

WORKDIR /app

# Copy backend
COPY backend/agent/ ./backend/agent/
COPY alith-main/ ./alith-main/

# Install dependencies
RUN pip install -r backend/agent/requirements.txt

# Copy frontend
COPY pages/ ./pages/
COPY assets/ ./assets/
COPY components/ ./components/

EXPOSE 8000

CMD ["python", "backend/agent/api_server.py"]
