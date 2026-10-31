import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Droplet 
} from 'lucide-react';
import { api } from '../services/api';
import { DocumentAnalysisResult, Language } from '../types';
import { translations } from '../utils/translations';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onProceedToComplaint: (billData: {
    billAmount: string;
    previousAmount: string;
    consumerNumber: string;
    problemDescription: string;
    category: string;
    documentName: string;
  }) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  language,
  onProceedToComplaint,
}) => {
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [userQuestion, setUserQuestion] = useState('Why is my water bill so high this month? Please verify if there is an erroneous meter reading or penalty surcharge.');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMsg(null);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSampleBill = (type: 'water' | 'electricity') => {
    setErrorMsg(null);
    if (type === 'water') {
      setSelectedFile(new File(['water_bill_data'], 'Delhi_Jal_Board_Bill_Oct2026.pdf', { type: 'application/pdf' }));
      setUserQuestion('Why is my water bill ₹5,420 this month when it used to be around ₹950? Please check for billing anomalies.');
      analyzeSample('water');
    } else {
      setSelectedFile(new File(['electricity_bill_data'], 'PSPCL_Electricity_Bill_Domestic.pdf', { type: 'application/pdf' }));
      setUserQuestion('My electricity bill has jumped to ₹8,920 for 1,120 units with fixed load penalty. Is this calculated correctly?');
      analyzeSample('electricity');
    }
  };

  const analyzeSample = async (type: 'water' | 'electricity') => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const res = await api.analyzeDocument({
        documentName: type === 'water' ? 'Delhi_Jal_Board_Bill_Oct2026.pdf' : 'PSPCL_Electricity_Discom_Bill.pdf',
        documentType: type === 'water' ? 'Water Supply Bill' : 'Electricity Bill',
        textContent: type === 'water' 
          ? 'Delhi Jal Board Bi-monthly Bill. Consumer K-No: 298104821. Billing Period: 15-Aug-2026 to 15-Oct-2026. Current Reading: 890 KL (Locked Meter Code: LK). Previous Reading: 710 KL. Units Billed: 180 KL. Current Amount: ₹5,420.00. Previous Average Bill: ₹950.00. Sanctioned Category: Domestic.'
          : 'State Power Corporation Ltd. CA No: 3004819201. Units: 1120 KWh. Sanctioned Load: 2.0 KW. Current Bill: ₹8,920. Surcharges: Fuel adjustment surcharge ₹1,200, Fixed demand charge ₹800. Average historic bill: ₹2,100.',
        userQuestion: type === 'water' ? 'Why is my water bill unusually high?' : 'Explain the billing anomaly on this electricity statement.'
      });
      setAnalysisResult(res.analysis);
    } catch (err: any) {
      setErrorMsg('Failed to analyze document. Please check server logs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeUploaded = async () => {
    if (!selectedFile && !filePreview) {
      setErrorMsg('Please select a file or click one of the verified sample bills below.');
      return;
    }
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.analyzeDocument({
        documentName: selectedFile?.name || 'Uploaded_Document',
        base64Content: filePreview || undefined,
        userQuestion: userQuestion.trim(),
      });
      setAnalysisResult(res.analysis);
    } catch (err: any) {
      setErrorMsg('Could not process the document: ' + (err?.message || 'unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (!analysisResult) return;
    onProceedToComplaint({
      billAmount: analysisResult.consumerDetails.currentAmount || '₹5,420',
      previousAmount: '₹950',
      consumerNumber: analysisResult.consumerDetails.consumerId || 'CA-298104821',
      problemDescription: `Discrepancy detected in utility bill. ${analysisResult.anomalyExplanation} Question: ${userQuestion}`,
      category: analysisResult.documentType.toLowerCase().includes('water') ? 'Excessive water bills' : 'Incorrect electricity bills',
      documentName: selectedFile?.name || 'Utility_Dispute_Bill.pdf'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0e3b6c] to-[#154c87] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-white/10 text-amber-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {t.docs.heading}
              </h3>
              <p className="text-xs text-blue-100">
                Audits utility bills & official circulars under statutory standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* File Upload Zone */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-5 text-center bg-slate-50 hover:bg-blue-50/40 transition-colors">
            <input
              type="file"
              id="fileInput"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {selectedFile ? selectedFile.name : t.docs.uploadTitle}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {t.docs.uploadSubtitle}
              </p>
              {selectedFile && (
                <span className="mt-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ready to analyze ({Math.round(selectedFile.size / 1024)} KB)
                </span>
              )}
            </label>
          </div>

          {/* Quick Verified Samples for 1-Click Citizen Test */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {t.docs.orSelectSample}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loadSampleBill('water')}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 text-left text-xs font-medium text-slate-700 transition-colors"
              >
                <Droplet className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">{t.docs.sampleWaterBill}</span>
              </button>
              <button
                type="button"
                onClick={() => loadSampleBill('electricity')}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 text-left text-xs font-medium text-slate-700 transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">{t.docs.sampleElectricityBill}</span>
              </button>
            </div>
          </div>

          {/* User Question Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              What would you like the AI to investigate about this document?
            </label>
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="e.g. Why is my water bill so high this month?"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Analyze Button */}
          <div className="flex justify-end">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleAnalyzeUploaded}
              className="px-4 py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Auditing Utility Statement...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Audit Document with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {analysisResult.documentType}
                </span>
                {analysisResult.anomalyDetected ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                    <AlertTriangle className="w-3 h-3" />
                    Billing Discrepancy Flagged
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" />
                    Standard Tariff Verified
                  </span>
                )}
              </div>

              {/* Extracted Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white p-3 rounded border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Consumer ID / CA:</span>
                  <span className="font-semibold text-slate-800">{analysisResult.consumerDetails.consumerId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Current Bill Demand:</span>
                  <span className="font-bold text-blue-900">{analysisResult.consumerDetails.currentAmount}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Meter Units Billed:</span>
                  <span className="font-semibold text-slate-800">{analysisResult.consumerDetails.unitsConsumed}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Sanctioned Category:</span>
                  <span className="text-slate-700">{analysisResult.consumerDetails.sanctionedLoad}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">Billing Cycle:</span>
                  <span className="text-slate-700">{analysisResult.consumerDetails.billingCycle}</span>
                </div>
              </div>

              {/* AI Explanation */}
              <div className="bg-amber-50/80 border border-amber-200 rounded p-3 text-xs space-y-1.5">
                <p className="font-semibold text-amber-900">
                  AI Investigation Finding:
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {analysisResult.anomalyExplanation}
                </p>
                <p className="text-slate-600 text-[11px] italic pt-1 border-t border-amber-200/60">
                  {analysisResult.answerToQuestion}
                </p>
              </div>

              {/* Statutory Action Recommendation */}
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs space-y-1">
                <p className="font-semibold text-[#0e3b6c]">
                  Recommended Statutory Remedy:
                </p>
                <p className="text-slate-700">
                  {analysisResult.recommendedAction}
                </p>
              </div>

              {/* 1-Click Proceed to Complaint */}
              {analysisResult.canFileGrievance && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleProceed}
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{t.docs.proceedWithBill}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
