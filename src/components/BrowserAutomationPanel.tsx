import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  KeyRound, 
  ExternalLink, 
  RefreshCw, 
  Lock 
} from 'lucide-react';
import { api } from '../services/api';
import { AutomationJob } from '../types';

interface BrowserAutomationPanelProps {
  complaintData: any;
  targetPortalUrl: string;
  onAutomationComplete: (officialAckNumber: string) => void;
  onCancel: () => void;
}

export const BrowserAutomationPanel: React.FC<BrowserAutomationPanelProps> = ({
  complaintData,
  targetPortalUrl,
  onAutomationComplete,
  onCancel,
}) => {
  const [job, setJob] = useState<AutomationJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInputValue, setUserInputValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize automation job on mount
  useEffect(() => {
    let isMounted = true;
    async function initJob() {
      try {
        setLoading(true);
        const res = await api.startAutomation(complaintData.id || 'temp', targetPortalUrl, complaintData);
        if (isMounted) {
          setJob(res.job);
        }
      } catch (err: any) {
        if (isMounted) {
          setErrorMessage('Could not initialize automated browser worker: ' + err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    initJob();
    return () => {
      isMounted = false;
    };
  }, [complaintData, targetPortalUrl]);

  // Poll job status until it reaches citizen intervention or completion
  useEffect(() => {
    if (!job || job.status === 'completed' || job.status === 'failed') return;
    if (job.requiresCitizenAction) return; // wait for citizen input

    const timer = setInterval(async () => {
      try {
        const res = await api.getAutomationStatus(job.id);
        setJob(res.job);
        if (res.job.status === 'completed' && res.job.officialAckNumber) {
          clearInterval(timer);
          onAutomationComplete(res.job.officialAckNumber);
        }
      } catch (err) {
        console.warn('Status poll warning:', err);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [job, onAutomationComplete]);

  const handleVerifyStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    if (!userInputValue.trim()) {
      setErrorMessage('Please enter the required security code or confirmation.');
      return;
    }
    setIsVerifying(true);
    setErrorMessage(null);
    try {
      const res = await api.verifyAutomationStep(job.id, userInputValue);
      setJob(res.job);
      setUserInputValue('');
    } catch (err: any) {
      setErrorMessage('Verification failed: ' + err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 overflow-hidden text-xs my-4">
      {/* Header Bar */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-semibold text-slate-200">
            Assisted Browser Automation Gateway (Playwright Core)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={targetPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline"
          >
            <span>Target: {targetPortalUrl.replace('https://', '').split('/')[0]}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-700"
          >
            Close Inspector
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-blue-400 animate-spin mx-auto" />
          <p className="text-slate-300">Initializing secure session with government server...</p>
        </div>
      ) : errorMessage ? (
        <div className="p-6 text-center space-y-3">
          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
          <p className="text-red-300">{errorMessage}</p>
          <button
            onClick={onCancel}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs"
          >
            Return to Manual Guide
          </button>
        </div>
      ) : job ? (
        <div className="p-5 space-y-5">
          {/* Progress Stages */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span>Stage {job.stageIndex} of {job.totalStages}</span>
              <span className="text-emerald-400 font-mono">
                {Math.round((job.stageIndex / job.totalStages) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-emerald-500 h-2 transition-all duration-500"
                style={{ width: `${(job.stageIndex / job.totalStages) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-slate-200 font-mono text-[11px] flex items-center gap-1.5">
              <span className="text-blue-400">Current Phase:</span>
              <span>{job.currentStage}</span>
            </div>
          </div>

          {/* Identified Government Form Fields & Suggested Values */}
          <div>
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Government Portal Form Fields Identified by AI</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {job.identifiedFields.map((field, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/90 rounded border border-slate-700 p-2 flex items-start justify-between gap-2"
                >
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block truncate">{field.label}</span>
                    <span className="font-mono text-slate-200 text-[11px] truncate block">
                      {field.value || '<Awaiting User Verification>'}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                      field.status === 'populated'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {field.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Security Checkpoint (CAPTCHA / Mobile OTP) */}
          {job.requiresCitizenAction && (
            <div className="bg-amber-950/40 border border-amber-600/60 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-300 text-sm">
                    Citizen Authentication Checkpoint
                  </h4>
                  <p className="text-slate-300 text-xs mt-0.5">
                    {job.actionPrompt || 'Government portal security policy requires citizen personal authentication.'}
                  </p>
                </div>
              </div>

              {/* Security CAPTCHA Display Box */}
              <div className="bg-slate-800 rounded p-3 border border-slate-700 flex flex-wrap items-center gap-4">
                <div className="bg-slate-900 border border-slate-600 px-4 py-2 rounded text-center select-none font-mono text-lg font-bold tracking-widest text-emerald-400">
                  7 X 9 K 4
                </div>
                <div className="text-[11px] text-slate-400">
                  Government Security Code (CAPTCHA). Enter the characters shown on the left to verify your submission.
                </div>
              </div>

              <form onSubmit={handleVerifyStep} className="flex gap-2">
                <input
                  type="text"
                  value={userInputValue}
                  onChange={(e) => setUserInputValue(e.target.value)}
                  placeholder="Enter CAPTCHA Code (e.g. 7X9K4)..."
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-blue-400 text-xs"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-md flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isVerifying ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <span>Authorize & Submit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Submission Finished */}
          {job.status === 'completed' && (
            <div className="bg-emerald-950/60 border border-emerald-500 rounded-lg p-4 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-emerald-200 text-sm">
                Official Submission Confirmed by Government Portal
              </h4>
              <p className="text-slate-300 text-xs font-mono">
                Official Acknowledgment Number: <strong className="text-white">{job.officialAckNumber}</strong>
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
