import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are "Sahayak AI", the official AI legaltech co-pilot for the IP-SAKTI Sahayak platform.
Your expertise is in Indian Patents Law, Traditional Knowledge Digital Library (TKDL), the Biological Diversity Act (BDA), and AYUSH / CDSCO pharmaceutical regulations.

=== DOMAIN KNOWLEDGE & STATUTES ===
1. Indian Patents Act, 1970:
   - Section 3(p): An absolute statutory bar against patenting traditional knowledge, or inventions that are mere aggregations/duplications of known properties of traditionally known botanical components. Applicants must demonstrate technical advancement, non-obvious synergy, or novel delivery carriers beyond classical literature.
   - Section 3(e): Excludes mere admixtures resulting only in the aggregation of component properties. Applicants must submit empirical synergy data (Combination Index CI < 1.0, isobolographic proof, or quantified pharmacodynamic enhancement).
   - Section 2(1)(j): Inventive step and industrial applicability requirements.

2. Biological Diversity Act (BDA 2002 / 2024 Amendment):
   - Sections 3 & 19: Prior approval from National Biodiversity Authority (NBA) is mandatory before non-Indian entities or foreign-controlled entities access Indian biological resources or apply for IPRs based on them.
   - Section 7: Indian entities must give prior intimation (Form I) to the relevant State Biodiversity Board (SBB) for commercial utilization of Indian bio-resources.
   - Section 24: Fair and equitable Access and Benefit Sharing (ABS), typically 0.1% to 0.5% of ex-factory annual sales.
   - Section 55: Imposes strict penal and fiscal liabilities for unauthorized bio-resource exploitation (biopiracy).

3. Drugs & Cosmetics Act, 1940 & Rules, 1945:
   - Schedule Y & GSR 918(E) (Phytopharmaceutical Drugs): Regulatory track for standardized, purified fractions of medicinal plants. Mandates chromatographic fingerprints (HPTLC, HPLC, LC-MS), stability testing, toxicological safety, and clinical trial evidence (Phase I to IV) under CDSCO/AYUSH.
   - Classical ASU Drugs: Formulations manufactured strictly as per texts listed in the First Schedule of the D&C Act (e.g., Charaka Samhita, Sushruta Samhita, Sharangadhara).
   - Ayurveda Aahar (FSSAI-AYUSH Regulations 2022): Functional food category; non-patentable as medicinal therapeutics.

=== PLATFORM MODULES & NAVIGATION ===
Explain how to use the 6 core tools on the IP-SAKTI Sahayak platform:
1. Dynamic Statutory Evaluator (/evaluator): Intake botanical ingredients, select excipients and classical references, and obtain statutory classification & Section 3(p)/3(e) patentability verdicts.
2. Novelty Meter (/novelty): Scans active botanical phytocompounds against Classical Ayurvedic texts and modern scientific non-patent literature.
3. Cross-Border Export Matrix (/export-matrix): Harmonizes compliance between India (AYUSH/CDSCO), US FDA (Botanical Drugs / DSHEA Dietary Supplements), and Europe (EMA / EFSA THMPD).
4. BDA Compliance Checker (/biodiversity): Automated ABS fee calculator and Form I / Form III filing requirement checker.
5. Virtual Hearing Mock Trial (/mock-hearing): Interactive simulated Controller General cross-examination for First Examination Report (FER) Section 14 hearing prep.
6. Filing Roadmap (/filing-roadmap): Step-by-step procedural timeline covering Form 1, Form 2, Form 18, and PCT international filing.
7. Anti-Biopiracy Shield (/defensive-shield): Defensive publication generator to protect indigenous traditional knowledge.

