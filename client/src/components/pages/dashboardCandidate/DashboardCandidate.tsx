import "./DashboardCandidate.css";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";
import { useAuth } from "../../../context/auth";
import { useEffect } from "react";
import axios from "axios";
import { getCandidateById } from "../../../api/candidates";

const DashboardCandidate = () => {
  // state
  const { auth, setAuth } = useAuth();
  console.log("auth dashboard", auth);

  const fetchCandidate = async (user_id: string) => {
    const candidates = getCandidateById(user_id);
    console.log("candidates", candidates);
  };
  
  if (auth?.user?.id) {
    fetchCandidate(auth.user.id);
  }

  const name = "John Doe";
  const profession = "Frontend Developer";
  const progress = 80;
  return (
    <div className="first-container">
      <div className="grid">
        {/* Profile component */}
        <CardContainer className="section-element profile-component">
          <Avatar firstName="Company" size={80} />

          <div className="header">
            <h2 className="header-title">Welcome back, {name}</h2>
            <p>{profession}</p>
          </div>

          <div className="open-icon">
            <IconExternalLink color="black" />
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
