import { useState } from "react";
import { CardContainer } from "../../UI/container/CardContainer";
import { HorizontalLine } from "../../UI/container/SectionContainer";
import { Labels } from "../../UI/labels/Label";
import { Candidate } from "../types/types";
import styling from "./CandidateResumeTab.module.css";
import { IconCertificate, IconTags } from "@tabler/icons-react";
import { ProgressBarComponent } from "../../UI/progressbar/ProgressBarComponent";

interface Props {
  candidate: Candidate;
}

const CandidateResumeTab: React.FC<Props> = ({ candidate }) => {
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const requestAccess = (documentName: string) => {
    console.log("request access for document: ", documentName);
  };

  return (
    <div className={styling.main}>
      {/* About me */}
      <CardContainer className={styling.cardContainerAboutMe}>
        <div>
          <h1>Experience</h1>
        </div>
      </CardContainer>

      {/* Skills */}
      <CardContainer className={styling.cardContainerSkills}>
        <div>
          <h1>Skills</h1>
          <div className={styling.skills}>
            {candidate?.skills &&
              candidate?.skills?.map((label, index) => (
                <Labels
                  key={index}
                  icon={<IconTags />}
                  labelName={label.skill_name}
                  disableCloseIcon={true}
                  customClass={styling.label}
                />
              ))}
          </div>
        </div>
      </CardContainer>

      {/* Values */}
      <CardContainer className={styling.cardContainerValues}>
        <div className={styling.values}>
          <h1>Values</h1>
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

      {/* Resume & Languanges */}
      <div className={styling.row}>
        <CardContainer className={styling.resumeContainer}>
          <h1>Resume</h1>
          <div className={styling.resumeElements}>
            {/* CV */}
            {candidate?.cv_reference && isAccessGranted ? (
              <div className={styling.cv}>
                <p>CV</p>
                <a
                  href={`${candidate?.cv_reference}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconCertificate size={50} stroke={0.5} color="black" />
                </a>
              </div>
            ) : (
              <div className={styling.cv} onClick={() => requestAccess("cv")}>
                <p>CV</p>
                <IconCertificate size={50} stroke={0.5} color="black" />
              </div>
            )}
            {/* line */}
            {candidate?.certificates && <HorizontalLine />}

            {/* Certificates */}
            <div>
              {candidate?.certificates &&
                candidate?.certificates?.map((certificate, index) => (
                  <div key={index} className={styling.cv}>
                    <p>Certificate</p>
                    <a
                      href={`${certificate.reference}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconCertificate size={50} stroke={0.5} color="black" />
                    </a>
                    <p>{certificate.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </CardContainer>

        {/* Languages */}
        <CardContainer className={styling.languagesContainer}>
          <h1>Languages</h1>
          <div className={styling.language}>
            {candidate?.languages ? (
              <ProgressBarComponent candidate={candidate} />
            ) : (
              <p>No languages are being added yet.</p>
            )}
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export { CandidateResumeTab };
