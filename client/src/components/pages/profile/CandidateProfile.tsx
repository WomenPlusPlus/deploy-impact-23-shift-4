import React, { useState } from "react";
import "./CandidateProfile.css";
import Avatar from "../../UI/avatar/Avatar";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
import { Labels } from "../../UI/labels/Label";
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
    "Personal details",
    "Skills",
    "Values",
    "Documents",
    "Privacy",
    "Type of Jobs",
    "Langiages",
  ];

  const associations = ["Woman++", "proFemmes", "Coders", "Kpi"];
  const typeOfJobs = ["Full-time", "Part-time", "Internship", "Freelance"];
  const skills = ["React", "Node.js", "TypeScript", "JavaScript", "HTML/CSS"];
  const values = ["Teamwork", "Diversity", "Inclusion", "Equality"];

  // State
  const [associationLabels, setAssociationLabels] = useState(associations);
  const [typeOfJobsLabels, setTypeOfJobsLabels] = useState(typeOfJobs);
  const [skillsLabels, setSkillsLabels] = useState(skills);
  const [valuesLabels, setValuesLabels] = useState(values);

  // Functions
  const handleTypeOfJobsLabelDelete = (labelToRemove: string) => {
    const updatedJobs = typeOfJobsLabels.filter(
      (label) => label !== labelToRemove
    );
    setTypeOfJobsLabels(updatedJobs);
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
    <div className="content-div">
      {/* Profile text */}
      <CardContainer className="profile-section-element profilee-component">
        <Avatar size={80} firstName="John" lastName="Doe" />

        <div>
          <div className="user-name">
            <h3>{name}</h3>
            <h4>{status}</h4>
          </div>

          <div className="location">
            <IconMapPin color="black" />
            <p>
              {city}, {country}
            </p>
            <p>|</p>
            <IconBrandLinkedin color="black" />
            <IconWorldWww color="black" />
          </div>
        </div>

        <div className="open-icon">
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
      </CardContainer>

      <div className="profile-completed-component">
        {/* Profile completed */}
        <CardContainer className="profile-completed-element">
          <div className="profile-completed-edit-icon">
            <h3>Your profile is {progress} complete.</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>

          <ProgressBar progress={progress} height="1.5rem" />

          {/* Fields completed */}
          <div className="profile-completed-fields-component">
            <div className="column">
              {list.slice(0, Math.ceil(list.length / 2)).map((field, index) => (
                <div key={index} className="profile-completed-fields-element">
                  <ProfileCompletedFields isCompleted={false} field={field} />
                </div>
              ))}
            </div>

            <div className="column">
              {list.slice(Math.ceil(list.length / 2)).map((field, index) => (
                <div key={index} className="profile-completed-fields-element">
                  <ProfileCompletedFields isCompleted={true} field={field} />
                </div>
              ))}
            </div>
          </div>
        </CardContainer>

        {/* Anonymous profile */}
        <CardContainer className="profile-completed-element">
          <div className="profile-completed-edit-icon">
            <h3>Visible Information</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </CardContainer>
      </div>

      {/* Associations & Type of jobs  */}
      <div className="associations-type-of-jobs">
        <CardContainer className="association-container">
          <div className="profile-completed-edit-icon">
            <h3>Associations</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          <div className="association-container-labels">
            {associationLabels.map((label, index) => (
              <Labels
                key={index}
                icon={<IconAffiliate />}
                labelName={label}
                disableCloseIcon={true}
              />
            ))}
          </div>
        </CardContainer>
        <CardContainer className="type-of-jobs-container">
          <div className="profile-completed-edit-icon">
            <h3>Type of jobs you're looking for</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          <div className="association-container-labels">
            {typeOfJobsLabels.map((label, index) => (
              <Labels
                key={index}
                icon={<IconAffiliate />}
                labelName={label}
                onCloseIcon={() => handleTypeOfJobsLabelDelete(label)}
                disableCloseIcon={false}
              />
            ))}
          </div>
        </CardContainer>
      </div>

      {/* Skills */}
      <CardContainer className="skills-container">
        <div className="profile-completed-edit-icon">
          <h3>Skills</h3>
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
        <div className="skills-container-labels">
          {skillsLabels.map((label, index) => (
            <Labels
              key={index}
              icon={<IconAffiliate />}
              labelName={label}
              onCloseIcon={() => handleSkillsDelete(label)}
              disableCloseIcon={false}
            />
          ))}
        </div>
      </CardContainer>

      {/* Values */}
      <CardContainer className="values-container">
        <div className="profile-completed-edit-icon">
          <h3>Values</h3>
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
        <div className="values-container-labels">
          {valuesLabels.map((label, index) => (
            <Labels
              key={index}
              icon={<IconAffiliate />}
              labelName={label}
              onCloseIcon={() => handleValuesDelete(label)}
              disableCloseIcon={false}
            />
          ))}
        </div>
      </CardContainer>

      {/* Contact info, languages, experience */}
      <div className="associations-type-of-jobs">
        <CardContainer className="association-container">
          <div className="profile-completed-edit-icon">
            <h3>Contact info</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          
        </CardContainer>
        <CardContainer className="type-of-jobs-container">
          <div className="profile-completed-edit-icon">
            <h3>Languages</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          
        </CardContainer>
        <CardContainer className="type-of-jobs-container">
          <div className="profile-completed-edit-icon">
            <h3>Experience</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          
        </CardContainer>
      </div>
    </div>
  );
};

export default CandidateProfile;
