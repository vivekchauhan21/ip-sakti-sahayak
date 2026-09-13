// lib/ragEngine.ts
import { LEGAL_CORPUS, LegalChunk } from "@/data/legalCorpus";

export interface RetrievalResult {
  chunk: LegalChunk;
  score: number;
  matchedTerms: string[];
}

export function retrieveRelevantStatutes(
  query: string,
  jurisdiction: "national" | "international" | "india" = "national",
  topK = 3
): RetrievalResult[] {
  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const terms = cleanQuery.split(/\s+/).filter((t) => t.length > 2);

  const targetJurisdiction = (jurisdiction === "india" || jurisdiction === "national") ? "national" : "international";

  const results: RetrievalResult[] = LEGAL_CORPUS.filter(
    (c) => c.jurisdiction === targetJurisdiction
  ).map((chunk) => {
    let matchScore = 0;
    const matchedTerms: string[] = [];
    const textToSearch = `${chunk.title} ${chunk.section} ${chunk.content} ${chunk.keywords.join(" ")}`.toLowerCase();

    terms.forEach((term) => {
      // Keyword bonus
      if (chunk.keywords.some((kw) => kw.includes(term) || term.includes(kw))) {
        matchScore += 3.5;
        matchedTerms.push(term);
      }
      // Content occurrence
      const occurrences = (textToSearch.match(new RegExp(`\\b${term}`, "gi")) || []).length;
      if (occurrences > 0) {
        matchScore += Math.min(occurrences, 3) * 1.5;
        if (!matchedTerms.includes(term)) matchedTerms.push(term);
      }
    });

    return {
      chunk,
      score: matchScore,
      matchedTerms,
    };
  });

  // Sort by highest matching relevance
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}