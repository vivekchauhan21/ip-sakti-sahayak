import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  let formulation = "";
  let userResponse = "";
  let dialogueHistory: any[] = [];

  try {
    const body = await req.json();
    formulation = body.formulation || "Ayurvedic Formulation";
    userResponse = body.userResponse || "";
    dialogueHistory = body.dialogueHistory || [];

    const historyText = dialogueHistory
      .map(
        (m: { sender: string; text: string }) =>
          `${m.sender === "examiner" ? "IPO Controller" : "Applicant"}: ${m.text}`
      )
      .join("\n");

    const fullPrompt = `You are the Assistant Controller of Patents & Designs at the Indian Patent Office (IPO).
Conduct a strict statutory hearing under Section 14 of the Patents Act, 1970 for the formulation: "${formulation}".
Statutory grounds:
- Section 3(p): Traditional Knowledge bar (TKDL / Classical texts like Charaka Samhita).
- Section 3(e): Mere admixture vs synergistic efficacy.
- Biological Diversity Act 2024: Mandatory SBB/NBA clearance.

Dialogue History:
${historyText}

Applicant just said:
"${userResponse}"

Rules:
1. Act as a strict legal Controller.
2. If applicant is casual or vague, reprimand and demand technical proof, HPLC markers, or synergy indices.
3. Keep response strictly under 70 words.`;

    // Try Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const reply = result.response.text();

    return NextResponse.json({ examinerReply: reply });
  } catch (err) {
    console.warn("Using statutory rule-based examiner fallback:", err);

    // Bulletproof Fallback Engine: User input ke hisaab se realistic Controller objections
    const query = userResponse.toLowerCase().trim();
    let reply = "";

    if (query === "hlo" || query === "hello" || query === "hi" || query.length < 5) {
      reply =
        "The Controller notes this is a formal Section 14 statutory hearing, not an informal conference. The applicant must directly address the Section 3(p) TKDL citations on record. How do your claims establish novelty over classical texts?";
    } else if (query.includes("synerg") || query.includes("ratio") || query.includes("efficacy")) {
      reply =
        "Under Section 3(e), mere therapeutic synergy is insufficient without quantitative proof. Furnish combination index (CI < 1) calculations or isobolographic data demonstrating supra-additive efficacy over individual botanical fractions.";
    } else if (query.includes("extract") || query.includes("purity") || query.includes("isolate") || query.includes("withaferin") || query.includes("curcumin")) {
      reply =
        "While isolated botanical markers are noted under Section 2(1)(j), what specific non-obvious technical steps distinguish your chromatographic fractionation from standard Ayurvedic Pharmacopoeia extraction protocols?";
    } else if (query.includes("bda") || query.includes("biodiversity") || query.includes("sbb") || query.includes("nba")) {
      reply =
        "Produce your Form I acknowledgment under Rule 14 of Biological Diversity Rules, 2024. Failure to file prior intimation with the State Biodiversity Board will render commercialization non-compliant.";
    } else {
      reply =
        "The applicant's submission is noted; however, it fails to dispel the statutory presumption under Section 3(p). Traditional medicinal uses documented in classical texts require verifiable inventive modification. Provide comparative data.";
    }

    return NextResponse.json({ examinerReply: reply });
  }
}