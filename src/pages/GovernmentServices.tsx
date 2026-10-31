import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Clock, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight, 
  Droplet, 
  Zap, 
  FileText, 
  Sprout, 
  ShoppingBag, 
  Building,
  Car
} from 'lucide-react';
import { governmentServicesList } from '../data/servicesData';
import { GovernmentServiceItem, Language } from '../types';
import { translations } from '../utils/translations';

interface GovernmentServicesProps {
  language: Language;
  onApplyService: (service: GovernmentServiceItem) => void;
}

export const GovernmentServices: React.FC<GovernmentServicesProps> = ({
  language,
  onApplyService,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Services', icon: ShieldCheck },
    { id: 'Transport', label: 'Transport & Driving Licence', icon: Car },
    { id: 'Water', label: 'Water & Jal Jeevan', icon: Droplet },
    { id: 'Electricity', label: 'Electricity & Solar', icon: Zap },
    { id: 'Certificates', label: 'Certificates (Revenue)', icon: FileText },
    { id: 'Agriculture', label: 'Agriculture & PM-KISAN', icon: Sprout },
    { id: 'Food', label: 'Ration & Food Supplies', icon: ShoppingBag },
    { id: 'Municipal', label: 'Municipal & Property', icon: Building },
  ];

  const states = ['All', 'Punjab', 'Delhi (NCT)', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'All India'];

  const filteredServices = governmentServicesList.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesState = selectedState === 'All' || item.state === 'All India' || item.state.includes(selectedState);
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesState && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span>Statutory Citizen Services Directory</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0e3b6c] tracking-tight">
          {t.services.heading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          {t.services.subheading}
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.services.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* State filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">State / UT:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-700 focus:outline-none"
            >
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#0e3b6c] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 space-y-3">
              {/* Category & RTS Tag */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {service.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>RTS: <strong>{service.processingTimeDays} {t.common.days}</strong></span>
                </span>
              </div>

              {/* Title & Dept */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {service.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  {service.department}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Documents Required Accordion-like snippet */}
              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs space-y-1">
                <span className="font-semibold text-slate-700 block text-[11px] flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Key Documents Required:
                </span>
                <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                  {service.documents.slice(0, 2).map((doc, i) => (
                    <li key={i} className="truncate">{doc}</li>
                  ))}
                  {service.documents.length > 2 && (
                    <li className="text-slate-400 text-[10px] italic">+{service.documents.length - 2} more verification proofs</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-200 flex items-center justify-between gap-2">
              <a
                href={service.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-500 hover:text-blue-800 hover:underline flex items-center gap-1 truncate max-w-[150px]"
                title={service.officialPortalName}
              >
                <span>{service.officialPortalName}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>

              <button
                onClick={() => onApplyService(service)}
                className="px-3 py-1.5 bg-[#0e3b6c] hover:bg-[#124b8a] text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{t.services.applyWithAI}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
          <p className="text-sm font-semibold text-slate-700">No public services match your query.</p>
          <p className="text-xs text-slate-500">Try searching for generic terms like &quot;water&quot;, &quot;electricity&quot;, &quot;income&quot;, or &quot;caste&quot;.</p>
        </div>
      )}
    </div>
  );
};
