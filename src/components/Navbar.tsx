import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  FileText, 
  AlertCircle, 
  CheckSquare, 
  Layers, 
  Menu, 
  X, 
  PhoneCall, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navLinks = [
    { id: 'home', label: t.nav.home, icon: Building2 },
    { id: 'services', label: t.nav.services, icon: Layers },
    { id: 'policy', label: t.nav.policySearch, icon: Search },
    { id: 'complaint', label: t.nav.fileComplaint, icon: AlertCircle, highlight: true },
    { id: 'application', label: t.nav.applicationAssistant, icon: CheckSquare },
    { id: 'my-apps', label: t.nav.myApplications, icon: FileText },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Subtle Indian Tricolor Accent Top Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600 border-b border-slate-100" />

      {/* Top Government Portal Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="tracking-wide uppercase text-[11px] text-slate-200">{t.govIdentity}</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">National Citizen Assistance Gateway</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Toll Free Helplines */}
            <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-300">
              <span className="flex items-center gap-1 font-mono">
                <PhoneCall className="w-3 h-3 text-amber-400" />
                <span>CPGRAMS: <strong className="text-white">1800-11-4000</strong></span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="font-mono">
                Electricity: <strong className="text-white">1912</strong>
              </span>
              <span className="text-slate-600">|</span>
              <span className="font-mono">
                Consumer: <strong className="text-white">1915</strong>
              </span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800 rounded px-2 py-0.5 border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <select
                aria-label="Select Portal Language"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी (Hindi)</option>
                <option value="pa" className="bg-slate-900 text-white">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Government Portal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo & National Digital Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            {/* Ashoka Chakra / Gov Shield Motif */}
            <div className="w-11 h-11 rounded-lg bg-[#0e3b6c] text-white flex items-center justify-center shadow-sm border border-blue-900 group-hover:bg-[#124b8a] transition-colors">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#0e3b6c]">
                  JanConnect <span className="text-blue-600 font-extrabold">AI</span>
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Citizen Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-none mt-1">
                {t.subTitle}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#0e3b6c] text-white shadow-xs'
                      : item.highlight
                      ? 'text-amber-800 bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium text-left ${
                  isActive
                    ? 'bg-[#0e3b6c] text-white'
                    : item.highlight
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
