import { useState } from "react";
import styling from "./CandidateProfile.module.css";
import Avatar from "../../UI/avatar/Avatar";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
import { Labels } from "../../UI/labels/Label";
import { EditTag } from "../../UI/modal/EditTag";
import { EditInput } from "../../UI/modal/EditInput";
import { EditLanguages } from "../../UI/modal/EditLanguages";
import {
  ContentBlock,
  HorizontalLine,
} from "../../UI/container/SectionContainer";
import {
  IconEdit,
  IconMapPin,
  IconBrandLinkedin,
  IconWorldWww,
  IconTags,
} from "@tabler/icons-react";
import { ProgressBarComponent } from "../../UI/progressbar/ProgressBarComponent";

interface Language {
  name: string;
  levelName: string;
  score: number; // Allow null for initial values
}

const CandidateProfile = () => {
  const user = {
    first_name: "John",
    last_name: "Doe",
    status: "Looking for a job",
    city: "Zurich",
    country: "CH",
    progress: 80,
    list: [
      "PersonalDetails",
      "Skills",
      "Values",
      "Documents",
      "Privacy",
      "TypeOfJobs",
      "Languages",
    ],
    associations: ["Woman++", "proFemmes", "Coders", "Kpi"],
    typeOfJobs: ["Full-time", "Part-time", "Internship", "Freelance"],
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Python",
    ],
    values: ["Teamwork", "Diversity", "Inclusion", "Equality"],
    languages: [
      { name: "English", levelName: "Beginner", score: 20 },
      { name: "Italian", levelName: "Native", score: 100 },
      // Add more languages as needed
    ],
    contactInfo: {
      phoneNumber: "123-456-7890",
      email: "laura@gmail.com",
      address: "123 Street Name, City, Country",
    },
    job_status: "Looking for a job",
  };

  // Filter out the labels that are already the candidate's labels
  const allLabelsSkills = () => {
    const allSkill = [
      "Vue",
      "Express.js",
      "Bash",
      "R",
      "C++",
      "Java",
      "Python",
    ];
    return allSkill.filter((label) => !skillsLabels.includes(label));
  };
  const allLabelsValues = () => {
    const allValue = ["Cheer up", "Social", "Awareness", "Respect"];
    return allValue.filter((label) => !valuesLabels.includes(label));
  };
  const allTypeOfJobs = () => {
    const allTypeOfJob = ["Full-time", "Part-time", "Internship", "Freelance"];
    return allTypeOfJob.filter((label) => !typeOfJobsLabels.includes(label));
  };



  const fieldsToDisplayContactInfo = ["Phone number", "Email", "Address", "me"];
  const fieldsToDisplayProfile = [
    "First name",
    "Last name",
    "Job status",
    "City",
    "Country",
  ];

  // State
  const [associationLabels] = useState(user.associations);
  const [typeOfJobsLabels, setTypeOfJobsLabels] = useState(user.typeOfJobs);
  const [skillsLabels, setSkillsLabels] = useState(user.skills);
  const [valuesLabels, setValuesLabels] = useState(user.values);
  // Contact info
  const [isEditContactInfo, setIsEditContactInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState(user.contactInfo);
  // Languages
  const langs: Language[] = user.languages.map((lang) => ({
    name: lang.name,
    levelName: lang.levelName,
    score: lang.score,
  }));

  const [isEditLanguages, setIsEditLanguages] = useState(false);
  const [languagesToEdit, setLanguagesToEdit] = useState(langs);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [profile, setProfile] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    job_status: user.job_status,
    city: user.city,
    country: user.country,
  });
  // handlers
  const editHandlerContactInfo = () => {
    setIsEditContactInfo(true);
  };

  const editHandlerLanguages = () => {
    setIsEditLanguages(true);
  };

  const editHandlerProfile = () => {
    setIsProfileEdit(true);
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
            <h3>
              {profile?.first_name} {profile?.last_name}
            </h3>
            <h4>{profile?.job_status}</h4>
          </div>

          <div className={styling?.location}>
            <IconMapPin color="black" />
            <p>
              {profile?.city}, {profile?.country}
            </p>
            <p>|</p>
            <IconBrandLinkedin color="black" />
            <IconWorldWww color="black" />
          </div>
        </div>

        <div className={styling.editIcon}>
          <EditInput
            visible={isProfileEdit}
            setVisible={setIsProfileEdit}
            valuesToEdit={profile}
            setValuesToEdit={setProfile}
            fieldsToDisplay={fieldsToDisplayProfile}
            onClick={editHandlerProfile}
          />
        </div>
      </CardContainer>

      <div className={styling.profileCompletedComponent}>
        {/* Profile completed */}
        <CardContainer className={styling.profileCompletedElement}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Your profile is {user?.progress} complete.</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>

          <ProgressBar progress={user?.progress} height="1.5rem" />

          {/* Fields completed */}
          <div className={styling.profileCompletedFieldsComponent}>
            <div className={styling.column}>
              {user?.list.slice(0, Math.ceil(user?.list.length / 2)).map((field, index) => (
                <div
                  key={index}
                  className={styling.profileCompletedFieldsElement}
                >
                  <ProfileCompletedFields isCompleted={false} field={field} />
                </div>
              ))}
            </div>

            <div className={styling.column}>
              {user?.list.slice(Math.ceil(user?.list.length / 2)).map((field, index) => (
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
          <p>Initially employees will only see skills and values</p>
          <div className={styling.containerVisibleInfo}>
            <ContentBlock
              title="Section 1"
              text="This is the text inside Section 1."
            />
            <HorizontalLine />
            <ContentBlock
              title="Section 2"
              text="This is the text inside Section 2."
            />
            <HorizontalLine />
            <ContentBlock
              title="Section 3"
              text="This is the text inside Section 3."
            />
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
                icon={<IconTags />}
                labelName={label}
                disableCloseIcon={true}
                customClass={styling.labelClass}
              />
            ))}
          </div>
        </CardContainer>
        <CardContainer className={styling.typeOfJobsContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Type of jobs you're looking for</h3>
            <EditTag
              labelsList={typeOfJobsLabels}
              setLabelsList={setTypeOfJobsLabels}
              icon={<IconTags />}
              titleName="Edit your jobs"
              allLabelsList={allTypeOfJobs()}
            />
          </div>

          <div className={styling.associationContainerLabels}>
            {typeOfJobsLabels.map((label, index) => (
              <Labels
                key={index}
                icon={<IconTags />}
                labelName={label}
                disableCloseIcon={true}
                customClass={styling.labelClass}
              />
            ))}
          </div>
        </CardContainer>
      </div>

      {/* Skills */}
      <CardContainer className={styling.skillsContainer}>
        <div className={styling.profileCompletedEditIcon}>
          <h3>Skills</h3>
          <EditTag
            labelsList={skillsLabels}
            setLabelsList={setSkillsLabels}
            icon={<IconTags />}
            titleName="Choose your skills"
            allLabelsList={allLabelsSkills()}
          />
        </div>
        <div className={styling.skillsContainerLabels}>
          {skillsLabels.map((label, index) => (
            <Labels
              key={index}
              icon={<IconTags />}
              labelName={label}
              disableCloseIcon={true}
              customClass={styling.labelClass}
            />
          ))}
        </div>
      </CardContainer>

      {/* Values */}
      <CardContainer className={styling.valuesContainer}>
        <div className={styling.profileCompletedEditIcon}>
          <h3>Values</h3>
          <EditTag
            labelsList={valuesLabels}
            setLabelsList={setValuesLabels}
            icon={<IconTags />}
            titleName="Choose your values"
            allLabelsList={allLabelsValues()}
          />
        </div>
        <div className={styling.valuesContainerLabels}>
          {valuesLabels.map((label, index) => (
            <Labels
              key={index}
              icon={<IconTags />}
              labelName={label}
              disableCloseIcon={true}
              customClass={styling.labelClass}
            />
          ))}
        </div>
      </CardContainer>

      {/* Contact info, languages, experience */}
      {/* Contact info */}
      <div className={styling.associationsTypeOfJobs}>
        <CardContainer className={styling.associationContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Contact info</h3>
            <EditInput
              visible={isEditContactInfo}
              setVisible={setIsEditContactInfo}
              valuesToEdit={contactInfo}
              setValuesToEdit={setContactInfo}
              fieldsToDisplay={fieldsToDisplayContactInfo}
              onClick={editHandlerContactInfo}
            />
          </div>
          <div>
            <p>
              <strong>Phone number:</strong> {contactInfo.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {contactInfo.email}
            </p>
            <p>
              <strong>Address:</strong> {contactInfo.address}
            </p>
          </div>
        </CardContainer>

        {/* Laguages */}
        <CardContainer className={styling.typeOfJobsContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Languages</h3>
            <IconEdit
              color="black"
              style={{ cursor: "pointer" }}
              onClick={editHandlerLanguages}
            />
          </div>
          <EditLanguages
            visible={isEditLanguages}
            setVisible={setIsEditLanguages}
            languages={languagesToEdit}
            setLanguages={setLanguagesToEdit}
          />
          <ProgressBarComponent languages={languagesToEdit} />
        </CardContainer>

        {/* Experience */}
        <CardContainer className={styling.typeOfJobsContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Experience</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          <div className={styling.containerVisibleInfo}>
            <ContentBlock
              title="Section 1"
              text="This is the text inside Section 1."
            />
            <HorizontalLine />
            <ContentBlock
              title="Section 2"
              text="This is the text inside Section 2."
            />
          </div>
        </CardContainer>
      </div>

      {/* Uploaded documents */}
      <CardContainer className={styling.valuesContainer}>
        <div className={styling.profileCompletedEditIcon}>
          <h3>Uploaded documents</h3>
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
        <div className={styling.containerVisibleInfo}>
          <ContentBlock
            title="Section 1"
            text="This is the text inside Section 1."
          />
          <HorizontalLine />
          <ContentBlock
            title="Section 2"
            text="This is the text inside Section 2."
          />
          <HorizontalLine />
          <ContentBlock
            title="Section 3"
            text="This is the text inside Section 3."
          />
        </div>
      </CardContainer>
    </div>
  );
};

export default CandidateProfile;
