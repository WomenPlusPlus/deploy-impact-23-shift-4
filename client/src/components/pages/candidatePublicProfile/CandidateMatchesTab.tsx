import styling from "./CandidateMatchesTab.module.css";

import { Job } from "../types/types";

interface Props {
  matchingJobs: Job[];
}

const CandidateMatchesTab: React.FC<Props> = ({ matchingJobs }) => {
  console.log("matchingJobs", matchingJobs);
  return (
    <div className={styling.main}>
      <h1>Matches</h1>
      {matchingJobs?.map((job, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
};

export { CandidateMatchesTab };
