"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
} from "lucide-react";

interface FilingRoadmapProps {
  category: string;
  isNovel?: boolean;
}

interface RoadmapMilestone {
  stage: string;
  title: string;
  authority: string;
  desc: string;
  badge: string;
  timeline: string;
}

interface StatutoryFormItem {
  name: string;
  title: string;
  authority: string;
  fileType: string;
  sampleContent?: string;
}

export default function FilingRoadmap({ category, isNovel = true }: FilingRoadmapProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"roadmap" | "forms">("roadmap");

  const normalizeCategoryKey = (cat: string): string => {
    const c = (cat || "").toLowerCase();
    if (c.includes("phyto") || c.includes("पादप")) return "phytopharmaceutical";
    if (c.includes("classical") || c.includes("शास्त्रीय") || c.includes("granth")) return "classical";
    if (c.includes("aahar") || c.includes("आहार") || c.includes("food") || c.includes("supplement")) return "ayurveda_aahar";
    if (c.includes("herbo") || c.includes("rasa") || c.includes("रसौषधि") || c.includes("खनिज") || c.includes("bhasma")) return "herbomineral";
    if (c.includes("proprietary") || c.includes("स्वामित्व") || c.includes("asu")) return "proprietary_asu";
    if (c.includes("cosmetic") || c.includes("कॉस्मेटिक") || c.includes("प्रसाधन") || c.includes("topical") || c.includes("cosmeceutical")) return "cosmeceutical";
    return "phytopharmaceutical";
  };

  const currentKey = normalizeCategoryKey(category);
  const isHindi = lang === "hi";

  // Detailed realistic milestone mapping for all 6 tracks
  const categoryRoadmaps: Record<string, RoadmapMilestone[]> = {
    phytopharmaceutical: isHindi
      ? [
          {
            stage: "चरण 1",
            title: "पूर्व कला एवं टीकेडीएल (TKDL) संवीक्षा (FTO खोज)",
            authority: "भारतीय पेटेंट कार्यालय (IPO) / टीकेडीएल",
            timeline: "माह 1 - 2",
            badge: "अनिवार्य पूर्व-जांच",
            desc: "54 शास्त्रीय ग्रंथों के विरुद्ध गहन एफटीओ खोज आयोजित करें ताकि यह प्रमाणित हो सके कि सक्रिय अंश निष्कर्षण धारा 3(p) पारंपरिक ज्ञान प्रतिबंधों को दूर करता है।",
          },
          {
            stage: "चरण 2",
            title: "जैव विविधता पूर्व सूचना एवं एसबीबी फॉर्म I",
            authority: "राज्य जैव विविधता बोर्ड (SBB) / एनबीए",
            timeline: "माह 2 - 4",
            badge: "वैधानिक बीडीए 2024",
            desc: "कच्ची वनस्पति सामग्री के व्यावसायिक संग्रहण हेतु फॉर्म I पूर्व सूचना दाखिल करें और एबीएस लाभ साझाकरण अनापत्ति प्राप्त करें।",
          },
          {
            stage: "चरण 3",
            title: "अनंतिम एवं पूर्ण विनिर्देश फाइलिंग (फॉर्म 1 + फॉर्म 2)",
            authority: "भारतीय पेटेंट कार्यालय (IPO)",
            timeline: "माह 4 - 6",
            badge: "पेटेंट फाइलिंग",
            desc: "मार्कर यौगिक पृथक्करण, एचपीएलसी फिंगरप्रिंटिंग और धारा 3(e) मिश्रण प्रतिबंध को दूर करने वाले सत्यापित सहक्रियात्मक बायोएसे (CI < 1) के साथ दावे तैयार करें।",
          },
          {
            stage: "चरण 4",
            title: "सीडीएससीओ केंद्रीय औषधि लाइसेंसिंग (फॉर्म 44 IND / NDA)",
            authority: "सीडीएससीओ / डीसीजीआई नई दिल्ली",
            timeline: "माह 6 - 18",
            badge: "फार्मा एनडीए मार्ग",
            desc: "शेड्यूल Y / GSR 918(E) के तहत 4-बैच स्थिरता, विषैलापन परीक्षण और चरण I-III नैदानिक ​​परीक्षण प्रोटोकॉल के साथ फॉर्म 44 आईएनडी पैकेज जमा करें।",
          },
          {
            stage: "चरण 5",
            title: "परीक्षण, एफईआर सुनवाई एवं पेटेंट अनुदान",
            authority: "आईपीओ नियंत्रक एवं परीक्षा प्रभाग",
            timeline: "माह 18 - 36",
            badge: "अंतिम पेटेंट अनुदान",
            desc: "प्रथम परीक्षा रिपोर्ट (FER) का उत्तर दें, पेटेंट नियंत्रक के समक्ष तकनीकी आविष्कारशील कदम का बचाव करें और अंतिम पेटेंट अनुदान प्राप्त करें।",
          },
        ]
      : [
          {
            stage: "Stage 1",
            title: "Prior Art & TKDL Deconfliction (FTO Search)",
            authority: "Indian Patent Office (IPO) / TKDL",
            timeline: "Months 1 - 2",
            badge: "Mandatory Pre-Check",
            desc: "Conduct comprehensive Freedom-to-Operate (FTO) search against 54 classical texts to confirm active fraction extraction overcomes Section 3(p) TK bars.",
          },
          {
            stage: "Stage 2",
            title: "Biodiversity Intimation & SBB Form I",
            authority: "State Biodiversity Board (SBB) / NBA",
            timeline: "Months 2 - 4",
            badge: "Statutory BDA 2024",
            desc: "File Form I prior intimation for commercial sourcing of botanical herbs and obtain ABS benefit-sharing clearance.",
          },
          {
            stage: "Stage 3",
            title: "Provisional & Complete Specification (Form 1 + Form 2)",
            authority: "Indian Patent Office (IPO)",
            timeline: "Months 4 - 6",
            badge: "Patent Filing",
            desc: "Draft claims specifying marker compound isolation, HPLC fingerprinting, and validated synergistic bioassay (CI < 1) overcoming Section 3(e).",
          },
          {
            stage: "Stage 4",
            title: "CDSCO Central Drug Licensing (Form 44 IND / NDA)",
            authority: "CDSCO / DCGI New Delhi",
            timeline: "Months 6 - 18",
            badge: "Pharma NDA Track",
            desc: "Submit Form 44 IND package with 4-batch stability, acute/sub-acute animal toxicology, and Phase I-III clinical trial protocols under Schedule Y / GSR 918(E).",
          },
          {
            stage: "Stage 5",
            title: "Patent Prosecution, FER Hearing & Grant",
            authority: "IPO Controller & Examination Division",
            timeline: "Months 18 - 36",
            badge: "Final Grant",
            desc: "Submit response to First Examination Report (FER), defend technical inventive step before Patent Controller, and obtain letters patent.",
          },
        ],

    classical: isHindi
      ? [
          {
            stage: "चरण 1",
            title: "शास्त्रीय ग्रंथ प्रमाणीकरण (प्रथम अनुसूची ऑडिट)",
            authority: "आयुर्वेदिक फार्माकोपिया आयोग (PCIM&H)",
            timeline: "सप्ताह 1 - 4",
            badge: "ग्रंथ मोनोग्राफ",
            desc: "प्रथम अनुसूची के 54 प्रामाणिक ग्रंथों से सटीक शास्त्रीय संदर्भ सत्यापित करें। धारा 3(p) के तहत पेटेंट प्रतिबंधित है; राज्य लाइसेंसिंग और रक्षात्मक शील्ड पर ध्यान दें।",
          },
          {
            stage: "चरण 2",
            title: "एसबीबी घरेलू सोर्सिंग पूर्व सूचना (नियम 14)",
            authority: "राज्य जैव विविधता बोर्ड (SBB)",
            timeline: "माह 1 - 2",
            badge: "बीडीए 2024 ट्रैक",
            desc: "स्थानीय बीएमसी और प्रमाणित उत्पादकों से घरेलू हर्बल सामग्री जुटाने के लिए फॉर्म I सूचना जमा करें।",
          },
          {
            stage: "चरण 3",
            title: "आयुष विनिर्माण लाइसेंस (फॉर्म 25D / नियम 153)",
            authority: "राज्य आयुष लाइसेंसिंग प्राधिकरण (SLA)",
            timeline: "माह 2 - 5",
            badge: "शेड्यूल T जीएमपी",
            desc: "भारतीय आयुर्वेदिक फार्माकोपिया (API) मानकों और अनुसूची T जीएमपी फैक्ट्री मानदंडों को पूरा कर फॉर्म 25D/24D लाइसेंस प्राप्त करें।",
          },
          {
            stage: "चरण 4",
            title: "डिफेंसिव शील्ड क्रिप्टोग्राफ़िक संग्रहण",
            authority: "डिफेंसिव शील्ड वॉल्ट / WIPO",
            timeline: "तत्काल (लाइसेंस के बाद)",
            badge: "बायोपायरेसी रोकथाम",
            desc: "अपरिवर्तनीय SHA-256 डिजिटल प्रमाणपत्र उत्पन्न करें ताकि पूर्व कला स्थापित हो और विदेशी संस्थाओं द्वारा शास्त्रीय धरोहर के पेटेंट को रोका जा सके।",
          },
        ]
      : [
          {
            stage: "Stage 1",
            title: "Classical Text Authentication (1st Schedule Audit)",
            authority: "Ayurvedic Pharmacopoeia Commission (PCIM&H)",
            timeline: "Weeks 1 - 4",
            badge: "Grantha Monograph",
            desc: "Verify verbatim textual formulation citation across authoritative classical texts. Traditional formulations are barred under Section 3(p); prioritize SLA licensing and Defensive Shield publication.",
          },
          {
            stage: "Stage 2",
            title: "SBB Domestic Sourcing Prior Notification (Rule 14)",
            authority: "State Biodiversity Board (SBB)",
            timeline: "Months 1 - 2",
            badge: "BDA 2024 Track",
            desc: "Submit Form I intimation for domestic raw herb procurement from accredited cultivators and local BMCs.",
          },
          {
            stage: "Stage 3",
            title: "Ayush Manufacturing License (Form 25D / Rule 153)",
            authority: "State AYUSH Licensing Authority (SLA)",
            timeline: "Months 2 - 5",
            badge: "Schedule T GMP",
            desc: "Fulfill Ayurvedic Pharmacopoeia of India (API) monograph criteria, Schedule T GMP factory compliance, and secure Form 25D/24D license.",
          },
          {
            stage: "Stage 4",
            title: "Defensive Shield Cryptographic Archival",
            authority: "Defensive Shield Vault / WIPO",
            timeline: "Instant (Post-Licensing)",
            badge: "Biopiracy Preemption",
            desc: "Generate immutable SHA-256 digital certificate to establish prior art and preempt patenting of classical heritage by foreign entities.",
          },
        ],

    ayurveda_aahar: isHindi
      ? [
          {
            stage: "चरण 1",
            title: "अनुसूची A सकारात्मक सूची व्यंजन अनुपालन",
            authority: "FSSAI एवं आयुष संयुक्त समिति",
            timeline: "सप्ताह 1 - 3",
            badge: "अनुमत वानस्पतिक घटक",
            desc: "सत्यापित करें कि सामग्री, वानस्पतिक भाग और पाक प्रसंस्करण विधियां आयुर्वेद आहार विनियम 2022 अनुसूची A के अनुरूप हैं।",
          },
          {
            stage: "चरण 2",
            title: "बीडीए धारा 7 घरेलू खाद्य छूट दाखिला",
            authority: "राज्य जैव विविधता बोर्ड (SBB)",
            timeline: "सप्ताह 2 - 4",
            badge: "एबीएस शुल्क मुक्त",
            desc: "घोषित पारंपरिक आहार उत्पादों के लिए बीडीए 2024 की धारा 7 के तहत वाणिज्यिक लाभ-साझाकरण लेवी से छूट प्राप्त करें।",
          },
          {
            stage: "चरण 3",
            title: "FSSAI FoSCoS विशेष आयुष श्रेणी फॉर्म B पंजीकरण",
            authority: "भारतीय खाद्य सुरक्षा एवं मानक प्राधिकरण",
            timeline: "माह 1 - 3",
            badge: "फॉर्म B लाइसेंस",
            desc: "भारी धातुओं, एफ्लाटॉक्सिन और कीटनाशक अवशेषों के लिए मान्यता प्राप्त प्रयोगशाला परीक्षण रिपोर्ट के साथ FoSCoS पोर्टल पर फॉर्म B आवेदन करें।",
          },
          {
            stage: "चरण 4",
            title: "वैधानिक लोगो मुद्रण एवं पैकेजिंग ऑडिट",
            authority: "FSSAI प्रवर्तन प्रभाग",
            timeline: "माह 2 - 4",
            badge: "बाजार रिलीज",
            desc: "पैकेजिंग पर अनिवार्य आयुर्वेद आहार लोगो मुद्रित करें तथा पोषण संबंधी तथ्य और स्पष्ट गैर-औषधीय स्वास्थ्य संवर्धन अस्वीकरण शामिल करें।",
          },
        ]
      : [
          {
            stage: "Stage 1",
            title: "Schedule A Positive List Recipe Compliance",
            authority: "FSSAI & Ayush Joint Committee",
            timeline: "Weeks 1 - 3",
            badge: "Permissible Botanicals",
            desc: "Verify that ingredients, botanical parts, and culinary processing methods comply with Ayurveda Aahar Regulations 2022 Schedule A.",
          },
          {
            stage: "Stage 2",
            title: "BDA Section 7 Domestic Food Exemption Filing",
            authority: "State Biodiversity Board (SBB)",
            timeline: "Weeks 2 - 4",
            badge: "ABS Free",
            desc: "Secure written confirmation of commercial benefit-sharing exemption under Section 7 of BDA 2024 for declared dietary food items.",
          },
          {
            stage: "Stage 3",
            title: "FSSAI FoSCoS Special AYUSH Category Form B Registration",
            authority: "Food Safety and Standards Authority of India",
            timeline: "Months 1 - 3",
            badge: "Form B License",
            desc: "File electronic Form B licensing on the FoSCoS portal with accredited lab test reports for heavy metals, aflatoxins, and pesticide residues.",
          },
          {
            stage: "Stage 4",
            title: "Statutory Logo Endorsement & Packaging Audit",
            authority: "FSSAI Enforcement Division",
            timeline: "Months 2 - 4",
            badge: "Market Clearance",
            desc: "Mandatorily print the dedicated Ayurveda Aahar logo on cartons with nutritional facts and explicit non-medicinal health maintenance declarations.",
          },
        ],

    herbomineral: isHindi
      ? [
          {
            stage: "चरण 1",
            title: "रस-शास्त्र मोनोग्राफ मानकीकरण एवं शोधन सत्यापन",
            authority: "फार्माकोपिया आयोग (PCIM&H)",
            timeline: "माह 1 - 3",
            badge: "खनिज शोधन",
            desc: "कच्चे खनिजों के शोधन, मारण चक्र को मानकीकृत करें और भस्म भौतिक परीक्षणों (वारितर, रेखापूर्णत्व) को प्रमाणित करें।",
          },
          {
            stage: "चरण 2",
            title: "प्री-क्लिनिकल 28-दिवसीय विषाक्तता एवं तात्विक अशुद्धता प्रोफ़ाइल",
            authority: "एनएबीएल / जीएलपी टॉक्सिकोलॉजी लैब",
            timeline: "माह 3 - 6",
            badge: "नियम 158-B प्रोटोकॉल",
            desc: "कृंतकों में 28-दिवसीय मौखिक विषाक्तता परीक्षण और अनुमेय सीमाओं के अनुरूप तात्विक विश्लेषण (ICP-MS) संचालित करें।",
          },
          {
            stage: "चरण 3",
            title: "राज्य आयुष एसएलए विनिर्माण लाइसेंस (नियम 158-B)",
            authority: "राज्य लाइसेंसिंग प्राधिकरण / औषधि नियंत्रक",
            timeline: "माह 6 - 9",
            badge: "रसौषधि एसएलए लाइसेंस",
            desc: "व्यावसायिक फॉर्म 25D विनिर्माण लाइसेंस प्राप्त करने के लिए राज्य लाइसेंसिंग प्राधिकरण को विषाक्तता सुरक्षा डोज़ियर और बैच सीओए जमा करें।",
          },
          {
            stage: "चरण 4",
            title: "निर्यात जोखिम डोज़ियर एवं पूर्व-निकासी (FDA आयात अलर्ट 54-15)",
            authority: "आयुष निर्यात परिषद / यूएस एफडीए / ईएमए",
            timeline: "माह 9 - 15",
            badge: "निर्यात अनुपालन",
            desc: "अमेरिकी और यूरोपीय बंदरगाहों पर जब्ती और विषाक्तता संवीक्षा से बचने के लिए फार्मास्युटिकल उत्पाद प्रमाणपत्र (सीओपीपी) तैयार करें।",
          },
        ]
      : [
          {
            stage: "Stage 1",
            title: "Rasa-Shastra Monograph Standardization & Shodhana Validation",
            authority: "Pharmacopoeia Commission (PCIM&H)",
            timeline: "Months 1 - 3",
            badge: "Mineral Purification",
            desc: "Standardize raw mineral purifications (Shodhana), calcination cycles (Marana), and verify physical Bhasma tests (Varitara, Rekhapurnatva).",
          },
          {
            stage: "Stage 2",
            title: "Pre-clinical 28-Day Toxicity & Elemental Impurities Profile",
            authority: "NABL / GLP Toxicology Facility",
            timeline: "Months 3 - 6",
            badge: "Rule 158-B Protocol",
            desc: "Conduct mandatory repeated-dose oral toxicity assays in rodents and elemental speciation (ICP-MS) complying with permissible limits.",
          },
          {
            stage: "Stage 3",
            title: "State AYUSH SLA Manufacturing License (Rule 158-B)",
            authority: "State Licensing Authority / Drug Controller",
            timeline: "Months 6 - 9",
            badge: "Rasaushadhi SLA License",
            desc: "Submit toxicological safety dossiers and batch CoAs to the State Licensing Authority to obtain commercial Form 25D manufacturing license.",
          },
          {
            stage: "Stage 4",
            title: "Export Risk Dossier & Pre-Clearance (FDA Import Alert 54-15)",
            authority: "Ayush Export Promotion Council / US FDA / EMA",
            timeline: "Months 9 - 15",
            badge: "Export Compliance",
            desc: "Compile Certificate of Pharmaceutical Product (CoPP) and organometallic safety dossiers to clear toxicological scrutiny and import barriers.",
          },
        ],

    proprietary_asu: isHindi
      ? [
          {
            stage: "चरण 1",
            title: "सिनर्जी बायोएसे एवं फॉर्मूलेशन अनुकूलन (CI < 1)",
            authority: "मान्यता प्राप्त औषधीय परीक्षण प्रयोगशाला",
            timeline: "माह 1 - 4",
            badge: "धारा 3(e) बचाव",
            desc: "आधुनिक खुराक रूप (कैप्सूल, सिरप) विकसित करें और साधारण मिश्रण आक्षेप को दूर करने के लिए कॉम्बिनेशन इंडेक्स (CI < 1) बायोएसे सत्यापित करें।",
          },
          {
            stage: "चरण 2",
            title: "पेटेंट आवेदन फाइलिंग (फॉर्म 1 + फॉर्म 2 विनिर्देश)",
            authority: "भारतीय पेटेंट कार्यालय (IPO)",
            timeline: "माह 4 - 6",
            badge: "फॉर्म 1 फाइलिंग",
            desc: "धारा 3(p) पारंपरिक ज्ञान आपत्तियों को दूर करने के लिए निष्कर्षण गतिशीलता, सहायक सामग्री अनुपात और तालमेल पर केंद्रित दावे तैयार करें।",
          },
          {
            stage: "चरण 3",
            title: "एसबीबी फॉर्म I सूचना एवं बीडीए धारा 10(4) क्रॉस-घोषणा",
            authority: "राज्य जैव विविधता बोर्ड (SBB) एवं IPO",
            timeline: "माह 6 - 8",
            badge: "बीडीए अनुपालन",
            desc: "पेटेंट फॉर्म 1 में जड़ी-बूटियों के भौगोलिक उद्गम का खुलासा करें और राज्य जैव विविधता बोर्ड को फॉर्म I पूर्व सूचना प्रस्तुत करें।",
          },
          {
            stage: "चरण 4",
            title: "राज्य एसएलए स्वामित्व लाइसेंस (नियम 154 / 158-B)",
            authority: "राज्य लाइसेंसिंग प्राधिकरण (SLA)",
            timeline: "माह 8 - 12",
            badge: "प्रोप्राइटरी लाइसेंस",
            desc: "नियम 154 के तहत व्यावसायिक ब्रांड नाम विनिर्माण अनुमोदन प्राप्त करने हेतु वैज्ञानिक साहित्य या पायलट नैदानिक ​​डेटा प्रस्तुत करें।",
          },
          {
            stage: "चरण 5",
            title: "त्वरित पेटेंट परीक्षा (फॉर्म 18A) एवं अनुदान",
            authority: "आईपीओ पेटेंट नियंत्रक",
            timeline: "माह 12 - 24",
            badge: "व्यावसायिक पेटेंट अनुदान",
            desc: "स्टार्टअप/एमएसएमई के तहत फॉर्म 18A से त्वरित परीक्षा कराएं, प्रथम परीक्षा रिपोर्ट (FER) का उत्तर दें और पेटेंट अनुदान सुरक्षित करें।",
          },
        ]
      : [
          {
            stage: "Stage 1",
            title: "Synergy Bioassay & Formulation Optimization (CI < 1)",
            authority: "Accredited Pharmacological Laboratory",
            timeline: "Months 1 - 4",
            badge: "Section 3(e) Defense",
            desc: "Develop modern dosage form (capsule, syrup, topical) and validate Combination Index (CI < 1) bioassays to defeat mere admixture objections.",
          },
          {
            stage: "Stage 2",
            title: "Patent Application Filing (Form 1 + Form 2 Specification)",
            authority: "Indian Patent Office (IPO)",
            timeline: "Months 4 - 6",
            badge: "Form 1 Filing",
            desc: "Draft claims focused on extraction kinetics, unique excipient ratios, and synergistic biological interaction to overcome Section 3(p) TKDL bars.",
          },
          {
            stage: "Stage 3",
            title: "SBB Form I Intimation & BDA Section 10(4) Cross-Declaration",
            authority: "State Biodiversity Board (SBB) & IPO",
            timeline: "Months 6 - 8",
            badge: "BDA Compliance",
            desc: "Disclose exact geographical coordinates of sourced botanical herbs in Patent Form 1 and file Form I intimation with the State Biodiversity Board.",
          },
          {
            stage: "Stage 4",
            title: "State SLA Proprietary License (Rule 154 / 158-B)",
            authority: "State Licensing Authority (SLA)",
            timeline: "Months 8 - 12",
            badge: "Proprietary License",
            desc: "Submit published scientific literature or pilot clinical trial data for commercial brand name manufacturing approval under Rule 154.",
          },
          {
            stage: "Stage 5",
            title: "Accelerated Patent Examination (Form 18A) & Grant",
            authority: "IPO Patent Controller",
            timeline: "Months 12 - 24",
            badge: "Commercial Patent Grant",
            desc: "Fast-track examination using Form 18A (if startup/MSME), address First Examination Report (FER) citations, and obtain patent grant.",
          },
        ],

    cosmeceutical: isHindi
      ? [
          {
            stage: "चरण 1",
            title: "सामयिक सामग्री स्क्रीनिंग एवं बीआईएस अनुपालन (IS 4707)",
            authority: "भारतीय मानक ब्यूरो (BIS) / आयुष",
            timeline: "सप्ताह 1 - 4",
            badge: "IS 4707 मानक",
            desc: "बीआईएस IS 4707 मानकों के अनुसार वानस्पतिक तेलों और अर्क का परीक्षण करें ताकि यह सुनिश्चित हो सके कि कोई प्रतिबंधित सिंथेटिक यौगिक मौजूद नहीं है।",
          },
          {
            stage: "चरण 2",
            title: "त्वचाविज्ञान पैच परीक्षण एवं सूक्ष्मजीवविज्ञानी स्थिरता",
            authority: "प्रमाणित डर्मेटोलॉजिकल टेस्टिंग लैब",
            timeline: "माह 1 - 3",
            badge: "सुरक्षा पुष्टि",
            desc: "त्वचा में जलन/संवेदनशीलता के लिए पैच परीक्षण (HRIPT), त्वरित स्थिरता परीक्षण और परिरक्षक चुनौती परीक्षण संचालित करें।",
          },
          {
            stage: "चरण 3",
            title: "आयुर्वेदिक कॉस्मेटिक विनिर्माण लाइसेंस (फॉर्म 32)",
            authority: "राज्य लाइसेंसिंग प्राधिकरण (भाग XVI नियम)",
            timeline: "माह 3 - 6",
            badge: "फॉर्म 32 लाइसेंस",
            desc: "औषधि एवं प्रसाधन सामग्री नियमावली के भाग XVI के तहत बाहरी उपयोग हेतु फॉर्म 32 कॉस्मेटिक विनिर्माण लाइसेंस प्राप्त करें।",
          },
          {
            stage: "चरण 4",
            title: "वैश्विक नियामक निर्यात फाइलिंग (US MoCRA एवं EU CPNP)",
            authority: "यूएस एफडीए कॉस्मेटिक्स डायरेक्ट / यूरोपीय आयोग सीपीएनपी",
            timeline: "माह 6 - 8",
            badge: "ग्लोबल फास्ट-ट्रैक",
            desc: "यूएस मोकरा 2022 के तहत सुविधा पंजीकरण करें और यूरोपीय सीपीएनपी अधिसूचना हेतु कॉस्मेटिक उत्पाद सुरक्षा रिपोर्ट (CPSR) संकलित करें।",
          },
        ]
      : [
          {
            stage: "Stage 1",
            title: "Topical Formulation Raw Material Screening (IS 4707)",
            authority: "Bureau of Indian Standards (BIS) / AYUSH",
            timeline: "Weeks 1 - 4",
            badge: "IS 4707 Standards",
            desc: "Audit botanical oils, extracts, and emulsifiers against BIS IS 4707 standards to ensure zero prohibited synthetic compounds are present.",
          },
          {
            stage: "Stage 2",
            title: "Dermatological Patch Testing & Microbiological Challenge",
            authority: "Certified Dermatological Testing Laboratory",
            timeline: "Months 1 - 3",
            badge: "Safety Substantiation",
            desc: "Conduct Human Repeat Insult Patch Tests (HRIPT) for dermal tolerance, 3-month accelerated stability, and preservative challenge assays.",
          },
          {
            stage: "Stage 3",
            title: "Ayurvedic Cosmetic Manufacturing License (Form 32)",
            authority: "State Licensing Authority (Part XVI Rules)",
            timeline: "Months 3 - 6",
            badge: "Form 32 License",
            desc: "Obtain Form 32 manufacturing license for external application cosmetics under Part XVI of Drugs and Cosmetics Rules.",
          },
          {
            stage: "Stage 4",
            title: "Global Regulatory Export Filing (US MoCRA & EU CPNP)",
            authority: "US FDA Cosmetics Direct / European Commission CPNP",
            timeline: "Months 6 - 8",
            badge: "Global Fast-Track",
            desc: "Register facility under US MoCRA 2022, submit electronic product listings, and compile Cosmetic Product Safety Report (CPSR) for EU notification.",
          },
        ],
  };

  // Statutory form templates tailored for each category
  const categoryForms: Record<string, StatutoryFormItem[]> = {
    phytopharmaceutical: [
      {
        name: "Patent Form 1",
        title: "Application for Grant of Patent (IPO)",
        authority: "Indian Patent Office",
        fileType: "Statutory PDF Template",
      },
      {
        name: "Patent Form 2",
        title: "Complete Specification (Novel Extraction / Markers)",
        authority: "Indian Patent Office",
        fileType: "DOCX Drafting Template",
      },
      {
        name: "Form 44 (CDSCO)",
        title: "Application for Phytopharmaceutical Drug / IND",
        authority: "CDSCO Central Authority",
        fileType: "Statutory Form Package",
      },
      {
        name: "SBB Form I",
        title: "Prior Intimation for Commercial Biological Resource",
        authority: "State Biodiversity Board (SBB)",
        fileType: "Govt Form Template",
      },
    ],
    classical: [
      {
        name: "Form 25D (AYUSH)",
        title: "License for Manufacture of Classical Ayurvedic Drugs",
        authority: "State Licensing Authority (SLA)",
        fileType: "Govt Application Form",
      },
      {
        name: "SBB Form I Notification",
        title: "Domestic Biological Sourcing (BDA 2024 Rule 14)",
        authority: "State Biodiversity Board",
        fileType: "Compliance Template",
      },
      {
        name: "API Monograph Dossier",
        title: "Ayurvedic Pharmacopoeia of India Standard Checklist",
        authority: "PCIM&H Commission",
        fileType: "Technical PDF Template",
      },
      {
        name: "WIPO Defensive Vault Draft",
        title: "Defensive Prior Art Archival & Cryptographic Cert",
        authority: "WIPO / CSIR Repository",
        fileType: "Defensive Statement DOCX",
      },
    ],
    ayurveda_aahar: [
      {
        name: "FSSAI FoSCoS Form B",
        title: "Application for Special AYUSH Category 100 Food License",
        authority: "FSSAI FoSCoS Central Portal",
        fileType: "Portal Registration PDF",
      },
      {
        name: "Schedule A Audit Form",
        title: "Ayurveda Aahar Permissible Botanical Recipe Monograph",
        authority: "FSSAI & Ministry of Ayush",
        fileType: "Statutory Checklist",
      },
      {
        name: "BDA Section 7 Declaration",
        title: "Exemption from Commercial ABS Levy for Dietary Foods",
        authority: "State Biodiversity Board",
        fileType: "Exemption Affidavit",
      },
      {
        name: "Non-Medical Claim Template",
        title: "Structure / Function Health Maintenance Packaging Disclosure",
        authority: "FSSAI Quality Division",
        fileType: "Labeling Template",
      },
    ],
    herbomineral: [
      {
        name: "Rule 158-B Safety Dossier",
        title: "Safety & Efficacy Submission for Rasaushadhi / Bhasma",
        authority: "State Licensing Authority (SLA)",
        fileType: "Statutory Dossier DOCX",
      },
      {
        name: "28-Day Toxicity Protocol",
        title: "Repeated Dose Oral Animal Toxicology Study Report",
        authority: "GLP / NABL Facility",
        fileType: "Pre-clinical Report Template",
      },
      {
        name: "Form 25D Rasa Application",
        title: "State AYUSH Manufacturing License for Herbomineral",
        authority: "State Drug Controller",
        fileType: "Application Package",
      },
      {
        name: "CoPP Clearance Package",
        title: "Certificate of Pharmaceutical Product for Commercial Export",
        authority: "CDSCO / WHO Certification",
        fileType: "Export Dossier PDF",
      },
    ],
    proprietary_asu: [
      {
        name: "Patent Form 1 (Synergy)",
        title: "Patent Application for Synergistic Herbal Medicine",
        authority: "Indian Patent Office",
        fileType: "Statutory PDF Template",
      },
      {
        name: "Patent Form 2 (CI < 1)",
        title: "Synergy Bioassay & In Vitro Combination Claims",
        authority: "Indian Patent Office",
        fileType: "Drafting Specification DOCX",
      },
      {
        name: "SBB Form I & Sec 10(4)",
        title: "Patent Origin Cross-Declaration & SBB Intimation",
        authority: "State Biodiversity Board & IPO",
        fileType: "Cross-Declaration Form",
      },
      {
        name: "Rule 154 Proprietary SLA",
        title: "Application for Brand Name ASU Patent Medicine License",
        authority: "State Licensing Authority (SLA)",
        fileType: "Govt License Form",
      },
    ],
    cosmeceutical: [
      {
        name: "Form 32 (Cosmetics)",
        title: "Application for License to Manufacture Cosmetics for Sale",
        authority: "State Licensing Authority (Part XVI)",
        fileType: "Statutory Application Form",
      },
      {
        name: "IS 4707 Compliance Checklist",
        title: "BIS Raw Materials & Heavy Metal Limit Verification",
        authority: "Bureau of Indian Standards",
        fileType: "Standards Checklist",
      },
      {
        name: "HRIPT Patch Test Protocol",
        title: "Dermatological Tolerance & Allergen Screening Report",
        authority: "Dermatological Testing Lab",
        fileType: "Clinical Test Template",
      },
      {
        name: "US MoCRA Product Listing",
        title: "Cosmetics Direct Facility Registration & Listing File",
        authority: "US FDA Cosmetics Division",
        fileType: "Export Notification Template",
      },
    ],
  };

  const steps = categoryRoadmaps[currentKey] || categoryRoadmaps.phytopharmaceutical;
  const forms = categoryForms[currentKey] || categoryForms.phytopharmaceutical;

  const handleDownloadForm = (form: StatutoryFormItem) => {
    const content = `========================================================================\nSTATUTORY REGULATORY FORM TEMPLATE: ${form.name}\n========================================================================\nDocument Title: ${form.title}\nRegulating Authority: ${form.authority}\nFile Format: ${form.fileType}\nStatutory Track: ${category}\nTimestamp: ${new Date().toLocaleString()}\n\nSECTION 1: APPLICANT DETAILS\n- Entity Name:\n- Registration / CIN / Incorporation Number:\n- Sourcing Origin of Biological Resources (District, State):\n- National Biodiversity Authority (NBA) Reference / SBB Intimation No:\n\nSECTION 2: TECHNICAL SPECIFICATION\n- Formulation Botanical Ingredients / Dravyas:\n- Dosage Form & Processing Methodology:\n- Analytical Fingerprint / Batch Uniformity Criteria:\n- Heavy Metal / Microbial Limits (Compliant with Official Pharmacopoeia / BIS):\n\nSECTION 3: STATUTORY UNDERTAKING\n- Formally submitted under the provisions of the Patents Act 1970 / Drugs & Cosmetics Act 1940 / BDA 2024.\n\nGenerated via IP Sakti Sahayak Statutory Portal.\n========================================================================`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.name.replace(/[^a-zA-Z0-9]/g, "_")}_template.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mt-5">
      {/* Top Header of Component */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            {t.roadmap_component_title || "Statutory Filing Roadmap & Dossier Generator"}
          </span>
          <span className="text-[11px] text-slate-400">
            {t.roadmap_component_subtitle || "End-to-end regulatory approvals sequence for"}{" "}
            <strong className="text-slate-200">{category}</strong>
          </span>
        </div>
        <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === "roadmap"
                ? "bg-emerald-600 text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.roadmap_tab_sequence || "Filing Sequence"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("forms")}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === "forms"
                ? "bg-emerald-600 text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.roadmap_tab_templates || "Form Templates"}
          </button>
        </div>
      </div>

      {activeTab === "roadmap" ? (
        <div className="space-y-3">
          {/* Milestone Cards */}
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition"
            >
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                  {step.stage}
                </div>
                <span className="text-[9px] font-mono text-slate-500 flex items-center gap-0.5">
                  <Clock size={10} />
                  {step.timeline}
                </span>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <h4 className="text-xs font-semibold text-white break-words">{step.title}</h4>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono border border-slate-700 whitespace-nowrap">
                    {step.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed break-words">{step.desc}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono pt-0.5">
                  <Scale size={11} className="text-slate-500 shrink-0" />
                  <span>
                    {t.roadmap_authority_label || "Authority:"} {step.authority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {forms.map((form, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <span className="text-xs font-semibold text-white block truncate">{form.name}</span>
                <span className="text-[10px] text-slate-400 block line-clamp-1 leading-snug">
                  {form.title}
                </span>
                <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono pt-1">
                  <span>{form.authority}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{form.fileType}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDownloadForm(form)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-medium transition flex items-center gap-1 shrink-0"
              >
                <Download size={11} />
                <span>{t.download_btn || "Download ↓"}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}