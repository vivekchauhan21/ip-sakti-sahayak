// app/api/rag-classify/route.ts
import { NextResponse } from "next/server";
import { retrieveRelevantStatutes } from "@/lib/ragEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      formulation,
      jurisdiction = "national",
      criteria = {},
    } = body;

    const isNational = jurisdiction === "national" || jurisdiction === "india";
    const targetJurisdiction = isNational ? "national" : "international";

    // 1. RETRIEVAL STEP: Fetch grounded legal statutes
    const retrievedChunks = retrieveRelevantStatutes(
      `${formulation} ${Object.keys(criteria).filter(k => criteria[k]).join(" ")}`,
      targetJurisdiction,
      3
    );

    // 2. CONTEXT AUGMENTATION
    const augmentedContext = retrievedChunks
      .map(
        (r, i) =>
          `[Source ${i + 1}]: ${r.chunk.source} | ${r.chunk.section}: ${r.chunk.title}\n"${r.chunk.content}"\nPortal URL: ${r.chunk.url}`
      )
      .join("\n\n");

    // 3. DETERMINISTIC REASONING AUGMENTED WITH RETRIEVED STATUTES
    let category = isNational ? "Classical Ayurvedic Medicine" : "Traditional Herbal Medicinal Product (THMPD)";
    let patentability = isNational ? "Section 3(p) Absolute Bar" : "Barred Abroad (EPC Art. 54 Novelty Defect)";
    let confidence = 85;

    if (criteria.purified_fraction && criteria.synergistic_efficacy) {
      category = isNational ? "Phytopharmaceutical Drug" : "Botanical Drug Substance (FDA 505(b)(2))";
      patentability = isNational ? "High Patentability Potential" : "PCT Patent Eligible (Art. 33)";
      confidence = 94;
    } else if (criteria.ayurveda_aahar) {
      category = "Ayurveda Aahar (Functional Food)";
      patentability = "Patent Barred (FSSAI Route)";
      confidence = 89;
    } else if (criteria.synergistic_efficacy) {
      category = isNational ? "Proprietary Ayurvedic Medicine" : "Herbal Medicinal Product";
      patentability = isNational ? "Conditional (Section 3e Scrutiny)" : "Conditional (Foreign Regulatory Scrutiny)";
      confidence = 82;
    }

    return NextResponse.json({
      success: true,
      rag_engine: {
        retrieved_sources_count: retrievedChunks.length,
        retrieved_statutes: retrievedChunks.map((r) => ({
          section: r.chunk.section,
          source: r.chunk.source,
          url: r.chunk.url,
          relevance_score: r.score,
          excerpt: r.chunk.content,
        })),
        augmented_prompt_snippet: augmentedContext,
      },
      assessment: {
        category,
        patentability,
        confidence,
        jurisdiction,
        statutory_grounding: retrievedChunks[0]?.chunk.section || (isNational ? "Section 3(p) Patents Act" : "WIPO GRATK 2024"),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}