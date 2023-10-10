import React, { useState } from "react";
import styling from "./CandidateProfile.module.css";
import Avatar from "../../UI/avatar/Avatar";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
import { Labels } from "../../UI/labels/Label";
import { EditModal } from "../../UI/modal/EditModal";
import {
  IconEdit,
  IconMapPin,
  IconBrandLinkedin,
  IconWorldWww,
  IconAffiliate,
} from "@tabler/icons-react";

const CandidateProfile = () => {
  const name = "John Doe";
  const status = "Looking for a job";
  const city = "Zurich";
  const country = "CH";
  const progress = 80;
  const list = [
    "PersonalDetails",
    "Skills",
    "Values",
    "Documents",
    "Privacy",
    "TypeOfJobs",
    "Languages",
  ];

  const associations = ["Woman++", "proFemmes", "Coders", "Kpi"];
  const typeOfJobs = ["Full-time", "Part-time", "Internship", "Freelance"];
  const skills = ["React", "Node.js", "TypeScript", "JavaScript", "HTML/CSS"];
  const values = ["Teamwork", "Diversity", "Inclusion", "Equality"];

  // State
  const [associationLabels] = useState(associations);
  const [typeOfJobsLabels, setTypeOfJobsLabels] = useState(typeOfJobs);
  const [skillsLabels, setSkillsLabels] = useState(skills);
  const [valuesLabels, setValuesLabels] = useState(values);

  // Functions
  const [labelsToDelete, setLabelsToDelete] = useState<string[]>([]);

  const handleTypeOfJobsLabelDelete = (labelToRemove: string) => {
    // Add the label to the list of labels to be deleted
    setLabelsToDelete((prevLabels) => [...prevLabels, labelToRemove]);
  };

  const handleSkillsDelete = (labelToRemove: string) => {
    const updatedSkills = skillsLabels.filter(
      (label) => label !== labelToRemove
    );
    setSkillsLabels(updatedSkills);
  };

  const handleValuesDelete = (labelToRemove: string) => {
    const updatedValues = valuesLabels.filter(
      (label) => label !== labelToRemove
    );
    setValuesLabels(updatedValues);
  };

  return (
    <div className={styling.main}>
      {/* Profile text */}
      <CardContainer
        className={`${styling.profileSectionElement} ${styling.profileComponent}`}
      >
        <Avatar size={80} firstName="John" lastName="Doe" />

        <div>
          <div className={styling.userName}>
            <h3>{name}</h3>
            <h4>{status}</h4>
          </div>

          <div className={styling.location}>
            <IconMapPin color="black" />
            <p>
              {city}, {country}
            </p>
            <p>|</p>
            <IconBrandLinkedin color="black" />
            <IconWorldWww color="black" />
          </div>
        </div>

        <div className={styling.editIcon}>
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
      </CardContainer>

      <div className={styling.profileCompletedComponent}>
        {/* Profile completed */}
        <CardContainer className={styling.profileCompletedElement}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Your profile is {progress} complete.</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>

          <ProgressBar progress={progress} height="1.5rem" />

          {/* Fields completed */}
          <div className={styling.profileCompletedFieldsComponent}>
            <div className={styling.column}>
              {list.slice(0, Math.ceil(list.length / 2)).map((field, index) => (
                <div
                  key={index}
                  className={styling.profileCompletedFieldsElement}
                >
                  <ProfileCompletedFields isCompleted={false} field={field} />
                </div>
              ))}
            </div>

            <div className={styling.column}>
              {list.slice(Math.ceil(list.length / 2)).map((field, index) => (
                <div
                  key={index}
                  className={styling.profileCompletedFieldsElement}
                >
                  <ProfileCompletedFields isCompleted={true} field={field} />
                </div>
              ))}
            </div>
          </div>
        </CardContainer>

        {/* Anonymous profile */}
        <CardContainer className={styling.profileCompletedElement}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Visible Information</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </CardContainer>
      </div>

      {/* Associations & Type of jobs  */}
      <div className={styling.associationsTypeOfJobs}>
        <CardContainer className={styling.associationContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Associations</h3>
          </div>
          <div className={styling.associationContainerLabels}>
            {associationLabels.map((label, index) => (
              <Labels
                key={index}
                icon={<IconAffiliate />}
                labelName={label}
                disableCloseIcon={true}
                backgroundColor="var(--label-color)"
              />
            ))}
          </div>
        </CardContainer>
        <CardContainer className={styling.typeOfJobsContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Type of jobs you're looking for</h3>
            <EditModal
              labelsList={typeOfJobsLabels}
              setLabelsList={setTypeOfJobsLabels}
              icon={<IconAffiliate />}
              titleName="jobs"
            />
          </div>

          <div className={styling.associationContainerLabels}>
            {typeOfJobsLabels.map((label, index) => (
              <Labels
                key={index}
                icon={<IconAffiliate />}
                labelName={label}
                disableCloseIcon={true}
                backgroundColor="var(--label-color)"
              />
            ))}
          </div>
        </CardContainer>
      </div>

      {/* Skills */}
      <CardContainer className={styling.skillsContainer}>
        <div className={styling.profileCompletedEditIcon}>
          <h3>Skills</h3>
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
        <div className={styling.skillsContainerLabels}>
          {skillsLabels.map((label, index) => (
            <Labels
              key={index}
              icon={<IconAffiliate />}
              labelName={label}
              onCloseIcon={() => handleSkillsDelete(label)}
              disableCloseIcon={true}
              backgroundColor="var(--label-color)"
            />
          ))}
        </div>
      </CardContainer>

      {/* Values */}
      <CardContainer className={styling.valuesContainer}>
        <div className={styling.profileCompletedEditIcon}>
          <h3>Values</h3>
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
        <div className={styling.valuesContainerLabels}>
          {valuesLabels.map((label, index) => (
            <Labels
              key={index}
              icon={<IconAffiliate />}
              labelName={label}
              onCloseIcon={() => handleValuesDelete(label)}
              disableCloseIcon={true}
              backgroundColor="var(--label-color)"
            />
          ))}
        </div>
      </CardContainer>

      {/* Contact info, languages, experience */}
      <div className={styling.associationsTypeOfJobs}>
        <CardContainer className={styling.associationContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Contact info</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </CardContainer>
        <CardContainer className={styling.typeOfJobsContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Languages</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </CardContainer>
        <CardContainer className={styling.typeOfJobsContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Experience</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default CandidateProfile;
