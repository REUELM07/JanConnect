/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { Home } from './pages/Home';
import { GovernmentServices } from './pages/GovernmentServices';
import { PolicySearch } from './pages/PolicySearch';
import { ComplaintAssistant } from './pages/ComplaintAssistant';
import { ApplicationAssistant } from './pages/ApplicationAssistant';
import { MyApplications } from './pages/MyApplications';
import { GovernmentServiceItem, Language } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('en');

  // Modals & Navigation state transfer
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [complaintInitialQuery, setComplaintInitialQuery] = useState<string>('');
  const [complaintInitialBillData, setComplaintInitialBillData] = useState<any>(null);
  const [preSelectedService, setPreSelectedService] = useState<GovernmentServiceItem | undefined>(undefined);

  const handleNavigateTab = (tab: string, stateData?: any) => {
    if (tab === 'complaint') {
      if (stateData?.initialQuery) {
        setComplaintInitialQuery(stateData.initialQuery);
      }
      if (stateData?.billData) {
        setComplaintInitialBillData(stateData.billData);
      }
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyService = (service: GovernmentServiceItem) => {
    setPreSelectedService(service);
    setCurrentTab('application');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedFromDocModal = (billData: any) => {
    setComplaintInitialBillData(billData);
    setComplaintInitialQuery(billData.problemDescription);
    setCurrentTab('complaint');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800" lang={language}>
      {/* Government Portal Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => handleNavigateTab(tab)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            language={language}
            onNavigateTab={handleNavigateTab}
            onOpenDocModal={() => setIsDocModalOpen(true)}
          />
        )}

        {currentTab === 'services' && (
          <GovernmentServices
            language={language}
            onApplyService={handleApplyService}
          />
        )}

        {currentTab === 'policy' && (
          <PolicySearch
            language={language}
          />
        )}

        {currentTab === 'complaint' && (
          <ComplaintAssistant
            language={language}
            initialQuery={complaintInitialQuery}
            initialBillData={complaintInitialBillData}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {currentTab === 'application' && (
          <ApplicationAssistant
            language={language}
            preSelectedService={preSelectedService}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {currentTab === 'my-apps' && (
          <MyApplications
            language={language}
            onNavigateTab={handleNavigateTab}
          />
        )}
      </main>

      {/* Document Intelligence & Bill Auditor Modal */}
      <DocumentUploadModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        language={language}
        onProceedToComplaint={handleProceedFromDocModal}
      />

      {/* Official Government Footer */}
      <Footer language={language} />
    </div>
  );
}
