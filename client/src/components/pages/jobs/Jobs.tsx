import React from "react";
import JobCard from "../../UI/card/JobCard";
import styling from "./Jobs.module.css";

const jobsData = [
  {
    name: "Front-end Developer",
    company_name: "ABC Tech",
    company_location: "New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    employees: "50-200",
    level: "Internship",
    match: "100",
    location: "Berlin",
    department: "Hiring Manager",
  },
  {
    name: "Cloud Engineer",
    company_name: "ABC Tech",
    company_location: "New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1542361345-89e58247f2d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    employees: "50-200",
    level: "Internship",
    match: "100",
    location: "Berlin",
    department: "Hiring Manager",
  },
  {
    name: "Back-end Developer",
    company_name: "ABC Tech",
    company_location: "New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
    employees: "50-200",
    level: "Internship",
    match: "600",
    location: "Berlin",
    department: "Hiring Manager",
  },
  {
    name: "Front-end Developer",
    company_name: "ABC Tech",
    company_location: "New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    employees: "50-200",
    level: "Internship",
    match: "50",
    location: "Berlin",
    department: "Hiring Manager",
  },
];

const Jobs: React.FC = () => {
  return (
    <div className={styling.mainContainer}>
      <h1 className={styling.header}>Hi UBS!</h1>
      <h2>Your jobs.</h2>
      <div className={styling.cards}>
        {jobsData.map((job, index) => (
          <JobCard
            key={index}
            name={job.name}
            company_name={job.company_name}
            company_location={job.company_location}
            description={job.description}
            avatarUrl={job.avatarUrl}
            employees={job.employees}
            level={job.level}
            match={job.match}
            department={job.department}
            location={job.location}
          ></JobCard>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
