import "./DashboardCandidate.css";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
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
          <div className="section-element profile-component">
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
          </div>
          {/* Progress bar */}
          <div className="section-element progressbar-completion-component">
            <div className="progressbar-text-element">
              <p className="paragraph">You've completed {progress}% </p>
            </div>
            <div className="progressbar-component-element">
              <div className="progressbar-element">
                <ProgressBar progress={progress} />
              </div>
              <div className="progressbar-button">
                <button>Complete your profile</button>
              </div>
            </div>
          </div>
          {/* Find Jobs */}
          <div className="findjobs-component">
            <div className="section-element findjobs-element">
              <div className="findjobs-element-div">
                <h1 className="top-left">Hello, React!</h1>
                <button className="bottom-right">Click me</button>
              </div>
            </div>
            <div className="section-element findjobs-element"></div>
          </div>
        </div>
        <div className="grid"></div>
      </div>
    </div>
  );
};

export { DashboardCandidate };
