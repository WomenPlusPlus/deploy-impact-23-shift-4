import React from "react";
import JobCard from "../../UI/card/JobCard";
import styling from "./Jobs.module.css";
import { useNavigate } from "react-router-dom";

const jobsData = [
  {
    id: "cc4ee1fb-3bb4-4601-a788-b66d09749f88",
    associations: ["woman++"],
    company_id: "cde2fb38-fc86-45ba-897b-7b092f764687",
    title: "Full-Stack Intern",
    description:
      "We are seeking a talented and motivated Full-Stack Intern to join our team. This internship offers a unique opportunity to gain valuable experience in web development.",
    values: [
      "Innovation",
      "Quality",
      "Diversity",
      "Teamwork",
      "Customer Focus",
      "Integrity",
      "Responsibility",
      "Adaptability",
      "Continuous Learning",
      "Sustainability",
      "Community Involvement",
      "Empowerment",
      "Transparency",
      "Excellence",
      "Creativity",
      "Open Communication",
      "Work-Life Balance",
      "Professional Growth",
      "Leadership",
      "Trust",
      "Accountability",
    ],
    skills: [
      {
        skill_name: "Front-End Development",
        skill_level: 3,
      },
      {
        skill_name: "Back-End Development",
        skill_level: 3,
      },
      {
        skill_name: "Database Management",
        skill_level: 1,
      },
      {
        skill_name: "JavaScript",
        skill_level: 3,
      },
      {
        skill_name: "React",
        skill_level: 3,
      },
      {
        skill_name: "Node.js",
        skill_level: 1,
      },
      {
        skill_name: "SQL",
        skill_level: 1,
      },
    ],
    hiring_process_duration: "3 months",
    posting_date: "2023-10-18",
    matching_candidates: [],
    salary: 80000,
    location_city: "Basel",
    location_country: "CH",
    work_location: "Hybrid",
    employment_type: "Internship",
  },
];

const Jobs: React.FC = () => {
  // state
  const navigate = useNavigate();

  return (
    <div className={styling.mainContainer}>
      <h2>Your jobs</h2>
      <div className={styling.cards}>
        {jobsData.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            // company_name={job.company_name}
            // company_location={job.company_location}
            // description={job.description}
            // avatarUrl={job.avatarUrl}
            // employees={job.employees}
            // level={job.level}
            // match={job.match}
            // department={job.department}
            // location={job.location}
            skills={job.skills}
            onClick={() => navigate(`/job/${job.id}`)}
          ></JobCard>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
