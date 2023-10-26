import styling from "./DashboardCandidate.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { HorizontalCard } from "../../UI/horizontalCard/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";
import { getCandidateById } from "../../../api/candidates";
import { Candidate, Job } from "../../../types/types";

import React from "react";
import {
  allCategories,
  countNullFieldsByCategory,
  percentage,
} from "../candidateProfile/helpers/helper";
import ApplicationRequests from "./applicationRequests/ApplicationRequests";
import { getAllJobs } from "../../../api/jobs";
import { getMatchJobs } from "../../../api/match";

const DashboardCandidate: React.FC = () => {
  // state
  const userId = JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id;
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [progress, setProgress] = useState(0);

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const navigate = useNavigate();

  const fetchInfo = async (user_id: string) => {
    try {
      const candidateFetched = await getCandidateById(user_id);
      const allJobs = await getAllJobs();

      setCandidate(candidateFetched);
      setJobs(allJobs);

      const isProgress = calculateProgress(candidateFetched as Candidate);
      setProgress(isProgress);

      if (candidateFetched && candidateFetched?.skills?.length > 0) {
        await getMatchJobs(candidateFetched.user_id);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const calculateProgress = (candidate: Candidate) => {
    const countFields = countNullFieldsByCategory(candidate, allCategories);
    const countProgress = percentage({
      completedCategories: Object.values(countFields).filter(
        (fraction) => fraction > 0
      ).length,
      totalCategories: allCategories.length,
    });

    return countProgress;
  };

  useEffect(() => {
    fetchInfo(auth?.user?.id);
  }, [auth?.user?.id]);

  return (
    <div className={styling.main}>
      <div className={styling.grid}>
        {/* Profile component */}
        <CardContainer className={styling.profile}>
          <Avatar firstName="Company" size={80} />

          <div className={styling.header}>
            {candidate?.first_name ? (
              <h2 className={styling.headerTitle}>
                Welcome back, {candidate?.first_name}
              </h2>
            ) : (
              <h2 className={styling.headerTitle}>Welcome</h2>
            )}
            {candidate?.experience ? (
              <p> {candidate?.experience[0]?.role}</p>
            ) : (
              <p className={styling.role}>Add your current role</p>
            )}
          </div>

          <div className={styling.icon}>
            <IconExternalLink
              color="var(--gray-dark)"
              onClick={() => navigate(`/candidate-profile/${userId}`)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </CardContainer>

        {/* Progress bar */}
        {progress < 100 && (
          <CardContainer className={styling.progressbarCompletion}>
            <div className={styling.progressText}>
              <p className={styling.paragraph}>You've completed {progress}% </p>
            </div>

            <div className={styling.progressbar}>
              <div className={styling.progressElement}>
                <ProgressBar progress={progress} />
              </div>

              <div>
                <Button>Complete your profile</Button>
              </div>
            </div>
          </CardContainer>
        )}

        {/* Find Jobs */}
        <div className={styling.jobs}>
          <CardContainer className={styling.findJobs}>
            <h1>Find your next job</h1>
            <Button
              className={styling.button}
              onClick={() => navigate("/jobs")}
            >
              Jobs
            </Button>
          </CardContainer>

          <CardContainer className={styling.findJobs}>
            <h1>Explore Companies</h1>
            <Button
              className={styling.button}
              onClick={() => navigate("/companies")}
            >
              Companies
            </Button>
          </CardContainer>
        </div>

        {/* Matches */}
        <div className={styling.section}>
          <CardContainer className={styling.matches}>
            <h1 className={styling.matchesTitle}>Your matches</h1>
            {candidate.matching_jobs?.map((matchedJob: any) => {
              let description = "";

              if (matchedJob?.score >= 90) {
                description = "Your dream job is waiting for you! 🌟";
              } else if (matchedJob?.score >= 75) {
                description = "Great match for this role! 🚀";
              } else {
                description = "You might be interested in this job 💪🏽";
              }

              return jobs.map((job: Job) => {
                // Use `return` to return the JSX elements
                if (matchedJob.id === job.id) {
                  return (
                    <HorizontalCard
                      key={job.id} // Add a unique key for each card
                      avatar={false}
                      button="Go to job"
                      title={job.title}
                      subtitle={description}
                      onClick={() => navigate(`/job/${job.id}`)}
                    />
                  );
                }
                return null; // Return null for unmatched jobs
              });
            })}
          </CardContainer>
          <ApplicationRequests />
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidate;
