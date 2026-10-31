import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ComplaintRecord } from '../types';

interface PrintReceiptModalProps {
  record: ComplaintRecord | null;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[95vh] flex flex-col overflow-hidden text-slate-800">
        {/* Modal Controls (Hidden in Print) */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between no-print">
          <span className="font-semibold text-xs text-slate-600">
            Official Grievance Docket Acknowledgment Slip
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-8 overflow-y-auto space-y-6 print:p-0">
          {/* Official Indian Gov Header */}
          <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
            <div className="flex items-center justify-center gap-2 mb-1">
              <ShieldCheck className="w-7 h-7 text-[#0e3b6c]" />
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#0e3b6c]">
                JanConnect AI — Digital Citizen Services
              </span>
            </div>
            <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
              Public Grievance Redressal Acknowledgment Receipt
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Issued under the Public Grievances (CPGRAMS) & Right to Public Service (RTS) Framework
            </p>
          </div>

          {/* Reference & Docket Banner */}
          <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                Official Grievance Registration Number:
              </span>
              <span className="font-mono text-base font-bold text-blue-900">
                {record.referenceNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                Registration Date & Time:
              </span>
              <span className="text-xs font-medium text-slate-700 font-mono">
                {record.filingDate}
              </span>
            </div>
          </div>

          {/* Departmental Allocation Table */}
          <table className="w-full text-xs border border-slate-300 border-collapse">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="w-1/3 p-2.5 font-bold bg-slate-100 text-slate-700 border-r border-slate-200">
                  Grievance Category:
                </td>
                <td className="p-2.5 font-semibold text-slate-900">
                  {record.category} ({record.subcategory})
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 font-bold bg-slate-100 text-slate-700 border-r border-slate-200">
                  Responsible Ministry / Department:
                </td>
                <td className="p-2.5 text-slate-800">
                  {record.department}
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 font-bold bg-slate-100 text-slate-700 border-r border-slate-200">
                  Competent Officer / Forum:
                </td>
                <td className="p-2.5 text-slate-800">
                  {record.authorityName}
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 font-bold bg-slate-100 text-slate-700 border-r border-slate-200">
                  Complainant Full Name:
                </td>
                <td className="p-2.5 text-slate-900 font-semibold">
                  {record.applicantName} ({record.applicantPhone})
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 font-bold bg-slate-100 text-slate-700 border-r border-slate-200">
                  Consumer Account / Location:
                </td>
                <td className="p-2.5 text-slate-800">
                  {record.consumerNumber ? `ID: ${record.consumerNumber} | ` : ''}
                  {record.address}, {record.district}, {record.state}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold bg-slate-100 text-slate-700 border-r border-slate-200">
                  Official Redressal Portal:
                </td>
                <td className="p-2.5 text-blue-700 font-medium">
                  {record.officialPortal} ({record.officialPortalUrl})
                </td>
              </tr>
            </tbody>
          </table>

          {/* Grievance Statement */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Summary of Facts & Prayer:
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 leading-relaxed font-serif whitespace-pre-wrap">
              {record.description}
            </div>
          </div>

          {/* Verification Footnote & Legal Notice */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
            <p className="flex items-center gap-1 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Digitally Authenticated Grievance Docket. No physical signature required.</span>
            </p>
            <p>
              Under Section 5 of the Right to Public Services Act, citizens may file an appeal to the First Appellate Authority if no resolution is communicated within the statutory turnaround timeframe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
