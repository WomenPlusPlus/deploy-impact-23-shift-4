import styling from "./DashboardCandidate.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";
import { getCandidateById } from "../../../api/candidates";
import { Candidate } from "../../../components/pages/types/types";

import React from "react";
import ApplicationRequests from "./applicationRequests/ApplicationRequests";

const DashboardCandidate: React.FC = () => {
  // state
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const [progress, setProgress] = useState(0);

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const navigate = useNavigate();

  const fetchInfo = async (user_id: string) => {
    try {
      const candidateFetched = await getCandidateById(user_id);
      console.log("candidateFetched", candidateFetched);
      setCandidate(candidateFetched);
    } catch (error) {
      console.log("error", error);
    }
    const isProgress = localStorage.getItem("progress");
    if (isProgress) {
      setProgress(parseInt(isProgress));
    }
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
              onClick={() => navigate("/candidate-profile")}
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
            <HorizontalCard
              avatar={true}
              button="Go to description"
              firstName="Laura"
              lastName="Purcaro"
            />
            <HorizontalCard
              avatar={true}
              button="Go to description"
              firstName="Laura"
              lastName="Purcaro"
            />
            <HorizontalCard
              avatar={true}
              button="Go to description"
              firstName="Laura"
              lastName="Purcaro"
            />
          </CardContainer>
          <ApplicationRequests />
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidate;
