import React, { useState, useEffect, useCallback } from "react";
import styling from "./Jobs.module.css";
import JobCard2 from "../../UI/card/JobCard2";
import LocationSelect from "../../UI/searchbar/LocationSelect";
import { Labels } from "../../UI/labels/Label";
import { Select, Checkbox, Menu, Input } from "antd";
const { Search } = Input;

const { Option, OptGroup } = Select;
const availableJobTypes: string[] = [
  "Design",
  "Product",
  "Engineering",
  "Data Science",
];
const availableContractTypes: string[] = [
  "Full Time",
  "Part Time",
  "Temporary",
];
const availableWorkTypes: string[] = ["Hybrid", "Remote", "Home Office"];

const locationOptions = [
  "Anywhere",
  "Berlin",
  "New York",
  "USA",
  "Netherland",
  "Turkey",
];

interface Job {
  name: string;
  company_name: string;
  company_location: string;
  description: string;
  avatarUrl: string;
  employees: string;
  level: string;
  match: string;
  location: string;
  department: string;
  skills: {
    technicalSkills: string[];
    softSkills: string[];
  };
  posting_date: string;
  type: string;
  contract_type: string;
  work_type: string;
}
const jobsData = [
  {
    name: "Front-end Developer Front-end Developer Front-end Developer Front-end DeveloperFront-end DeveloperFront-end Developer",
    company_name: "ABC Tech",
    company_location: "New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    employees: "50-200",
    level: "Internship",
    match: "20",
    location: "Berlin",
    department: "Hiring Manager",
    skills: {
      technicalSkills: ["Skill 1", "Skill 2", "Skill 3"],
      softSkills: ["Skill A", "Skill B", "Skill C"],
    },
    posting_date: "2020-10-14",
    type: "Design",
    contract_type: "Full Time",
    work_type: "Hybrid",
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
    match: "10",
    location: "Berlin",
    department: "Hiring Manager",
    skills: {
      technicalSkills: ["Skill 1", "Skill 2", "Skill 3"],
      softSkills: ["Skill A", "Skill B", "Skill C"],
    },
    posting_date: "2021-10-14",
    type: "Product",
    contract_type: "Part Time",
    work_type: "Remote",
  },
  {
    name: "Back-end Developer",
    company_name: "Zülkhe",
    company_location: "New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
    employees: "50-200",
    level: "Internship",
    match: "60",
    location: "New York",
    department: "Hiring Manager",
    skills: {
      technicalSkills: ["Skill 1", "Skill 2", "Skill 3"],
      softSkills: ["Skill A", "Skill B", "Skill C"],
    },
    posting_date: "2022-10-14",
    type: "Product",
    contract_type: "Full Time",
    work_type: "Home Office",
  },
  {
    name: "Front-end Developer",
    company_name: "ABC Tech",
    company_location: "Netherland",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    employees: "50-200",
    level: "Internship",
    match: "70",
    location: "Netherland",
    department: "Hiring Manager",
    skills: {
      technicalSkills: ["Skill 1", "Skill 2", "Skill 3"],
      softSkills: ["Skill A", "Skill B", "Skill C"],
    },
    posting_date: "2023-10-14",
    type: "Data Science",
    contract_type: "Temporary",
    work_type: "Hybrid",
  },
];
const Jobs2: React.FC = () => {
  //useStates
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchText, setSearchText] = useState(""); 
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]); 
  const [selectedContractTypes, setSelectedContractTypes] = useState<string[]>(
    []
  ); // State for selected contract types
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);

  // const handleFilterChange = useCallback((filteredJobs: Job[]) => {
  //   setFilteredJobs(filteredJobs);
  // }, []);

  //multiple select
  const handleRemoveFilter = (filterToRemove: string, filterType: string) => {
   
    if (filterType === "jobType") {
      const updatedJobTypes = selectedJobTypes.filter(
        (type) => type !== filterToRemove
      );
      setSelectedJobTypes(updatedJobTypes);
    } else if (filterType === "contractType") {
      const updatedContractTypes = selectedContractTypes.filter(
        (type) => type !== filterToRemove
      );
      setSelectedContractTypes(updatedContractTypes);
    } else if (filterType === "workType") {
      const updatedWorkTypes = selectedWorkTypes.filter(
        (type) => type !== filterToRemove
      );
      setSelectedWorkTypes(updatedWorkTypes);
    }
  };

  const handleFilterChange = useCallback(
    (selectedFilters: string[]) => {
      const filteredJobs = jobsData.filter((job) => {
        if (
          (selectedJobTypes.length === 0 ||
            selectedJobTypes.includes(job.type)) &&
          (selectedContractTypes.length === 0 ||
            selectedContractTypes.includes(job.contract_type)) &&
          (selectedWorkTypes.length === 0 ||
            selectedWorkTypes.includes(job.work_type))
        ) {
          return true; // Kartı görüntüle
        } else {
          return false; // Kartı filtrele
        }
      });

      setFilteredJobs(filteredJobs);
    },
    [selectedJobTypes, selectedContractTypes, selectedWorkTypes]
  );

  //search for a text
  const combineJobProperties = (job: Job) => {
    const {
      name,
      company_name,
      description,
      employees,
      level,
      match,
      location,
      department,
      skills,
      type,
      contract_type,
    } = job;

   
    const combinedText = `${name} ${company_name} ${description} ${employees} ${level} ${match} ${location} ${department} ${skills.technicalSkills.join(
      " "
    )} ${skills.softSkills.join(" ")} ${type} ${contract_type}`;

    return combinedText.toLowerCase();
  };

  const handleSearch = useCallback((searchText: string) => {
    setSearchText(searchText); 

    const lowerCasedSearchText = searchText.toLowerCase();

    const allJobTexts = jobsData.map(combineJobProperties);

    const filteredJobs = jobsData.filter((job, index) => {
      const jobText = allJobTexts[index];
      return jobText.includes(lowerCasedSearchText);
    });

    setFilteredJobs(filteredJobs);
  }, []);

  // Filter categories

  return (
    <div className={styling.mainContainer}>
      <h2>Job Board</h2>
      <div className={styling.inputContainer}>
        <div className={styling.inputs}>
          <div>
            {" "}
            <Search
              placeholder="Input search text"
              allowClear
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <LocationSelect
              options={locationOptions}
              data={jobsData}
              criteria="location"
              onFilterChange={handleFilterChange}
            />
          </div>
          <div>
            <Select
              mode="multiple"
              placeholder="Select Filters"
              style={{ width: 200 }}
              onChange={(selectedFilters: string[]) => {
                const jobTypes = selectedFilters.filter((filter) =>
                  availableJobTypes.includes(filter)
                );
                const contractTypes = selectedFilters.filter((filter) =>
                  availableContractTypes.includes(filter)
                );
                const workTypes = selectedFilters.filter((filter) =>
                  availableWorkTypes.includes(filter)
                );

                setSelectedJobTypes(jobTypes);
                setSelectedContractTypes(contractTypes);
                setSelectedWorkTypes(workTypes);

                handleFilterChange(selectedFilters);
              }}
            >
              <OptGroup label="Work Type">
                {availableWorkTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </OptGroup>
              <OptGroup label="Contract Type">
                {availableContractTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </OptGroup>
              <OptGroup label="Job Type">
                {availableJobTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </OptGroup>
            </Select>
          </div>
        </div>
        <div>
          {selectedJobTypes.map((jobType) => (
            <Labels
              key={jobType}
              labelName={jobType}
              onCloseIcon={() => handleRemoveFilter(jobType, "jobType")}
            />
          ))}
          {selectedContractTypes.map((contractType) => (
            <Labels
              key={contractType}
              labelName={contractType}
              onCloseIcon={() =>
                handleRemoveFilter(contractType, "contractType")
              }
            />
          ))}
          {selectedWorkTypes.map((workType) => (
            <Labels
              key={workType}
              labelName={workType}
              onCloseIcon={() => handleRemoveFilter(workType, "workType")}
            />
          ))}
        </div>
      </div>
      <div className={styling.cards}>
        {searchText && filteredJobs.length === 0 ? ( 
          <p className={styling.noResultText}>No Result</p>
        ) : (
          filteredJobs.map((job, index) => (
            <JobCard2
              key={index}
              name={job.name}
              company_name={job.company_name}
              company_location={job.company_location}
              avatarUrl={job.avatarUrl}
              employees={job.employees}
              level={job.level}
              match={job.match}
              department={job.department}
              location={job.location}
              skills={{
                technicalSkills: job.skills.technicalSkills,
                softSkills: job.skills.softSkills,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs2;
