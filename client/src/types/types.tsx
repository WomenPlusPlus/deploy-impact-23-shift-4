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
  soft_skills?: string[];
  languages?: { [key: string]: any }[];
  links?: { [key: string]: any }[];
  certificates?: { [key: string]: any }[];
  visible_information?: string[];
  experience?: { [key: string]: any }[];
  visa_status?: string[];
  salary_expectation?: string[];
  possible_work_locations?: string[];
  type_of_work?: string[];
  saved_items?: string[];
  date_profile_modified?: string;
  package_requested?: { [key: string]: any }[];
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
  company_name?: string;
  address?: string;
  logo?: string;
  linkedin_url?: string;
  values?: string[];
  job_types?: string[];
  contact_details?: Record<string, any>; // JSON object
  kununu_url?: string;
  open_positions?: string[];
  company_size?: string;
  company_type?: string;
  company_description?: string;
  company_website?: string;
  company_industry?: string[];
  saved_items?: string[];
  shared_candidate_packages?: string[];
  interested_candidates?: string[];
}

export interface Experience {
  role: string;
  industries: string;
  years_of_experience?: number;
}

export interface Job {
  id: string;
  associations: string[];
  company_id: string;
  title?: string;
  description?: string;
  values?: string[];
  skills?: Skill[];
  soft_skills?: string[];
  hiring_process_duration?: string;
  matching_candidates?: { [key: string]: any }[];
  salary?: string[]; // array of 2 strings, min and max salary range
  location_city?: string;
  location_country?: string;
  work_location?: string;
  employment_type?: string;
  date_created?: string;
}

export interface Association {
  id: string;
  user_id: string;
  association_name: string;
  logo: string;
  address: string;
  description: string;
  iniciatives: Object[];
  invites: Object[];
}
export interface Skill {
  skill_name: string;
  skill_id: string;
  skill_level?: string;
  score?: number;
}

export interface Section {
  title: string;
  subtitle?: string;
  text?: string;
  subtext?: string;
  icon?: JSX.Element;
  type?: string;
}
