// lib/botanicalValidator.ts

/**
 * Comprehensive botanical dictionary encompassing:
 * - Ayurvedic Dravyas & Herbs (Sanskrit, Hindi, Common English, Regional)
 * - Botanical Latin Binomials (Genera and species)
 * - Phytochemical Markers & Bioactive Isolates
 * - Classical Ayurvedic Formulations & Delivery Media
 */
export const BOTANICAL_DICTIONARY: string[] = [
  // Primary Ayurvedic Dravyas & Herbs
  "ashwagandha", "withania", "somnifera", "withaferin", "withanolide",
  "piperine", "piper", "nigrum", "longum", "pippali", "maricha", "black pepper", "long pepper",
  "curcumin", "curcuminoid", "curcuma", "longa", "turmeric", "haldi", "haridra",
  "triphala", "haritaki", "terminalia", "chebula", "bibhitaki", "bellerica", "bellirica",
  "amla", "amalaki", "emblica", "officinalis", "phyllanthus",
  "brahmi", "bacopa", "monnieri", "centella", "asiatica", "gotu kola", "mandukaparni",
  "tulsi", "ocimum", "sanctum", "tenuiflorum", "basil",
  "neem", "azadirachta", "indica", "nimba",
  "giloy", "guduchi", "tinospora", "cordifolia",
  "guggul", "guggulu", "commiphora", "mukul", "wightii", "guggulsterone",
  "shatavari", "asparagus", "racemosus",
  "shankhpushpi", "convolvulus", "pluricaulis", "evolvulus", "alsinoides",
  "yashtimadhu", "glycyrrhiza", "glabra", "liquorice", "licorice", "mulethi",
  "manjistha", "rubia", "cordifolia",
  "arjuna", "terminalia arjuna",
  "gokshura", "tribulus", "terrestris",
  "punarnava", "boerhavia", "diffusa",
  "kutki", "picrorhiza", "kurroa",
  "bhringraj", "eclipta", "alba", "prostrata",
  "kalmegh", "andrographis", "paniculata", "andrographolide",
  "sarpagandha", "rauvolfia", "serpentina", "reserpine",
  "vidanga", "embelia", "ribes", "embelin",
  "sunthi", "shunti", "ginger", "zingiber", "officinale", "adrak", "gingerol",
  "bael", "bilva", "aegle", "marmelos",
  "vasa", "adhotoda", "vasica", "justicia", "adhadota", "vasicine",
  "chirata", "swertia", "chirayita",
  "kumari", "aloe", "vera", "barbadensis",
  "shilajit", "asphaltum", "fulvic",
  "elaichi", "cardamom", "elettaria", "cardamomum",
  "lavanga", "clove", "syzygium", "aromaticum", "eugenol",
  "jeera", "cumin", "cuminum", "cyminum",
  "methi", "fenugreek", "trigonella", "foenum-graecum",
  "dalchini", "cinnamon", "cinnamomum", "zeylanicum", "verum", "cassia",
  "sariva", "hemidesmus", "indicus",
  "musta", "nagarmotha", "cyperus", "rotundus",
  "kantakari", "solanum", "surattense", "xanthocarpum",
  "brihati", "solanum indicum",
  "shigru", "moringa", "oleifera",
  "vacha", "acorus", "calamus",
  "kapikacchu", "mucuna", "pruriens", "l-dopa",
  "shallaki", "boswellia", "serrata", "boswellic",
  "vidari", "pueraria", "tuberosa",
  "safed musli", "chlorophytum", "borivilianum",
  "kaempferia", "galanga", "alpinia",
  "senna", "cassia", "angustifolia", "sennoside",
  "isabgol", "psyllium", "plantago", "ovata",
  "dashamoola", "dashamula", "trikatu", "sitopaladi", "chyawanprash",
  "chiretta", "dhataki", "woodfordia", "fruticosa",

  // Phytochemical & Standardized Extract Markers
  "bacoside", "berberine", "resveratrol", "quercetin", "rutin",
  "tannin", "saponin", "flavonoid", "alkaloid", "terpenoid", "glycoside",
  "polyphenol", "phytochemical", "fraction", "isolate", "purified fraction",
  "standardized", "extract", "botanical", "phytopharmaceutical",

  // Classical Formulation Mediums & Ayurvedic Forms
  "churna", "churnam", "taila", "tailam", "thailam", "oil",
  "ghrita", "ghritam", "ghee", "asava", "arishta", "arishtam",
  "kwath", "kwatha", "kashayam", "decoction", "infusion",
  "rasayana", "bhasma", "vati", "gutika", "lehyam", "avaleha",
  "dravya", "aushadhi", "herbal", "polyherbal", "herb", "plant"
];

export interface BotanicalValidationResult {
  isValid: boolean;
  matchedTerms: string[];
  errorMessage?: string;
}

/**
 * Validates whether user input corresponds to authentic botanical dravyas,
 * extracts, classical Ayurvedic formulations, or standardized fractions.
 */
export function validateBotanicalInput(input: string): BotanicalValidationResult {
  if (!input || typeof input !== "string") {
    return {
      isValid: false,
      matchedTerms: [],
      errorMessage: "Invalid botanical input. Please specify valid Ayurvedic dravya, extract, or standardized phytochemical fractions (e.g., Ashwagandha, Withaferin-A, Piperine).",
    };
  }

  const trimmed = input.trim();

  // 1. Length check: Minimum 3 characters
  if (trimmed.length < 3) {
    return {
      isValid: false,
      matchedTerms: [],
      errorMessage: "Invalid botanical input. Please specify valid Ayurvedic dravya, extract, or standardized phytochemical fractions (e.g., Ashwagandha, Withaferin-A, Piperine).",
    };
  }

  // 2. Alphabetic check: Must contain at least 3 alphabetic characters (reject pure digits/punctuation)
  const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length < 3) {
    return {
      isValid: false,
      matchedTerms: [],
      errorMessage: "Invalid botanical input. Please specify valid Ayurvedic dravya, extract, or standardized phytochemical fractions (e.g., Ashwagandha, Withaferin-A, Piperine).",
    };
  }

  // 3. Normalized dictionary matching
  const normalized = trimmed.toLowerCase();
  const matchedTerms: string[] = [];

  for (const term of BOTANICAL_DICTIONARY) {
    // For short terms (<= 4 chars like 'amla', 'oil', 'neem', 'bael'), enforce word boundary to avoid substring collisions
    if (term.length <= 4) {
      const boundaryRegex = new RegExp(`\\b${term}\\b`, "i");
      if (boundaryRegex.test(normalized)) {
        matchedTerms.push(term);
      }
    } else {
      if (normalized.includes(term)) {
        matchedTerms.push(term);
      }
    }
  }

  if (matchedTerms.length === 0) {
    return {
      isValid: false,
      matchedTerms: [],
      errorMessage: "Invalid botanical input. Please specify valid Ayurvedic dravya, extract, or standardized phytochemical fractions (e.g., Ashwagandha, Withaferin-A, Piperine).",
    };
  }

  return {
    isValid: true,
    matchedTerms,
  };
}
