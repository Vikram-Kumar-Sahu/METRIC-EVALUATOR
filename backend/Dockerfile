# Use Python base image
FROM python:3.12-slim

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Prevent Python from buffering stdout/stderr
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies needed by some ML libraries
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (better caching)
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install setuptools==69.5.1
RUN pip install --no-cache-dir -r requirements.txt

RUN python -c "from comet import download_model; download_model('Unbabel/wmt20-comet-da')"
# Copy project files
COPY . .

# Expose API port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]