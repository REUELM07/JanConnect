import { Language } from '../types';

export const translations = {
  en: {
    portalName: 'JanConnect AI',
    subTitle: 'Digital Citizen Services & Grievance Redressal Gateway',
    govIdentity: 'Government of India & State Digital Initiative',
    helplines: {
      consumer: '1915 (National Consumer)',
      electricity: '1912 (Electricity Helpline)',
      cpgrams: '1800-11-4000 (CPGRAMS)',
      water: '1916 (Water Supply)',
    },
    nav: {
      home: 'Home',
      services: 'Government Services',
      policySearch: 'Policy Search',
      fileComplaint: 'File a Complaint',
      applicationAssistant: 'Application Assistant',
      myApplications: 'My Applications',
    },
    hero: {
      title: 'Government services, made easier with AI.',
      subtitle: 'Ask questions, discover government policies, file complaints and get help with government applications — all through one AI assistant.',
      inputPlaceholder: 'Describe your problem or request in plain language (e.g. "My water bill is ₹5,000 instead of ₹1,000, how to complain?" or "How to apply for income certificate?")...',
      askButton: 'Submit Query',
      uploadDocButton: 'Upload Bill / Document',
      voiceInput: 'Voice Input',
      voiceListening: 'Listening...',
      suggestedHeading: 'Suggested Citizen Queries:',
      suggested: [
        'How do I apply for a Driving Licence (Sarathi Parivahan)?',
        'Find water supply policies in Punjab.',
        'My water bill is unusually high. How can I complain?',
        'How do I report an electricity outage?',
        'Find government schemes for farmers.',
        'Help me apply for an income certificate.',
        'What documents are required for a new water connection?'
      ]
    },
    complaint: {
      heading: 'AI-Powered Citizen Grievance Filing',
      subheading: 'Describe your issue in your own words. JanConnect AI automatically identifies the complaint type, responsible department, and prepares your official petition.',
      inputPlaceholder: 'e.g., "My water bill this month is ₹5,000, whereas it used to be around ₹1,000. I want to complain." or "There has been no water supply in my village for five days."',
      analyzeButton: 'Analyze Grievance & Prepare Docket',
      detectedCategory: 'Identified Complaint Category',
      responsibleDept: 'Responsible Government Department',
      officialAuthority: 'Competent Authority',
      officialPortal: 'Official Redressal Portal',
      resolutionStandard: 'Statutory Resolution Period',
      missingInfoPrompt: 'Please provide the following details to complete your official petition:',
      petitionDraft: 'Structured Grievance Petition (Official Draft)',
      applicantDetails: 'Citizen Applicant Details',
      supportingDocs: 'Required Supporting Documents Checklist',
      submitApprovalText: 'I hereby verify that the facts stated in this grievance are true to the best of my knowledge.',
      submitButton: 'Approve & Submit to Official Grievance Cell',
      startAutomationButton: 'Launch Guided Portal Automation',
      submissionSuccess: 'Grievance Successfully Registered & Docketed',
      referenceNumber: 'Official Reference Number',
      trackInMyApps: 'View in My Applications',
      downloadReceipt: 'Download Official Acknowledgment Receipt'
    },
    services: {
      heading: 'Citizen Public Services Directory',
      subheading: 'Access verified central and state public services with statutory turnaround timelines under Right to Public Service (RTS).',
      filterAll: 'All Categories',
      filterState: 'Filter by State / UT',
      searchPlaceholder: 'Search by service name, certificate, or department...',
      applyWithAI: 'Apply with AI Assistant',
      viewDetails: 'View Requirements'
    },
    policy: {
      heading: 'AI Government Policy & Circular Research',
      subheading: 'Search acts, official government gazettes, schemes, and guidelines backed by verified .gov.in sources.',
      placeholder: 'Search any scheme or policy (e.g. "Jal Jeevan Mission guidelines", "PM Surya Ghar eligibility", "Punjab Right to Service Act")...',
      searchButton: 'Research Policy',
      officialSources: 'Verified Government Sources Cited',
      eligibility: 'Eligibility Criteria',
      procedure: 'Statutory Application Procedure'
    },
    docs: {
      heading: 'Document Intelligence & Bill Auditor',
      subheading: 'Upload electricity bills, water bills, or government circulars. The AI detects reading anomalies, tariff leaps, and provides formal grievance remedies.',
      uploadTitle: 'Drop utility bill or document here',
      uploadSubtitle: 'Supports PNG, JPG, or PDF (Max 10MB)',
      orSelectSample: 'Or try with verified sample bill:',
      sampleWaterBill: 'Sample Disputed Water Bill (₹5,420 vs ₹950 avg)',
      sampleElectricityBill: 'Sample Commercial Tariff Disputed Bill',
      analysisReport: 'AI Billing Audit & Anomaly Detection Report',
      proceedWithBill: 'File Official Complaint with this Bill'
    },
    myApps: {
      heading: 'My Applications & Registered Grievances',
      subheading: 'Track the real-time status of your complaints and scheme applications dispatched to government departments.',
      lookupPlaceholder: 'Enter Reference Number (e.g. CPGRAMS/2026/DEL/049812)...',
      lookupButton: 'Track Status',
      tabAll: 'All Records',
      tabComplaints: 'Complaints & Grievances',
      tabApplications: 'Service Applications',
      empty: 'No applications found matching your criteria.'
    },
    common: {
      days: 'days',
      officialGovDomain: 'Verified Official Government Link',
      close: 'Close',
      print: 'Print Receipt',
      loading: 'Contacting Government Information Gateway...',
      error: 'An error occurred while contacting the service.'
    }
  },
  hi: {
    portalName: 'जन कनेक्ट एआई',
    subTitle: 'डिजिटल नागरिक सेवाएं एवं जन शिकायत निवारण पोर्टल',
    govIdentity: 'भारत सरकार एवं राज्य डिजिटल सेवा पहल',
    helplines: {
      consumer: '1915 (राष्ट्रीय उपभोक्ता हेल्पलाइन)',
      electricity: '1912 (विद्युत हेल्पलाइन)',
      cpgrams: '1800-11-4000 (सीपीजीआरएएमएस)',
      water: '1916 (जल आपूर्ति हेल्पलाइन)',
    },
    nav: {
      home: 'मुख्य पृष्ठ',
      services: 'सरकारी सेवाएं',
      policySearch: 'नीति खोज',
      fileComplaint: 'शिकायत दर्ज करें',
      applicationAssistant: 'आवेदन सहायक',
      myApplications: 'मेरे आवेदन एवं शिकायतें',
    },
    hero: {
      title: 'सरकारी सेवाएं, एआई से अब और भी आसान।',
      subtitle: 'सवाल पूछें, सरकारी नीतियां खोजें, शिकायतें दर्ज करें और सरकारी आवेदनों में सहायता पाएं — सब कुछ एक एआई सहायक के माध्यम से।',
      inputPlaceholder: 'अपनी समस्या सामान्य भाषा में बताएं (जैसे "मेरा पानी का बिल ₹1,000 की जगह ₹5,000 आया है, शिकायत कैसे करें?")...',
      askButton: 'पूछें',
      uploadDocButton: 'बिल / दस्तावेज़ अपलोड करें',
      voiceInput: 'बोलकर बताएं',
      voiceListening: 'सुन रहे हैं...',
      suggestedHeading: 'नागरिकों द्वारा पूछे गए सामान्य प्रश्न:',
      suggested: [
        'ड्राइविंग लाइसेंस (सारथी परिवहन) के लिए आवेदन कैसे करें?',
        'पंजाब में जल आपूर्ति नीतियां खोजें।',
        'मेरा पानी का बिल असामान्य रूप से अधिक है। मैं कैसे शिकायत कर सकता हूं?',
        'बिजली कटौती की शिकायत कैसे दर्ज करें?',
        'किसानों के लिए सरकारी योजनाएं बताएं।',
        'आय प्रमाण पत्र के लिए आवेदन में मदद करें।',
        'नए पानी के कनेक्शन के लिए कौन से दस्तावेज चाहिए?'
      ]
    },
    complaint: {
      heading: 'एआई-संचालित नागरिक शिकायत निवारण',
      subheading: 'अपनी समस्या अपने शब्दों में बताएं। जन कनेक्ट एआई स्वचालित रूप से शिकायत की श्रेणी, उत्तरदायी विभाग की पहचान करता है और औपचारिक याचिका तैयार करता है।',
      inputPlaceholder: 'उदा. "इस महीने मेरा पानी का बिल ₹5,000 आया है जबकि आमतौर पर ₹1,000 आता था। मुझे शिकायत करनी है।"',
      analyzeButton: 'शिकायत का विश्लेषण करें एवं याचिका बनाएं',
      detectedCategory: 'पहचानी गई शिकायत श्रेणी',
      responsibleDept: 'उत्तरदायी सरकारी विभाग',
      officialAuthority: 'सक्षम प्राधिकारी',
      officialPortal: 'आधिकारिक निवारण पोर्टल',
      resolutionStandard: 'सेवा का अधिकार अधिनियम अंतर्गत समय-सीमा',
      missingInfoPrompt: 'याचिका पूर्ण करने हेतु कृपया निम्नलिखित विवरण दर्ज करें:',
      petitionDraft: 'औपचारिक शिकायत याचिका (आधिकारिक मसौदा)',
      applicantDetails: 'आवेदक नागरिक का विवरण',
      supportingDocs: 'आवश्यक सहायक दस्तावेज़ सूची',
      submitApprovalText: 'मैं प्रमाणित करता/करती हूं कि इस शिकायत में दिए गए सभी तथ्य पूर्णतः सत्य हैं।',
      submitButton: 'स्वीकार करें एवं आधिकारिक प्रकोष्ठ में दर्ज करें',
      startAutomationButton: 'पोर्टल ऑटोमेशन प्रारंभ करें',
      submissionSuccess: 'शिकायत सफलतापूर्वक पंजीकृत एवं प्रेषित की गई',
      referenceNumber: 'आधिकारिक संदर्भ संख्या (Reference No.)',
      trackInMyApps: 'मेरे आवेदन में देखें',
      downloadReceipt: 'आधिकारिक पावती रसीद डाउनलोड करें'
    },
    services: {
      heading: 'नागरिक लोक सेवा निर्देशिका',
      subheading: 'लोक सेवा गारंटी कानून (RTS) के तहत निर्धारित समय-सीमा के साथ केंद्रीय एवं राज्य सरकारी सेवाएं प्राप्त करें।',
      filterAll: 'सभी श्रेणियां',
      filterState: 'राज्य अनुसार चुनें',
      searchPlaceholder: 'सेवा का नाम, प्रमाण पत्र या विभाग खोजें...',
      applyWithAI: 'एआई सहायक के साथ आवेदन करें',
      viewDetails: 'शर्तें देखें'
    },
    policy: {
      heading: 'एआई सरकारी नीति एवं परिपत्र अनुसंधान',
      subheading: 'सत्यापित .gov.in स्रोतों पर आधारित अधिनियम, सरकारी राजपत्र, योजनाएं और दिशानिर्देश खोजें।',
      placeholder: 'योजना या नीति खोजें (उदा. "जल जीवन मिशन दिशानिर्देश", "पीएम सूर्य घर पात्रता")...',
      searchButton: 'नीति खोजें',
      officialSources: 'सत्यापित सरकारी स्रोत',
      eligibility: 'पात्रता मानदंड',
      procedure: 'आवेदन प्रक्रिया'
    },
    docs: {
      heading: 'दस्तावेज़ विश्लेषण एवं बिल परीक्षक',
      subheading: 'बिजली या पानी का बिल अपलोड करें। एआई मीटर रीडिंग में विसंगति और अनुचित दरों का विश्लेषण कर शिकायत का आधार तैयार करता है।',
      uploadTitle: 'बिल या दस्तावेज़ यहां डालें',
      uploadSubtitle: 'PNG, JPG या PDF का समर्थन (अधिकतम 10MB)',
      orSelectSample: 'या नमूना बिल से जांचें:',
      sampleWaterBill: 'विवादित जल आपूर्ति बिल (₹5,420 बनाम ₹950 औसत)',
      sampleElectricityBill: 'विद्युत टैरिफ विवादित बिल',
      analysisReport: 'एआई बिलिंग ऑडिट एवं विसंगति रिपोर्ट',
      proceedWithBill: 'इस बिल के साथ शिकायत दर्ज करें'
    },
    myApps: {
      heading: 'मेरी शिकायतें एवं आवेदन',
      subheading: 'सरकारी विभागों को भेजी गई अपनी शिकायतों और आवेदनों की वास्तविक स्थिति ट्रैक करें।',
      lookupPlaceholder: 'संदर्भ संख्या दर्ज करें (जैसे CPGRAMS/2026/DEL/049812)...',
      lookupButton: 'स्थिति देखें',
      tabAll: 'सभी रिकॉर्ड',
      tabComplaints: 'शिकायतें',
      tabApplications: 'सेवा आवेदन',
      empty: 'कोई रिकॉर्ड नहीं मिला।'
    },
    common: {
      days: 'दिन',
      officialGovDomain: 'सत्यापित आधिकारिक सरकारी लिंक',
      close: 'बंद करें',
      print: 'रसीद प्रिंट करें',
      loading: 'सरकारी सूचना तंत्र से संपर्क हो रहा है...',
      error: 'त्रुटि उत्पन्न हुई, कृपया पुनः प्रयास करें।'
    }
  },
  pa: {
    portalName: 'ਜਨ ਕਨੈਕਟ ਏਆਈ',
    subTitle: 'ਡਿਜੀਟਲ ਨਾਗਰਿਕ ਸੇਵਾਵਾਂ ਅਤੇ ਜਨਤਕ ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ ਪੋਰਟਲ',
    govIdentity: 'ਭਾਰਤ ਸਰਕਾਰ ਅਤੇ ਰਾਜ ਡਿਜੀਟਲ ਸੇਵਾ ਪਹਿਲਕਦਮੀ',
    helplines: {
      consumer: '1915 (ਰਾਸ਼ਟਰੀ ਖਪਤਕਾਰ ਹੈਲਪਲਾਈਨ)',
      electricity: '1912 (ਬਿਜਲੀ ਹੈਲਪਲਾਈਨ)',
      cpgrams: '1800-11-4000 (ਸੀਪੀਜੀਆਰਏਐਮਐਸ)',
      water: '1916 (ਜਲ ਸਪਲਾਈ ਹੈਲਪਲਾਈਨ)',
    },
    nav: {
      home: 'ਮੁੱਖ ਪੰਨਾ',
      services: 'ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ',
      policySearch: 'ਨੀਤੀ ਖੋਜ',
      fileComplaint: 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
      applicationAssistant: 'ਅਰਜ਼ੀ ਸਹਾਇਕ',
      myApplications: 'ਮੇਰੀਆਂ ਅਰਜ਼ੀਆਂ',
    },
    hero: {
      title: 'ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ, ਏਆਈ ਨਾਲ ਹੁਣ ਹੋਰ ਵੀ ਆਸਾਨ।',
      subtitle: 'ਸਵਾਲ ਪੁੱਛੋ, ਸਰਕਾਰੀ ਨੀਤੀਆਂ ਜਾਣੋ, ਸ਼ਿਕਾਇਤਾਂ ਦਰਜ ਕਰੋ ਅਤੇ ਸਰਕਾਰੀ ਅਰਜ਼ੀਆਂ ਵਿੱਚ ਮਦਦ ਲਵੋ — ਸਭ ਇੱਕੋ ਏਆਈ ਸਹਾਇਕ ਰਾਹੀਂ।',
      inputPlaceholder: 'ਆਪਣੀ ਸਮੱਸਿਆ ਸਧਾਰਨ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖੋ (ਜਿਵੇਂ "ਮੇਰਾ ਪਾਣੀ ਦਾ ਬਿਲ ₹1,000 ਦੀ ਥਾਂ ₹5,000 ਆਇਆ ਹੈ, ਸ਼ਿਕਾਇਤ ਕਿਵੇਂ ਕਰਾਂ?")...',
      askButton: 'ਸਵਾਲ ਪੁੱਛੋ',
      uploadDocButton: 'ਬਿਲ / ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ',
      voiceInput: 'ਬੋਲ ਕੇ ਦੱਸੋ',
      voiceListening: 'ਸੁਣ ਰਹੇ ਹਾਂ...',
      suggestedHeading: 'ਆਮ ਨਾਗਰਿਕ ਸਵਾਲ:',
      suggested: [
        'ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ (ਸਾਰਥੀ ਪਰਿਵਹਨ) ਲਈ ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ?',
        'ਪੰਜਾਬ ਵਿੱਚ ਜਲ ਸਪਲਾਈ ਨੀਤੀਆਂ ਲੱਭੋ।',
        'ਮੇਰਾ ਪਾਣੀ ਦਾ ਬਿਲ ਬਹੁਤ ਵੱਧ ਆਇਆ ਹੈ। ਮੈਂ ਕਿਵੇਂ ਸ਼ਿਕਾਇਤ ਕਰ ਸਕਦਾ ਹਾਂ?',
        'ਬਿਜਲੀ ਕੱਟ ਦੀ ਰਿਪੋਰਟ ਕਿਵੇਂ ਕਰੀਏ?',
        'ਕਿਸਾਨਾਂ ਲਈ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਲੱਭੋ।',
        'ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ ਲਈ ਅਪਲਾਈ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੋ।',
        'ਨਵੇਂ ਪਾਣੀ ਦੇ ਕੁਨੈਕਸ਼ਨ ਲਈ ਕਿਹੜੇ ਦਸਤਾਵੇਜ਼ ਚਾਹੀਦੇ ਹਨ?'
      ]
    },
    complaint: {
      heading: 'ਏਆਈ-ਸੰਚਾਲਿਤ ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ',
      subheading: 'ਆਪਣੀ ਸਮੱਸਿਆ ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਦੱਸੋ। ਜਨ ਕਨੈਕਟ ਏਆਈ ਸ਼ਿਕਾਇਤ ਸ਼੍ਰੇਣੀ, ਜ਼ਿੰਮੇਵਾਰ ਵਿਭਾਗ ਦੀ ਪਛਾਣ ਕਰਦਾ ਹੈ ਅਤੇ ਅਧਿਕਾਰਤ ਪਟੀਸ਼ਨ ਤਿਆਰ ਕਰਦਾ ਹੈ।',
      inputPlaceholder: 'ਉਦਾਹਰਣ: "ਇਸ ਮਹੀਨੇ ਮੇਰੇ ਪਿੰਡ ਵਿੱਚ ਪੰਜ ਦਿਨਾਂ ਤੋਂ ਪਾਣੀ ਦੀ ਸਪਲਾਈ ਨਹੀਂ ਆਈ। ਮੈਨੂੰ ਸ਼ਿਕਾਇਤ ਕਰਨੀ ਹੈ।"',
      analyzeButton: 'ਸ਼ਿਕਾਇਤ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ ਅਤੇ ਪਟੀਸ਼ਨ ਬਣਾਓ',
      detectedCategory: 'ਸ਼ਿਕਾਇਤ ਦੀ ਸ਼੍ਰੇਣੀ',
      responsibleDept: 'ਜ਼ਿੰਮੇਵਾਰ ਸਰਕਾਰੀ ਵਿਭਾਗ',
      officialAuthority: 'ਯੋਗ ਅਧਿਕਾਰੀ',
      officialPortal: 'ਅਧਿਕਾਰਤ ਨਿਵਾਰਨ ਪੋਰਟਲ',
      resolutionStandard: 'ਸੇਵਾ ਦੇ ਅਧਿਕਾਰ ਐਕਟ ਅਧੀਨ ਸਮਾਂ-ਸੀਮਾ',
      missingInfoPrompt: 'ਪਟੀਸ਼ਨ ਪੂਰੀ ਕਰਨ ਲਈ ਹੇਠਾਂ ਦਿੱਤੇ ਵੇਰਵੇ ਭਰੋ:',
      petitionDraft: 'ਰਸਮੀ ਸ਼ਿਕਾਇਤ ਪਟੀਸ਼ਨ (ਅਧਿਕਾਰਤ ਡਰਾਫਟ)',
      applicantDetails: 'ਨਾਗਰਿਕ ਬਿਨੈਕਾਰ ਦਾ ਵੇਰਵਾ',
      supportingDocs: 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਸੂਚੀ',
      submitApprovalText: 'ਮੈਂ ਤਸਦੀਕ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ ਕਿ ਇਸ ਸ਼ਿਕਾਇਤ ਵਿੱਚ ਦਿੱਤੇ ਗਏ ਸਾਰੇ ਤੱਥ ਸੱਚ ਹਨ।',
      submitButton: 'ਪ੍ਰਵਾਨ ਕਰੋ ਅਤੇ ਸਰਕਾਰੀ ਵਿਭਾਗ ਨੂੰ ਭੇਜੋ',
      startAutomationButton: 'ਪੋਰਟਲ ਆਟੋਮੇਸ਼ਨ ਸ਼ੁਰੂ ਕਰੋ',
      submissionSuccess: 'ਸ਼ਿਕਾਇਤ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਕੀਤੀ ਗਈ',
      referenceNumber: 'ਅਧਿਕਾਰਤ ਹਵਾਲਾ ਨੰਬਰ (Reference No.)',
      trackInMyApps: 'ਮੇਰੀਆਂ ਅਰਜ਼ੀਆਂ ਵਿੱਚ ਦੇਖੋ',
      downloadReceipt: 'ਰਸੀਦ ਡਾਊਨਲੋਡ ਕਰੋ'
    },
    services: {
      heading: 'ਨਾਗਰਿਕ ਜਨਤਕ ਸੇਵਾਵਾਂ ਡਾਇਰੈਕਟਰੀ',
      subheading: 'ਸੇਵਾ ਦਾ ਅਧਿਕਾਰ (RTS) ਕਾਨੂੰਨ ਅਧੀਨ ਸਮਾਂ-ਸੀਮਾ ਸਮੇਤ ਕੇਂਦਰੀ ਅਤੇ ਰਾਜ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।',
      filterAll: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
      filterState: 'ਰਾਜ ਚੁਣੋ',
      searchPlaceholder: 'ਸੇਵਾ ਦਾ ਨਾਮ ਜਾਂ ਵਿਭਾਗ ਖੋਜੋ...',
      applyWithAI: 'ਏਆਈ ਸਹਾਇਕ ਨਾਲ ਅਪਲਾਈ ਕਰੋ',
      viewDetails: 'ਸ਼ਰਤਾਂ ਦੇਖੋ'
    },
    policy: {
      heading: 'ਏਆਈ ਸਰਕਾਰੀ ਨੀਤੀ ਖੋਜ',
      subheading: 'ਸਰਕਾਰੀ ਗਜ਼ਟਾਂ, ਸਕੀਮਾਂ ਅਤੇ ਕਾਨੂੰਨਾਂ ਦੀ ਖੋਜ ਕਰੋ ਜੋ ਪ੍ਰਮਾਣਿਤ .gov.in ਸਰੋਤਾਂ ਤੇ ਆਧਾਰਿਤ ਹਨ।',
      placeholder: 'ਸਕੀਮ ਜਾਂ ਨੀਤੀ ਲੱਭੋ (ਜਿਵੇਂ "ਜਲ ਜੀਵਨ ਮਿਸ਼ਨ ਨਿਯਮ", "ਪੀਐਮ ਸੂਰਿਆ ਘਰ")...',
      searchButton: 'ਨੀਤੀ ਖੋਜੋ',
      officialSources: 'ਪ੍ਰਮਾਣਿਤ ਸਰਕਾਰੀ ਸਰੋਤ',
      eligibility: 'ਯੋਗਤਾ ਦੇ ਮਾਪਦੰਡ',
      procedure: 'ਅਰਜ਼ੀ ਪ੍ਰਕਿਰਿਆ'
    },
    docs: {
      heading: 'ਦਸਤਾਵੇਜ਼ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਬਿਲ ਆਡੀਟਰ',
      subheading: 'ਬਿਜਲੀ ਜਾਂ ਪਾਣੀ ਦਾ ਬਿਲ ਅਪਲੋਡ ਕਰੋ। ਏਆਈ ਮੀਟਰ ਰੀਡਿੰਗ ਵਿੱਚ ਗੜਬੜ ਦੀ ਜਾਂਚ ਕਰਕੇ ਸ਼ਿਕਾਇਤ ਦਾ ਆਧਾਰ ਤਿਆਰ ਕਰਦਾ ਹੈ।',
      uploadTitle: 'ਬਿਲ ਜਾਂ ਦਸਤਾਵੇਜ਼ ਇੱਥੇ ਪਾਓ',
      uploadSubtitle: 'PNG, JPG ਜਾਂ PDF (ਵੱਧ ਤੋਂ ਵੱਧ 10MB)',
      orSelectSample: 'ਜਾਂ ਨਮੂਨਾ ਬਿਲ ਨਾਲ ਜਾਂਚੋ:',
      sampleWaterBill: 'ਵਿਵਾਦਤ ਜਲ ਸਪਲਾਈ ਬਿਲ (₹5,420 ਬਨਾਮ ₹950 ਔਸਤ)',
      sampleElectricityBill: 'ਬਿਜਲੀ ਟੈਰਿਫ ਵਿਵਾਦਤ ਬਿਲ',
      analysisReport: 'ਏਆਈ ਬਿਲਿੰਗ ਆਡਿਟ ਰਿਪੋਰਟ',
      proceedWithBill: 'ਇਸ ਬਿਲ ਨਾਲ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ'
    },
    myApps: {
      heading: 'ਮੇਰੀਆਂ ਅਰਜ਼ੀਆਂ ਅਤੇ ਸ਼ਿਕਾਇਤਾਂ',
      subheading: 'ਸਰਕਾਰੀ ਵਿਭਾਗਾਂ ਨੂੰ ਭੇਜੀਆਂ ਗਈਆਂ ਆਪਣੀਆਂ ਸ਼ਿਕਾਇਤਾਂ ਦੀ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ।',
      lookupPlaceholder: 'ਹਵਾਲਾ ਨੰਬਰ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ CPGRAMS/2026/DEL/049812)...',
      lookupButton: 'ਸਥਿਤੀ ਦੇਖੋ',
      tabAll: 'ਸਾਰੇ ਰਿਕਾਰਡ',
      tabComplaints: 'ਸ਼ਿਕਾਇਤਾਂ',
      tabApplications: 'ਸੇਵਾ ਅਰਜ਼ੀਆਂ',
      empty: 'ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ।'
    },
    common: {
      days: 'ਦਿਨ',
      officialGovDomain: 'ਪ੍ਰਮਾਣਿਤ ਸਰਕਾਰੀ ਲਿੰਕ',
      close: 'ਬੰਦ ਕਰੋ',
      print: 'ਰਸੀਦ ਪ੍ਰਿੰਟ ਕਰੋ',
      loading: 'ਸਰਕਾਰੀ ਸੂਚਨਾ ਪੋਰਟਲ ਨਾਲ ਸੰਪਰਕ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
      error: 'ਕੋਈ ਗਲਤੀ ਆਈ ਹੈ, ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
    }
  }
};
