import React from 'react';
import { ExternalLink, ShieldCheck, HeartHandshake, Phone, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>JanConnect AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering citizens to research policies, navigate public services, audit utility bills, and file structured grievances with competent government authorities.
            </p>
            <div className="pt-2 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              <span>All Central & State Gateways Synchronized</span>
            </div>
          </div>

          {/* Column 2: Official Portals */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Official Indian Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white hover:underline"
                >
                  <span>CPGRAMS (Public Grievances)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white hover:underline"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://myscheme.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white hover:underline"
                >
                  <span>myScheme Portal (Govt Schemes)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://services.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white hover:underline"
                >
                  <span>National Government Services Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Helplines */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              National Citizen Helplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-sans">Consumer Helpline:</span>
                <span className="text-amber-400 font-bold">1915 / 1800-11-4000</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-sans">Electricity Discom:</span>
                <span className="text-amber-400 font-bold">1912</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-sans">Water Supply (DJB/DWSS):</span>
                <span className="text-amber-400 font-bold">1916</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">Emergency Services:</span>
                <span className="text-white font-bold">112</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Citizen Charter & Privacy */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Citizen Charter & Security
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Complies with the Right to Public Services (RTS) standards and Consumer Protection Regulations. We do not store confidential banking credentials or OTPs.
            </p>
            <div className="bg-slate-800/80 rounded p-2.5 border border-slate-700 text-[11px] text-slate-300">
              <span className="font-semibold text-white">Browser Automation Notice:</span> Automation runs under citizen supervision. Government CAPTCHA and OTP verifications are strictly performed by the citizen personally.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} JanConnect AI — Digital Citizen Assistance Gateway. Built for public service accessibility.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500">Government Digital Standards</span>
            <span>•</span>
            <span className="text-slate-500">CPGRAMS Integrated</span>
            <span>•</span>
            <span className="text-slate-500">Web Accessibility Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
