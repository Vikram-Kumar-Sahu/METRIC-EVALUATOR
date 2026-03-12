# Setup Instructions

Follow these steps to get the full-stack application running:

## Step 1: Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Wait for the message:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

## Step 2: Frontend Setup (in a NEW terminal)

```bash
cd frontend
npm install
npm run dev
```

The app will open in your browser at `http://localhost:5173`

## Step 3: Test Connection

In the UI, you should see:
- Backend status: "● CONNECTED" (green)
- Or click "Ping Server" button to test

## Step 4: Try an Evaluation

1. Paste sample texts in the hypothesis and reference boxes
2. Select a language
3. Click "Run Evaluation"
4. See scores appear in real time

## Troubleshooting

### Backend won't start
- Check Python version: `python --version` (need 3.9+)
- Try: `pip install --upgrade pip`
- Then retry: `pip install -r requirements.txt`

### Frontend won't start
- Check Node version: `node --version` (need 16+)
- Delete node_modules: `rm -rf node_modules` 
- Reinstall: `npm install`

### COMET downloads on first run
- First evaluation may take 2-3 minutes (downloading 1.5GB model)
- Deselect COMET in UI if you just want quick tests

### Connection refused
- Ensure backend is running on port 8000
- Check terminal where you ran `uvicorn main:app`

Good luck! 🚀
