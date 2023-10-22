import React, { useEffect, useState } from "react";
import { JobCard } from "../../UI/card/JobCard";
import { getAllJobs } from "../../../api/jobs";
import styling from "./Jobs.module.css";
import { getAllCompanies } from "../../../api/companies";
import { useNavigate } from "react-router-dom";
import { Candidate, Company, Job } from "../../../types/types";
import { getCandidateById } from "../../../api/candidates";

const Jobs = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const userId = auth?.user?.id;
  const [jobs, setJobs] = useState([] as Job[]);
  const [companies, setCompanies] = useState([] as Company[]);
  const [candidate, setCandidate] = useState({} as Candidate);
  const [matchedScoreVisible, setMatchedScoreVisible] = useState(true);

  const fetchInfo = async () => {
    const allJobs = await getAllJobs();
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

  return (
    <div className={styling.main}>
      {header()}
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
