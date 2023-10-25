import { useParams } from "react-router-dom";
import styling from "./CandidatePublicProfile.module.css";
import { useEffect, useState } from "react";
import { getCandidateById } from "../../../api/candidates";
import { Candidate, Company, Job } from "../../../types/types";
import Avatar from "../../UI/avatar/Avatar";
import {
  IconBrandLinkedin,
  IconMapPin,
  IconWorldWww,
} from "@tabler/icons-react";
import Tabs from "../../UI/tabs/Tabs";
import { CandidateMatchesTab } from "./tabs/matches/CandidateMatchesTab";
import { CandidateResumeTab } from "./tabs/resume/CandidateResumeTab";
import { getAllJobs } from "../../../api/jobs";
import { getAllCompanies, getCompanyById } from "../../../api/companies";

const CandidatePublicProfile = () => {
  const { id } = useParams();

  const [candidate, setCandidate] = useState({} as Candidate);
  const [matchingJobs, setMatchingJobs] = useState([] as Job[]);
  const [companies, setCompanies] = useState([] as Company[]);

  const fetchInfo = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth.user.id;

    // Fetch all info
    const candidateFetched = await getCandidateById(id!);
    const allJobs = await getAllJobs();
    const allCompanies = await getAllCompanies();

    if (auth?.user?.user_type === "company") {
      allCompanies?.forEach((company: Company) => {
        if (company?.user_id === userId) {
          setCompanies([company]);
          const filteredJobs: Job[] = allJobs?.filter(
            (job: Job) => job?.company_id === company?.user_id && job
          );

          const matchedJobs = filterMatchingJobs(
            candidateFetched,
            filteredJobs
          );

          setMatchingJobs(matchedJobs);
        }
      });
    } else {
      setCompanies(allCompanies);
      const filteredJobs: Job[] = allJobs?.filter(
        (job: Job) => job?.company_id === allCompanies?.user_id && job
      );
      const matchedJobs = filterMatchingJobs(candidateFetched, filteredJobs);
      setMatchingJobs(matchedJobs);
    }

    setCandidate(candidateFetched);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  function filterMatchingJobs(candidate: Candidate, jobs: Job[]): Job[] {
    const matchedJobs: Job[] = [];
    jobs.map((job) => {
      candidate.matching_jobs?.forEach((matchingJob: Job) => {
        if (matchingJob?.id === job?.id) {
          matchedJobs.push(job);
        }
      });
    });
    return matchedJobs;
  }

  // Tabs
  const tabs = [
    {
      label: "Resume",
      key: "1",
      children: (
        <CandidateResumeTab candidate={candidate} matchingJobs={matchingJobs} />
      ),
    },
    {
      label: "Matches",
      key: "2",
      children: (
        <CandidateMatchesTab
          candidate={candidate}
          companies={companies}
          matchingJobs={matchingJobs}
        />
      ),
    },
  ];

  return (
    <>
      <div className={styling.main}>
        {/* Header */}
        <div className={`${styling.row} ${styling.margin}`}>
          <Avatar
            size={80}
            firstName={candidate?.first_name}
            lastName={candidate?.last_name}
          />
          <div className={styling.column}>
            <div>
              {candidate?.experience ? (
                <h1 className={styling.title}>
                  {candidate?.experience[0]?.role}
                </h1>
              ) : (
                <h1 className={styling.title}>Software Engineer</h1>
              )}
            </div>
            <div className={styling.row}>
              <div className={styling.location}>
                <IconMapPin color="black" />
                {candidate?.city && candidate?.country ? (
                  <div>
                    <p className={styling.locationText}>
                      {candidate?.city}, {candidate?.country}
                    </p>
                    <p> | </p>
                  </div>
                ) : (
                  <p className={styling.locationText}>Not provided</p>
                )}
              </div>

              {candidate?.links && candidate?.links?.length > 0
                ? candidate?.links?.map((link, index) => (
                    <div key={index} className={styling.link}>
                      {link.name === "LinkedIn" ? (
                        <a href={link.url} target="_blank" rel="noreferrer">
                          <IconBrandLinkedin color="black" />
                        </a>
                      ) : link.name === "Personal Website" ? (
                        <a href={link.url} target="_blank" rel="noreferrer">
                          <IconWorldWww color="black" />
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styling.margin}>
          <Tabs items={tabs} centered={false} size="large" />
        </div>
      </div>
    </>
  );
};

export default CandidatePublicProfile;
