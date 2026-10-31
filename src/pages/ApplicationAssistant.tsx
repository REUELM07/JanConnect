import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  ArrowRight, 
  Building2, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  HelpCircle, 
  Send 
} from 'lucide-react';
import { governmentServicesList } from '../data/servicesData';
import { GovernmentServiceItem, Language } from '../types';
import { translations } from '../utils/translations';
import { BrowserAutomationPanel } from '../components/BrowserAutomationPanel';

interface ApplicationAssistantProps {
  language: Language;
  preSelectedService?: GovernmentServiceItem;
  onNavigateTab: (tab: string) => void;
}

export const ApplicationAssistant: React.FC<ApplicationAssistantProps> = ({
  language,
  preSelectedService,
  onNavigateTab,
}) => {
  const t = translations[language];

  // Selected Service
  const [selectedService, setSelectedService] = useState<GovernmentServiceItem>(
    preSelectedService || governmentServicesList[4] // Default: Income Certificate
  );

  // Form Field Helper State
  const [applicantDetails, setApplicantDetails] = useState({
    fullName: 'Harpreet Kaur',
    fatherHusbandName: 'Jagjit Singh',
    mobileNumber: '+91 98765 12345',
    aadhaarNumber: 'XXXX-XXXX-4912',
    familyAnnualIncome: '₹1,80,000',
    incomeSource: 'Agriculture & Small Business',
    district: 'Ludhiana',
    tehsil: 'Ludhiana West',
    villageColony: 'Sarabha Nagar',
  });

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'doc-0': true,
    'doc-1': true,
    'doc-2': false,
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showAutomation, setShowAutomation] = useState(false);
  const [applicationCompleted, setApplicationCompleted] = useState(false);
  const [docketNumber, setDocketNumber] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
      setCurrentStep(1);
      setApplicationCompleted(false);
    }
  }, [preSelectedService]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allDocumentsReady = selectedService.documents.every((_, idx) => checklist[`doc-${idx}`]);

  const handleStartFiling = () => {
    setCurrentStep(2);
  };

  const handleCompleteApplication = () => {
    const ack = `APP/2026/RTS/${Math.floor(100000 + Math.random() * 900000)}`;
    setDocketNumber(ack);
    setApplicationCompleted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>Government Scheme & Certificate Assistant</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0e3b6c] tracking-tight">
          Application Assistant & Eligibility Verifier
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Complete official government service applications with step-by-step AI field mapping, document verification, and RTS turnaround guarantees.
        </p>
      </div>

      {/* Select or Switch Service Dropdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Select Target Service:</span>
          <select
            value={selectedService.id}
            onChange={(e) => {
              const found = governmentServicesList.find(s => s.id === e.target.value);
              if (found) {
                setSelectedService(found);
                setCurrentStep(1);
                setApplicationCompleted(false);
                setChecklist({});
              }
            }}
            className="text-xs border border-slate-300 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-800 font-semibold focus:outline-none"
          >
            {governmentServicesList.map((srv) => (
              <option key={srv.id} value={srv.id}>
                [{srv.category}] {srv.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Statutory RTS Window: <strong className="text-slate-800">{selectedService.processingTimeDays} {t.common.days}</strong></span>
        </div>
      </div>

      {applicationCompleted ? (
        <div className="bg-white rounded-xl border-2 border-emerald-500 shadow-md p-6 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-emerald-900 leading-tight">
                Government Application Dossier Prepared
              </h3>
              <p className="text-xs text-slate-600">
                Application successfully mapped for <strong className="text-slate-800">{selectedService.department}</strong>
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Application Tracking ID:
              </span>
              <span className="font-mono text-sm font-bold text-blue-900">
                {docketNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Official Designated Portal:
              </span>
              <a
                href={selectedService.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline flex items-center gap-1 font-medium mt-0.5"
              >
                <span>{selectedService.officialPortalName}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Target Resolution Date:
              </span>
              <span className="font-medium text-slate-800">
                Within {selectedService.processingTimeDays} working days
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('my-apps')}
              className="px-4 py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View in My Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setApplicationCompleted(false);
                setCurrentStep(1);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Start Another Application
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Service Details & Eligibility Checklist */}
          <div className="lg:col-span-1 space-y-5">
            {/* Service Summary Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {selectedService.category}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2 leading-snug">
                  {selectedService.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {selectedService.department}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedService.description}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Official Fee:</span>
                  <span className="font-semibold text-slate-800">{selectedService.fee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Official Portal:</span>
                  <a
                    href={selectedService.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>{selectedService.officialPortalName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Statutory Eligibility Criteria */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Eligibility Criteria:</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedService.eligibility.map((el, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Document Verification Checklist */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Required Documents Checklist:</span>
              </h3>
              <div className="space-y-2 text-xs">
                {selectedService.documents.map((doc, idx) => {
                  const isChecked = Boolean(checklist[`doc-${idx}`]);
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border transition-colors cursor-pointer select-none ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(`doc-${idx}`)}
                        className="mt-0.5 text-emerald-600 rounded focus:ring-0 cursor-pointer"
                      />
                      <span className="text-[11px] leading-tight">{doc}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: AI Form Field Mapper & Application Workflow */}
          <div className="lg:col-span-2 space-y-5">
            {currentStep === 1 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Application Stage 1: Citizen Profile & Pre-Fill Values
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-medium">
                    Auto-Mapped by AI
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>
                      JanConnect AI maps your verified citizen credentials directly to the official government form schema. Review the values below before proceeding.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Full Name (as per Aadhaar) *
                      </label>
                      <input
                        type="text"
                        value={applicantDetails.fullName}
                        onChange={(e) => setApplicantDetails({ ...applicantDetails, fullName: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Father&apos;s / Husband&apos;s Name *
                      </label>
                      <input
                        type="text"
                        value={applicantDetails.fatherHusbandName}
                        onChange={(e) => setApplicantDetails({ ...applicantDetails, fatherHusbandName: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Mobile Number (Aadhaar-Linked) *
                      </label>
                      <input
                        type="text"
                        value={applicantDetails.mobileNumber}
                        onChange={(e) => setApplicantDetails({ ...applicantDetails, mobileNumber: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Aadhaar Identifier (Masked) *
                      </label>
                      <input
                        type="text"
                        disabled
                        value={applicantDetails.aadhaarNumber}
                        className="w-full text-xs px-3 py-2 border border-slate-200 bg-slate-100 rounded-md font-mono text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Declared Family Annual Income *
                      </label>
                      <input
                        type="text"
                        value={applicantDetails.familyAnnualIncome}
                        onChange={(e) => setApplicantDetails({ ...applicantDetails, familyAnnualIncome: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Primary Source of Livelihood
                      </label>
                      <input
                        type="text"
                        value={applicantDetails.incomeSource}
                        onChange={(e) => setApplicantDetails({ ...applicantDetails, incomeSource: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Tehsil / Sub-Division *
                      </label>
                      <input
                        type="text"
                        value={applicantDetails.tehsil}
                        onChange={(e) => setApplicantDetails({ ...applicantDetails, tehsil: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Village / Ward / Colony *
                      </label>
                      <input
                        type="text"
                        value={applicantDetails.villageColony}
                        onChange={(e) => setApplicantDetails({ ...applicantDetails, villageColony: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    {!allDocumentsReady && (
                      <span className="text-amber-700 font-medium">
                        Note: Some supporting documents remain unchecked.
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleStartFiling}
                    className="px-5 py-2.5 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Pre-Submission Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Review Screen & Browser Automation Verification */
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Application Stage 2: Final Review & Submission Channel
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-blue-700 hover:underline"
                  >
                    Edit Information
                  </button>
                </div>

                {/* Review Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-800">
                    Summary of Application Packet:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Service Applied:</span>
                      <span className="font-semibold">{selectedService.title}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Applicant Name:</span>
                      <span className="font-semibold">{applicantDetails.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Target Authority:</span>
                      <span>{selectedService.department}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Official Portal:</span>
                      <span className="text-blue-700">{selectedService.officialPortalName}</span>
                    </div>
                  </div>
                </div>

                {/* Automation Launch Option */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>Government Portal Automation Verification</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Would you like to inspect the Playwright browser worker pre-filling this application directly into the government portal? You will personally complete the security CAPTCHA.
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAutomation(!showAutomation)}
                      className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      {showAutomation ? 'Hide Automation Gateway' : 'Launch Assisted Browser Inspector'}
                    </button>
                  </div>
                </div>

                {showAutomation && (
                  <BrowserAutomationPanel
                    complaintData={{
                      id: selectedService.id,
                      applicantName: applicantDetails.fullName,
                      applicantPhone: applicantDetails.mobileNumber,
                      category: selectedService.category,
                      state: applicantDetails.district + ', ' + selectedService.state,
                      description: `Application for ${selectedService.title} under statutory RTS procedure.`
                    }}
                    targetPortalUrl={selectedService.officialPortalUrl}
                    onAutomationComplete={(ack) => {
                      setDocketNumber(ack);
                      setApplicationCompleted(true);
                    }}
                    onCancel={() => setShowAutomation(false)}
                  />
                )}

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={selectedService.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    <span>Visit {selectedService.officialPortalName} directly</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCompleteApplication}
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Verified Application to Department</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
