# Real-Time Multilingual Metric Evaluator
### Based on "Beyond N-Grams" — ACL 2025

A full-stack app that computes ROUGE, BERTScore, COMET, CHRF and BLEU
scores in real time for multilingual summarization evaluation.

---

## Project Structure

```
project/
├── backend/
│   ├── main.py            ← FastAPI server (runs the actual metrics)
│   └── requirements.txt   ← Python dependencies
└── frontend/
    └── App.jsx            ← React UI
```

---

## Step 1 — Set up the Backend (Python)

### Requirements
- Python 3.9 or higher
- ~3GB disk space (for COMET model download)

### Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

> ⚠️ COMET will download a ~1.5GB model on first run. This is normal.
> If you don't need COMET, just deselect it in the UI.

### Run the server

```bash
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

Test it works:
```bash
curl http://localhost:8000/health
# → {"status":"healthy"}
```

---

## Step 2 — Set up the Frontend (React)

### Option A: Use with Vite (recommended)

```bash
npm create vite@latest frontend-app -- --template react
cd frontend-app
npm install
```

Replace `src/App.jsx` with the provided `frontend/App.jsx`, then:

```bash
npm run dev
```

Open: http://localhost:5173

### Option B: Paste into Claude.ai

Paste the contents of `frontend/App.jsx` into Claude and ask it to render as an artifact.
Note: The backend calls won't work from claude.ai due to CORS/network restrictions.
Use Option A for full functionality.

---

## Step 3 — Using the App

1. Make sure the backend is running (`uvicorn main:app --reload`)
2. Open the frontend in your browser
3. Click **"Ping Server"** — you should see ● CONNECTED
4. Paste your generated summary in the top box
5. Paste the reference summary in the second box  
6. (Optional) Paste the original article — this improves COMET scoring
7. Select your language
8. Select which metrics to compute
9. Click **▶ Run Evaluation**

---

## How It Works

### Backend (`main.py`)
- Built with **FastAPI** — fast, async Python web framework
- Each metric runs as a separate function:
  - `compute_rouge()` — uses `rouge-score` library
  - `compute_bertscore()` — uses `bert-score`, auto-selects language-specific BERT model
  - `compute_comet()` — uses `unbabel-comet`, downloads wmt22-comet-da model
  - `compute_chrf()` — uses `sacrebleu`
  - `compute_bleu()` — uses `sacrebleu`
- Models are lazy-loaded (only downloaded/loaded when first used)
- Returns timing info (ms) for each metric

### Frontend (`App.jsx`)
- React app with live server ping
- Sends POST request to `/evaluate` with your text + language + selected metrics
- Displays scores with color coding:
  - 🟢 Green = high score (≥ 0.5)
  - 🟡 Amber = moderate (0.1–0.25)
  - 🔴 Red = low/negative score
- **Interpretation panel** explains what the score gap means for your specific language family

---

## Language Support

| Language   | Code | Family        | Notes                          |
|------------|------|---------------|--------------------------------|
| Arabic     | ar   | High Fusional | ROUGE unreliable, use COMET    |
| Hebrew     | he   | High Fusional | ROUGE unreliable, use COMET    |
| Chinese    | zh   | Isolating     | ROUGE works reasonably well    |
| Japanese   | ja   | Agglutinative | BERTScore (mono) recommended   |
| Turkish    | tr   | Agglutinative | BERTScore (mono) recommended   |
| Spanish    | es   | Low Fusional  | COMET best, ROUGE moderate     |
| Ukrainian  | uk   | Low Fusional  | COMET best, ROUGE moderate     |
| Yoruba     | yo   | Isolating     | Low-resource, COMET preferred  |
| English    | en   | Low Fusional  | All metrics work well          |

---

## API Endpoints

| Method | Endpoint    | Description                        |
|--------|-------------|------------------------------------|
| GET    | /           | Health check                       |
| GET    | /health     | Health check (JSON)                |
| GET    | /metrics    | List all available metrics         |
| POST   | /evaluate   | Compute scores (main endpoint)     |

### Example API call

```bash
curl -X POST http://localhost:8000/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "hypothesis": "The child went to school.",
    "reference": "A child attended school today.",
    "language": "en",
    "metrics": ["rouge", "bertscore", "chrf", "bleu"]
  }'
```

### Example response

```json
{
  "results": [
    {
      "name": "ROUGE",
      "score": 0.4444,
      "subscores": { "rouge1": 0.5714, "rouge2": 0.2857, "rougeL": 0.5714 },
      "error": null,
      "duration_ms": 12.3
    },
    {
      "name": "BERTScore",
      "score": 0.9123,
      "subscores": { "precision": 0.9201, "recall": 0.9047, "f1": 0.9123, "model": "bert-base-multilingual-cased" },
      "error": null,
      "duration_ms": 1840.2
    }
  ],
  "language": "en",
  "total_ms": 1852.5
}
```

---

## Troubleshooting

**"Could not reach server"**
→ Make sure `uvicorn main:app --reload` is running in the backend folder.

**COMET fails / takes too long**
→ First run downloads ~1.5GB. Be patient, or deselect COMET in the UI.

**BERTScore uses wrong model**
→ The backend auto-selects a language-specific model when available (e.g. Arabic, Hebrew, Chinese). For unsupported languages it falls back to `bert-base-multilingual-cased`.

**CORS error in browser**
→ The backend already has CORS enabled for all origins. If you see this, restart the backend.
