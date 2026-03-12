/**
 * Result interpretation logic
 */

import { LANGUAGES } from "../constants";

export function interpretResults(results, language) {
  const lang = LANGUAGES.find(l => l.code === language);
  const family = lang?.family || "unknown";
  const rouge = results.find(r => r.name === "ROUGE");
  const comet = results.find(r => r.name === "COMET");
  const bert  = results.find(r => r.name === "BERTScore");

  const parts = [];

  if (rouge && comet && !rouge.error && !comet.error) {
    const gap = comet.score - rouge.score;
    if (gap > 0.2 && (family === "High Fusional" || family === "Low Fusional")) {
      parts.push(
        `⚠️ <strong>Large gap detected</strong> between ROUGE (${rouge.score.toFixed(3)}) and COMET (${comet.score.toFixed(3)}). ` +
        `This is expected for <strong>${family}</strong> languages — morphological variation means ROUGE misses valid word matches that COMET's neural model captures correctly.`
      );
    } else if (gap < 0.05) {
      parts.push(`✓ ROUGE and COMET scores are closely aligned (gap: ${gap.toFixed(3)}), suggesting the summary uses similar surface forms to the reference.`);
    }
  }

  if (family === "High Fusional") {
    parts.push(`🔴 <strong>${family}</strong> language detected (${lang?.label}). The paper found ROUGE correlates as low as −0.26 with human judgments for this family. <strong>Trust COMET or BERTScore over ROUGE for this language.</strong>`);
  } else if (family === "Agglutinative") {
    parts.push(`🟡 <strong>${family}</strong> language detected (${lang?.label}). ROUGE works moderately but misses morphological variants. BERTScore with a monolingual model is recommended.`);
  } else if (family === "Isolating") {
    parts.push(`🟢 <strong>${family}</strong> language detected (${lang?.label}). ROUGE is relatively reliable here due to stable word forms, but COMET still provides the best human correlation.`);
  }

  if (rouge?.error) parts.push(`⚠️ ROUGE failed: ${rouge.error}`);
  if (comet?.error) parts.push(`⚠️ COMET failed: ${comet.error} — COMET requires the unbabel-comet package and model download (~1.5GB).`);
  if (bert?.error) parts.push(`⚠️ BERTScore failed: ${bert.error}`);

  return parts.length > 0 ? parts.join("<br/><br/>") : "Scores computed successfully. Hover metric names for details.";
}
