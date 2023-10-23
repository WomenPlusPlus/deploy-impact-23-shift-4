import React, { useEffect, useState } from "react";
import { JobCard } from "../../UI/card/JobCard";
import { getAllJobs } from "../../../api/jobs";
import styling from "./Jobs.module.css";
import { getAllCompanies } from "../../../api/companies";
import { useNavigate } from "react-router-dom";
import { Candidate, Company, Job } from "../../../types/types";
import { getCandidateById } from "../../../api/candidates";
import SearchJobs from "../../UI/searchbar/SearchJobs";
import fakeData from "./FakeDataForJobs";
import { Select } from "antd";
const { Option } = Select;

const Jobs = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const userId = auth?.user?.id;
  const [jobs, setJobs] = useState([] as Job[]);
  const [companies, setCompanies] = useState([] as Company[]);
  const [candidate, setCandidate] = useState({} as Candidate);
  const [matchedScoreVisible, setMatchedScoreVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("Anywhere"); // Set "Anywhere" as the default


  const fetchInfo = async () => {
    const allJobs = await getAllJobs();
    console.log("allJobs", allJobs);
    const allCompanies = await getAllCompanies();
    if (auth?.user?.user_type === "candidate") {
      const candidate = await getCandidateById(userId);
      setCandidate(candidate);
    }

    // If user is a company, only show jobs that belong to that company
    if (auth?.user?.user_type === "company") {
      setMatchedScoreVisible(false);
      const jobs = allJobs?.map((job: Record<string, any>) => {
        // get all jobs that belong to this company
        if (job["company_id"] === userId) {
          return job;
        }
      });
      setJobs(jobs);
    } else {
      setJobs(allJobs);
    }
    setCompanies(allCompanies);
  };

  useEffect(() => {
    fetchInfo();
    console.log("isler", jobs);
  }, []);

  const header = () => {
    if (auth?.user?.user_type === "company") {
      return (
        <div className={styling.header}>
          <h1>My jobs</h1>
          <p>Here you can see all your published jobs</p>
        </div>
      );
    } else {
      return (
        <div className={styling.header}>
          <h1>Jobs</h1>
          <p>Here you can see all published jobs</p>
        </div>
      );
    }
  };

  //mehtap
  const searchText = (results: (Company | Job)[]) => {
    setJobs(jobs);
    console.log("searctecht", jobs);
  };
 //location
  const locationOptions = Array.from(new Set(fakeData.map((job) => job.location_city)));
  const handleLocationFilter = (value: string) => {
    // Use the updated value directly for filtering
    const filteredJobs = value === "Anywhere"
      ? jobs
      : jobs.filter((job) => job.location_city === value);
  
    setSelectedLocation(value); // Update the selected location
    setJobs(filteredJobs); // Update the filtered jobs
  };
  



  return (
    <div className={styling.main}>
      {/* {header()} */}your jobs
      <div className={styling.inputContainer}>
        <div className={styling.inputs}>
          <div className={styling.searchText}>
            <SearchJobs onSearch={searchText} data={jobs} />
          </div>
          <div>
            {" "}
            <Select
              placeholder="Select location"
              style={{ width: 200 }}
              onChange={handleLocationFilter}
              value={selectedLocation}
            >
              {locationOptions.map((location, index) => (
                <Option key={index} value={location}>
                  {location}
                </Option>
             ) )}
            </Select>
          </div>
          <div>grup</div>
        </div>
        <div></div>
      </div>
      <div className={styling.cardContainer}>
        {jobs &&
          jobs?.map((job) => (
            <JobCard
              key={job?.id}
              job={job}
              companies={companies}
              candidate={candidate}
              onClick={() => navigate(`/job/${job?.id}`)}
              isMatchVisible={matchedScoreVisible}
            />
          ))}
      </div>
    </div>
  );
};

export default Jobs;
