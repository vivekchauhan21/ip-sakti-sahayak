const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const docsDir = path.join(__dirname, '..', 'public', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const guides = [
  {
    lang: 'en',
    title: 'IP-SAKTI SAHAYAK - Statutory IP Framework & Patentability Guide',
    sub: 'Indian Patents Act 1970, BDA 2024, and AYUSH Regulatory Compliance',
    sections: [
      { title: '1. Section 3(p) - Traditional Knowledge Exclusion', body: 'Under Section 3(p) of the Indian Patents Act, an invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not an invention. Applicants must establish non-obvious technological synergy or inventive step beyond TKDL references.' },
      { title: '2. Section 3(e) - Mere Admixture & Synergistic Burden', body: 'Section 3(e) excludes a substance obtained by a mere admixture resulting only in aggregation of the properties of the components thereof. To overcome 3(e), applicants must demonstrate statutory synergy with quantitative pharmacological proof (e.g., CI < 1.0 or bio-enhancement indices).' },
      { title: '3. Biological Diversity Act (BDA 2002 / 2024)', body: 'Section 3 & 19 mandate NBA prior approval for foreign entities/IPRs. Section 7 requires prior intimation to State Biodiversity Boards (SBB) for commercial utilization of Indian bio-resources. Section 24 governs equitable Access and Benefit Sharing (ABS).' },
      { title: '4. Drugs & Cosmetics Act (GSR 918(E)) - Phytopharmaceuticals', body: 'Defines regulatory tracks for purified fractions of medicinal plants. Mandates chromatographic profiling, stability testing, toxicological safety, and clinical trial evidence as per CDSCO / AYUSH guidelines.' },
      { title: '5. TKDL Defensive Protection', body: 'CSIR Traditional Knowledge Digital Library serves as prior art across 34+ international patent offices (USPTO, EPO, JPO, etc.) preventing biopiracy and wrongful patent grants.' }
    ]
  },
  {
    lang: 'hi',
    title: 'आईपी-शक्ति सहायक (IP-SAKTI SAHAYAK) - वैधानिक पेटेंट ढांचा एवं दिशानिर्देश',
    sub: 'भारतीय पेटेंट अधिनियम 1970, जैव विविधता अधिनियम (BDA 2024), एवं आयुष विनियामक अनुपालन',
    sections: [
      { title: '1. धारा 3(p) - पारंपरिक ज्ञान (TK) अपवर्जन', body: 'भारतीय पेटेंट अधिनियम की धारा 3(p) के तहत पारंपरिक ज्ञान या उसके ज्ञात गुणों का मात्र संकलन पेटेंट योग्य नहीं है। TKDL संदर्भों से परे गैर-स्पष्ट तकनीकी तालमेल (synergy) सिद्ध करना अनिवार्य है।' },
      { title: '2. धारा 3(e) - मात्र मिश्रण अपवर्जन एवं सिनर्जिस्टिक प्रमाण', body: 'मात्र मिश्रण से घटकों के व्यक्तिगत गुणों का संकलन धारा 3(e) के तहत वर्जित है। पेटेंट हेतु मात्रात्मक प्रमाण द्वारा यह सिद्ध करना होगा कि घटकों का संयुक्त प्रभाव उनके व्यक्तिगत प्रभावों से अधिक है।' },
      { title: '3. जैविक विविधता अधिनियम (BDA 2002 / 2024)', body: 'धारा 3 व 19 के अंतर्गत विदेशी संस्थाओं हेतु राष्ट्रीय जैव विविधता प्राधिकरण (NBA) की पूर्व अनुमति आवश्यक है। धारा 7 के तहत राज्य जैव विविधता बोर्ड (SBB) को पूर्व सूचना एवं धारा 24 के तहत निष्पक्ष लाभ-साझाकरण (ABS) अनिवार्य है।' },
      { title: '4. औषधि एवं प्रसाधन सामग्री नियम (GSR 918(E)) - फाइटोफार्मास्युटिकल', body: 'औषधीय पौधों के मानकीकृत अंशों के लिए विनियामक दिशानिर्देश। क्रोमैटोग्राफिक प्रोफाइलिंग, विषाक्तता अध्ययन एवं नैदानिक परीक्षण अनिवार्य हैं।' },
      { title: '5. TKDL रक्षात्मक तंत्र', body: 'CSIR पारंपरिक ज्ञान डिजिटल लाइब्रेरी 34+ अंतरराष्ट्रीय पेटेंट कार्यालयों में पूर्व-कला (prior art) के रूप में कार्य करती है और बायोपायरेसी रोकती है।' }
    ]
  },
  {
    lang: 'ta',
    title: 'IP-SAKTI SAHAYAK - காப்புரிமை மற்றும் ஒழுங்குமுறை வழிகாட்டி (Tamil)',
    sub: 'இந்திய காப்புரிமை சட்டம் 1970, பல்லுயிர் சட்டம் 2024 மற்றும் ஆயுஷ் இணக்கம்',
    sections: [
      { title: '1. பிரிவு 3(p) - பாரம்பரிய அறிவு விலக்கு (Traditional Knowledge)', body: 'பாரம்பரிய அறிவின் அடிப்படையில் உள்ள கண்டுபிடிப்புகள் அல்லது அவற்றின் அறியப்பட்ட பண்புகளின் தொகுப்புகள் காப்புரிமை பெற தகுதியற்றவை. TKDL ஆவணங்களுக்கு அப்பாற்பட்ட புதுமை மற்றும் சினெர்ஜியை நிரூபிக்க வேண்டும்.' },
      { title: '2. பிரிவு 3(e) - வெறும் கலவை விலக்கு மற்றும் சினெர்ஜி சுமை', body: 'பொருட்களின் பண்புகளை மட்டும் காட்டும் வெறும் கலவைகளுக்கு காப்புரிமை வழங்கப்படாது. கூட்டாக செயல்படும் தனித்துவ பலனை அறிவியல் ரீதியாக நிரூபிக்க வேண்டும்.' },
      { title: '3. பல்லுயிர் சட்டம் (BDA 2002 / 2024)', body: 'பிரிவு 3 மற்றும் 19 இன் படி NBA முன் அனுமதி அவசியம். பிரிவு 7 இன் கீழ் மாநில பல்லுயிர் வாரியத்திற்கு (SBB) முன் அறிவிப்பு மற்றும் பயன் பகிர்வு (ABS) கட்டாயம்.' },
      { title: '4. மருந்துகள் & அழகுசாதனப் பொருட்கள் விதி (GSR 918(E))', body: 'பைட்டோபார்மாசூட்டிகல் மருத்துவ தயாரிப்புகளுக்கான ஒழுங்குமுறை நெறிமுறைகள், பாதுகாப்பு ஆய்வுகள் மற்றும் மருத்துவ பரிசோதனை வழிகாட்டுதல்கள்.' },
      { title: '5. TKDL மற்றும் பயோபைரசி பாதுகாப்பு', body: 'பாரம்பரிய அறிவை பாதுகாக்கும் சர்வதேச மின்னணு தரவுத்தளம்.' }
    ]
  },
  {
    lang: 'te',
    title: 'IP-SAKTI SAHAYAK - పేటెంట్ మరియు చట్టపరమైన ఫ్రేమ్‌వర్క్ గైడ్ (Telugu)',
    sub: 'భారత పేటెంట్ల చట్టం 1970, జీవ వైవిధ్య చట్టం 2024 మరియు ఆయుష్ నియమావళి',
    sections: [
      { title: '1. సెక్షన్ 3(p) - సాంప్రదాయ విజ్ఞాన మినహాయింపు (Traditional Knowledge)', body: 'సాంప్రదాయ విజ్ఞానం లేదా తెలిసిన లక్షణాల సంకలనం మాత్రమే పేటెంట్ పొందడానికి అర్హత లేదు. TKDL ఆధారాలకు మించిన సాంకేతిక ఆవిష్కరణను రుజువు చేయాలి.' },
      { title: '2. సెక్షన్ 3(e) - మిశ్రమాల మినహాయింపు మరియు సినర్జీ భారం', body: 'సాధారణ మిశ్రమాలు సెక్షన్ 3(e) కింద మినహాయించబడ్డాయి. కాంపోనెంట్ల సినర్జిస్టిక్ ప్రభావాన్ని పరిమాణాత్మకంగా చూపించాలి.' },
      { title: '3. జీవ వైవిధ్య చట్టం (BDA 2002 / 2024)', body: 'సెక్షన్ 3 & 19 ప్రకారం NBA ముందస్తు అనుమతి తప్పనిసరి. సెక్షన్ 7 కింద రాష్ట్ర జీవవైవిధ్య బోర్డు (SBB) సమాచారం మరియు ABS నిబంధనలు పాటించాలి.' },
      { title: '4. డ్రగ్స్ & కాస్మెటిక్స్ చట్టం (GSR 918(E)) - ఫైటోఫార్మాస్యూటికల్స్', body: 'ప్రమాణీకరించిన బొటానికల్ ఎక్స్‌ట్రాక్ట్‌ల కోసం శాస్త్రీయ క్లినికల్ ట్రయల్స్ మరియు భద్రతా ప్రమాణాలు.' },
      { title: '5. TKDL బయోపైరసీ రక్షణ', body: 'భారతీయ సాంప్రదాయ విజ్ఞానాన్ని అంతర్జాతీయ పేటెంట్ కార్యాలయాల వద్ద కాపాడే డిజిటల్ లైబ్రరీ.' }
    ]
  },
  {
    lang: 'bn',
    title: 'IP-SAKTI SAHAYAK - বিধিবদ্ধ পেটেন্ট ও আইনি নির্দেশিকা (Bengali)',
    sub: 'ভারতীয় পেটেন্ট আইন ১৯৭০, জৈব বৈচিত্র্য আইন ২০২৪ এবং আয়ুষ প্রবিধান',
    sections: [
      { title: '১. ধারা ৩(p) - ঐতিহ্যবাহী জ্ঞান (Traditional Knowledge) বর্জন', body: 'ঐতিহ্যবাহী জ্ঞান বা তার পরিচিত গুণাবলীর সংকলন ধারা ৩(p) এর অধীনে পেটেন্টযোগ্য নয়। উদ্ভাবনী সমন্বয় বা সিনার্জি প্রমাণ করা আবশ্যক।' },
      { title: '২. ধারা ৩(e) - নিছক মিশ্রণ বর্জন এবং সিনার্জি প্রমাণের শর্ত', body: 'শুধুমাত্র উপাদানের সমষ্টি ধারা ৩(e) এর অধীনে অগ্রাহ্য। সংমিশ্রণের সম্মিলিত কার্যকারিতা পৃথক উপাদানের চেয়ে বেশি প্রমাণ করতে হবে।' },
      { title: '৩. জৈব বৈচিত্র্য আইন (BDA 2002 / 2024)', body: 'ধারা ৩ ও ১৯ অনুসারে জাতীয় জৈব বৈচিত্র্য কর্তৃপক্ষ (NBA) পূর্বানুমোদন বাধ্যতামূলক। রাজ্য জীববৈচিত্র্য বোর্ড (SBB) কে অবহিতকরণ এবং সুষম সুবিধা বণ্টন (ABS) প্রযোজ্য।' },
      { title: '৪. ড্রাগস অ্যান্ড কসমেটিকস অ্যাক্ট (GSR 918(E)) - ফাইটোফার্মাসিউটিক্যালস', body: 'উদ্ভিজ্জ ঔষধি নির্যাসের জন্য সুরক্ষা ও ক্লিনিকাল ট্রায়াল বিধিমালা।' },
      { title: '৫. TKDL এবং বায়োপাইরেসি প্রতিরোধ', body: 'আন্তর্জাতিকভাবে ভারতীয় ঐতিহ্যবাহী জ্ঞান সুরক্ষার ডিজিটাল ডাটাবেস।' }
    ]
  }
];

for (const item of guides) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  
  // Header bar
  doc.setFillColor(7, 13, 24); // #070d18
  doc.rect(0, 0, 595, 842, 'F');
  
  // Top Banner
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 0, 595, 6, 'F');
  
  // Header box
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(36, 36, 523, 90, 8, 8, 'F');
  
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('IP-SAKTI SAHAYAK', 54, 68);

  doc.setFontSize(10);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text(`STATUTORY IP FRAMEWORK GUIDE [${item.lang.toUpperCase()}]`, 54, 85);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Compliance with Indian Patents Act 1970, BDA 2024, GSR 918(E), and CSIR-TKDL', 54, 105);

  let y = 150;
  for (const s of item.sections) {
    // Card background
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(36, y, 523, 92, 6, 6, 'F');
    
    // Emerald left accent
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(36, y, 4, 92, 2, 2, 'F');
    
    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(241, 245, 249); // slate-100
    doc.text(s.title, 50, y + 22);
    
    // Section body text (wrapped)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225); // slate-300
    const lines = doc.splitTextToSize(s.body, 495);
    doc.text(lines, 50, y + 42);
    
    y += 106;
  }

  // Footer
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(36, 765, 523, 45, 6, 6, 'F');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Government Portals: CSIR-TKDL (tkdl.res.in) | IP India (ipindia.gov.in) | NBA India (nbaindia.org) | India Code', 54, 785);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(52, 211, 153);
  doc.text('Generated by IP-SAKTI SAHAYAK AYUSH LegalTech Engine - Official Reference Guide', 54, 798);

  const outPath = path.join(docsDir, `ip-sakti-guide-${item.lang}.pdf`);
  fs.writeFileSync(outPath, Buffer.from(doc.output('arraybuffer')));
  console.log('Created:', outPath);
}
console.log('All 5 guide PDFs successfully generated in public/docs/');
