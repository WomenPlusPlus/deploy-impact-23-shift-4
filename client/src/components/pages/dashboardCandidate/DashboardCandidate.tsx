import "./DashboardCandidate.css";
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

const DashboardCandidate: React.FC = () => {
  // state
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  console.log("auth dashboard", auth);
  const navigate = useNavigate();

  const fetchCandidate = async (user_id: string) => {
    console.log("user_id", user_id);
    try {
      const candidateFetched = await getCandidateById(user_id);
      console.log("candidateFetched", candidateFetched);
      setCandidate(candidateFetched);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCandidate(auth.user?.id);
  }, [auth.user?.id]);

  const profession = "Frontend Developer";
  const progress = 80;
  console.log("candidate", candidate?.email);
  return (
    <div className="first-container">
      <div className="grid">
        {/* Profile component */}
        <CardContainer className="section-element profile-component">
          <Avatar firstName="Company" size={80} />

          <div className="header">
            {candidate?.first_name ? (
              <h2 className="header-title">
                Welcome back, {candidate?.first_name}
              </h2>
            ) : (
              <h2 className="header-title">Welcome</h2>
            )}
            {candidate?.experience ? (
              <p> {candidate?.experience[0]?.role}</p>
            ) : (
              <p style={{ cursor: "pointer" }}>Add your current role</p>
            )}
          </div>

          <div className="open-icon">
            <IconExternalLink
              color="black"
              onClick={() => navigate("/candidate-profile")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </CardContainer>

        {/* Progress bar */}
        <CardContainer className="section-element progressbar-completion-component">
          <div className="progressbar-text-element">
            <p className="paragraph">You've completed {progress}% </p>
          </div>

          <div className="progressbar-component-element">
            <div className="progressbar-element">
              <ProgressBar progress={progress} />
            </div>

            <div className="progressbar-button">
              <Button>Complete your profile</Button>
            </div>
          </div>
        </CardContainer>

        {/* Find Jobs */}
        <div className="findjobs-component">
          <CardContainer className="section-element findjobs-element">
            <h1 className="top-left">Find your next job</h1>
            <Button className="bottom-right">Jobs</Button>
          </CardContainer>

          <CardContainer className="section-element findjobs-element">
            <h1 className="top-left">Explore Companies</h1>
            <Button className="bottom-right">Companies</Button>
          </CardContainer>
        </div>

        {/* Matches */}
        <CardContainer className="section-element matches-component">
          <h2 className="top-left matches-title">Your matches</h2>
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
      </div>

      {/* Right sidebar */}
      {/* <div className="grid"></div> */}
    </div>
  );
};

export default DashboardCandidate;
