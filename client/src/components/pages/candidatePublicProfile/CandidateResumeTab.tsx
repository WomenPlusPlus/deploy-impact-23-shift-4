import { CardContainer } from "../../UI/container/CardContainer";
import { Candidate } from "../types/types";
import styling from "./CandidateResumeTab.module.css";

interface Props {
  candidate: Candidate;
}

const CandidateResumeTab: React.FC<Props> = ({ candidate }) => {
  return (
    <div>

      {/* About me */}
      <CardContainer className={styling.cardContainerAboutMe}>
        <div>
          <h1>About me</h1>
        </div>
      </CardContainer>

      {/* Skills */}
      <CardContainer className={styling.cardContainerSkills}>
        <div className={styling.skills}>
          <h1>Skills</h1>
        </div>
      </CardContainer>

      {/* Values */}
      <CardContainer className={styling.cardContainerValues}>
        <div className={styling.values}>
          <h1>Values</h1>
        </div>
      </CardContainer>
    </div>
  );
};

export { CandidateResumeTab };
