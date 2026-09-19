export type RegulatoryCategoryKey =
  | "phytopharmaceutical"
  | "classical"
  | "ayurveda_aahar"
  | "herbomineral"
  | "proprietary_asu"
  | "cosmeceutical";

export interface CBMJurisdictionRow {
  region: string;
  regionCode: "india" | "usa" | "europe";
  authority: string;
  classification: string;
  dataRequirements: string;
  marketPathway: string;
  statutoryCode: string;
  statusBadge: string;
  badgeType: "emerald" | "blue" | "amber" | "rose";
  hi?: {
    region?: string;
    authority: string;
    classification: string;
    dataRequirements: string;
    marketPathway: string;
    statusBadge: string;
  };
}

export interface CBMRegulatoryTrack {
  id: RegulatoryCategoryKey;
  name: string;
  shortTag: string;
  readinessScore: number;
  readinessLevel: string;
  readinessColor: "emerald" | "blue" | "amber" | "rose";
  statutoryBasis: string;
  summary: string;
  keyBottleneck: string;
  rows: CBMJurisdictionRow[];
  hi?: {
    name: string;
    readinessLevel: string;
    summary: string;
    keyBottleneck: string;
    statutoryBasis?: string;
  };
}

export const CBM_CATEGORIES: CBMRegulatoryTrack[] = [
  {
    id: "phytopharmaceutical",
    name: "Phytopharmaceutical Formulation",
    shortTag: "CDSCO GSR 918(E) / US FDA CDER",
    readinessScore: 88,
    readinessLevel: "High Commercial Readiness (Pharma Route)",
    readinessColor: "emerald",
    statutoryBasis: "GSR 918(E) / US FDA Botanical Guidance / EMA Art. 10a",
    summary:
      "Standardized botanical extract fractions with isolated, purified active markers and validated pharmacological synergy. Overcomes Section 3(p) TKDL novelty bars through proven inventive step, unlocking direct pharmaceutical drug pathways across CDSCO, US FDA CDER Botanical Guidance, and EMA Well-Established Use directives.",
    keyBottleneck:
      "Requires standardized multi-batch HPLC/LC-MS fingerprinting and full GCP clinical trial evidence.",
    hi: {
      name: "पादप-औषधीय फॉर्मूलेशन",
      readinessLevel: "उच्च वाणिज्यिक तत्परता (फार्मा मार्ग)",
      summary:
        "मानकीकृत वानस्पतिक अर्क अंश जिसमें पृथक, शुद्ध सक्रिय मार्कर और सत्यापित औषधीय तालमेल (सिनर्जी) शामिल हैं। सिद्ध आविष्कारशील कदम के माध्यम से धारा 3(p) टीकेडीएल नवीनता बाधाओं को दूर करता है, जिससे सीडीएससीओ, यूएस एफडीए सीडीईआर बॉटनिकल गाइडेंस और ईएमए वेल-एस्टैब्लिश्ड उपयोग निर्देशों के तहत प्रत्यक्ष फार्मास्युटिकल दवा मार्ग खुलते हैं।",
      keyBottleneck:
        "मानकीकृत मल्टी-बैच एचपीएलसी/एलसी-एमएस फिंगरप्रिंटिंग और पूर्ण जीसीपी क्लिनिकल परीक्षण साक्ष्य की आवश्यकता है।",
      statutoryBasis: "GSR 918(E) / यूएस एफडीए बॉटनिकल गाइडेंस / ईएमए नियम 10a",
    },
    rows: [
      {
        region: "India (CDSCO / Ministry of Ayush)",
        regionCode: "india",
        authority: "Central Drugs Standard Control Organisation (CDSCO)",
        classification: "Phytopharmaceutical Drug (Schedule Y / GSR 918(E))",
        dataRequirements:
          "Phase I to IV GCP clinical trial data; LC-MS/HPLC marker quantification; heavy metals, pesticide residue, and 4-batch uniformity validation.",
        marketPathway:
          "Form 44 IND / NDA filing with Central Drugs Standard Control Organisation (CDSCO), New Delhi.",
        statutoryCode: "Drugs & Cosmetics 8th Amendment GSR 918(E)",
        statusBadge: "Pharma NDA Track",
        badgeType: "emerald",
        hi: {
          region: "भारत (CDSCO / आयुष मंत्रालय)",
          authority: "केंद्रीय औषधि मानक नियंत्रण संगठन (सीडीएससीओ)",
          classification: "पादप-औषधीय दवा (शेड्यूल Y / GSR 918(E))",
          dataRequirements:
            "चरण I से IV जीसीपी नैदानिक परीक्षण डेटा; एलसी-एमएस/एचपीएलसी मार्कर मात्रा का निर्धारण; भारी धातु, कीटनाशक अवशेष और 4-बैच एकरूपता सत्यापन।",
          marketPathway:
            "केंद्रीय औषधि मानक नियंत्रण संगठन (सीडीएससीओ), नई दिल्ली के साथ फॉर्म 44 आईएनडी / एनडीए फाइलिंग।",
          statusBadge: "फार्मा एनडीए मार्ग",
        },
      },
      {
        region: "USA (US FDA - CDER)",
        regionCode: "usa",
        authority: "US FDA Center for Drug Evaluation and Research (CDER)",
        classification: "Botanical New Drug (FDA CDER Botanical Guidance / 21 CFR 314)",
        dataRequirements:
          "Phase 2/3 clinical safety & efficacy trials; rigorous Chemistry, Manufacturing and Controls (CMC) validation from botanical raw materials to finished extract.",
        marketPathway:
          "Investigational New Drug (IND) leading to 505(b)(1) or 505(b)(2) New Drug Application (NDA).",
        statutoryCode: "21 CFR 314 / CDER Botanical Guidance 2016",
        statusBadge: "505(b)(2) Botanical Drug",
        badgeType: "blue",
        hi: {
          region: "यूएसए (US FDA - CDER)",
          authority: "यूएस एफडीए सेंटर फॉर ड्रग इवैल्यूएशन एंड रिसर्च (सीडीईआर)",
          classification: "बॉटनिकल न्यू ड्रग (एफडीए सीडीईआर बॉटनिकल गाइडेंस / 21 सीएफआर 314)",
          dataRequirements:
            "चरण 2/3 नैदानिक ​​सुरक्षा और प्रभावकारिता परीक्षण; वानस्पतिक कच्चे माल से तैयार अर्क तक कठोर रसायन विज्ञान, विनिर्माण और नियंत्रण (सीएमसी) सत्यापन।",
          marketPathway:
            "इन्वेस्टिगेशनल न्यू ड्रग (आईएनडी) 505(b)(1) या 505(b)(2) न्यू ड्रग एप्लीकेशन (एनडीए) की ओर ले जाता है।",
          statusBadge: "505(b)(2) बॉटनिकल ड्रग",
        },
      },
      {
        region: "Europe (EMA - HMPC)",
        regionCode: "europe",
        authority: "European Medicines Agency (EMA) / HMPC Committee",
        classification: "Herbal Medicinal Product (Well-Established Medicinal Use - Directive 2001/83/EC)",
        dataRequirements:
          "Demonstrated 10+ years recognized therapeutic efficacy and safety within the EU; comprehensive bibliographic scientific data or full clinical CTD Modules 1-5.",
        marketPathway:
          "Centralized or Decentralized Marketing Authorisation (MA) via European Medicines Agency (EMA).",
        statutoryCode: "Directive 2001/83/EC Art. 10a",
        statusBadge: "Well-Established Use MA",
        badgeType: "amber",
        hi: {
          region: "यूरोप (EMA - HMPC)",
          authority: "यूरोपीय मेडिसिन एजेंसी (ईएमए) / एचएमपीसी समिति",
          classification: "हर्बल औषधीय उत्पाद (सुस्थापित औषधीय उपयोग - निर्देश 2001/83/EC)",
          dataRequirements:
            "यूरोपीय संघ के भीतर 10+ वर्षों की मान्यता प्राप्त चिकित्सीय प्रभावकारिता और सुरक्षा; व्यापक ग्रंथसूची वैज्ञानिक डेटा या पूर्ण नैदानिक ​​सीटीडी मॉड्यूल 1-5।",
          marketPathway:
            "यूरोपीय मेडिसिन एजेंसी (ईएमए) के माध्यम से केंद्रीकृत या विकेंद्रीकृत विपणन प्राधिकरण (एमए)।",
          statusBadge: "सुस्थापित उपयोग एमए",
        },
      },
    ],
  },
  {
    id: "classical",
    name: "Classical Ayurvedic Medicine",
    shortTag: "1st Schedule Granthas / Shastriya",
    readinessScore: 58,
    readinessLevel: "Moderate (Subject to TKDL & Novelty Defect)",
    readinessColor: "amber",
    statutoryBasis: "Drugs & Cosmetics Act 1940 Sec 3(a) / DSHEA 1994 / THMPD 2004/24/EC",
    summary:
      "Traditional formulations manufactured verbatim from the 54 authoritative classical texts listed in the First Schedule. Directly barred from patenting under Section 3(p) in India and facing automatic novelty rejections abroad via TKDL bilateral access, but exportable as dietary supplements or traditional herbal medicines.",
    keyBottleneck:
      "Cannot be claimed as modern patentable medicine; therapeutic disease claims are strictly prohibited on export packaging.",
    hi: {
      name: "पारंपरिक आयुर्वेदिक औषधि (शास्त्रीय)",
      readinessLevel: "मध्यम (टीकेडीएल एवं नवीनता दोष के अधीन)",
      summary:
        "प्रथम अनुसूची में सूचीबद्ध 54 प्रामाणिक शास्त्रीय ग्रंथों से हूबहू निर्मित पारंपरिक फॉर्मूलेशन। भारत में धारा 3(p) के तहत पेटेंट से पूरी तरह वर्जित और टीकेडीएल द्विपक्षीय पहुंच के माध्यम से विदेशों में स्वचालित नवीनता अस्वीकृति का सामना करता है, लेकिन आहार पूरक या पारंपरिक हर्बल दवाओं के रूप में निर्यात योग्य है।",
      keyBottleneck:
        "आधुनिक पेटेंट योग्य दवा के रूप में दावा नहीं किया जा सकता; निर्यात पैकेजिंग पर चिकित्सीय रोग के दावों पर सख्त प्रतिबंध है।",
      statutoryBasis: "औषधि एवं प्रसाधन अधिनियम 1940 धारा 3(a) / DSHEA 1994 / THMPD",
    },
    rows: [
      {
        region: "India (State AYUSH SLA / CDSCO)",
        regionCode: "india",
        authority: "State Licensing Authority (SLA) / Ministry of Ayush",
        classification: "Classical Ayurvedic Medicine (D&C Act 1940 Sec 3(a) / Rule 153)",
        dataRequirements:
          "Verification of exact textual citation in First Schedule Granthas; compliance with Ayurvedic Pharmacopoeia of India (API) monographs; raw material SBB Form I intimation.",
        marketPathway:
          "Form 25D / 24D manufacturing license issued by State Licensing Authority (SLA).",
        statutoryCode: "Drugs & Cosmetics Rules 1945 Rule 153",
        statusBadge: "Shastriya SLA License",
        badgeType: "emerald",
        hi: {
          region: "भारत (राज्य आयुष एसएलए / सीडीएससीओ)",
          authority: "राज्य लाइसेंसिंग प्राधिकरण (एसएलए) / आयुष मंत्रालय",
          classification: "पारंपरिक आयुर्वेदिक औषधि (डीएंडसी अधिनियम 1940 धारा 3(a) / नियम 153)",
          dataRequirements:
            "प्रथम अनुसूची के ग्रंथों में सटीक शाब्दिक संदर्भ का सत्यापन; भारतीय आयुर्वेदिक फार्माकोपिया (एपीआई) मोनोग्राफ का अनुपालन; कच्चा माल एसबीबी फॉर्म I सूचना।",
          marketPathway:
            "राज्य लाइसेंसिंग प्राधिकरण (एसएलए) द्वारा जारी फॉर्म 25D / 24D विनिर्माण लाइसेंस।",
          statusBadge: "शास्त्रीय एसएलए लाइसेंस",
        },
      },
      {
        region: "USA (US FDA - CFSAN)",
        regionCode: "usa",
        authority: "US FDA Center for Food Safety and Applied Nutrition (CFSAN)",
        classification: "Dietary Supplement (DSHEA 1994 / 21 U.S.C. 321(ff))",
        dataRequirements:
          "Grandfathered dietary ingredient or 75-day New Dietary Ingredient (NDI) notification; cGMP 21 CFR 111 compliance; strictly Structure/Function claims with FDA disclaimer.",
        marketPathway:
          "US FDA Food Facility Registration and 30-day Post-Market Structure/Function notification (21 CFR 101.93).",
        statutoryCode: "DSHEA 1994 / 21 CFR Part 111",
        statusBadge: "Dietary Supplement (CFSAN)",
        badgeType: "blue",
        hi: {
          region: "यूएसए (US FDA - CFSAN)",
          authority: "यूएस एफडीए सेंटर फॉर फूड सेफ्टी एंड एप्लाइड न्यूट्रिशन (सीएफएसएएन)",
          classification: "आहार पूरक (डाइट्री सप्लीमेंट - DSHEA 1994 / 21 U.S.C. 321(ff))",
          dataRequirements:
            "पूर्व-1994 घटक दर्जा या 75-दिवसीय न्यू डाइट्री इंग्रीडिएंट (एनडीआई) अधिसूचना; सीजीएमपी 21 सीएफआर 111 अनुपालन; एफडीए अस्वीकरण के साथ कड़ाई से संरचना/कार्य दावे।",
          marketPathway:
            "यूएस एफडीए खाद्य सुविधा पंजीकरण और 30-दिवसीय पोस्ट-मार्केट संरचना/कार्य अधिसूचना (21 CFR 101.93)।",
          statusBadge: "आहार पूरक (सीएफएसएएन)",
        },
      },
      {
        region: "Europe (EMA - HMPC)",
        regionCode: "europe",
        authority: "European Medicines Agency (EMA) / National Competent Authorities",
        classification: "Traditional Herbal Medicinal Product (THMPD Directive 2004/24/EC)",
        dataRequirements:
          "Documentary evidence of at least 30 years medicinal use, including a minimum of 15 years within the European Union; non-clinical bibliographic safety review.",
        marketPathway:
          "Simplified Registration Procedure (SRP) through National Competent Authorities (e.g., BfArM, ANSM, MHRA).",
        statutoryCode: "Directive 2004/24/EC Art. 16a-16i",
        statusBadge: "THMPD Simplified Route",
        badgeType: "amber",
        hi: {
          region: "यूरोप (EMA - HMPC)",
          authority: "यूरोपीय मेडिसिन एजेंसी (ईएमए) / राष्ट्रीय सक्षम प्राधिकरण",
          classification: "पारंपरिक हर्बल औषधीय उत्पाद (THMPD निर्देश 2004/24/EC)",
          dataRequirements:
            "कम से कम 30 वर्षों के औषधीय उपयोग का दस्तावेजी साक्ष्य, जिसमें यूरोपीय संघ के भीतर न्यूनतम 15 वर्ष शामिल हों; गैर-नैदानिक ​​ग्रंथसूची सुरक्षा समीक्षा।",
          marketPathway:
            "राष्ट्रीय सक्षम अधिकारियों (उदा. BfArM, ANSM, MHRA) के माध्यम से सरलीकृत पंजीकरण प्रक्रिया (एसआरपी)।",
          statusBadge: "THMPD सरलीकृत मार्ग",
        },
      },
    ],
  },
  {
    id: "ayurveda_aahar",
    name: "Ayurveda Aahar (Functional Food / Dietary Supplement)",
    shortTag: "FSSAI Gazette 2022 / Nutraceutical",
    readinessScore: 94,
    readinessLevel: "Very High Export Velocity (Fast-Track Food Route)",
    readinessColor: "emerald",
    statutoryBasis: "FSSAI-AYUSH Reg. 2022 / US FDA DSHEA / EU Directive 2002/46/EC",
    summary:
      "Food and dietary supplement formulations prepared in accordance with classical Ayurvedic culinary principles for dietary and health-supporting use. High cross-border regulatory harmonization with minimal clinical trial friction, exempt from commercial ABS biopiracy levies.",
    keyBottleneck:
      "No medicinal disease claims permitted on packaging; mandatory Form B registration under Schedule A specifications.",
    hi: {
      name: "आयुर्वेद आहार (कार्यात्मक खाद्य / आहार पूरक)",
      readinessLevel: "अति उच्च निर्यात वेग (फास्ट-ट्रैक खाद्य मार्ग)",
      summary:
        "आहार और स्वास्थ्य-सहायक उपयोग के लिए शास्त्रीय आयुर्वेदिक पाक सिद्धांतों के अनुसार तैयार किए गए भोजन और आहार पूरक फॉर्मूलेशन। न्यूनतम नैदानिक ​​परीक्षण घर्षण के साथ उच्च सीमा-पार नियामक सामंजस्य, वाणिज्यिक एबीएस बायो-पायरेसी लेवी से मुक्त।",
      keyBottleneck:
        "पैकेजिंग पर किसी भी औषधीय रोग निवारण दावे की अनुमति नहीं है; अनुसूची A विनिर्देशों के तहत अनिवार्य फॉर्म B पंजीकरण।",
      statutoryBasis: "FSSAI-AYUSH Reg. 2022 / US FDA DSHEA / EU Directive 2002/46/EC",
    },
    rows: [
      {
        region: "India (FSSAI / Ministry of Ayush)",
        regionCode: "india",
        authority: "Food Safety and Standards Authority of India (FSSAI)",
        classification: "Ayurveda Aahar (Food Safety & Standards Regulations 2022, Category 13.6)",
        dataRequirements:
          "Formulation ingredients restricted to Schedule A authoritative texts; non-synthetic; conform to FSSAI heavy metals, microbiological limits, and labeling rules.",
        marketPathway:
          "FSSAI Central Licensing Portal (FoSCoS) with special AYUSH expert committee endorsement; exempt from BDA ABS commercial tax.",
        statutoryCode: "FSS (Ayurveda Aahar) Regulations 2022",
        statusBadge: "FSSAI Special AYUSH License",
        badgeType: "emerald",
        hi: {
          region: "भारत (FSSAI / आयुष मंत्रालय)",
          authority: "भारतीय खाद्य सुरक्षा एवं मानक प्राधिकरण (एफएसएसएआई)",
          classification: "आयुर्वेद आहार (खाद्य सुरक्षा और मानक विनियम 2022, श्रेणी 13.6)",
          dataRequirements:
            "फॉर्मूलेशन सामग्री अनुसूची A आधिकारिक ग्रंथों तक सीमित; गैर-सिंथेटिक; एफएसएसएआई भारी धातुओं, सूक्ष्मजीव सीमाओं और लेबलिंग नियमों के अनुरूप।",
          marketPathway:
            "विशेष आयुष विशेषज्ञ समिति के अनुमोदन के साथ एफएसएसएआई केंद्रीय लाइसेंसिंग पोर्टल (FoSCoS); बीडीए एबीएस वाणिज्यिक कर से छूट।",
          statusBadge: "FSSAI विशेष आयुष लाइसेंस",
        },
      },
      {
        region: "USA (US FDA - CFSAN)",
        regionCode: "usa",
        authority: "US FDA Center for Food Safety and Applied Nutrition (CFSAN)",
        classification: "Dietary Supplement / Functional Food (DSHEA 1994 / 21 CFR Part 101)",
        dataRequirements:
          "Identity testing for all botanicals; self-affirmed GRAS (Generally Recognized as Safe) or 75-day NDI notification; Nutrition Facts / Supplement Facts panel compliance.",
        marketPathway:
          "Domestic/Foreign Facility Registration; Prior Notice of Importation under the Bioterrorism Act.",
        statutoryCode: "21 U.S.C. 350 / 21 CFR Part 111",
        statusBadge: "DSHEA / GRAS Notification",
        badgeType: "blue",
        hi: {
          region: "यूएसए (US FDA - CFSAN)",
          authority: "यूएस एफडीए सेंटर फॉर फूड सेफ्टी एंड एप्लाइड न्यूट्रिशन (सीएफएसएएन)",
          classification: "आहार पूरक / कार्यात्मक भोजन (DSHEA 1994 / 21 CFR Part 101)",
          dataRequirements:
            "सभी वनस्पतियों के लिए पहचान परीक्षण; स्व-पुष्ट जीआरएएस (आमतौर पर सुरक्षित माना जाता है) या 75-दिवसीय एनडीआई अधिसूचना; पोषण तथ्य पैनल अनुपालन।",
          marketPathway:
            "घरेलू/विदेशी सुविधा पंजीकरण; जैव-आतंकवाद अधिनियम के तहत आयात की पूर्व सूचना (प्रायर नोटिस)।",
          statusBadge: "DSHEA / GRAS अधिसूचना",
        },
      },
      {
        region: "Europe (EFSA / EU Member States)",
        regionCode: "europe",
        authority: "European Food Safety Authority (EFSA) / National Food Agencies",
        classification: "Food Supplement (Directive 2002/46/EC) / Novel Food (Reg (EU) 2015/2283)",
        dataRequirements:
          "Proof of history of safe food consumption in EU before 15 May 1997; if novel botanical fraction, EFSA safety validation dossier is required.",
        marketPathway:
          "National notification to Member State Food Agencies (e.g., DGCCRF France, BVL Germany, FASFC Belgium).",
        statutoryCode: "Directive 2002/46/EC / Reg (EU) 2015/2283",
        statusBadge: "EFSA Food Supplement",
        badgeType: "amber",
        hi: {
          region: "यूरोप (EFSA / यूरोपीय संघ के सदस्य देश)",
          authority: "यूरोपीय खाद्य सुरक्षा प्राधिकरण (ईएफएसए) / राष्ट्रीय खाद्य एजेंसियां",
          classification: "खाद्य पूरक (निर्देश 2002/46/EC) / नोवेल फूड (विनियम (EU) 2015/2283)",
          dataRequirements:
            "15 मई 1997 से पहले यूरोपीय संघ में सुरक्षित खाद्य उपभोग के इतिहास का प्रमाण; यदि नवीन वानस्पतिक अंश है, तो ईएफएसए सुरक्षा सत्यापन डोज़ियर आवश्यक है।",
          marketPathway:
            "सदस्य राज्य खाद्य एजेंसियों (उदा. DGCCRF फ्रांस, BVL जर्मनी, FASFC बेल्जियम) को राष्ट्रीय अधिसूचना।",
          statusBadge: "EFSA खाद्य पूरक",
        },
      },
    ],
  },
  {
    id: "herbomineral",
    name: "Herbomineral / Rasaushadhi Formulation",
    shortTag: "Bhasma / Kharaliya Rasayana",
    readinessScore: 32,
    readinessLevel: "Critical Regulatory Scrutiny (Heavy Metal Barrier)",
    readinessColor: "rose",
    statutoryBasis: "D&C Act Rule 158-B / FDA Import Alert 54-15 / EMA Elemental Impurities",
    summary:
      "Formulations containing calcined minerals, purified metals (Bhasmas), or processed mercurials (Rasa-shastra). Faces severe import alerts and toxicological hurdles in the US (FDA Import Alert 54-15, California Prop 65) and Europe (ICH Q3D elemental impurity limits) unless validated with advanced nano-safety pharmacokinetic dossiers.",
    keyBottleneck:
      "Strict limits on elemental lead, arsenic, mercury, and cadmium often trigger automatic detention at US and European ports.",
    hi: {
      name: "हर्बो-खनिज / रसौषधि फॉर्मूलेशन",
      readinessLevel: "गंभीर नियामक संवीक्षा (भारी धातु बाधा)",
      summary:
        "भस्म, शुद्ध धातुओं या शोधित पारद (रस-शास्त्र) से युक्त शास्त्रीय फॉर्मूलेशन। अमेरिका (एफडीए आयात चेतावनी 54-15, कैलिफ़ोर्निया प्रॉप 65) और यूरोप (आईसीएच Q3D तात्विक अशुद्धता सीमा) में गंभीर आयात प्रतिबंधों और विषैले अवरोधों का सामना करता है, जब तक कि उन्नत नैनो-सुरक्षा डेटा से प्रमाणित न हो।",
      keyBottleneck:
        "तात्विक सीसा (लेड), आर्सेनिक, पारा (मर्करी) और कैडमियम की सख्त सीमाएं अक्सर अमेरिकी और यूरोपीय बंदरगाहों पर स्वतः जब्ती का कारण बनती हैं।",
      statutoryBasis: "डीएंडसी नियम 158-B / एफडीए आयात अलर्ट 54-15 / ईएमए सीमाएं",
    },
    rows: [
      {
        region: "India (State AYUSH SLA / Pharmacopoeia Commission)",
        regionCode: "india",
        authority: "State Licensing Authority (SLA) & PCIM&H",
        classification: "Classical Herbomineral / Rasaushadhi (D&C Act Rule 158-B / API Part I Vol VII)",
        dataRequirements:
          "Standardized Shodhana, Marana, and Jarana processing protocols; Bhasma physical criteria (Varitara, Rekhapurnatva); mandatory 28-day repeated dose safety profile.",
        marketPathway:
          "State Licensing Authority Form 25D license with batch-specific Certificate of Analysis (CoA) from an accredited testing lab.",
        statutoryCode: "D&C Rules 1945 Rule 158-B / API Monographs",
        statusBadge: "Rasa-Shastra SLA License",
        badgeType: "emerald",
        hi: {
          region: "भारत (राज्य आयुष एसएलए / फार्माकोपिया आयोग)",
          authority: "राज्य लाइसेंसिंग प्राधिकरण (एसएलए) एवं पीसीआईएमएंडएच",
          classification: "पारंपरिक हर्बो-खनिज / रसौषधि (डीएंडसी नियम 158-B / एपीआई भाग I खंड VII)",
          dataRequirements:
            "मानकीकृत शोधन, मारण और जारण प्रसंस्करण प्रोटोकॉल; भस्म भौतिक परीक्षण (वारितर, रेखापूर्णत्व); अनिवार्य 28-दिवसीय मौखिक विषाक्तता सुरक्षा प्रोफ़ाइल।",
          marketPathway:
            "मान्यता प्राप्त परीक्षण प्रयोगशाला से बैच-विशिष्ट विश्लेषण प्रमाणपत्र (सीओए) के साथ राज्य लाइसेंसिंग प्राधिकरण फॉर्म 25D लाइसेंस।",
          statusBadge: "रस-शास्त्र एसएलए लाइसेंस",
        },
      },
      {
        region: "USA (US FDA - CFSAN & ORA)",
        regionCode: "usa",
        authority: "US FDA Office of Regulatory Affairs (ORA) & CFSAN",
        classification: "Adulterated Drug / High Risk Substance (Subject to FDA Import Alert 54-15)",
        dataRequirements:
          "Zero tolerance for heavy metals exceeding USP <232>/<233> and California Proposition 65 safe harbor levels (Pb < 0.5 mcg/day, As < 10 mcg/day).",
        marketPathway:
          "Barred as standard Dietary Supplement if heavy metals exceed thresholds. Requires Pre-IND consultation with FDA CDER to establish organometallic nanoparticle safety.",
        statutoryCode: "21 U.S.C. 342(a)(1) / FDA Import Alert 54-15",
        statusBadge: "Import Alert 54-15 Flagged",
        badgeType: "rose",
        hi: {
          region: "यूएसए (US FDA - CFSAN एवं ORA)",
          authority: "यूएस एफडीए ऑफिस ऑफ रेगुलेटरी अफेयर्स (ओआरए) एवं सीएफएसएएन",
          classification: "अपमिश्रित दवा / उच्च जोखिम पदार्थ (एफडीए आयात चेतावनी 54-15 के अधीन)",
          dataRequirements:
            "यूएसपी <232>/<233> और कैलिफोर्निया प्रस्ताव 65 सुरक्षित सीमा स्तर (Pb < 0.5 mcg/दिन, As < 10 mcg/दिन) से अधिक भारी धातुओं के लिए शून्य सहनशीलता।",
          marketPathway:
            "यदि भारी धातुएं सीमा से अधिक हों तो मानक आहार पूरक के रूप में प्रतिबंधित। ऑर्गेनोमेटैलिक नैनोपार्टिकल सुरक्षा स्थापित करने हेतु एफडीए सीडीईआर के साथ प्री-आईएनडी बैठक आवश्यक।",
          statusBadge: "आयात चेतावनी 54-15 चिन्हित",
        },
      },
      {
        region: "Europe (EMA / EDQM)",
        regionCode: "europe",
        authority: "European Medicines Agency (EMA) / EDQM",
        classification: "Prohibited / Toxicological Exception (ICH Guideline Q3D on Elemental Impurities)",
        dataRequirements:
          "Permitted Daily Exposure (PDE) limits strictly applied for Class 1 toxic metals (Cd, Pb, As, Hg) as per Ph. Eur. 2.4.27 and ICH Q3D.",
        marketPathway:
          "Barred under THMPD. Requires full non-clinical and clinical safety dossier under Directive 2001/83/EC with specialized heavy metal exemption.",
        statutoryCode: "ICH Q3D / Ph. Eur. 2.4.27 / Dir. 2001/83/EC",
        statusBadge: "ICH Q3D Toxicological Bar",
        badgeType: "rose",
        hi: {
          region: "यूरोप (EMA / EDQM)",
          authority: "यूरोपीय मेडिसिन एजेंसी (ईएमए) / ईडीक्यूएम",
          classification: "प्रतिबंधित / विषैला अपवाद (तात्विक अशुद्धियों पर ICH दिशानिर्देश Q3D)",
          dataRequirements:
            "Ph. Eur. 2.4.27 और ICH Q3D के अनुसार वर्ग 1 विषैली धातुओं (Cd, Pb, As, Hg) के लिए अनुमेय दैनिक एक्सपोजर (पीडीई) सीमाएं कड़ाई से लागू।",
          marketPathway:
            "THMPD के तहत वर्जित। विशेष भारी धातु छूट के साथ निर्देश 2001/83/EC के तहत पूर्ण गैर-नैदानिक ​​और नैदानिक ​​सुरक्षा डोज़ियर आवश्यक है।",
          statusBadge: "ICH Q3D विषैला प्रतिबंध",
        },
      },
    ],
  },
  {
    id: "proprietary_asu",
    name: "Proprietary ASU Medicine (Patent / Proprietary)",
    shortTag: "D&C Act Sec 3(h) / Rule 154",
    readinessScore: 74,
    readinessLevel: "Good Commercial Potential (Requires CI < 1 Synergy)",
    readinessColor: "blue",
    statutoryBasis: "D&C Act 1940 Sec 3(h) / Patents Act Sec 3(e) / DSHEA 1994",
    summary:
      "Innovative multi-herb formulations formulated into modern dosage forms (capsules, syrups, sprays) differing from classical recipes. In India, requires bioassay proof (CI < 1) to clear Section 3(e) mere admixture hurdles; abroad, achieves smooth distribution under dietary supplement and herbal cosmetic categories.",
    keyBottleneck:
      "Patent Examiner Section 3(e) objections require quantitative synergy indices; export demands WHO-GMP Certificate of Pharmaceutical Product (CoPP).",
    hi: {
      name: "स्वामित्व आयुर्वेदिक औषधि (Proprietary ASU)",
      readinessLevel: "अच्छा वाणिज्यिक निर्यात अवसर (CI < 1 सिनर्जी साक्ष्य आवश्यक)",
      summary:
        "शास्त्रीय व्यंजनों से भिन्न आधुनिक खुराक रूपों (कैप्सूल, सिरप, स्प्रे) में तैयार किए गए अभिनव बहु-हर्बल फॉर्मूलेशन। भारत में धारा 3(e) केवल मिश्रण संबंधी बाधाओं को दूर करने हेतु बायोएसे साक्ष्य (CI < 1) की आवश्यकता होती है; विदेशों में आहार पूरक और हर्बल प्रसाधन श्रेणियों के तहत सुचारू वितरण प्राप्त करता है।",
      keyBottleneck:
        "पेटेंट परीक्षक धारा 3(e) आपत्तियों के लिए मात्रात्मक सिनर्जी सूचकांक की मांग करते हैं; निर्यात हेतु डब्लूएचओ-जीएमपी फार्मास्युटिकल उत्पाद प्रमाणपत्र (सीओपीपी) आवश्यक है।",
      statutoryBasis: "डीएंडसी अधिनियम 1940 धारा 3(h) / पेटेंट अधिनियम धारा 3(e) / DSHEA",
    },
    rows: [
      {
        region: "India (State AYUSH Licensing Authority)",
        regionCode: "india",
        authority: "State Licensing Authority (SLA) / Drug Controller",
        classification: "Patent or Proprietary ASU Medicine (Drugs & Cosmetics Act 1940 Sec 3(h))",
        dataRequirements:
          "Rule 158-B proof of safety and efficacy via published scientific literature or pilot clinical trial data; synergy bioassay to refute Section 3(e); BDA Form I filing.",
        marketPathway:
          "Form 25D Application to State Licensing Authority; Certificate of Pharmaceutical Product (CoPP) for commercial export.",
        statutoryCode: "D&C Rules Rule 154 / Rule 158-B",
        statusBadge: "Rule 154 Proprietary License",
        badgeType: "emerald",
        hi: {
          region: "भारत (राज्य आयुष लाइसेंसिंग प्राधिकरण)",
          authority: "राज्य लाइसेंसिंग प्राधिकरण (एसएलए) / औषधि नियंत्रक",
          classification: "पेटेंट या प्रोप्राइटरी एएसयू औषधि (औषधि एवं प्रसाधन सामग्री अधिनियम 1940 धारा 3(h))",
          dataRequirements:
            "प्रकाशित वैज्ञानिक साहित्य या पायलट नैदानिक ​​परीक्षण डेटा के माध्यम से सुरक्षा और प्रभावकारिता का नियम 158-B प्रमाण; धारा 3(e) खंडन हेतु सिनर्जी बायोएसे; बीडीए फॉर्म I दाखिल करना।",
          marketPathway:
            "स्वीकृत ब्रांड नाम के साथ राज्य लाइसेंसिंग प्राधिकरण को फॉर्म 25D आवेदन; व्यावसायिक निर्यात के लिए फार्मास्युटिकल उत्पाद प्रमाणपत्र (सीओपीपी)।",
          statusBadge: "नियम 154 प्रोप्राइटरी लाइसेंस",
        },
      },
      {
        region: "USA (US FDA - CFSAN)",
        regionCode: "usa",
        authority: "US FDA Center for Food Safety and Applied Nutrition (CFSAN)",
        classification: "Dietary Supplement (DSHEA 1994 / 21 U.S.C. 321(ff))",
        dataRequirements:
          "Safety substantiation for proprietary blend; 21 CFR 111 cGMP compliance; identity verification for every active botanical; no disease claims.",
        marketPathway:
          "FDA e-Facility Registration and 30-day post-market notification to CFSAN under 21 CFR 101.93.",
        statutoryCode: "DSHEA 1994 / 21 CFR 111",
        statusBadge: "DSHEA Proprietary Blend",
        badgeType: "blue",
        hi: {
          region: "यूएसए (US FDA - CFSAN)",
          authority: "यूएस एफडीए सेंटर फॉर फूड सेफ्टी एंड एप्लाइड न्यूट्रिशन (सीएफएसएएन)",
          classification: "आहार पूरक मिश्रण (DSHEA 1994 / 21 U.S.C. 321(ff))",
          dataRequirements:
            "प्रोप्राइटरी मिश्रण के लिए सुरक्षा पुष्टि; 21 सीएफआर 111 सीजीएमपी अनुपालन; प्रत्येक सक्रिय वनस्पति घटक के लिए पहचान सत्यापन; कोई रोग दावा नहीं।",
          marketPathway:
            "एफडीए ई-सुविधा पंजीकरण और 21 सीएफआर 101.93 के तहत सीएफएसएएन को 30-दिवसीय विपणन पश्चात अधिसूचना।",
          statusBadge: "DSHEA प्रोप्राइटरी ब्लेंड",
        },
      },
      {
        region: "Europe (EMA / EU Member States)",
        regionCode: "europe",
        authority: "National Competent Authorities / Member State Food Boards",
        classification: "Herbal Food Supplement or Borderline Botanical Product",
        dataRequirements:
          "Verification that herbs are not restricted under national herbal pharmacovigilance lists; non-medicinal presentation without therapeutic claims.",
        marketPathway:
          "Mutual recognition procedure under Regulation (EU) 2019/515 or national food supplement notifications (e.g., France DGCCRF, Belgium FASFC).",
        statutoryCode: "Reg (EU) 2019/515 / Dir 2002/46/EC",
        statusBadge: "Mutual Recognition Food Route",
        badgeType: "amber",
        hi: {
          region: "यूरोप (EMA / यूरोपीय संघ के सदस्य देश)",
          authority: "राष्ट्रीय सक्षम अधिकारी / सदस्य राज्य खाद्य बोर्ड",
          classification: "हर्बल फूड सप्लीमेंट या बॉर्डरलाइन बॉटनिकल उत्पाद",
          dataRequirements:
            "सत्यापन कि जड़ी-बूटियाँ राष्ट्रीय हर्बल नकारात्मक सूचियों में प्रतिबंधित नहीं हैं; चिकित्सीय दावों के बिना गैर-औषधीय प्रस्तुति।",
          marketPathway:
            "विनियम (EU) 2019/515 के तहत पारस्परिक मान्यता प्रक्रिया या निर्दिष्ट सदस्य राज्यों (उदा. फ्रांस डीजीसीसीआरएफ, बेल्जियम एफएएसएफसी) में राष्ट्रीय खाद्य पूरक अधिसूचनाएं।",
          statusBadge: "पारस्परिक मान्यता खाद्य मार्ग",
        },
      },
    ],
  },
  {
    id: "cosmeceutical",
    name: "Cosmeceutical / Botanical Topical Formulation",
    shortTag: "MoCRA 2022 / EU CosReg 1223/2009",
    readinessScore: 91,
    readinessLevel: "Fastest Global Export Velocity (Cosmetic Framework)",
    readinessColor: "emerald",
    statutoryBasis: "D&C Rules Part XVI / US MoCRA 2022 / EU Reg 1223/2009",
    summary:
      "Topical Ayurvedic formulations (creams, oils, serums, lepams) formulated for skin, scalp, and personal hygiene. Avoids pharmaceutical clinical trial delays and novel food dossiers by leveraging modernized international cosmetic frameworks (US MoCRA and EU CPNP).",
    keyBottleneck:
      "Strict prohibition against systemic disease treatment claims; mandatory safety dossiers under MoCRA and European CPSR.",
    hi: {
      name: "कॉस्मीस्युटिकल / बाह्य वानस्पतिक फॉर्मूलेशन",
      readinessLevel: "सबसे तेज वैश्विक निर्यात वेग (प्रसाधन सामग्री ढांचा)",
      summary:
        "त्वचा, खोपड़ी और व्यक्तिगत देखभाल के लिए तैयार किए गए सामयिक आयुर्वेदिक फॉर्मूलेशन (क्रीम, तेल, सीरम, लेप)। आधुनिक अंतरराष्ट्रीय कॉस्मेटिक ढांचे (यूएस मोकरा और ईयू सीपीएनपी) का लाभ उठाकर दवा नैदानिक ​​परीक्षणों और नवीन खाद्य डोज़ियर की देरी से बचता है।",
      keyBottleneck:
        "प्रणालीगत रोग उपचार दावों पर सख्त प्रतिबंध; मोकरा (MoCRA) और यूरोपीय सीपीएसआर (CPSR) के तहत अनिवार्य सुरक्षा डोज़ियर।",
      statutoryBasis: "डीएंडसी नियम भाग XVI / यूएस मोकरा 2022 / ईयू विनियमन 1223/2009",
    },
    rows: [
      {
        region: "India (State Licensing Authority / CDSCO)",
        regionCode: "india",
        authority: "State Licensing Authority (SLA) & CDSCO",
        classification: "Ayurvedic Cosmetic for External Use (Drugs & Cosmetics Rules Part XVI)",
        dataRequirements:
          "Skin irritation and sensitization patch testing; microbiological purity and heavy metal limits as per IS 4707; non-ingestible formulation certification.",
        marketPathway:
          "Form 32 / Form 25 license from State Licensing Authority; compliance with Bureau of Indian Standards (BIS) cosmetic norms.",
        statutoryCode: "D&C Rules Part XVI (Rules 137-150)",
        statusBadge: "Ayush Cosmetic License",
        badgeType: "emerald",
        hi: {
          region: "भारत (राज्य लाइसेंसिंग प्राधिकरण / सीडीएससीओ)",
          authority: "राज्य लाइसेंसिंग प्राधिकरण (एसएलए) एवं सीडीएससीओ",
          classification: "बाहरी उपयोग हेतु आयुर्वेदिक प्रसाधन सामग्री (डीएंडसी नियम भाग XVI)",
          dataRequirements:
            "त्वचा में जलन और संवेदनशीलता पैच परीक्षण; IS 4707 के अनुसार सूक्ष्मजीवविज्ञानी शुद्धता और भारी धातु सीमाएं; गैर-उपभोग्य निर्माण प्रमाणन।",
          marketPathway:
            "राज्य लाइसेंसिंग प्राधिकरण से फॉर्म 32 / फॉर्म 25 लाइसेंस; भारतीय मानक ब्यूरो (बीआईएस) कॉस्मेटिक मानदंडों का अनुपालन।",
          statusBadge: "आयुष कॉस्मेटिक लाइसेंस",
        },
      },
      {
        region: "USA (US FDA - MoCRA)",
        regionCode: "usa",
        authority: "US FDA Office of Cosmetics and Colors / MoCRA",
        classification: "Cosmetic Product (FD&C Act / Modernization of Cosmetics Regulation Act 2022)",
        dataRequirements:
          "Safety substantiation for botanical ingredients; fragrance allergen listing; adverse event reporting facility; cGMP conformity under MoCRA.",
        marketPathway:
          "FDA Cosmetics Direct electronic portal: Mandatory facility registration and product listing within 120 days of commercial marketing.",
        statutoryCode: "FD&C Act Chapter VI / MoCRA 2022",
        statusBadge: "MoCRA Cosmetics Direct",
        badgeType: "blue",
        hi: {
          region: "यूएसए (US FDA - MoCRA 2022)",
          authority: "यूएस एफडीए ऑफिस ऑफ कॉस्मेटिक्स एंड कलर्स / MoCRA",
          classification: "प्रसाधन सामग्री (कॉस्मेटिक उत्पाद - FD&C Act / MoCRA 2022)",
          dataRequirements:
            "वानस्पतिक घटकों के लिए सुरक्षा पुष्टि; सुगंध एलर्जेन प्रकटीकरण; प्रतिकूल घटना रिपोर्टिंग प्रणाली; मोकरा के तहत सीजीएमपी अनुरूपता।",
          marketPathway:
            "एफडीए कॉस्मेटिक्स डायरेक्ट इलेक्ट्रॉनिक पोर्टल: वाणिज्यिक विपणन के 120 दिनों के भीतर अनिवार्य सुविधा पंजीकरण और उत्पाद सूचीकरण।",
          statusBadge: "MoCRA कॉस्मेटिक्स डायरेक्ट",
        },
      },
      {
        region: "Europe (European Commission / SCCS)",
        regionCode: "europe",
        authority: "European Commission / SCCS Committee",
        classification: "Cosmetic Product (Regulation (EC) No 1223/2009)",
        dataRequirements:
          "Cosmetic Product Safety Report (CPSR Part A & Part B) certified by an EU qualified safety assessor; complete Product Information File (PIF) maintained for 10 years.",
        marketPathway:
          "Electronic notification via Cosmetic Products Notification Portal (CPNP) prior to import; appointment of an EU Responsible Person (RP).",
        statutoryCode: "Regulation (EC) No 1223/2009",
        statusBadge: "CPNP Notification / CPSR",
        badgeType: "amber",
        hi: {
          region: "यूरोप (यूरोपीय आयोग / SCCS)",
          authority: "यूरोपीय आयोग / एससीसीएस समिति",
          classification: "कॉस्मेटिक उत्पाद (विनियम (EC) संख्या 1223/2009)",
          dataRequirements:
            "यूरोपीय संघ के योग्य सुरक्षा मूल्यांकनकर्ता द्वारा प्रमाणित कॉस्मेटिक उत्पाद सुरक्षा रिपोर्ट (CPSR भाग A और भाग B); 10 वर्षों तक बनाए रखी गई पूर्ण उत्पाद सूचना फ़ाइल (PIF)।",
          marketPathway:
            "आयात से पहले कॉस्मेटिक उत्पाद अधिसूचना पोर्टल (सीपीएनपी) के माध्यम से इलेक्ट्रॉनिक अधिसूचना; एक ईयू उत्तरदायी व्यक्ति (आरपी) की नियुक्ति।",
          statusBadge: "CPNP अधिसूचना / CPSR",
        },
      },
    ],
  },
];

