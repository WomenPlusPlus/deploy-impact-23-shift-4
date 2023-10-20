import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "../../UI/avatar/Avatar";
import Spinner from "../../UI/spinner/Spinner";
import { Button } from "../../UI/button/Button";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";

import { Company } from "../../pages/types/types";
import { getAllJobs } from "../../../api/jobs";
import { getCompanyById } from "../../../api/companies";
import { getAllCandidates } from "../../../api/candidates";
import getMatchingCandidatesInfo from "./helpers/index";

import {
  IconBrandLinkedin,
  IconExternalLink,
  IconMapPin,
  IconWorldWww,
} from "@tabler/icons-react";

import styling from "./DashboardCompanies.module.css";

const DashboardCompany = () => {
  const progress = 80;

  const navigate = useNavigate();

  const [company, setCompany] = useState({} as Company);
  const [jobs, setJobs] = useState([]);
  const [matchingCandidates, setMatchingCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const avatar = company.logo ? (
    <img className={styling.logo} src={company.logo} alt="Avatar" />
  ) : (
    <Avatar firstName={company.company_name} size={80} />
  );

  const content = (
    <>
      {/* Profile component */}
      <CardContainer className={styling.profile}>
        {avatar}

        <div className={styling.header}>
          <h2 className={styling.title}>
            Welcome back, {company.company_name}
          </h2>
          <div className={styling.subtitle}>
            <IconMapPin />
            {company.address} | {company.company_size} employees |
            <IconBrandLinkedin /> <IconWorldWww />
          </div>
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
              <div onClick={() => navigate(`/job/${job.id}`)}>
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
              </div>
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
    </>
  );

  return (
    <div className={styling.main}>{isLoading ? content : <Spinner />}</div>
  );
};

export default DashboardCompany;
