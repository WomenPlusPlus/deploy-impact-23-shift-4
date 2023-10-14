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
  const allTypeOfJob = ["Full-time", "Part-time", "Internship", "Freelance"];
  const allTypeOfJobStatus = ["Employed", "Unemployed", "Student"];
  const allValue = ["Cheer up", "Social", "Awareness", "Respect"];
  const allSkill = ["Vue", "Express.js", "Bash", "R", "C++", "Java", "Python"];
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
      "React",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Python",
    ],
    values: ["Teamwork", "Diversity", "Inclusion", "Equality"],
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
