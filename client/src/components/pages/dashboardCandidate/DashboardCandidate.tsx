import "./DashboardCandidate.css";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { MatchesCard } from "../../UI/card/MatchesCard";
import { CardContainer } from "../../UI/container/CardContainer";
import greyImage from "../../../media/gray_square.jpeg";

const DashboardCandidate = () => {
  const name = "John Doe";
  const profession = "Frontend Developer";
  const progress = 80;
  return (
    <div className="main-container">
      <div className="first-container">
        <div className="grid">
          {/* Profile component */}
          <CardContainer className="section-element profile-component">
            <div className="avatar">
              <img src={greyImage} alt="Avatar" />
            </div>
            <div className="text">
              <h2>Welcome back, {name}</h2>
              <p>{profession}</p>
            </div>
            <div className="open-icon">
              <div className="icon">
                <IconExternalLink color="black" />
              </div>
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
    </div>
  );
};

export default DashboardCandidate;
