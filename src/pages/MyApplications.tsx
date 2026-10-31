import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  ExternalLink, 
  Clock, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw 
} from 'lucide-react';
import { api } from '../services/api';
import { ComplaintRecord, Language } from '../types';
import { translations } from '../utils/translations';
import { PrintReceiptModal } from '../components/PrintReceiptModal';

interface MyApplicationsProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
}

export const MyApplications: React.FC<MyApplicationsProps> = ({
  language,
  onNavigateTab,
}) => {
  const t = translations[language];
  const [records, setRecords] = useState<ComplaintRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lookupQuery, setLookupQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'complaints' | 'services'>('all');
  const [selectedRecordForModal, setSelectedRecordForModal] = useState<ComplaintRecord | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lookupMessage, setLookupMessage] = useState<string | null>(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const res = await api.getApplications();
      setRecords(res.records || []);
    } catch (err) {
      console.warn('Fetch applications warning:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery.trim()) {
      fetchRecords();
      setLookupMessage(null);
      return;
    }

    setLookupMessage(null);
    try {
      const res = await api.trackApplication(lookupQuery.trim());
      setRecords([res.record]);
      setExpandedId(res.record.id);
    } catch (err: any) {
      setLookupMessage(
        err.message || 'Reference number not found in local gateway cache. For older complaints, check pgportal.gov.in.'
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Transferred to Officer':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Investigation Pending':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Action Taken':
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredRecords = records.filter((r) => {
    if (activeTabFilter === 'complaints') return r.category.includes('Bill') || r.category.includes('Water') || r.category.includes('Electricity');
    if (activeTabFilter === 'services') return r.category.includes('Certificates') || r.category.includes('Agriculture');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Verified Citizen Grievance & Service Records</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0e3b6c] tracking-tight">
          {t.myApps.heading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          {t.myApps.subheading}
        </p>
      </div>

      {/* Reference Number Lookup Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e.target.value)}
              placeholder={t.myApps.lookupPlaceholder}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{t.myApps.lookupButton}</span>
          </button>
          {lookupQuery && (
            <button
              type="button"
              onClick={() => {
                setLookupQuery('');
                setLookupMessage(null);
                fetchRecords();
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Reset Filter
            </button>
          )}
        </form>

        {lookupMessage && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>{lookupMessage}</p>
              <a
                href="https://pgportal.gov.in/Status"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Track on Central CPGRAMS Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTabFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTabFilter === 'all'
              ? 'bg-[#0e3b6c] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {t.myApps.tabAll} ({records.length})
        </button>
        <button
          onClick={() => setActiveTabFilter('complaints')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTabFilter === 'complaints'
              ? 'bg-[#0e3b6c] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {t.myApps.tabComplaints}
        </button>
      </div>

      {/* Records List */}
      {isLoading ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-2">
          <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Contacting public grievance gateway...</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-sm">{t.myApps.empty}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have not registered any grievances yet. Describe your issue in plain language to generate an official docket.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('complaint')}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              File a Grievance Now
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => {
            const isExpanded = expandedId === record.id;
            return (
              <div
                key={record.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
              >
                {/* Main Card Header */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {record.referenceNumber}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getStatusBadge(record.status)}`}>
                        {record.status}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{record.filingDate}</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {record.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-medium">
                      Department: <strong className="text-slate-800">{record.department}</strong>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedRecordForModal(record)}
                      title="Print Acknowledgment Slip"
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span className="hidden sm:inline">Receipt</span>
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : record.id)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Docket Timeline'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Timeline & Official Detail Drawer */}
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50/70 p-5 space-y-5 animate-in fade-in duration-150">
                    {/* Complaint Overview Table */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Complainant / Citizen:</span>
                        <span className="font-semibold text-slate-800">{record.applicantName}</span>
                        <span className="block text-[11px] text-slate-500 font-mono">{record.applicantPhone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location / Jurisdiction:</span>
                        <span className="text-slate-800">{record.address}, {record.district}, {record.state}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Official Tracking Portal:</span>
                        <a
                          href={record.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline flex items-center gap-1 font-medium mt-0.5"
                        >
                          <span>{record.officialPortal}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Grievance Statement */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Registered Petition Summary:
                      </h4>
                      <p className="text-xs text-slate-700 p-3 bg-white rounded border border-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                        {record.description}
                      </p>
                    </div>

                    {/* Official Action Timeline */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-700" />
                        <span>Government Investigation & Action Timeline:</span>
                      </h4>
                      <div className="space-y-2 border-l-2 border-blue-400 pl-4 ml-2">
                        {record.timeline.map((item, idx) => (
                          <div key={idx} className="relative pb-2">
                            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white"></div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-900">{item.stage}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                              {item.officer && (
                                <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-medium">
                                  Officer: {item.officer}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{item.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Receipt Modal */}
      <PrintReceiptModal
        record={selectedRecordForModal}
        onClose={() => setSelectedRecordForModal(null)}
      />
    </div>
  );
};
