import axios from "axios";
import { Candidate } from "../../types/types";
import { updateCandidateById } from "../../../../api/candidates";

const getFakeData = () => {
  const fieldsToDisplayContactInfo = ["Phone number", "Email", "Address"];
  const fieldsToDisplayProfile = [
    "First name",
    "Last name",
    "Job status",
    "City",
    "Country",
  ];
  const allTypeOfJob = [
    { job_name: "Full-time", job_id: "Full-time" },
    { job_name: "Part-time", job_id: "Part-time" },
    { job_name: "Internship", job_id: "Internship" },
    { job_name: "Freelance", job_id: "Freelance" },
    { job_name: "Remote", job_id: "Remote" },
  ];
  const allTypeOfJobStatus = ["Employed", "Unemployed", "Student"];
  const allValue = [
    { value_name: "Teamwork", value_id: "Teamwork", score: 20 },
    { value_name: "Communication", value_id: "Communication", score: 20 },
    { value_name: "Problem solving", value_id: "Problem solving", score: 20 },
  ];
  const allSkill = [
    { skill_name: "React", skill_id: "React", score: 20 },
    { skill_name: "Node.js", skill_id: "Node.js", score: 20 },
    { skill_name: "TypeScript", skill_id: "TypeScript", score: 20 },
    { skill_name: "JavaScript", skill_id: "JavaScript", score: 20 },
    { skill_name: "HTML/CSS", skill_id: "HTML/CSS", score: 20 },
    { skill_name: "Python", skill_id: "Python", score: 20 },
  ];
  const user = {
    first_name: "John",
    last_name: "Doe",
    status: "Looking for a job",
    city: "Zurich",
    country: "CH",
    progress: 80,
    list: [
      "PersonalDetails",
      "Skills",
      "Values",
      "Documents",
      "Privacy",
      "TypeOfJobs",
      "Languages",
    ],
    associations: ["Woman++", "proFemmes", "Coders", "Kpi"],
    typeOfJobs: ["Full-time", "Part-time", "Internship", "Freelance"],
    skills: [
      { skill_name: "React", skill_id: "React", score: 20 },
      { skill_name: "Node.js", skill_id: "Node.js", score: 20 },
      { skill_name: "TypeScript", skill_id: "TypeScript", score: 20 },
    ],
    values: [{ value_name: "Teamwork", value_id: "Teamwork", score: 20 }],
    languages: [
      { name: "English", levelName: "Beginner", score: 20 },
      { name: "Italian", levelName: "Native", score: 100 },
      // Add more languages as needed
    ],
    contactInfo: {
      phoneNumber: "123-456-7890",
      email: "laura@gmail.com",
      address: "123 Street Name, City, Country",
    },
    job_status: "Looking for a job",
    preferred_jobs: [{ job_name: "Full-time", job_id: "Full-time" }],
  };
  return {
    user,
    fieldsToDisplayContactInfo,
    fieldsToDisplayProfile,
    allTypeOfJob,
    allTypeOfJobStatus,
    allValue,
    allSkill,
  };
};

type FieldCategoryMapping = Record<keyof Candidate, string>;
const fieldCategoryMapping: FieldCategoryMapping = {
  id: "Profile",
  user_id: "Profile",
  password: "Profile",
  email: "Contact info",
  associations: "Profile",
  first_name: "Profile",
  last_name: "Profile",
  preferred_name: "Profile",
  city: "Contact info",
  country: "Contact info",
  cv_reference: "Documents",
  address: "Contact info",
  phone_number: "Contact info",
  birth_date: "Profile",
  work_permit: "Visa Status",
  notice_period: "Notice",
  job_status: "Profile",
  preferred_jobs: "Type of jobs",
  company_type: "Experience",
  matching_jobs: "",
  matching_companies: "",
  values: "Values",
  skills: "Skills",
  languages: "Languages",
  links: "Profile",
  certificates: "Documents",
  visible_information: "Profile",
  experience: "Experience",
  visa_status: "Visa Status",
  salary_expectation: "Salary expectation",
  other_information: "Profile",
};

const categories = [
  "Salary expectation",
  "Notice",
  "Visa Status",
  "Documents",
  "Profile",
  "Skills",
  "Values",
  "Languages",
  "Experience",
  "Contact info",
  "Type of jobs you're looking for",
];

const categoryFieldMapping: Record<string, number> = {};

const countNullFieldsByCategory = (
  candidate: Candidate,
  allCategories: string[]
) => {
  // Count the number of null fields for each category
  allCategories.forEach((category) => {
    const fieldsForCategory = Object.keys(fieldCategoryMapping).filter(
      (field) =>
        (fieldCategoryMapping as Record<string, string>)[field] === category
    ) as (keyof Candidate)[];

    const totalFieldsForCategory = fieldsForCategory.length;

    const nullFieldsCount = fieldsForCategory.reduce((count, field) => {
      if (candidate[field] === null) {
        return count + 1;
      }
      return count;
    }, 0);
    // Assign the number of null fields to the category
    categoryFieldMapping[category] = totalFieldsForCategory - nullFieldsCount;
  });

  return categoryFieldMapping;
};

const completedCategories = Object.values(categoryFieldMapping).filter(
  (fraction) => fraction > 0
).length;

const percentage = ({
  completedCategories,
  totalCategories,
}: {
  completedCategories: number;
  totalCategories: number;
}) => {
  const progress = (completedCategories / totalCategories) * 100;
  return Math.round(progress);
};

export {
  getFakeData,
  countNullFieldsByCategory,
  percentage,
  categories,
  fieldCategoryMapping,
  completedCategories,
};