export function getCBMTrack(
  categoryKeyOrName: string,
  lang: string = "en"
): CBMRegulatoryTrack {
  const normalized = (categoryKeyOrName || "").toLowerCase().trim();

  const found = CBM_CATEGORIES.find((cat) => {
    return (
      cat.id.toLowerCase() === normalized ||
      cat.name.toLowerCase() === normalized ||
      (cat.hi?.name && cat.hi.name.toLowerCase() === normalized) ||
      normalized.includes(cat.id.toLowerCase()) ||
      (cat.id === "phytopharmaceutical" && (normalized.includes("phyto") || normalized.includes("पादप"))) ||
      (cat.id === "classical" && (normalized.includes("classical") || normalized.includes("शास्त्रीय") || normalized.includes("पारंपरिक"))) ||
      (cat.id === "ayurveda_aahar" && (normalized.includes("aahar") || normalized.includes("आहार") || normalized.includes("supplement") || normalized.includes("functional"))) ||
      (cat.id === "herbomineral" && (normalized.includes("herbomineral") || normalized.includes("rasa") || normalized.includes("रसौषधि") || normalized.includes("खनिज") || normalized.includes("bhasma"))) ||
      (cat.id === "proprietary_asu" && (normalized.includes("proprietary") || normalized.includes("स्वामित्व") || normalized.includes("asu"))) ||
      (cat.id === "cosmeceutical" && (normalized.includes("cosmetic") || normalized.includes("कॉस्मेटिक") || normalized.includes("प्रसाधन") || normalized.includes("topical") || normalized.includes("cosmeceutical")))
    );
  });

  const base = found || CBM_CATEGORIES[0];

  if (lang === "hi" && base.hi) {
    return {
      ...base,
      name: base.hi.name || base.name,
      readinessLevel: base.hi.readinessLevel || base.readinessLevel,
      summary: base.hi.summary || base.summary,
      keyBottleneck: base.hi.keyBottleneck || base.keyBottleneck,
      statutoryBasis: base.hi.statutoryBasis || base.statutoryBasis,
      rows: base.rows.map((row) => {
        if (!row.hi) return row;
        return {
          ...row,
          region: row.hi.region || row.region,
          authority: row.hi.authority || row.authority,
          classification: row.hi.classification || row.classification,
          dataRequirements: row.hi.dataRequirements || row.dataRequirements,
          marketPathway: row.hi.marketPathway || row.marketPathway,
          statusBadge: row.hi.statusBadge || row.statusBadge,
        };
      }),
    };
  }

  return base;
}