=== BEHAVIOR & RULES ===
1. Tone: Authoritative, clear, professional, and accessible.
2. Structure: Use concise bullet points, bold key terms, and cite exact statutory sections (e.g., Section 3(p), Section 3(e), BDA Section 7).
3. If asked about platform usage, provide the exact module name and route.
4. Keep responses focused, highly informative, and avoid fluff.`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM_PROMPT,
        });

        // Format history for chat
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-8)) {
            contents.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content }],
            });
          }
        }
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const result = await model.generateContent({ contents });
        const text = result.response.text();

        if (text) {
          return NextResponse.json({ reply: text });
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to statutory rule engine:", geminiError);
      }
    }

    // Comprehensive Fallback Knowledge Engine (if offline or API limit reached)
    const fallbackReply = generateFallbackReply(message);
    return NextResponse.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}

function generateFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("3(p)") || q.includes("3p") || q.includes("traditional knowledge")) {
    return `### **Section 3(p) — Traditional Knowledge Bar**\n\nUnder **Section 3(p)** of the *Indian Patents Act, 1970*, an invention that in effect is traditional knowledge, or which is an aggregation or duplication of known properties of traditionally known component(s), is **statutorily excluded from patentability**.\n\n* **Primary Bar:** Any formulation documented in the **TKDL (Traditional Knowledge Digital Library)** or classical Ayurvedic texts (Charaka, Sushruta Samhita) cannot be patented in its raw or classical form.\n* **How to Overcome:** Applicants must establish an **inventive step** involving novel standardized extraction fractions, non-obvious technological synergy, or novel delivery carriers (e.g., liposomes, nanoparticles) demonstrating technical advancement beyond traditional texts.\n* **Explore in Portal:** Run your formulation through the **[Statutory Evaluator](/evaluator)** to check Section 3(p) clearance!`;
  }

  if (q.includes("3(e)") || q.includes("3e") || q.includes("admixture") || q.includes("synerg")) {
    return `### **Section 3(e) — Mere Admixture & Synergy Burden**\n\n**Section 3(e)** of the *Patents Act, 1970* excludes any substance obtained by a **mere admixture** resulting only in aggregation of the properties of the components thereof.\n\n* **Statutory Burden:** Simply blending two or more classical herbs (e.g., Ashwagandha + Brahmi) is non-patentable.\n* **Proof Required:** You must furnish quantitative evidence of **pharmacological synergy** where the combined action exceeds the sum of individual components ($1 + 1 > 2$), such as a **Combination Index ($CI < 1.0$)** or isobolographic analysis.\n* **Portal Tool:** Use our **[Statutory Evaluator](/evaluator)** to audit your synergy data against Section 3(e) criteria.`;
  }

  if (q.includes("bda") || q.includes("abs") || q.includes("biodiversity") || q.includes("sbb") || q.includes("nba")) {
    return `### **Biological Diversity Act (BDA 2002 / 2024)**\n\nCompliance under the Biological Diversity Act is mandatory prior to obtaining any patent on Indian biological resources:\n\n1. **Section 3 & 19 (NBA Approval):** Foreign entities, NRIs, or companies with foreign shareholding must obtain prior approval from the **National Biodiversity Authority (NBA)** via Form III before applying for IPR.\n2. **Section 7 (SBB Intimation):** Indian citizens and entities must give prior intimation to the **State Biodiversity Board (SBB)** via Form I for commercial utilization.\n3. **Section 24 (ABS):** Mandates **Access and Benefit Sharing (ABS)** payments, generally ranging from **0.1% to 0.5%** of ex-factory gross sales.\n* **Portal Tool:** Check your ABS obligations instantly on the **[BDA Compliance Checker](/biodiversity)**.`;
  }

  if (q.includes("export") || q.includes("fda") || q.includes("ema") || q.includes("usa") || q.includes("europe")) {
    return `### **Cross-Border Export Regulatory Matrix**\n\nNavigating international patent and regulatory pathways requires harmonizing three major legal jurisdictions:\n\n* **India (CDSCO / AYUSH):** Classical ASU, Ayurvedic Proprietary, or Phytopharmaceutical (GSR 918(E)).\n* **USA (US FDA):** Dietary Supplements under **DSHEA 1994** (structure/function claims, no disease claims) or Botanical Drug Guidance (requires NDA/IND with clinical trials).\n* **European Union (EMA / EFSA):** Traditional Herbal Medicinal Products Directive (**Directive 2004/24/EC - THMPD**) requiring 30 years of safe traditional use (including 15 years within the EU).\n* **Portal Tool:** Compare multi-country statutory requirements in the **[Cross-Border Export Matrix](/export-matrix)**.`;
  }

  if (q.includes("phyto") || q.includes("schedule y") || q.includes("918")) {
    return `### **Phytopharmaceutical Drug Track (GSR 918(E))**\n\nIntroduced in 2015 under the *Drugs and Cosmetics Rules*, the **Phytopharmaceutical** category bridges traditional botanicals with modern scientific pharmacology:\n\n* **Definition:** An advanced fraction of medicinal plants characterized by quantitative chromatographic markers (HPLC, HPTLC, LC-MS).\n* **Mandatory Data:** Chemical batch-to-batch consistency, heavy metal/pesticide limits, safety toxicology, and Phase I–IV clinical trial clearance under CDSCO.\n* **Patentability:** High likelihood of clearing Sections 3(p) and 3(e) due to isolation of active standardized fractions.\n* **Portal Tool:** Test the "Phytopharmaceutical Track" scenario in the **[Statutory Evaluator](/evaluator)**.`;
  }

  if (q.includes("mock") || q.includes("hearing") || q.includes("controller") || q.includes("fer")) {
    return `### **Virtual Hearing Mock Trial Simulator**\n\nPrepare for real IPO examination hearings under **Section 14** of the *Patents Act, 1970*:\n\n* Practice counter-arguments against strict objections under **Section 3(p)** (TKDL citations) and **Section 3(e)** (aggregation claims).\n* Receive immediate judicial feedback from an AI simulated Assistant Controller of Patents.\n* **Portal Tool:** Head over to **[Mock Hearing Trial](/mock-hearing)** to begin your cross-examination!`;
  }

  return `### **Greetings from Sahayak AI** ⚖️\n\nI am your specialized AYUSH patent law and regulatory compliance co-pilot. I can assist you with:\n\n* **Indian Patents Act 1970:** Overcoming Section 3(p) Traditional Knowledge bars and Section 3(e) admixture objections.\n* **BDA 2024 Compliance:** Calculating Access & Benefit Sharing (ABS) fees and checking NBA/SBB clearance requirements.\n* **Regulatory Pathways:** Phytopharmaceutical track (GSR 918(E)), Classical ASU medicines, and Ayurveda Aahar.\n* **Platform Navigation:** Using the Evaluator (/evaluator), Novelty Meter (/novelty), Export Matrix (/export-matrix), and Mock Trial (/mock-hearing).\n\n*Ask me any specific question about your formulation or patent strategy!*`;
}
