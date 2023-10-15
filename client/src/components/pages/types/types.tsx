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
  cv_reference?: string;
  address?: string;
  phone_number?: string;
  birth_date?: string; // You may want to use a Date type, or ISO string
  work_permit: string;
  notice_period?: string;
  job_status?: string;
  preferred_jobs?: { [key: string]: any };
  company_type?: string[];
  matching_jobs?: { [key: string]: any };
  matching_companies?: { [key: string]: any };
  values?: string[];
  skills?: { [key: string]: any }[];
  languages?: { [key: string]: any }[];
  links?: { [key: string]: any }[];
  certificates?: { [key: string]: any }[];
  visible_information?: { [key: string]: any };
  experience?: { [key: string]: any };
  other_information?: { [key: string]: any };
}

export interface EditInputProps<Candidate> {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  setValuesToEdit: (arg: Candidate) => void;
  fieldsToDisplay: string[];
  onClick: () => void;
  onSave?: (arg: Candidate) => void;
  candidate: Candidate;
  fieldKeysToEdit: string[];
}