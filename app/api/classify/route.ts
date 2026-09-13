import { NextResponse } from "next/server";
import { classifyAyurvedicProduct, ClassificationInput } from "@/lib/classifier";
import { searchRegulatorySections } from "@/lib/supabase";
import { generateEmbedding } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body: ClassificationInput & { formulationQuery?: string } = await req.json();

    const classification = classifyAyurvedicProduct(body);

    let citations: any[] = [];
    if (body.formulationQuery) {
      const queryVector = await generateEmbedding(body.formulationQuery);
      citations = await searchRegulatorySections(queryVector, 0.4, 3, "INDIA_AYUSH");
    }

    return NextResponse.json({
      success: true,
      classification,
      citations,
    });
  } catch (error: any) {
    console.error("Classification API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to classify product" },
      { status: 500 }
    );
  }
}