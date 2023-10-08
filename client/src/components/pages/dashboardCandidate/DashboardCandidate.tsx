import "./DashboardCandidate.css";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { MatchesCard } from "../../UI/card/MatchesCard";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";

const DashboardCandidate = () => {
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
          <MatchesCard />
          <MatchesCard />
          <MatchesCard />
        </CardContainer>
      </div>

      {/* Right sidebar */}
      {/* <div className="grid"></div> */}
    </div>
  );
};

export default DashboardCandidate;
