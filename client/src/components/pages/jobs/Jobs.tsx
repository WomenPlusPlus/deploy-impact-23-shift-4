import React, { useEffect, useState } from "react";
import { JobCard } from "../../UI/card/JobCard";
import { getAllJobs } from "../../../api/jobs";
import styling from "./Jobs.module.css";
import { getAllCompanies } from "../../../api/companies";
import { useNavigate } from "react-router-dom";
import { Candidate, Company, Job } from "../../../types/types";
import { getCandidateById } from "../../../api/candidates";
import Spinner from "../../UI/spinner/Spinner";

const Jobs = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const userId = auth?.user?.id;
  const userType = auth?.user?.user_type;

  const [jobs, setJobs] = useState([] as Job[]);
  const [companyJobs, setCompanyJobs] = useState([] as Job[]);
  const [companies, setCompanies] = useState([] as Company[]);
  const [candidate, setCandidate] = useState({} as Candidate);
  const [matchedScoreVisible, setMatchedScoreVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInfo = async () => {
    const allJobs = await getAllJobs();

    if (userType === "company") {
      setMatchedScoreVisible(false);
      // filter jobs by company id
      const jobs = allJobs?.filter((job: any) => job?.company_id === userId);
      setCompanyJobs(jobs);
      setIsLoading(false);
    } else {
      if (userType === "candidate") {
        const candidate = await getCandidateById(userId);
        setCandidate(candidate);
      }
      const allCompanies = await getAllCompanies();
      setJobs(allJobs);
      setCompanies(allCompanies);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const header = () => {
    if (userType === "company") {
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

  const content = () => {
    if (userType === "company") {
      return (
        <div className={styling.cardContainer}>
          {companyJobs.length > 0 &&
            companyJobs?.map((job, index) => (
              <JobCard
                key={index}
                job={job}
                companies={companies}
                candidate={candidate}
                onClick={() => navigate(`/job/${job?.id}`)}
                isMatchVisible={matchedScoreVisible}
              />
            ))}
        </div>
      );
    } else {
      return (
        <div className={styling.cardContainer}>
          {jobs.length > 0 &&
            jobs?.map((job, index) => (
              <JobCard
                key={index}
                job={job}
                companies={companies}
                candidate={candidate}
                onClick={() => navigate(`/job/${job?.id}`)}
                isMatchVisible={matchedScoreVisible}
              />
            ))}
        </div>
      );
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styling.main}>
      {header()}
      {content()}
    </div>
  );
};

export default Jobs;
