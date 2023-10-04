import "./DashboardCandidate.css";
import { ProgressBar } from "../UI/progressbar/ProgressBar";

const DashboardCandidate = () => {
  return (
    <div className="main-container">
      <h1 className="welcome-text">Hi, Laura!</h1>
      <div className="first-container">
        <div className="section">
          <div className="section-element"></div>
          <ProgressBar progress={80} />
        </div>
        <div className="section"></div>
      </div>
    </div>
  );
};

export { DashboardCandidate };
