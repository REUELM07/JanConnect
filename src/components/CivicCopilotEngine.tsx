import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Mic, 
  Upload, 
  ArrowRight, 
  Clock, 
  FileText, 
  Building2, 
  AlertTriangle, 
  Play, 
  Copy, 
  Check, 
  PhoneCall, 
  Scale, 
  RefreshCw,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language, CivicCopilotResult, TargetPortalType } from '../types';
import { api } from '../services/api';
import { VoiceInputModal } from './VoiceInputModal';
import { BrowserAutomationPanel } from './BrowserAutomationPanel';

interface CivicCopilotEngineProps {
  language: Language;
  initialQuery?: string;
  initialBillData?: any;
  onNavigateTab?: (tab: string, stateData?: any) => void;
  onOpenDocModal?: () => void;
}

export const CivicCopilotEngine: React.FC<CivicCopilotEngineProps> = ({
  language,
  initialQuery = '',
  initialBillData,
  onNavigateTab,
  onOpenDocModal,
}) => {
  const [inputText, setInputText] = useState(
    initialQuery || 'My water bill this month is ₹5,000, whereas it used to be around ₹1,000 in Sector 22. My consumer account is CA-948201948.'
  );
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copilotResult, setCopilotResult] = useState<CivicCopilotResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);
  const [showAdvancedPayload, setShowAdvancedPayload] = useState(true);

  // Sync prop language
  useEffect(() => {
    setSelectedLang(language);
  }, [language]);

  // Handle initial props from bill modal or hero query
  useEffect(() => {
    if (initialBillData) {
      const billSummary = `${initialBillData.problemDescription || 'Utility bill discrepancy'} in Sector 22. Consumer account ID: ${initialBillData.consumerDetails?.consumerId || 'CA-948201948'}. Disputed amount: ${initialBillData.consumerDetails?.currentAmount || '₹5,000'}. Units: ${initialBillData.consumerDetails?.unitsConsumed || '420 Units'}.`;
      setInputText(billSummary);
      processIntake(billSummary, selectedLang, initialBillData);
    } else if (initialQuery) {
      setInputText(initialQuery);
      processIntake(initialQuery, selectedLang);
    }
  }, [initialQuery, initialBillData]);

  const processIntake = async (text: string, lang: Language, billData?: any) => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setErrorMsg(null);
    setShowAutomation(false);

    try {
      const res = await api.processCivicCopilot(text.trim(), lang, billData);
      setCopilotResult(res.result);
    } catch (err: any) {
      setErrorMsg('Failed to process with Civic Copilot: ' + (err?.message || 'Server error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceTranscript = (transcriptText: string) => {
    setInputText(transcriptText);
    processIntake(transcriptText, selectedLang);
  };

  const handleCopyDraft = () => {
    if (!copilotResult) return;
    navigator.clipboard.writeText(copilotResult.sectionB_AutoFill.legalPetitionDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const sampleScenarios = [
    {
      label: 'Local Utility (High Bill)',
      portal: 'LOCAL_UTILITY',
      text: 'My water bill this month is ₹5,000, whereas it used to be around ₹1,000 in Sector 22, Chandigarh. My consumer account is CA-948201948.'
    },
    {
      label: 'Local Utility (Power Outage)',
      portal: 'LOCAL_UTILITY',
      text: 'Urgent: Power outage in Sector 15 Ludhiana for past 6 hours. High voltage fluctuation occurred before cutoff and transformer made loud buzzing sound.'
    },
    {
      label: 'RTI Online (Public Records)',
      portal: 'RTI_ONLINE',
      text: 'Under Right to Information Act, I require certified copies of road construction tenders, fund expenditure ledger, and completion delays for Manimajra ward.'
    },
    {
      label: 'CPGRAMS (Central / Bank / Pension)',
      portal: 'CPGRAMS',
      text: 'My mother has not received her Central Civil Pension arrears for 3 months from State Bank of India Main Branch. PPO number is 84920194820.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Copilot Header Banner */}
      <div className="bg-gradient-to-r from-[#0b294d] via-[#0e3b6c] to-[#1a4f8b] text-white rounded-xl p-5 sm:p-6 shadow-md border border-blue-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-300/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>JanConnect Civic Copilot</span>
              <span className="text-white/60">|</span>
              <span className="text-white font-normal">Autonomous Grievance Navigation & Auto-Filer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Zero-Manual Form Filling for Indian Citizens
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Speak or write your issue in Hindi, Punjabi, Hinglish, or English, or provide your bill. 
              The copilot extracts entities, selects the authoritative portal (CPGRAMS, RTI Online, or Local Utility), applies statutory SLAs, and maps form fields for 1-click filing.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-white/10 shrink-0">
            <Globe className="w-4 h-4 text-blue-300" />
            <span className="text-xs text-slate-300 font-medium">Advisory Language:</span>
            <select
              value={selectedLang}
              onChange={(e) => {
                const newLang = e.target.value as Language;
                setSelectedLang(newLang);
                if (copilotResult) {
                  processIntake(inputText, newLang);
                }
              }}
              className="bg-slate-800 text-white text-xs rounded px-2 py-1 border border-slate-600 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Citizen Intake Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0e3b6c] text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Citizen Grievance Narration & Intake</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Describe your problem naturally or speak into your microphone.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Speak complaint using microphone"
            >
              <Mic className="w-4 h-4 text-amber-700" />
              <span>Voice Intake (बोलें / ਬੋਲੋ)</span>
            </button>

            {onOpenDocModal && (
              <button
                type="button"
                onClick={onOpenDocModal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                title="Upload bill or document image"
              >
                <Upload className="w-4 h-4 text-blue-700" />
                <span>Upload Bill OCR</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Narration Box */}
        <div className="space-y-3">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or speak your grievance in English, Hindi, or Punjabi... e.g. 'My water bill this month is ₹5,000 instead of ₹1,000 in Sector 22, CA number is CA-948201948.'"
            className="w-full p-3.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
          />

          {/* Quick Scenarios Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold mr-1">Demo Scenarios:</span>
            {sampleScenarios.map((sc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(sc.text);
                  processIntake(sc.text, selectedLang);
                }}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-800 text-slate-700 text-[11px] border border-slate-200 transition-colors cursor-pointer font-medium"
              >
                {sc.label}
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => processIntake(inputText, selectedLang)}
              disabled={isProcessing || !inputText.trim()}
              className="px-6 py-2.5 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Autonomous Triage & Field Mapping in Progress...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Execute Civic Copilot Triage</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div>
            <p className="font-semibold">Notice</p>
            <p>{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Autonomous Copilot Analysis Results */}
      {copilotResult && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* STEP 1 & 2: Entity Extraction & Target Portal Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Step 1: Extracted Entities Card */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Extracted Citizen Entities</span>
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                  OCR & NLP Matched
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">CITIZEN_NAME:</span>
                  <span className="font-bold text-slate-900">{copilotResult.entities.citizenName}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">LOCATION_OR_SECTOR:</span>
                  <span className="font-bold text-blue-950">{copilotResult.entities.locationOrSector}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">CONSUMER_ACCOUNT_NO:</span>
                  <span className="font-mono font-bold text-blue-800">
                    {copilotResult.entities.consumerAccountNo || 'Auto-assigned from records'}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">METER_READING_OR_UNITS:</span>
                  <span className="font-semibold text-slate-800">
                    {copilotResult.entities.meterReadingOrUnits || 'Inspection Mandated'}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">DISPUTED_AMOUNT:</span>
                  <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {copilotResult.entities.disputedAmount || 'Non-financial grievance'}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 font-medium block text-[11px] mb-1">CORE_ISSUE:</span>
                  <p className="text-slate-800 font-semibold leading-relaxed">
                    {copilotResult.entities.coreIssue}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 & 3: Target Portal & Statutory SLA Card */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Autonomous Portal Selection & Legal SLA</span>
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                  1 of 3 Supported Portals
                </span>
              </div>

              {/* 3 Portal Comparison Pill Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* Portal 1: CPGRAMS */}
                <div className={`p-3 rounded-lg border transition-all ${
                  copilotResult.targetPortal === 'CPGRAMS'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900">Portal 1: CPGRAMS</span>
                    {copilotResult.targetPortal === 'CPGRAMS' && (
                      <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">pgportal.gov.in</p>
                  <p className="text-[10px] text-slate-600 mt-1">Central Ministries, Pensions, Banks, Railways</p>
                </div>

                {/* Portal 2: RTI Online */}
                <div className={`p-3 rounded-lg border transition-all ${
                  copilotResult.targetPortal === 'RTI_ONLINE'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900">Portal 2: RTI Online</span>
                    {copilotResult.targetPortal === 'RTI_ONLINE' && (
                      <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">rtionline.gov.in</p>
                  <p className="text-[10px] text-slate-600 mt-1">Official Records, Tenders, Expenditure, Audits</p>
                </div>

                {/* Portal 3: Local Utility */}
                <div className={`p-3 rounded-lg border transition-all ${
                  copilotResult.targetPortal === 'LOCAL_UTILITY'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900">Portal 3: Local Utility</span>
                    {copilotResult.targetPortal === 'LOCAL_UTILITY' && (
                      <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">e-Sampark / Discom</p>
                  <p className="text-[10px] text-slate-600 mt-1">Water, Electricity, Meters, Outages, Civic</p>
                </div>
              </div>

              {/* Selected Portal Details Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Assigned Target System:</span>
                  <a
                    href={copilotResult.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline flex items-center gap-1 font-bold text-xs"
                  >
                    <span>{copilotResult.portalName}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-slate-600 text-xs">
                  <strong className="text-slate-800">Triage Rationale:</strong> {copilotResult.portalRationale}
                </p>
              </div>

              {/* Step 3: Statutory SLA Badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Statutory Enforceable Deadline (SLA)</span>
                  </span>
                  <p className="text-xs text-slate-600">
                    Governing Law: <strong className="text-slate-800">{copilotResult.legalAct}</strong>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-3 py-1 bg-emerald-600 text-white rounded font-mono font-bold text-sm shadow-xs">
                    {copilotResult.statutorySLA}
                  </span>
                  <span className="block text-[10px] text-emerald-800 font-semibold mt-0.5">
                    {copilotResult.slaCategory}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION A: CITIZEN-FRIENDLY ADVISORY (Strict Native Language Output) */}
          <div className="bg-white rounded-xl border-2 border-blue-600/50 shadow-md p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    SECTION A: Citizen-Friendly Advisory (नागरिक परामर्श / ਨਾਗਰਿਕ ਸਲਾਹ)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official advisory formulated in {selectedLang === 'hi' ? 'हिन्दी (Hindi)' : selectedLang === 'pa' ? 'ਪੰਜਾਬੀ (Punjabi)' : 'English'}
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Statutory Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">
                  1. Acknowledgment (पुष्टि / ਪੁਸ਼ਟੀ):
                </span>
                <p className="text-slate-800 text-sm font-medium leading-relaxed">
                  {copilotResult.sectionA_Advisory.acknowledgment}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">
                  2. Assigned Authority (उत्तरदायी प्राधिकारी / ਜ਼ਿੰਮੇਵਾਰ ਅਧਿਕਾਰੀ):
                </span>
                <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                  {copilotResult.sectionA_Advisory.assignedAuthority}
                </p>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-lg border border-emerald-200 space-y-1">
                <span className="text-emerald-900 font-bold block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>3. Legal Deadline / Statutory SLA (विधिक समय-सीमा):</span>
                </span>
                <p className="text-emerald-950 text-xs sm:text-sm font-semibold leading-relaxed">
                  {copilotResult.sectionA_Advisory.legalDeadlineSLA}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  <span>4. Helpline & Local Office (हेल्पलाइन एवं कार्यालय):</span>
                </span>
                <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                  {copilotResult.sectionA_Advisory.helplineAndOffice}
                </p>
              </div>
            </div>

            {/* Next Step Reassurance Pill */}
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-900 block uppercase tracking-wider">
                  5. Next Step Checkpoint (अगला कदम / ਅਗਲਾ ਕਦਮ):
                </span>
                <p className="text-xs text-amber-900 font-medium leading-relaxed mt-0.5">
                  {copilotResult.sectionA_Advisory.nextStep}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION B: AUTO-FILL PAYLOAD & FORM-FIELD MAP */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    SECTION B: Auto-Fill Payload & Form-Field Map
                  </h3>
                  <p className="text-xs text-slate-500">
                    Exact DOM-mapped parameters prepared for autonomous browser filing
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdvancedPayload(!showAdvancedPayload)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg flex items-center gap-1 cursor-pointer font-medium"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{showAdvancedPayload ? 'Collapse Field Map' : 'View Field Map'}</span>
                  {showAdvancedPayload ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="px-3 py-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium transition-colors"
                >
                  {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDraft ? 'Copied Petition!' : 'Copy Legal Draft'}</span>
                </button>
              </div>
            </div>

            {/* Target Portal Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[11px] uppercase">Destination Government Portal:</span>
                <span className="font-bold text-blue-900 text-sm">{copilotResult.sectionB_AutoFill.portalName}</span>
              </div>
              <a
                href={copilotResult.sectionB_AutoFill.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white text-blue-700 hover:text-blue-900 border border-slate-300 rounded text-xs font-semibold flex items-center gap-1 shadow-2xs"
              >
                <span>{copilotResult.sectionB_AutoFill.portalUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Mapped Form Fields Table */}
            {showAdvancedPayload && (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Field Key</th>
                      <th className="py-2.5 px-3">Government Form Label</th>
                      <th className="py-2.5 px-3">DOM Element Selector</th>
                      <th className="py-2.5 px-3">Auto-Fill Value</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {copilotResult.sectionB_AutoFill.formFieldMap.map((f, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-semibold text-blue-900 text-[11px]">
                          {f.fieldName}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-medium">
                          {f.fieldLabel}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-400 text-[10px] truncate max-w-xs">
                          {f.domSelector || 'N/A'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-900 font-medium max-w-md">
                          <span className="truncate block" title={f.value}>
                            {f.fieldName === 'petition_legal_text' ? `${f.value.slice(0, 100)}...` : f.value}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            f.fieldName === 'security_captcha'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {f.fieldName === 'security_captcha' ? 'Citizen Checkpoint' : 'Auto-Mapped'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Formally Worded Legal Petition Text */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                  <span>Formally Worded Legal Petition (Statutory Text)</span>
                </span>
                <span className="text-[11px] text-slate-400">Pre-injected into grievance description</span>
              </div>
              <div className="bg-slate-900 text-slate-200 rounded-lg p-4 font-mono text-xs leading-relaxed max-h-64 overflow-y-auto border border-slate-800 whitespace-pre-wrap select-all">
                {copilotResult.sectionB_AutoFill.legalPetitionDraft}
              </div>
            </div>

            {/* Launch Guided Browser Automation Button */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm mt-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Play className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Autonomous Auto-Filing Gateway</span>
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Launches a real-time headless Playwright browser automation worker. All extracted fields are automatically injected into the target portal. You will only be asked to enter the visual CAPTCHA or mobile OTP.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAutomation(!showAutomation)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <span>{showAutomation ? 'Close Browser Worker' : 'Execute Auto-Filing Browser'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Active Browser Automation Panel */}
            {showAutomation && (
              <div className="pt-2">
                <BrowserAutomationPanel
                  targetPortalUrl={copilotResult.sectionB_AutoFill.portalUrl}
                  complaintData={{
                    id: 'COPILOT-' + Math.floor(100000 + Math.random() * 900000),
                    referenceNumber: 'AUTO-GEN',
                    category: copilotResult.slaCategory,
                    subcategory: copilotResult.targetPortal,
                    title: copilotResult.entities.coreIssue,
                    department: copilotResult.portalName,
                    authorityName: copilotResult.sectionA_Advisory.assignedAuthority,
                    officialPortal: copilotResult.portalName,
                    officialPortalUrl: copilotResult.sectionB_AutoFill.portalUrl,
                    status: 'Submitted',
                    filingDate: new Date().toISOString().split('T')[0],
                    applicantName: copilotResult.entities.citizenName,
                    applicantPhone: '+91 98123 45678',
                    applicantEmail: 'citizen@gov.in',
                    state: 'Punjab',
                    district: 'Ludhiana',
                    address: copilotResult.entities.locationOrSector,
                    consumerNumber: copilotResult.entities.consumerAccountNo || undefined,
                    description: copilotResult.sectionB_AutoFill.legalPetitionDraft,
                    timeline: [],
                    documentsAttached: ['Statutory_Petition.pdf']
                  }}
                  onAutomationComplete={(ackNo) => {
                    // Navigate to my-apps or display success
                    if (onNavigateTab) {
                      onNavigateTab('my-apps');
                    }
                  }}
                  onCancel={() => setShowAutomation(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onTranscriptReady={handleVoiceTranscript}
        language={selectedLang}
      />
    </div>
  );
};
