# Project Structure - Modular Architecture

## Backend (Python/FastAPI)

```
backend/
├── main.py              ← Entry point, app initialization
├── models.py            ← Pydantic models for validation
├── utils.py             ← Lazy-loading utilities
├── routes.py            ← API routes/endpoints
├── metrics/
│   ├── __init__.py      ← Package exports
│   ├── rouge.py         ← ROUGE metric
│   ├── bertscore.py     ← BERTScore metric
│   ├── comet.py         ← COMET metric
│   ├── chrf.py          ← CHRF metric
│   └── bleu.py          ← BLEU metric
├── requirements.txt     ← Dependencies
└── README.md            ← Documentation
```

### Backend Module Responsibilities

| Module | Purpose |
|--------|---------|
| **main.py** | FastAPI app setup, middleware config, router inclusion |
| **models.py** | `EvalRequest`, `MetricResult`, `EvalResponse` Pydantic models |
| **utils.py** | Lazy-load models (`get_rouge()`, `get_comet()`) |
| **routes.py** | API endpoints: `/health`, `/evaluate`, `/metrics` |
| **metrics/** | Individual metric computation functions |

---

## Frontend (React + Vite)

```
frontend/
├── src/
│   ├── main.jsx              ← React entry point
│   ├── App.jsx               ← Main app wrapper
│   ├── constants.js          ← Languages & metrics data
│   ├── components/
│   │   ├── Topbar.jsx        ← Header with status
│   │   ├── ServerConfig.jsx  ← Backend URL input
│   │   ├── InputPanel.jsx    ← Left: text inputs
│   │   └── ResultsPanel.jsx  ← Right: metric results
│   ├── hooks/
│   │   ├── useServer.js      ← Server connection state
│   │   └── useEvaluation.js  ← Evaluation logic
│   ├── utils/
│   │   ├── colors.js         ← Score color utility
│   │   └── interpret.js      ← Result interpretation
│   └── styles/
│       └── GlobalStyles.jsx  ← CSS variables & styles
├── index.html               ← HTML template
├── package.json             ← Dependencies
├── vite.config.js           ← Vite configuration
└── README.md                ← Documentation
```

### Frontend Module Responsibilities

| Module | Purpose |
|--------|---------|
| **components/** | Reusable UI components |
| **hooks/** | Custom React hooks for state management |
| **utils/** | Pure utility functions (colors, interpretation) |
| **styles/** | Global CSS and theme |
| **constants.js** | Static data (languages, metrics) |

### Component Hierarchy

```
App
├── Topbar (server status)
├── ServerConfig (URL input)
└── Main Grid
    ├── InputPanel
    │   ├── Text inputs
    │   ├── Language selector
    │   └── Metric toggles
    └── ResultsPanel
        ├── Progress indicators
        ├── Result cards
        └── Interpretation box
```

---

## How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Key Design Patterns

### Backend
- **Lazy Loading**: Models loaded only when first requested
- **Modular Metrics**: Each metric isolated in own module
- **Router Pattern**: FastAPI router for endpoint organization

### Frontend
- **Custom Hooks**: `useServer()` and `useEvaluation()` separate concerns
- **Component Composition**: Small, focused components
- **Pure Utils**: Interpretation and color logic decoupled from UI

---

## Adding New Features

### Add New Metric (Backend)
1. Create `backend/metrics/new_metric.py`
2. Implement `compute_new_metric()` function
3. Add import in `backend/metrics/__init__.py`
4. Add route in `backend/routes.py`

### Add New Component (Frontend)
1. Create `frontend/src/components/NewComponent.jsx`
2. Import in `App.jsx`
3. Pass props from parent state
4. Use existing hooks if needed

---

## Benefits of This Structure

✅ **Maintainability**: Easy to find and modify specific functions  
✅ **Scalability**: Add features without touching existing code  
✅ **Testability**: Each module can be tested independently  
✅ **Readability**: Clear separation of concerns  
✅ **Reusability**: Components and hooks can be used elsewhere
