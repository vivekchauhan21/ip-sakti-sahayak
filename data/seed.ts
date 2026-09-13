import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// 768-dimension standard vector for pgvector compatibility
function getMockEmbedding(): number[] {
  return Array.from({ length: 768 }, (_, i) => Math.sin(i + 1) * 0.1);
}

const STATUTORY_PDF_URL =
  "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

const sectionsData = [
  {
    document_title: "The Patents Act, 1970 (Section 3)",
    jurisdiction: "INDIA_AYUSH",
    regime_type: "PATENTS_ACT",
    document_url: STATUTORY_PDF_URL,
    section_clause: "Section 3(p)",
    page_number: 1,
    content:
      "Section 3(p) excludes from patentability an invention which in effect is traditional knowledge or an aggregation or duplication of known properties of traditionally known components.",
    highlight_coords: { x: 80, y: 140, width: 480, height: 70 },
  },
  {
    document_title: "The Patents Act, 1970 (Section 3)",
    jurisdiction: "INDIA_AYUSH",
    regime_type: "PATENTS_ACT",
    document_url: STATUTORY_PDF_URL,
    section_clause: "Section 3(e)",
    page_number: 1,
    content:
      "Section 3(e) bars a substance obtained by a mere admixture resulting only in the aggregation of properties, unless synergistic efficacy is demonstrated.",
    highlight_coords: { x: 80, y: 230, width: 480, height: 70 },
  },
  {
    document_title: "Biological Diversity Rules, 2024",
    jurisdiction: "INDIA_AYUSH",
    regime_type: "BIODIVERSITY_ACT",
    document_url: STATUTORY_PDF_URL,
    section_clause: "Rule 14(b) - ABS Intimation",
    page_number: 1,
    content:
      "Under the Biological Diversity Rules 2024, entities commercializing bio-resources must submit Form I prior intimation to the State Biodiversity Board.",
    highlight_coords: { x: 80, y: 180, width: 480, height: 70 },
  },
];

async function seed() {
  console.log("Flushing & Seeding statutory data...");

  for (const item of sectionsData) {
    let { data: doc } = await supabase
      .from("regulatory_documents")
      .select("id")
      .eq("title", item.document_title)
      .maybeSingle();

    if (!doc) {
      const { data: newDoc, error: docErr } = await supabase
        .from("regulatory_documents")
        .insert({
          title: item.document_title,
          jurisdiction: item.jurisdiction,
          regime_type: item.regime_type,
          document_url: item.document_url,
        })
        .select("id")
        .single();

      if (docErr) {
        console.error("Doc Error:", docErr);
        continue;
      }
      doc = newDoc;
    }

    const embedding = getMockEmbedding();

    const { error: secErr } = await supabase.from("document_sections").insert({
      document_id: doc.id,
      section_clause: item.section_clause,
      content: item.content,
      page_number: item.page_number,
      highlight_coords: item.highlight_coords,
      embedding: embedding,
    });

    if (secErr) {
      console.error(`Error inserting ${item.section_clause}:`, secErr);
    } else {
      console.log(`✓ Seeded ${item.section_clause} on Page ${item.page_number}`);
    }
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);