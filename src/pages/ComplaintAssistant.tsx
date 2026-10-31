import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  ExternalLink, 
  Printer, 
  Edit3, 
  Upload, 
  RotateCcw, 
  Lock,
  Mic
} from 'lucide-react';
import { api } from '../services/api';
import { ComplaintAnalysisResult, ComplaintRecord, Language } from '../types';
import { translations } from '../utils/translations';
import { BrowserAutomationPanel } from '../components/BrowserAutomationPanel';
import { PrintReceiptModal } from '../components/PrintReceiptModal';
import { VoiceInputModal } from '../components/VoiceInputModal';

interface ComplaintAssistantProps {
  language: Language;
  initialQuery?: string;
  initialBillData?: any;
  onNavigateTab: (tab: string) => void;
}

export const ComplaintAssistant: React.FC<ComplaintAssistantProps> = ({
  language,
  initialQuery = '',
  initialBillData,
  onNavigateTab,
}) => {
  const t = translations[language];

  // Citizen Input Step
  const [statement, setStatement] = useState(
    initialQuery || 'My water bill this month is ₹5,000, whereas it used to be around ₹1,000. I want to complain.'
  );
  const [preferredState, setPreferredState] = useState('Punjab');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ComplaintAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Editing / Verification Step
  const [formData, setFormData] = useState({
    applicantName: 'Gurdeep Singh',
    applicantPhone: '+91 98123 45678',
    applicantEmail: 'gurdeep.singh@example.com',
    state: 'Punjab',
    district: 'Ludhiana',
    address: 'House 14B, Model Town Extension',
    consumerNumber: 'CA-948201948',
    subDivision: 'West Sub-division',
    meterNumber: 'MTR-839210-A',
    description: '',
    agreedToTerms: false,
  });

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<ComplaintRecord | null>(null);
  const [showAutomation, setShowAutomation] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const handleVoiceTranscript = (transcriptText: string) => {
    setStatement(transcriptText);
    triggerAnalysis(transcriptText);
  };

  // Auto-analyze if initialQuery or billData was passed in from Homepage / Document Intelligence
  useEffect(() => {
    if (initialBillData) {
      setStatement(initialBillData.problemDescription);
      setFormData(prev => ({
        ...prev,
        consumerNumber: initialBillData.consumerNumber || prev.consumerNumber,
      }));
      triggerAnalysis(initialBillData.problemDescription);
    } else if (initialQuery) {
      setStatement(initialQuery);
      triggerAnalysis(initialQuery);
    }
  }, [initialQuery, initialBillData]);

  const triggerAnalysis = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsAnalyzing(true);
    setErrorMsg(null);
    setSubmittedRecord(null);

    try {
      const res = await api.analyzeComplaint(queryText.trim(), language, preferredState);
      setAnalysis(res.analysis);
      setFormData(prev => ({
        ...prev,
        state: preferredState,
        consumerNumber: res.analysis.extractedEntities.consumerNumber || prev.consumerNumber,
        description: res.analysis.formalGrievanceDraft,
      }));
    } catch (err: any) {
      setErrorMsg('Failed to analyze complaint: ' + (err?.message || 'Server error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAnalysis(statement);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!analysis) return;
    if (!formData.agreedToTerms) {
      setErrorMsg('Please tick the citizen verification declaration before submitting.');
      return;
    }
    if (!formData.applicantName || !formData.applicantPhone) {
      setErrorMsg('Please provide your name and phone number for official SMS docketing.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await api.submitComplaint({
        category: analysis.category,
        subcategory: analysis.subcategory,
        title: `${analysis.category} - ${formData.district}, ${formData.state}`,
        department: analysis.department,
        authorityName: analysis.authorityName,
        officialPortal: analysis.officialPortal,
        officialPortalUrl: analysis.officialPortalUrl,
        applicantName: formData.applicantName,
        applicantPhone: formData.applicantPhone,
        applicantEmail: formData.applicantEmail,
        state: formData.state,
        district: formData.district,
        address: formData.address,
        consumerNumber: formData.consumerNumber,
        description: formData.description,
        billAmount: analysis.extractedEntities.billAmount || undefined,
        previousAmount: analysis.extractedEntities.previousAmount || undefined,
        documentsAttached: ['Dispute_Statement.pdf', 'Consumer_Identification_Proof.pdf'],
      });

      setSubmittedRecord(res.record);
    } catch (err: any) {
      setErrorMsg('Submission failed: ' + (err?.message || 'Server error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutomationCompleted = (ackNumber: string) => {
    if (submittedRecord) {
      setSubmittedRecord({
        ...submittedRecord,
        referenceNumber: ackNumber,
        status: 'Submitted',
      });
    }
  };

  const resetForm = () => {
    setAnalysis(null);
    setSubmittedRecord(null);
    setShowAutomation(false);
    setStatement('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Title */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Statutory Grievance Redressal Mechanism</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0e3b6c] tracking-tight">
          {t.complaint.heading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          {t.complaint.subheading}
        </p>
      </div>

      {/* Success Notification & Reference Card */}
      {submittedRecord ? (
        <div className="bg-white rounded-xl border-2 border-emerald-500 shadow-md p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-emerald-900 leading-tight">
                  {t.complaint.submissionSuccess}
                </h3>
                <p className="text-xs text-slate-600">
                  Grievance docket dispatched to <strong className="text-slate-800">{submittedRecord.department}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowReceiptModal(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.complaint.downloadReceipt}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('my-apps')}
                className="px-4 py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span>{t.complaint.trackInMyApps}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Reference Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                {t.complaint.referenceNumber}:
              </span>
              <span className="font-mono text-base font-bold text-blue-900">
                {submittedRecord.referenceNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                Official Redressal Authority:
              </span>
              <span className="font-semibold text-slate-800">
                {submittedRecord.authorityName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                Official Tracking Portal:
              </span>
              <a
                href={submittedRecord.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline flex items-center gap-1 font-medium mt-0.5"
              >
                <span>{submittedRecord.officialPortal}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Optional: Launch Guided Browser Automation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Assisted Browser Automation Available</span>
              </h4>
              <p className="text-xs text-slate-600">
                You can run the live Playwright browser worker to cross-verify the pre-filled form fields on the government portal in real-time.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAutomation(!showAutomation)}
              className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold rounded-md shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              {showAutomation ? 'Hide Automation Gateway' : t.complaint.startAutomationButton}
            </button>
          </div>

          {showAutomation && (
            <BrowserAutomationPanel
              complaintData={submittedRecord}
              targetPortalUrl={submittedRecord.officialPortalUrl}
              onAutomationComplete={handleAutomationCompleted}
              onCancel={() => setShowAutomation(false)}
            />
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>File another complaint</span>
            </button>
          </div>
        </div>
      ) : (
        /* Standard Complaint Formulation Screen */
        <div className="space-y-6">
          {/* Step 1: Citizen Natural Language Statement */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 1: Explain Your Issue in Plain Language
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded text-xs font-semibold transition-colors cursor-pointer"
                  title="Speak your complaint"
                >
                  <Mic className="w-3.5 h-3.5 text-amber-700" />
                  <span>Voice Input (बोलें)</span>
                </button>

                <span className="text-xs text-slate-500 font-semibold">Your State:</span>
                <select
                  value={preferredState}
                  onChange={(e) => setPreferredState(e.target.value)}
                  className="text-xs border border-slate-300 rounded px-2 py-1 bg-slate-50 text-slate-700"
                >
                  <option value="Punjab">Punjab</option>
                  <option value="Delhi">Delhi (NCT)</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Central Government">Central Government</option>
                </select>
              </div>
            </div>

            <form onSubmit={handleAnalyzeSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={4}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder={t.complaint.inputPlaceholder}
                  className="w-full p-3.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Common sample quick pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="text-slate-500 text-[11px] font-medium mr-1">Quick Scenarios:</span>
                <button
                  type="button"
                  onClick={() => setStatement('My water bill this month is ₹5,000, whereas it used to be around ₹1,000. I want to complain.')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px]"
                >
                  High Water Bill (₹5,000 vs ₹1,000)
                </button>
                <button
                  type="button"
                  onClick={() => setStatement('There has been no water supply in my village for five days. The main pump line is leaking.')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px]"
                >
                  Water Supply Disruption (5 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setStatement('My electricity supply keeps getting interrupted every evening between 6 PM and 10 PM. Voltage fluctuates severely.')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px]"
                >
                  Electricity Outage & Low Voltage
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isAnalyzing || !statement.trim()}
                  className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Analyzing Problem & Extracting Department...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>{t.complaint.analyzeButton}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Notice</p>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Step 2: Structured Complaint Preparation Screen */}
          {analysis && (
            <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-200">
              {/* Classification Cards */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Step 2: AI Classification & Administrative Identification
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                    Automatically Classified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {t.complaint.detectedCategory}:
                    </span>
                    <span className="font-bold text-slate-900 text-sm block mt-0.5">
                      {analysis.category}
                    </span>
                    <span className="text-[11px] text-slate-500">{analysis.subcategory}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {t.complaint.responsibleDept}:
                    </span>
                    <span className="font-bold text-slate-900 text-sm block mt-0.5">
                      {analysis.department}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {t.complaint.officialAuthority}:
                    </span>
                    <span className="font-bold text-slate-900 text-sm block mt-0.5">
                      {analysis.authorityName}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {t.complaint.resolutionStandard}:
                    </span>
                    <span className="font-bold text-emerald-700 text-sm block mt-0.5">
                      {analysis.resolutionDays} {t.common.days} (RTS Act)
                    </span>
                    <a
                      href={analysis.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-700 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{analysis.officialPortal}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Missing Details Prompt */}
                {analysis.missingFields && analysis.missingFields.length > 0 && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Edit3 className="w-4 h-4 text-amber-700" />
                      <span>{t.complaint.missingInfoPrompt}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Consumer / Account ID (CA / K-No) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.consumerNumber}
                          onChange={(e) => setFormData({ ...formData, consumerNumber: e.target.value })}
                          placeholder="e.g. CA-298104821"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Sub-Division / Local Office
                        </label>
                        <input
                          type="text"
                          value={formData.subDivision}
                          onChange={(e) => setFormData({ ...formData, subDivision: e.target.value })}
                          placeholder="e.g. Model Town Sub-division"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Meter Serial Number
                        </label>
                        <input
                          type="text"
                          value={formData.meterNumber}
                          onChange={(e) => setFormData({ ...formData, meterNumber: e.target.value })}
                          placeholder="e.g. MTR-839210-A"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Citizen Details & Location Inputs */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block pb-2 border-b border-slate-100">
                  Step 3: {t.complaint.applicantDetails}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Complainant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Mobile Number (for SMS Tracking) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantPhone}
                      onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      State / UT *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      District *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Street / Ward / Village Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Formal Legal Petition Letter Draft (Editable by Citizen) */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Step 4: {t.complaint.petitionDraft}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    You may review and edit the formal petition text below:
                  </span>
                </div>

                <textarea
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-4 border border-slate-300 rounded-lg text-xs text-slate-800 font-mono leading-relaxed bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Supporting Docs Checklist */}
                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t.complaint.supportingDocs}:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                    {analysis.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 bg-white p-2 rounded border border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Citizen Approval & Submission Checkpoint */}
              <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-amber-300">
                      Citizen Statutory Declaration & Approval
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Official complaints are submitted directly to the government department under the Right to Public Services Act. No complaint is filed without your explicit confirmation.
                    </p>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-200 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-0.5 rounded text-blue-500 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <span>
                    {t.complaint.submitApprovalText}
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Official Portal: <span className="text-blue-300">{analysis.officialPortal}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreedToTerms}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Registering on Public Grievance Docket...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.complaint.submitButton}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Printable Receipt Modal */}
      <PrintReceiptModal
        record={submittedRecord}
        onClose={() => setShowReceiptModal(false)}
      />

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
