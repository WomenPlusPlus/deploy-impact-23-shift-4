import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "../../UI/avatar/Avatar";
import Spinner from "../../UI/spinner/Spinner";
import { Button } from "../../UI/button/Button";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { HorizontalCard } from "../../UI/horizontalCard/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";

import { Candidate, Company } from "../../../types/types";
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
import { getMatchCandidates } from "../../../api/match";

const DashboardCompany = () => {
  const progress = 80;

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id;
  const [company, setCompany] = useState({} as Company);
  const [matchingCandidates, setMatchingCandidates] = useState([]);
  const [allJobs, setAllJobs] = useState<Record<string, any>[]>();
  const [allCandidates, setAllCandidates] = useState<Candidate[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchInfo = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth.user.id;
    const company = await getCompanyById(userId);

    const allJobs = await getAllJobs();

    const allCandidates = await getAllCandidates();

    const jobs = allJobs?.filter((job: Record<string, any>) => {
      return job["company_id"] === userId;
    });

    jobs?.map(async (job: Record<string, any>) => {
      if (job && job?.id) await getMatchCandidates(job?.id);
    });

    const matchingCandidates = getMatchingCandidatesInfo(jobs, allCandidates);

    setCompany(company);
    setAllCandidates(allCandidates);
    setAllJobs(allJobs);
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
            {company?.address ? (
              <>
                <IconMapPin />
                <p className={styling.subtext}>{company?.address}</p>
              </>
            ) : (
              <>
                <IconMapPin />
                <p className={styling.subtextNot}>Address not provided</p>
              </>
            )}
            {company.company_size ? (
              <>
                <p className={styling.subtext}> | </p>
                <p className={styling.subtext}>
                  {company.company_size} employees
                </p>
              </>
            ) : null}
            {company.company_website ? (
              <>
                <p className={styling.subtext}> | </p>
                <IconBrandLinkedin
                  onClick={() => navigate(`${company?.company_website}`)}
                />{" "}
                <IconWorldWww />
              </>
            ) : null}
          </div>
        </div>

        <IconExternalLink
          className={styling.icon}
          color="black"
          onClick={() => navigate(`/company-profile/${userId}`)}
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
          <h1>Interested candidates</h1>

          {Array.isArray(company?.interested_candidates) &&
            company?.interested_candidates.map(
              (candidate: any, key: number) => {
                const candidateInfo = allCandidates?.find(
                  (c) => c?.user_id === candidate?.candidate_id
                );
                const jobInfo = allJobs?.find(
                  (j) => j?.id === candidate?.job_id
                );

                return (
                  <div
                    key={key}
                    onClick={() =>
                      navigate(`/candidate/${candidate?.candidate_id}`)
                    }
                  >
                    <HorizontalCard
                      avatar={true}
                      firstName={candidateInfo?.first_name}
                      lastName={candidateInfo?.last_name}
                      title={`A new candidate is interested in your ${jobInfo?.title} vancancy!`}
                      subtitle={`Get in touch with them!`}
                    />
                  </div>
                );
              }
            )}
        </CardContainer>

        <CardContainer className={styling.card}>
          <h1>Newest matches</h1>
          {matchingCandidates?.map((candidate: Record<string, any>, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/candidate/${candidate?.candidateId}`)}
              >
                <HorizontalCard
                  avatar={true}
                  firstName={candidate?.candidateFirstName}
                  lastName={candidate?.candidateLastName}
                  title={`Matches ${candidate?.candidateScore}% of the skills`}
                  subtitle={`Great match for ${candidate?.jobTitle} job!`}
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
