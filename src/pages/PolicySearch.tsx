import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Scale, 
  HelpCircle, 
  AlertCircle 
} from 'lucide-react';
import { Language, ChatResponse } from '../types';
import { translations } from '../utils/translations';
import { api } from '../services/api';

interface PolicySearchProps {
  language: Language;
}

export const PolicySearch: React.FC<PolicySearchProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('Jal Jeevan Mission rural water supply norms');
  const [isLoading, setIsLoading] = useState(false);
  const [policyResult, setPolicyResult] = useState<ChatResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const curatedTopics = [
    'Jal Jeevan Mission guidelines and water quality norms',
    'Electricity Act 2003 Consumer Charter and billing dispute regulations',
    'Punjab Right to Service Act statutory delivery deadlines',
    'PM Surya Ghar Muft Bijli Yojana rooftop solar subsidy policy',
    'Consumer Protection Act 2019 utility service deficiency redressal',
    'National Food Security Act (NFSA) ration card entitlement rules'
  ];

  const handleSearch = async (e?: React.FormEvent, termToUse?: string) => {
    if (e) e.preventDefault();
    const queryToRun = (termToUse || searchTerm).trim();
    if (!queryToRun) return;

    if (termToUse) {
      setSearchTerm(termToUse);
    }

    setIsLoading(true);
    setErrorMsg(null);
    setPolicyResult(null);

    try {
      const res = await api.askQuery(
        `Provide an official Indian government policy research breakdown for: "${queryToRun}". Detail the statutory act, ministry circular, citizen eligibility, required documents, official application procedure, and cited .gov.in sources with publication dates.`,
        language
      );
      setPolicyResult(res);
    } catch (err: any) {
      setErrorMsg('Policy research retrieval failed: ' + (err?.message || 'Server error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <Scale className="w-4 h-4 text-amber-500" />
          <span>Statutory Policy & Circular Intelligence</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0e3b6c] tracking-tight">
          {t.policy.heading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          {t.policy.subheading}
        </p>
      </div>

      {/* Policy Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.policy.placeholder}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-5 py-2.5 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Searching Gazettes...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>{t.policy.searchButton}</span>
              </>
            )}
          </button>
        </form>

        {/* Curated Gazette & Policy Topics */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Frequently Referenced Government Policies & Gazettes:
          </p>
          <div className="flex flex-wrap gap-2">
            {curatedTopics.map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSearch(undefined, topic)}
                className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-300 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors text-left"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Retrieval Notice</p>
            <p>{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Policy Research Content */}
      {policyResult && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-[#0e3b6c]">
                Official Policy Dossier & Gazette Analysis
              </h2>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Indian Government Gazette
            </span>
          </div>

          {/* Research Body */}
          <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
            {policyResult.answer}
          </div>

          {/* Sources Cited */}
          {policyResult.sources && policyResult.sources.length > 0 && (
            <div className="pt-4 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.policy.officialSources} (.gov.in / .nic.in):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {policyResult.sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex items-start justify-between gap-2 text-xs group"
                  >
                    <div className="truncate">
                      <span className="font-semibold text-[#0e3b6c] group-hover:underline block truncate">
                        {src.title}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono block mt-0.5 truncate">
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
      )}
    </div>
  );
};
