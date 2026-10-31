import { GovernmentServiceItem } from '../types';

export const governmentServicesList: GovernmentServiceItem[] = [
  {
    id: 'srv-trans-01',
    title: 'Issuance of Learner\'s & Permanent Driving Licence (Sarathi Parivahan)',
    category: 'Transport',
    department: 'Ministry of Road Transport and Highways (MoRTH) / State RTO',
    state: 'All India',
    description: 'Online application for Learner\'s Licence (LL with home test) and slot booking for permanent Driving Licence (DL) automated track test.',
    eligibility: [
      'Minimum 18 years of age for Light Motor Vehicle (LMV / Car / Bike with Gear)',
      'Minimum 16 years for motorcycle without gear (up to 50cc) with guardian consent',
      'Completion of 30 days mandatory waiting period after Learner\'s Licence issue'
    ],
    documents: [
      'Proof of Age (10th Passing Certificate / Birth Certificate / Passport)',
      'Proof of Address (Aadhaar Card / Voter ID / Utility Bill)',
      'Medical Certificate Form 1A (if age 40+ or transport category)',
      'Valid Learner\'s Licence Number'
    ],
    processingTimeDays: 7,
    officialPortalName: 'Sarathi Parivahan Official Portal (sarathi.parivahan.gov.in)',
    officialPortalUrl: 'https://sarathi.parivahan.gov.in',
    fee: '₹200 (LL) + ₹300 (DL Test) + ₹200 (Smart Card)'
  },
  {
    id: 'srv-water-01',
    title: 'New Household Water Tap Connection (Jal Jeevan Mission)',
    category: 'Water',
    department: 'Department of Water Supply & Sanitation / State Jal Board',
    state: 'All India',
    description: 'Statutory facility for piped functional tap connection to rural and urban domestic households under National Jal Jeevan Mission.',
    eligibility: [
      'Bonafide resident of the local revenue ward/village',
      'Proof of property ownership or authorized tenancy agreement',
      'No outstanding municipal water utility dues on premises'
    ],
    documents: [
      'Aadhaar Card / Voter ID Card',
      'Electricity Bill or Property Tax Receipt for address proof',
      'Site layout sketch showing nearest water distribution pipeline'
    ],
    processingTimeDays: 7,
    officialPortalName: 'Jal Jeevan Mission & State e-Sewa',
    officialPortalUrl: 'https://jaljeevanmission.gov.in',
    fee: '₹100 (Rural) / ₹500 (Urban Municipal)'
  },
  {
    id: 'srv-water-02',
    title: 'Water Bill Discrepancy & Defective Meter Testing',
    category: 'Water',
    department: 'Municipal Corporation / Jal Board Revenue Division',
    state: 'All India',
    description: 'Challenging unusually inflated water billing, estimated "LOCK" readings, or defective mechanical/digital water meters.',
    eligibility: [
      'Active water consumer account (CA / K-Number)',
      'Substantial billing divergence (>25% from 6-month historical average)'
    ],
    documents: [
      'Disputed water bill copy',
      'Last two paid receipt counterfoils',
      'Geotagged photograph of current water meter index'
    ],
    processingTimeDays: 15,
    officialPortalName: 'State Jal Board Revenue Gateway & CPGRAMS',
    officialPortalUrl: 'https://pgportal.gov.in',
    fee: 'Nil (Meter test fee refundable if meter found defective)'
  },
  {
    id: 'srv-elec-01',
    title: 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar Subsidy)',
    category: 'Electricity',
    department: 'Ministry of New & Renewable Energy / State DISCOM',
    state: 'All India',
    description: 'Direct DBT central subsidy up to ₹78,000 for installing residential grid-connected rooftop solar systems up to 3 KW capacity.',
    eligibility: [
      'Domestic electricity consumer with suitable unshaded roof',
      'Valid domestic electricity connection with linked Aadhaar'
    ],
    documents: [
      'Recent electricity bill (under 6 months old)',
      'Bank passbook cancelled cheque for direct subsidy transfer',
      'Aadhaar card copy'
    ],
    processingTimeDays: 30,
    officialPortalName: 'National Solar Rooftop Portal (pmsuryaghar.gov.in)',
    officialPortalUrl: 'https://pmsuryaghar.gov.in',
    fee: 'Nil for application (Vendor installation charges apply)'
  },
  {
    id: 'srv-elec-02',
    title: 'Immediate Electricity Outage & Burnt Transformer Replacement',
    category: 'Electricity',
    department: 'State Electricity Distribution Company (DISCOM / PSPCL / UPPCL / BESCOM)',
    state: 'All India',
    description: 'Statutory emergency complaint for distribution transformer failure, phase breakdown, or persistent unannounced outages.',
    eligibility: [
      'Any affected consumer in the local distribution feeder area'
    ],
    documents: [
      'Consumer Account Number / Sub-station name',
      'Location landmark or pole number'
    ],
    processingTimeDays: 1, // 24 hours under RTS
    officialPortalName: 'DISCOM 1912 Central Urja Portal & National Power Portal',
    officialPortalUrl: 'https://pgportal.gov.in',
    fee: 'Nil'
  },
  {
    id: 'srv-cert-01',
    title: 'Issuance of Income Certificate (e-District / Saral)',
    category: 'Certificates',
    department: 'Department of Revenue & Disaster Management',
    state: 'All India',
    description: 'Legally certified assessment of annual family income for scholarship, fee concession, or government welfare scheme eligibility.',
    eligibility: [
      'Citizen residing within the jurisdiction of the issuing Tehsildar / SDM',
      'Self-declaration of family income from all sources'
    ],
    documents: [
      'Self-declaration affidavit / ITR copy or Salary Slip / Patwari verification',
      'Proof of identity (Aadhaar / Voter ID)',
      'Ration Card / Parivar Pehchan Patra (if applicable)'
    ],
    processingTimeDays: 14,
    officialPortalName: 'National e-District & State Citizen Service (Saral / Seva Kendra)',
    officialPortalUrl: 'https://services.india.gov.in',
    fee: '₹30 - ₹50'
  },
  {
    id: 'srv-cert-02',
    title: 'Scheduled Caste (SC) / OBC / EWS Caste Certificate',
    category: 'Certificates',
    department: 'Department of Social Justice, Empowerment & Minorities',
    state: 'All India',
    description: 'Verification of caste and community status for availing constitutional reservation in education, recruitment, and welfare programmes.',
    eligibility: [
      'Applicant belonging to recognized notified caste / community in state gazette'
    ],
    documents: [
      'Paternal blood relative caste certificate (Father/Paternal Uncle/Grandfather)',
      'Aadhaar card of applicant and father',
      'School leaving certificate mentioning caste'
    ],
    processingTimeDays: 21,
    officialPortalName: 'State e-District / National Portal of India',
    officialPortalUrl: 'https://services.india.gov.in',
    fee: '₹40'
  },
  {
    id: 'srv-agri-01',
    title: 'PM-KISAN Samman Nidhi (Annual ₹6,000 Direct Support)',
    category: 'Agriculture',
    department: 'Ministry of Agriculture & Farmers Welfare',
    state: 'All India',
    description: 'Direct income support of ₹6,000 per year in three equal four-monthly installments into bank accounts of landholding farmer families.',
    eligibility: [
      'Small and marginal farmer families with cultivable landholding in revenue records'
    ],
    documents: [
      'Aadhaar Card with mobile linkage for e-KYC',
      'Land revenue document (Khasra/Khatauni / Jamabandi)',
      'Bank passbook with NPCI Aadhaar seeding'
    ],
    processingTimeDays: 15,
    officialPortalName: 'PM-KISAN Official Portal (pmkisan.gov.in)',
    officialPortalUrl: 'https://pmkisan.gov.in',
    fee: 'Nil'
  },
  {
    id: 'srv-food-01',
    title: 'New Ration Card / Member Addition (NFSA / One Nation One Ration)',
    category: 'Food',
    department: 'Department of Food, Civil Supplies & Consumer Affairs',
    state: 'All India',
    description: 'Issuance of NFSA subsidized foodgrain card (Antyodaya Anna Yojana / Priority Household) and inter-state portability enablement.',
    eligibility: [
      'Head of family (preferably senior woman above 18 years)',
      'Family income within state poverty/NFSA criteria'
    ],
    documents: [
      'Aadhaar cards of all family members',
      'Residence proof and electricity bill',
      'Income verification or surrender certificate from previous area'
    ],
    processingTimeDays: 30,
    officialPortalName: 'National Food Security Portal (nfsa.gov.in)',
    officialPortalUrl: 'https://nfsa.gov.in',
    fee: '₹20'
  },
  {
    id: 'srv-muni-01',
    title: 'Online Property Tax Assessment & Municipal Grievance',
    category: 'Municipal',
    department: 'Urban Local Bodies / Municipal Corporation',
    state: 'All India',
    description: 'Self-assessment of urban property tax, correction of property dimensions, or lodging grievance regarding civic drainage/potholes.',
    eligibility: [
      'Property title owner or authorized occupant in municipal bounds'
    ],
    documents: [
      'Previous Property Tax Unique ID (PID)',
      'Registered Sale Deed or Conveyance Deed',
      'Electricity / Water Connection Receipt'
    ],
    processingTimeDays: 7,
    officialPortalName: 'State Urban Local Bodies Portal',
    officialPortalUrl: 'https://services.india.gov.in',
    fee: 'Based on unit area valuation'
  }
];
