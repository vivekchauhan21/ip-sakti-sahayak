import { ProductTier } from "@/types/database";

export interface ClassificationInput {
  hasFirstScheduleReference: boolean;
  usesExactClassicalMethod: boolean;
  containsModernChemicalExcipient: boolean;
  isStandardizedPurifiedFraction: boolean;
  isIngestibleFoodSupplement: boolean;
  isTopicalCosmeticOnly: boolean;
  hasSynergisticProof: boolean;
}

export interface ClassificationResult {
  tier: ProductTier;
  title: string;
  regime: string;
  patentabilityVerdict: "BARRED" | "HIGH_CHANCE" | "REQUIRES_EFFICACY_DATA";
  patentabilityReason: string;
  regulatoryPathway: string[];
  mandatoryForms: string[];
}

export function classifyAyurvedicProduct(input: ClassificationInput): ClassificationResult {
  if (input.isTopicalCosmeticOnly) {
    return {
      tier: "AYURVEDIC_COSMETIC",
      title: "Ayurvedic Cosmetic / Cosmeceutical",
      regime: "Drugs & Cosmetics Act 1940 (Schedule S/U)",
      patentabilityVerdict: "REQUIRES_EFFICACY_DATA",
      patentabilityReason: "Novel skin-delivery mechanisms or novel synergistic topical bases can be patented, but traditional herbs alone are barred under Section 3(p).",
      regulatoryPathway: [
        "State Licensing Authority (SLA) Ayurvedic Cosmetic Manufacturing License",
        "Compliance with heavy metal thresholds (Lead < 20ppm, Arsenic < 3ppm, Mercury < 1ppm)",
        "No medicinal/therapeutic claims permitted on labelling"
      ],
      mandatoryForms: ["Form 32-A (Manufacturing License)", "Certificate of Good Manufacturing Practice (Schedule T)"]
    };
  }

  if (input.isIngestibleFoodSupplement) {
    return {
      tier: "AYURVEDA_AAHAR",
      title: "Ayurveda Aahar (Food Product)",
      regime: "FSSAI (Ayurveda Aahar) Regulations, 2022",
      patentabilityVerdict: "BARRED",
      patentabilityReason: "Food recipes and traditional health foods are strictly excluded from patentability under Section 3(e) and 3(p).",
      regulatoryPathway: [
        "FSSAI Central / State License under Ayurveda Aahar category",
        "Inclusion of formulation details from recognized Ayurvedic texts",
        "Mandatory logo & warning: 'NOT FOR MEDICINAL USE'"
      ],
      mandatoryForms: ["FSSAI Form B", "Schedule A Dietary Compliance Matrix"]
    };
  }

  if (input.isStandardizedPurifiedFraction) {
    return {
      tier: "PHYTOPHARMACEUTICAL",
      title: "Phytopharmaceutical Drug",
      regime: "CDSCO Gazette Notification G.S.R. 918(E) / New Drugs Rule",
      patentabilityVerdict: "HIGH_CHANCE",
      patentabilityReason: "Eligible for patent protection under Section 2(1)(j) if purification process, isolated bio-active markers, and distinct therapeutic activity are novel and inventive.",
      regulatoryPathway: [
        "CDSCO Central Licensing Authority approval (Form 44)",
        "Phase I to Phase IV clinical trials as per New Drugs and Clinical Trials Rules 2019",
        "Quality dossier covering fingerprinting (HPLC/HPTLC/LC-MS)"
      ],
      mandatoryForms: ["Form CT-04 (Clinical Trial Permission)", "Form 44 (New Drug Approval)"]
    };
  }

  if (input.hasFirstScheduleReference && input.usesExactClassicalMethod && !input.containsModernChemicalExcipient) {
    return {
      tier: "CLASSICAL_AYURVEDIC",
      title: "Classical Ayurvedic Formulation (Shastriya)",
      regime: "Drugs & Cosmetics Act 1940 (Rule 158-B, Schedule 1 Books)",
      patentabilityVerdict: "BARRED",
      patentabilityReason: "Strictly non-patentable under Section 3(p) of the Patents Act, 1970 as it constitutes pre-existing traditional knowledge documented in TKDL.",
      regulatoryPathway: [
        "Direct State Licensing Authority (SLA) approval without clinical efficacy trials",
        "Proof of textual reference from Charaka Samhita, Sushruta Samhita, etc.",
        "Compliance with Pharmacopoeial Laboratory for Indian Medicine (PLIM) parameters"
      ],
      mandatoryForms: ["Form 24-D (Manufacturing License)", "Schedule T GMP Compliance"]
    };
  }

  if (input.hasFirstScheduleReference && (!input.usesExactClassicalMethod || input.containsModernChemicalExcipient)) {
    return {
      tier: "PATENT_PROPRIETARY",
      title: "Patent or Proprietary Medicine (P&P)",
      regime: "Drugs & Cosmetics Act 1940 (Section 3(h) & Rule 158-B)",
      patentabilityVerdict: input.hasSynergisticProof ? "HIGH_CHANCE" : "REQUIRES_EFFICACY_DATA",
      patentabilityReason: input.hasSynergisticProof 
        ? "Patentable if synergistic enhancement of therapeutic index is proven, overcoming Section 3(e) admixture objections." 
        : "Likely to trigger Section 3(e) and 3(p) objections unless unexpected synergy or novel drug delivery system (NDDS) is scientifically proven.",
      regulatoryPathway: [
        "SLA License with published safety documentation or pilot trial data",
        "Stability testing as per Ayush guidelines (Accelerated and Real-time)",
        "Biological Diversity Act 2002 intimation to State Biodiversity Board (Form I)"
      ],
      mandatoryForms: ["Form 24-D", "Rule 158-B Safety Dossier", "Form I (SBB ABS Intimation)"]
    };
  }

  return {
    tier: "NEW_NON_CLASSICAL",
    title: "New Plant / Non-Classical Ayurvedic Formulation",
    regime: "CDSCO & Ayush Integrated Framework",
    patentabilityVerdict: "HIGH_CHANCE",
    patentabilityReason: "Eligible for patent protection provided isolation methods and therapeutic utility demonstrate an inventive step beyond common knowledge.",
    regulatoryPathway: [
      "Safety study: Acute and 90-day sub-chronic toxicity in rodent models",
      "Full botanical, chemical, and pharmacological characterization",
      "Approval from Apex Body prior to commercial release"
    ],
    mandatoryForms: ["Pre-clinical Toxicity Dossier", "Form 24-D", "SBB Biodiversity Clearances"]
  };
}