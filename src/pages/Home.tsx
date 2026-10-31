import React, { useState } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  UploadCloud, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Droplet, 
  Zap, 
  Landmark, 
  Sprout, 
  Building, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { Language, ChatResponse } from '../types';
import { translations } from '../utils/translations';
import { api } from '../services/api';
import { VoiceInputModal } from '../components/VoiceInputModal';

interface HomeProps {
  language: Language;
  onNavigateTab: (tab: string, stateData?: any) => void;
  onOpenDocModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ language, onNavigateTab, onOpenDocModal }) => {
  const t = translations[language];
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatResult, setChatResult] = useState<ChatResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const handleVoiceTranscript = (transcriptText: string) => {
    setQuery(transcriptText);
    handleSearch(undefined, transcriptText);
  };

  const handleSearch = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToQuery = (directText || query).trim();
    if (!textToQuery) return;

    if (directText) {
      setQuery(directText);
    }

    setIsLoading(true);
    setErrorMsg(null);
    setChatResult(null);

    try {
      const res = await api.askQuery(textToQuery, language);
      setChatResult(res);
    } catch (err: any) {
      setErrorMsg('Could not fetch information from government portal gateway: ' + (err?.message || 'Server error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToComplaintFromHome = () => {
    onNavigateTab('complaint', {
      initialQuery: query,
      detectedCategory: chatResult?.detectedCategory || undefined,
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 shadow-xs">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Digital India & State Grievance Redressal Assistant</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0e3b6c] leading-tight">
            {t.hero.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Prominent AI Search Box */}
          <form onSubmit={handleSearch} className="mt-6 max-w-3xl mx-auto text-left">
            <div className="bg-white rounded-xl shadow-md border-2 border-blue-600/30 hover:border-blue-600/50 transition-all p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.hero.inputPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center gap-1.5 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  title={t.hero.voiceInput}
                  className="p-2.5 rounded-lg border bg-slate-50 text-slate-700 border-slate-300 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 transition-colors cursor-pointer group"
                  aria-label="Speak query via microphone"
                >
                  <Mic className="w-4 h-4 text-blue-700 group-hover:scale-110 transition-transform" />
                </button>

                {/* Document Upload Button */}
                <button
                  type="button"
                  onClick={onOpenDocModal}
                  title={t.hero.uploadDocButton}
                  className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
                >
                  <UploadCloud className="w-4 h-4 text-blue-700" />
                  <span className="hidden md:inline">Audit Bill / Doc</span>
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="px-5 py-2.5 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Researching...</span>
                    </>
                  ) : (
                    <>
                      <span>{t.hero.askButton}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Suggested Queries */}
          <div className="pt-4 text-left max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {t.hero.suggestedHeading}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.hero.suggested.map((sQuery, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSearch(undefined, sQuery)}
                  className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-300 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 transition-colors text-left"
                >
                  {sQuery}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Notice</p>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Live AI Research & Guidance Result (If citizen just searched) */}
        {chatResult && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0e3b6c] to-[#154c87] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">
                  JanConnect AI Citizen Research & Procedural Guidance
                </h3>
              </div>
              <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded text-white font-medium">
                Verified Government Information
              </span>
            </div>

            <div className="p-6 space-y-6">
              {/* Complaint Intent Routing Banner (Crucial Requirement) */}
              {chatResult.isComplaintIntent && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-200 rounded-lg text-amber-800 shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">
                        Citizen Grievance Detected: {chatResult.detectedCategory}
                      </h4>
                      <p className="text-xs text-slate-700 mt-0.5">
                        JanConnect AI can automatically formulate a formal petition and prepare your complaint for official registration under the Right to Public Services (RTS) Act.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleProceedToComplaintFromHome}
                    className="shrink-0 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Launch Civic Copilot Auto-Filing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Service Application Action Banner */}
              {!chatResult.isComplaintIntent && (query.toLowerCase().includes('licen') || query.toLowerCase().includes('driv') || query.toLowerCase().includes('income') || query.toLowerCase().includes('connection')) && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-800 shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm">
                        Public Service Application Detected
                      </h4>
                      <p className="text-xs text-slate-700 mt-0.5">
                        {query.toLowerCase().includes('licen') || query.toLowerCase().includes('driv')
                          ? 'You can access the official MoRTH Sarathi portal directly or use our Application Assistant for document guidance.'
                          : 'JanConnect AI can assist you in verifying eligibility and preparing documents for this public service.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {query.toLowerCase().includes('licen') || query.toLowerCase().includes('driv') ? (
                      <a
                        href="https://sarathi.parivahan.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Open Sarathi Parivahan</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onNavigateTab('application')}
                        className="px-4 py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Open Application Assistant</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Research Text Body */}
              <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                {chatResult.answer}
              </div>

              {/* Official Sources Cited */}
              {chatResult.sources && chatResult.sources.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Official Verified Portals & Sources:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {chatResult.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 bg-slate-50 transition-colors flex items-start justify-between gap-2 text-xs group"
                      >
                        <div className="truncate">
                          <span className="font-semibold text-[#0e3b6c] group-hover:underline block truncate">
                            {src.title}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono truncate block mt-0.5">
                            {src.url.replace('https://', '').split('/')[0]}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4 Pillars of Citizen Services Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Core Citizen Public Services
              </h2>
              <p className="text-xs text-slate-500">
                Direct access to high-priority citizen welfare workflows
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('services')}
              className="text-xs font-semibold text-[#0e3b6c] hover:underline flex items-center gap-1"
            >
              <span>View All Services Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: JanConnect Civic Copilot */}
            <div className="bg-white rounded-xl border-2 border-amber-500/40 p-5 shadow-xs hover:border-amber-500 transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-bl">
                Civic Copilot
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Civic Copilot (Autonomous Auto-Filing)
                  </h3>
                  <span className="text-[10px] text-amber-800 font-semibold block">
                    Zero-Manual Form Filling • 3 Statutory Portals
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Speak or type in Hindi, Punjabi, or English. The autonomous copilot extracts entities, selects the authoritative portal (CPGRAMS, RTI Online, or Local Discom), applies legal SLAs, and maps form fields.
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigateTab('complaint')}
                  className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Launch Civic Copilot Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Application Assistant */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Application Assistant
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Step-by-step assistance for Income Certificates, New Water Connections, PM Surya Ghar Solar Subsidy, and Caste Certificates with document validation.
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigateTab('application')}
                  className="w-full py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Launch Application Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Document Intelligence & Bill Auditor */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Document & Utility Bill Auditor
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload your electricity bill or water bill. AI verifies meter reading accuracy, assesses tariff hikes, and suggests immediate statutory remedies.
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button
                  onClick={onOpenDocModal}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Audit Bill / Policy PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Citizen Information & Statutory Standards */}
        <section className="bg-slate-100 border border-slate-200 rounded-xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800">Right to Public Service (RTS)</h4>
                <p className="text-slate-600 mt-0.5">
                  Statutory deadlines enforce prompt action: 24 hrs for outages, 7-15 days for water billing disputes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800">Verified Portals Only</h4>
                <p className="text-slate-600 mt-0.5">
                  Direct connection with CPGRAMS (pgportal.gov.in), state e-District, and utility DISCOM networks.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800">Live Status Tracking</h4>
                <p className="text-slate-600 mt-0.5">
                  Track every grievance docket with real-time escalation notes and downloadable official receipts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onTranscriptReady={handleVoiceTranscript}
        language={language}
      />
    </div>
  );
};
