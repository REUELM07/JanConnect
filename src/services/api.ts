import { 
  ChatResponse, 
  ComplaintAnalysisResult, 
  ComplaintRecord, 
  AutomationJob, 
  DocumentAnalysisResult 
} from '../types';

export const api = {
  // 1. AI Chat & Policy Guidance
  async askQuery(query: string, language: string = 'en'): Promise<ChatResponse> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language }),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  // 2. Complaint Analysis
  async analyzeComplaint(query: string, language: string = 'en', statePreference: string = 'Punjab'): Promise<{ success: boolean; analysis: ComplaintAnalysisResult }> {
    const res = await fetch('/api/complaint/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language, statePreference }),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  // 3. Submit Complaint
  async submitComplaint(payload: Partial<ComplaintRecord>): Promise<{ success: boolean; record: ComplaintRecord; message: string }> {
    const res = await fetch('/api/complaint/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  // 4. Browser Automation
  async startAutomation(complaintId: string, targetPortal: string, citizenData: any): Promise<{ success: boolean; jobId: string; job: AutomationJob }> {
    const res = await fetch('/api/automation/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ complaintId, targetPortal, citizenData }),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  async getAutomationStatus(jobId: string): Promise<{ success: boolean; job: AutomationJob }> {
    const res = await fetch(`/api/automation/status/${jobId}`);
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  async verifyAutomationStep(jobId: string, userProvidedValue: string): Promise<{ success: boolean; job: AutomationJob }> {
    const res = await fetch('/api/automation/verify-step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, userProvidedValue }),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  // 5. Document Intelligence
  async analyzeDocument(params: {
    documentName: string;
    documentType?: string;
    base64Content?: string;
    textContent?: string;
    userQuestion?: string;
  }): Promise<{ success: boolean; analysis: DocumentAnalysisResult }> {
    const res = await fetch('/api/document/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  // 5b. Audio Voice Transcription
  async transcribeAudio(audioBase64: string, mimeType: string = 'audio/webm', language: string = 'en'): Promise<{ success: boolean; transcript: string }> {
    const res = await fetch('/api/audio/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioBase64, mimeType, language }),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  // 6. Applications & Tracking
  async getApplications(): Promise<{ success: boolean; count: number; records: ComplaintRecord[] }> {
    const res = await fetch('/api/applications');
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  },

  async trackApplication(referenceNumber: string): Promise<{ success: boolean; record: ComplaintRecord }> {
    const res = await fetch(`/api/applications/track/${encodeURIComponent(referenceNumber)}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `Reference number ${referenceNumber} not found.`);
    }
    return res.json();
  }
};
