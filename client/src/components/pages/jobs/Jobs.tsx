import React, { useState, useEffect, useCallback } from "react";
import styling from "./Jobs.module.css";
import JobCard from "../../UI/card/JobCard";
import { Labels } from "../../UI/labels/Label";
import styles from "../../UI/labels/Label.module.css";
import { Select, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
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
  id?: string;
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
    id: "aa13e038-36ff-4634-ba97-e0772af0b0de",
    name: "Front-end Developer Front-end Developer Front-end Developer Front-end DeveloperFront-end DeveloperFront-end Developer",
    company_name: "ABC Tech",
    company_location: "New York",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
    avatarUrl:
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    employees: "50-200",
    level: "Internship",
    match: "70",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
const Jobs: React.FC = () => {
  // useNavigate
  const navigate = useNavigate();
  //useStates
  const [placeholderText, setPlaceholderText] =
    useState<string>("Select Filters");
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobsData);
  const [searchText, setSearchText] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedContractTypes, setSelectedContractTypes] = useState<string[]>(
    []
  );
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("Anywhere");

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

  // Handle filtering by multiple criteria
  const filterJobs = (
    selectedJobTypes: string[],
    selectedContractTypes: string[],
    selectedWorkTypes: string[],
    selectedLocation: string,
    searchText: string
  ) => {
    return jobsData.filter((job) => {
      const matchesLocation =
        selectedLocation === "Anywhere" || job.location === selectedLocation;

      const matchesSearchText =
        searchText === "" ||
        combineJobProperties(job).includes(searchText.toLowerCase());

      const matchesJobType =
        selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);

      const matchesContractType =
        selectedContractTypes.length === 0 ||
        selectedContractTypes.includes(job.contract_type);

      const matchesWorkType =
        selectedWorkTypes.length === 0 ||
        selectedWorkTypes.includes(job.work_type);

      return (
        matchesLocation &&
        matchesSearchText &&
        matchesJobType &&
        matchesContractType &&
        matchesWorkType
      );
    });
  };

  const handleClearAllFilters = () => {
    setSelectedJobTypes([]);
    setSelectedContractTypes([]);
    setSelectedWorkTypes([]);
  };

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  useEffect(() => {
    const filteredJobs = filterJobs(
      selectedJobTypes,
      selectedContractTypes,
      selectedWorkTypes,
      selectedLocation,
      searchText
    );
    setFilteredJobs(filteredJobs);
  }, [
    selectedJobTypes,
    selectedContractTypes,
    selectedWorkTypes,
    selectedLocation,
    searchText,
  ]);

  const selectProps = (
    availableOptions: string[],
    selectedOptions: string[],
    placeholder: string
  ) => ({
    mode: "multiple",
    placeholder:
      selectedOptions.length > 0
        ? `${selectedOptions.length} selected`
        : placeholder,
    value: selectedOptions,
    onChange: (values: string[]) =>
      selectedOptions === selectedJobTypes
        ? setSelectedJobTypes(values)
        : selectedOptions === selectedContractTypes
        ? setSelectedContractTypes(values)
        : setSelectedWorkTypes(values),
  });
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
          return true;
        } else {
          return false;
        }
      });

      setFilteredJobs(filteredJobs);
    },
    [selectedJobTypes, selectedContractTypes, selectedWorkTypes]
  );

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
    } else if (filterType === "location") {
      setSelectedLocation("Anywhere");
    } else if (filterType === "search") {
      setSearchText("");
    }
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);

    const sortedJobs = [...filteredJobs].sort(sortJobsByDate);
    setFilteredJobs(sortedJobs);
  };

  const sortJobsByDate = (a: Job, b: Job) => {
    if (sortOrder === "asc") {
      return (
        new Date(a.posting_date).getTime() - new Date(b.posting_date).getTime()
      );
    } else if (sortOrder === "desc") {
      return (
        new Date(b.posting_date).getTime() - new Date(a.posting_date).getTime()
      );
    } else {
      return 0;
    }
  };

  return (
    <div className={styling.mainContainer}>
      <h2>Job Board</h2>
      <div className={styling.inputContainer}>
        <div className={styling.inputs}>
          <div className={styling.searchText}>
            {" "}
            <Search
              placeholder="Input search text"
              allowClear
              onSearch={handleSearch}
            />
          </div>
          <div>
            <Select
              maxTagCount={1}
              mode="multiple"
              placeholder="Select Location"
              style={{ width: 200 }}
              onChange={(selectedLocations) => {
                let filteredJobs = jobsData;
                if (selectedLocations.length === 0) {
                  setFilteredJobs(jobsData);
                } else {
                  if (selectedLocations.includes("Anywhere")) {
                    filteredJobs = jobsData;
                  } else {
                    filteredJobs = jobsData.filter((job) =>
                      selectedLocations.includes(job.location)
                    );
                  }

                  filteredJobs = filteredJobs.filter((job) => {
                    return (
                      (selectedJobTypes.length === 0 ||
                        selectedJobTypes.includes(job.type)) &&
                      (selectedContractTypes.length === 0 ||
                        selectedContractTypes.includes(job.contract_type)) &&
                      (selectedWorkTypes.length === 0 ||
                        selectedWorkTypes.includes(job.work_type))
                    );
                  });

                  setFilteredJobs(filteredJobs);
                }
              }}
            >
              {locationOptions.map((location) => (
                <Select.Option key={location} value={location}>
                  {location}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              {...selectProps(
                availableWorkTypes,
                selectedWorkTypes,
                "Select Work Types"
              )}
              maxTagCount={0}
              maxTagPlaceholder={(selectedItems) =>
                `+${selectedItems.length} selected`
              }
              mode="multiple"
              placeholder={placeholderText}
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
        <div className={styling.multiFilter}>
          Result
          {selectedJobTypes.map((jobType) => (
            <Labels
              key={jobType}
              labelName={jobType}
              customClass={styles.label}
              onCloseIcon={() => handleRemoveFilter(jobType, "jobType")}
            />
          ))}
          {selectedContractTypes.map((contractType) => (
            <Labels
              key={contractType}
              labelName={contractType}
              customClass={styles.label}
              onCloseIcon={() =>
                handleRemoveFilter(contractType, "contractType")
              }
            />
          ))}
          {selectedWorkTypes.map((workType) => (
            <Labels
              key={workType}
              labelName={workType}
              customClass={styles.label}
              onCloseIcon={() => handleRemoveFilter(workType, "workType")}
            />
          ))}
          {selectedJobTypes.length > 0 ||
          selectedContractTypes.length > 0 ||
          selectedWorkTypes.length > 0 ||
          selectedLocation !== "Anywhere" ? (
            <div className={styling.clearAll}>
              <Button onClick={handleClearAllFilters}>Clear All</Button>
            </div>
          ) : null}
        </div>
        <div className={styling.sortByDate}>
          <div>
            We have found <span>{filteredJobs.length}</span> jobs!
          </div>
          <div className={styling.sortBy}>
            Sort by:{" "}
            <Select
              value={sortOrder}
              style={{ width: 120 }}
              onChange={handleSortChange}
              placeholder="Date"
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </div>
        </div>
      </div>

      <div className={styling.cards}>
        {searchText && filteredJobs.length === 0 ? (
          <p className={styling.noResultText}>No Result</p>
        ) : filteredJobs.length === 0 ? (
          <p className={styling.noResultText}>No Result</p>
        ) : (
          filteredJobs.map((job, index) => (
            <JobCard
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
              contract_type={job.contract_type}
              skills={{
                technicalSkills: job.skills.technicalSkills,
                softSkills: job.skills.softSkills,
              }}
              onClick={() => navigate(`/job/${job.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
