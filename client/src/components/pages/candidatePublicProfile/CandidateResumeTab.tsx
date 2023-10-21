import { useEffect, useState } from "react";
import { CardContainer } from "../../UI/container/CardContainer";
import {
  ContentBlock,
  HorizontalLine,
} from "../../UI/container/SectionContainer";
import { Labels } from "../../UI/labels/Label";
import { Candidate, Experience, Job, Section } from "../types/types";
import styling from "./CandidateResumeTab.module.css";
import { IconCertificate, IconTags, IconChecklist } from "@tabler/icons-react";
import { ProgressBarComponent } from "../../UI/progressbar/ProgressBarComponent";
import { WorkExperience } from "./WorkExperience";
import { SkillsLevelGuide } from "./SkillsLevelGuide";
import { RequestAccess } from "../../UI/modal/RequestAccess";
import { Skeleton } from "antd";
import { transformExperience } from "../candidateProfile/helpers/helper";
import { Button } from "../../UI/button/Button";
interface Props {
  candidate: Candidate;
  matchingJobs: Job[];
}

const CandidateResumeTab: React.FC<Props> = ({ candidate, matchingJobs }) => {
  const [sectionsExperience, setSectionsExperience] = useState([] as Section[]);
  const [isAccessGrantedCV, setIsAccessGrantedCV] = useState(false);
  const [isAccessGrantedCertificates, setIsAccessGrantedCertificates] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("matchingJobs: ", matchingJobs);
  useEffect(() => {
    // read if access from local storage
    const access = JSON.parse(localStorage.getItem("access") || "{}");
    if (access.cv) {
      setIsAccessGrantedCV(true);
    }
    if (access.certificates) {
      setIsAccessGrantedCertificates(true);
    }
    console.log("candidate: ", candidate);
    if (candidate) {
      const transformedExperience = transformExperience(
        candidate?.experience as Experience[]
      );
      console.log("transformedExperience: ", transformedExperience);
      setSectionsExperience(transformedExperience);
    }
  }, [candidate]);

  const requestAccess = () => {
    console.log("request access for document: ");
    setIsModalVisible(true);
  };

  return (
    <div className={styling.main}>
      {/* Assosiactions */}
      <div className={styling.row}>
        <CardContainer className={styling.associationContainer}>
          <h1 className={styling.margin}>Associations</h1>
          <div className={styling.associations}>
            {candidate?.associations &&
              candidate?.associations?.map((label, index) => (
                <Labels
                  key={index}
                  icon={<IconTags />}
                  labelName={label}
                  disableCloseIcon={true}
                  customClass={styling.label}
                />
              ))}
          </div>
        </CardContainer>

        {/* Type of jobs */}
        <CardContainer className={styling.cardContainerAboutMe}>
          <h1 className={styling.margin}>Type of jobs you're looking for</h1>
          <div className={styling.aboutMe}>
            {candidate?.preferred_jobs &&
              candidate?.preferred_jobs?.map((job, index) => (
                <Labels
                  key={index}
                  icon={<IconTags />}
                  labelName={job.job_name}
                  disableCloseIcon={true}
                  customClass={styling.label}
                />
              ))}
          </div>
        </CardContainer>
      </div>

      {/* Skills */}
      <CardContainer className={styling.cardContainerSkills}>
        <div>
          <h1 className={`${styling.skillsTitle} ${styling.margin}`}>Skills</h1>
          <SkillsLevelGuide />
          <div className={styling.skills}>
            {candidate?.skills &&
              candidate?.skills?.map((label, index) => (
                <Labels
                  key={index}
                  icon={<IconTags />}
                  labelName={label.skill_name}
                  disableCloseIcon={true}
                  customClass={styling.label}
                  isSkill={true}
                  skillLevel={label.skill_level}
                />
              ))}
          </div>
        </div>
      </CardContainer>

      <div className={styling.row}>
        {/* Values */}
        <CardContainer className={styling.cardContainerValues}>
          <div>
            <h1 className={styling.margin}>Values</h1>
            <div className={styling.values}>
              {candidate?.values &&
                candidate?.values?.map((label, index) => (
                  <Labels
                    key={index}
                    icon={<IconTags />}
                    labelName={label}
                    disableCloseIcon={true}
                    customClass={styling.label}
                  />
                ))}
            </div>
          </div>
        </CardContainer>

        {/* Experience */}
        <CardContainer className={styling.cardContainerExperiences}>
          <div>
            <h1 className={styling.margin}>Experience</h1>
            {sectionsExperience && (
              <ContentBlock sections={sectionsExperience} />
            )}
          </div>
        </CardContainer>
      </div>

      <CardContainer className={styling.cardCont}>
        <h1 className={styling.requestAccessTitle}>
          Request application package
        </h1>
        <Button className={styling.applyButton} onClick={requestAccess}>
          Request access
        </Button>
        <RequestAccess
          show={isModalVisible}
          setShow={setIsModalVisible}
          jobs={matchingJobs}
        />
      </CardContainer>
    </div>
  );
};

export { CandidateResumeTab };
