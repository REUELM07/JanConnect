export type Language = 'en' | 'hi' | 'pa';

export interface ComplaintRecord {
  id: string;
  referenceNumber: string;
  category: string;
  subcategory: string;
  title: string;
  department: string;
  authorityName: string;
  officialPortal: string;
  officialPortalUrl: string;
  status: 'Submitted' | 'Under Scrutiny' | 'Transferred to Officer' | 'Investigation Pending' | 'Action Taken' | 'Resolved';
  filingDate: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  state: string;
  district: string;
  address: string;
  consumerNumber?: string;
  description: string;
  billAmount?: string;
  previousAmount?: string;
  timeline: Array<{
    date: string;
    stage: string;
    note: string;
    officer?: string;
  }>;
  documentsAttached: string[];
  automationJobId?: string;
}

export interface ComplaintAnalysisResult {
  category: string;
  subcategory: string;
  department: string;
  authorityName: string;
  officialPortal: string;
  officialPortalUrl: string;
  resolutionDays: number;
  extractedEntities: {
    billAmount: string | null;
    previousAmount: string | null;
    location: string | null;
    duration: string | null;
    consumerNumber: string | null;
  };
  missingFields: Array<{
    field: string;
    label: string;
    placeholder: string;
    required: boolean;
  }>;
  requiredDocuments: string[];
  formalGrievanceDraft: string;
  citizenActionSummary: string;
}

export interface GroundingSource {
  url: string;
  title: string;
}

export interface ChatResponse {
  answer: string;
  sources: GroundingSource[];
  isComplaintIntent: boolean;
  detectedCategory: string | null;
}

export interface AutomationJob {
  id: string;
  complaintId: string;
  targetPortal: string;
  currentStage: string;
  stageIndex: number;
  totalStages: number;
  identifiedFields: Array<{
    name: string;
    label: string;
    value: string;
    status: 'detected' | 'populated' | 'verified';
  }>;
  requiresCitizenAction: boolean;
  actionPrompt?: string;
  actionType?: 'captcha' | 'otp' | 'final_approval';
  status: 'in_progress' | 'waiting_citizen' | 'completed' | 'failed';
  officialAckNumber?: string;
}

export interface DocumentAnalysisResult {
  documentType: string;
  consumerDetails: {
    consumerId: string;
    meterNumber: string;
    sanctionedLoad: string;
    billingCycle: string;
    currentAmount: string;
    unitsConsumed: string;
  };
  anomalyDetected: boolean;
  anomalyExplanation: string;
  recommendedAction: string;
  answerToQuestion: string;
  canFileGrievance: boolean;
}

export interface GovernmentServiceItem {
  id: string;
  title: string;
  category: 'Water' | 'Electricity' | 'Certificates' | 'Agriculture' | 'Food' | 'Municipal' | 'Transport';
  department: string;
  state: string;
  description: string;
  eligibility: string[];
  documents: string[];
  processingTimeDays: number;
  officialPortalName: string;
  officialPortalUrl: string;
  fee: string;
}
