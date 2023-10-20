import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";

import styling from "./DashboardCompanies.module.css";
import { useEffect, useState } from "react";
import { getCompanyById } from "../../../api/companies";
import { Company } from "../../pages/types/types";
import { getAllJobs } from "../../../api/jobs";
import { getAllCandidates } from "../../../api/candidates";
import getMatchingCandidatesInfo from "./helpers/index";

const DashboardCompany = () => {
  const progress = 80;

  const navigate = useNavigate();

  const [company, setCompany] = useState({} as Company);
  const [jobs, setJobs] = useState([]);
  const [matchingCandidates, setMatchingCandidates] = useState([]);

  const fetchInfo = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth.user.id;
    const company = await getCompanyById(userId);

    const allJobs = await getAllJobs();
    const allCandidates = await getAllCandidates();
    const jobs = allJobs.map((job: Record<string, any>) => {
      if (job["company_id"] === userId) {
        return job;
      }
    });

    const matchingCandidates = getMatchingCandidatesInfo(jobs, allCandidates);

    setCompany(company);
    setJobs(jobs);
    setMatchingCandidates(matchingCandidates);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className={styling.main}>
      {/* Profile component */}
      <CardContainer className={styling.profile}>
        <Avatar firstName={company.company_name} size={80} />

        <div className={styling.header}>
          <h2 className={styling.title}>
            Welcome back, {company.company_name}
          </h2>
          <p className={styling.subtitle}>
            {company.address} | {company.company_size}
          </p>
        </div>

        <IconExternalLink
          className={styling.icon}
          color="black"
          onClick={() => navigate("/company-profile")}
        />
      </CardContainer>

      {/* Progress bar */}
      <CardContainer className={styling.progress}>
        <p>You've completed {progress}% </p>

        <div className={styling.progressSection}>
          <div className={styling.progressBar}>
            <ProgressBar progress={progress} />
          </div>

          <Button>Complete your profile</Button>
        </div>
      </CardContainer>

      {/* Find Jobs */}
      <div className={styling.section}>
        <CardContainer className={styling.card}>
          <h1>Our listings</h1>
          {jobs.map((job: Record<string, any>) => {
            return (
              <HorizontalCard
                avatar={false}
                button="Go to description"
                title={job.title}
                subtitle={
                  job.matching_candidates.length
                    ? `${job.matching_candidates.length} great match(es)!`
                    : "No matches yet"
                }
              />
            );
          })}
        </CardContainer>

        <CardContainer className={styling.card}>
          <h1>Newest matches</h1>
          {matchingCandidates.map((candidate: Record<string, any>) => {
            return (
              <div
                onClick={() => navigate(`/candidate/${candidate.candidateId}`)}
              >
                <HorizontalCard
                  avatar={true}
                  firstName={candidate.candidateFirstName}
                  lastName={candidate.candidateLastName}
                  title={`Matches ${candidate.candidateScore}% of the skills`}
                  subtitle={`Great match for ${candidate.jobTitle} job!`}
                />
              </div>
            );
          })}
        </CardContainer>
      </div>
    </div>
  );
};

export default DashboardCompany;
