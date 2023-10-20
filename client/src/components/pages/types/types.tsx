export interface Language {
  name: string;
  levelName: string;
  score: number; // Allow null for initial values
}

export interface Candidate {
  id: string;
  user_id: string;
  password: string;
  email: string;
  associations: string[];
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  city?: string;
  country?: string;
  cv_reference?: string | null;
  address?: string;
  phone_number?: string;
  birth_date?: string; // You may want to use a Date type, or ISO string
  work_permit: string;
  notice_period?: string;
  job_status?: string;
  preferred_jobs?: { [key: string]: any }[];
  company_type?: string[];
  matching_jobs?: { [key: string]: any };
  matching_companies?: { [key: string]: any };
  values?: string[];
  skills?: { [key: string]: any }[];
  languages?: { [key: string]: any }[];
  links?: { [key: string]: any }[];
  certificates?: { [key: string]: any }[];
  visible_information?: { [key: string]: any };
  experience?: { [key: string]: any }[];
  visa_status?: string[];
  salary_expectation?: string[];
  other_information?: { [key: string]: any };
}

export interface EditInputProps<Candidate> {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  setValuesToEdit: (arg: Candidate) => void;
  fieldsToDisplay: string[];
  showModal: () => void;
  onSave?: (arg: Candidate) => void;
  candidate: Candidate;
  fieldKeysToEdit: string[];
}

export interface Company {
  id: string;
  user_id: string;
  password: string;
  email: string;
  associations: string[];
  company_name: string;
  address: string;
  logo: string;
  linkedin_url: string;
  values: string[];
  job_types: string[];
  contact_details: Record<string, any>;
  kununu_url: string;
  open_positions: string[];
  company_size: string;
}

export interface Job {
  id: string;
  associations: string[];
  company_id: string;
  title: string;
  description: string | null;
  values: string[] | null;
  skills: { skill_name: string, skill_level: number }[] | null;
  hiring_process_duration: string | null;
  posting_date: string | null;
  matching_candidates: number[] | null;
  salary: number | null;
  location_city: string | null;
  location_country: string | null;
  work_location: string | null;
  employment_type: string | null;
  date_created: string;
}
