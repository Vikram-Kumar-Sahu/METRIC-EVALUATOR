/**
 * Constants - Languages and Metrics definitions
 */

export const LANGUAGES = [
  { code: "ar", label: "Arabic",     family: "High Fusional" },
  { code: "he", label: "Hebrew",     family: "High Fusional" },
  { code: "zh", label: "Chinese",    family: "Isolating"     },
  { code: "ja", label: "Japanese",   family: "Agglutinative" },
  { code: "tr", label: "Turkish",    family: "Agglutinative" },
  { code: "es", label: "Spanish",    family: "Low Fusional"  },
  { code: "uk", label: "Ukrainian",  family: "Low Fusional"  },
  { code: "yo", label: "Yoruba",     family: "Isolating"     },
  { code: "en", label: "English",    family: "Low Fusional"  },
];

export const METRIC_OPTIONS = [
  { id: "rouge",     label: "ROUGE",     type: "N-Gram", color: "var(--amber)"  },
  { id: "bertscore", label: "BERTScore", type: "Neural", color: "var(--cyan)"   },
  { id: "comet",     label: "COMET",     type: "Neural", color: "var(--teal)"   },
  { id: "chrf",      label: "CHRF",      type: "N-Gram", color: "var(--violet)" },
  { id: "bleu",      label: "BLEU",      type: "N-Gram", color: "var(--rose)"   },
];
