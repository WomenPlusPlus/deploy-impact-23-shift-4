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

export { getFakeData };
