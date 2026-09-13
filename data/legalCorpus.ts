export interface LegalChunk {
  id: string;
  source: string;
  jurisdiction: "national" | "international";
  section: string;
  title?: string;
  content: string;
  url: string;
  keywords: string[];
}

export const LEGAL_CORPUS: LegalChunk[] = [
  {
    id: "patents-sec-3p",
    source: "Indian Patents Act, 1970 (amended 2024)",
    jurisdiction: "national",
    section: "Section 3(p)",
    title: "Non-patentability of Traditional Knowledge",
    content: "The following are not inventions within the meaning of this Act: an invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components. Inventions based on plants documented in Ayurvedic 1st Schedule texts are barred unless novel extraction or isolated bioactive fractions are claimed.",
    url: "https://www.indiacode.nic.in",
    keywords: ["traditional knowledge", "churna", "decoction", "classical", "grantha", "triphala", "ashwagandha", "curcumin", "ayurveda"]
  },
  {
    id: "patents-sec-3e",
    source: "Indian Patents Act, 1970 (amended 2024)",
    jurisdiction: "national",
    section: "Section 3(e)",
    title: "Mere Admixture Prohibited Without Synergism",
    content: "The following are not inventions: a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance. To overcome this, applicants must furnish quantitative biological synergy data such as Combination Index (CI < 1) or isobologram analysis proving true synergistic efficacy.",
    url: "https://ipindia.gov.in",
    keywords: ["synergy", "admixture", "combination index", "ci", "isobologram", "polyherbal", "combination", "efficacy"]
  },
  {
    id: "cdsco-phytopharma-gsr918",
    source: "CDSCO Gazette GSR 918(E) / NDCT Rules 2019",
    jurisdiction: "national",
    section: "Rule 122E - Phytopharmaceutical Drug",
    title: "Phytopharmaceutical Regulatory Protocol",
    content: "Phytopharmaceutical drug means an extract or purified fraction consisting of minimum four bioactive marker compounds from an identified botanical source, intended for internal or external use for diagnosis, treatment or prevention of disease. Requires Form 44 IND clearance, Phase I-IV clinical trials, and batch chromatographic fingerprinting (HPLC/LC-MS).",
    url: "https://cdsco.gov.in",
    keywords: ["phytopharmaceutical", "fraction", "extract", "purified", "marker", "bioactive", "form 44", "clinical trials", "withaferin"]
  },
  {
    id: "bda-sec-3-7",
    source: "Biological Diversity Act, 2002 (Amended 2023/2024)",
    jurisdiction: "national",
    section: "Section 3, Section 7 & Rule 14",
    title: "Access and Benefit Sharing Clearance",
    content: "Indian citizens and domestic entities accessing biological resources for commercial utilization must give prior intimation to the State Biodiversity Board (SBB) in Form I. Foreign entities, non-residents, or firms with foreign capital/equity must obtain prior approval from the National Biodiversity Authority (NBA) under Section 3 and Form III prior approval before patent grant.",
    url: "https://nbaindia.org",
    keywords: ["biodiversity", "bda", "sbb", "nba", "abs", "access and benefit sharing", "foreign entity", "form i", "form iii", "sourcing"]
  },
  {
    id: "wipo-gratk-2024",
    source: "WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (2024)",
    jurisdiction: "international",
    section: "Article 3 & Article 4",
    title: "Mandatory Country of Origin Disclosure",
    content: "Contracting parties must mandate patent applicants to disclose the country of origin or source of genetic resources and traditional knowledge associated with genetic resources in patent specifications. Where the applicant fails to disclose intentionally, patent applications shall face administrative revocation or pre-grant challenge.",
    url: "https://www.wipo.int",
    keywords: ["wipo", "gratk", "genetic resources", "country of origin", "disclosure", "treaty", "international", "pct"]
  },
  {
    id: "pct-rule-34-tkdl",
    source: "WIPO Patent Cooperation Treaty (PCT) & TKDL Agreement",
    jurisdiction: "international",
    section: "PCT Rule 34 (Search Minimum Documentation)",
    title: "Prior-Art Scrutiny via TKDL Access",
    content: "Under bilateral access agreements, International Searching Authorities (ISAs) including USPTO, EPO, and JPO mandatorily consult the CSIR-TKDL database during prior-art search. Any classical Ayurvedic formulation disclosed in TKDL triggers automatic novelty rejection under EPC Article 54 and 35 U.S.C. 102.",
    url: "https://www.tkdl.res.in",
    keywords: ["pct", "wipo", "isa", "epo", "uspto", "prior art", "tkdl", "novelty", "anticipation"]
  },
  {
    id: "fda-botanical-505b2",
    source: "US FDA Botanical Drug Development Guidance (2020/2024)",
    jurisdiction: "international",
    section: "FDA 21 CFR 314.54 / Botanical IND",
    title: "Botanical Drug Substance Evaluation",
    content: "Botanical drug substances derived from raw herbal materials require rigorous Chemistry, Manufacturing, and Controls (CMC) batch uniformity, multi-batch chromatographic assays, and formal IND clinical evaluation. Foreign traditional use records can only substitute Phase I early safety data under strict review.",
    url: "https://www.fda.gov",
    keywords: ["fda", "botanical", "505b2", "cmc", "ind", "export", "united states", "herbal drug"]
  }
];