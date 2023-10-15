import { useEffect, useState } from "react";

import Avatar from "../../UI/avatar/Avatar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { Labels } from "../../UI/labels/Label";
import { EditSkills } from "../../UI/modal/EditSkills";
import { EditValues } from "../../UI/modal/EditValues";
import { EditInput } from "../../UI/modal/EditInput";
import { EditLanguages } from "../../UI/modal/EditLanguages";
import { VisibleSection } from "../../UI/modal/VisibleSection";
import { getFakeData } from "./helpers/helper";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { CardContainer } from "../../UI/container/CardContainer";
import { ProgressBarComponent } from "../../UI/progressbar/ProgressBarComponent";
import { ContentBlock } from "../../UI/container/SectionContainer";
import {
  IconEdit,
  IconMapPin,
  IconBrandLinkedin,
  IconWorldWww,
  IconTags,
} from "@tabler/icons-react";

import { getCandidateById, updateCandidateById } from "../../../api/candidates";

import { Candidate } from "../types/types";

import styling from "./CandidateProfile.module.css";

const CandidateProfile = () => {
  const sectionsVisibleInfo = [
    { title: "Salary bracket", subtitle: "CHF 90'000 / 110'000 pa" },
    { title: "Notice", subtitle: "Immediately available" },
    {
      title: "Visa Status",
      subtitle: "(EU) valid visa \n (CH) valid visa \n (UK) valid visa",
    },
  ];
  const sectionsExperience = [
    {
      title: "Role",
      text: "5 Years in academia",
      subtext: "+ 1 year in Product, 3 in Engineering",
    },
    {
      title: "Industries",
      text: "Entertainment",
      subtext: "+ Software/Saas, Biotechnology, Medical devices",
    },
  ];
  const sectionsDocuments = [
    { title: "CV", subtext: "", type: "cv" },
    { title: "Certificate", subtext: "DAC 2023", type: "certificate" },
    {
      title: "Ceritficate",
      subtext: "Deploy(impact) 2023",
      type: "certificate",
    },
  ];
  const allFields = [
    "Salary bracket",
    "Notice",
    "Visa Status",
    "Role",
    "Industries",
    "Documents",
  ];
  // Filter out the labels that are already the candidate's labels
  const allLabelsSkills = () => {
    return getFakeData().allSkill.filter(
      (label) => !skillsLabels.includes(label)
    );
  };
  const allLabelsValues = () => {
    return getFakeData().allValue.filter(
      (label) => !valuesLabels.includes(label)
    );
  };
  const allTypeOfJobs = () => {
    return getFakeData().allTypeOfJob.filter(
      (label) => !typeOfJobsLabels.includes(label)
    );
  };

  // State
  const [candidate, setCandidate] = useState({} as Candidate);
  const [typeOfJobsLabels, setTypeOfJobsLabels] = useState(
    getFakeData().user.typeOfJobs
  );
  const associationLabels = getFakeData().user.associations;
  const [skillsLabels, setSkillsLabels] = useState(getFakeData().user.skills);
  const [valuesLabels, setValuesLabels] = useState(getFakeData().user.values);
  // Is edit
  const [isEditContactInfo, setIsEditContactInfo] = useState(false);
  const [isEditLanguages, setIsEditLanguages] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isAnonymousProfileEdit, setIsAnonymousProfileEdit] = useState(false);

  const fetchCandidate = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    console.log("user_id", auth.user.id);
    try {
      const candidateFetched = await getCandidateById(auth.user.id);
      setCandidate(candidateFetched);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

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

  const editHandlerAnonymousProfile = () => {
    setIsAnonymousProfileEdit(true);
  };

  /**
   * Handle the save of the profile info
   * @param valuesToAdd the values to add to the candidate object
   */
  const handleSaveEdit = async (valuesToAdd: object) => {
    // Add the values to the candidate object
    const candidateUpdated = { ...candidate, ...valuesToAdd };
    // Update the state
    setCandidate(candidateUpdated);
    // Send request to update the candidate
    const is_updated = await updateCandidateById(
      candidate?.user_id,
      candidateUpdated
    );
    console.log("is_updated", is_updated);
  };

  console.log("candidate profile", candidate);
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
              {candidate?.first_name} {candidate?.last_name}
            </h3>

            <h4>{candidate?.job_status}</h4>
          </div>

          <div className={styling.location}>
            <IconMapPin color="black" />
            <p>
              {candidate?.city}, {candidate?.country}
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
            candidate={candidate}
            setValuesToEdit={setCandidate}
            fieldsToDisplay={getFakeData().fieldsToDisplayProfile}
            onClick={editHandlerProfile}
            onSave={handleSaveEdit}
            fieldKeysToEdit={[
              "first_name",
              "last_name",
              "job_status",
              "city",
              "country",
              // add links here. Remember: Links are an array of objects [{name: "", url: ""}]
            ]}
          />
        </div>
      </CardContainer>

      <div className={styling.profileCompletedComponent}>
        {/* Profile completed */}
        <CardContainer className={styling.profileCompletedElement}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Your profile is {getFakeData().user?.progress} complete.</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>

          <ProgressBar
            progress={getFakeData().user?.progress}
            height="1.5rem"
          />

          {/* Fields completed */}
          <div className={styling.profileCompletedFieldsComponent}>
            <div className={styling.column}>
              {getFakeData()
                .user?.list.slice(
                  0,
                  Math.ceil(getFakeData().user?.list.length / 2)
                )
                .map((field, index) => (
                  <div
                    key={index}
                    className={styling.profileCompletedFieldsElement}
                  >
                    <ProfileCompletedFields isCompleted={false} field={field} />
                  </div>
                ))}
            </div>

            <div className={styling.column}>
              {getFakeData()
                .user?.list.slice(
                  Math.ceil(getFakeData().user?.list.length / 2)
                )
                .map((field, index) => (
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
            {/* <IconEdit color="black" style={{ cursor: "pointer" }} /> */}
            <VisibleSection
              candidate={candidate}
              visible={isAnonymousProfileEdit}
              setVisible={setIsAnonymousProfileEdit}
              onClick={editHandlerAnonymousProfile}
              allFields={allFields}
            />
          </div>
          <p>Initially employees will only see skills and values</p>
          <ContentBlock sections={sectionsVisibleInfo} />
        </CardContainer>
      </div>

      {/* Associations & Type of jobs  */}
      <div className={styling.associationsTypeOfJobs}>
        <CardContainer className={styling.secondContainer}>
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
        <CardContainer className={styling.secondContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Type of jobs you're looking for</h3>
            {/* <EditTag
              labelsList={typeOfJobsLabels}
              setLabelsList={setTypeOfJobsLabels}
              icon={<IconTags />}
              titleName="Edit your jobs"
              allLabelsList={allTypeOfJobs()}
            /> */}
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
          <EditSkills
            candidate={candidate}
            setCandidate={setCandidate}
            allLabels={skillsLabels}
            icon={<IconTags />}
            titleName="Choose your skills"
            onSave={handleSaveEdit}
          />
        </div>
        <div className={styling.skillsContainerLabels}>
          {candidate.skills && candidate.skills.map((label, index) => (
            <Labels
              key={index}
              icon={<IconTags />}
              labelName={label.skill_name}
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
          <EditValues
            candidate={candidate}
            setCandidate={setCandidate}
            allLabels={valuesLabels}
            icon={<IconTags />}
            titleName="Choose your skills"
            onSave={handleSaveEdit}
          />
        </div>
        <div className={styling.valuesContainerLabels}>
          {candidate.values && candidate.values.map((label, index) => (
            <Labels
              key={index}
              icon={<IconTags />}
              labelName={label.value_name}
              disableCloseIcon={true}
              customClass={styling.labelClass}
            />
          ))}
        </div>
      </CardContainer>

      {/* Contact info, languages, experience */}
      {/* Contact info */}
      <div className={styling.associationsTypeOfJobs}>
        <CardContainer className={styling.lowerContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Contact info</h3>
            <EditInput
              visible={isEditContactInfo}
              setVisible={setIsEditContactInfo}
              candidate={candidate}
              setValuesToEdit={setCandidate}
              fieldsToDisplay={getFakeData().fieldsToDisplayContactInfo}
              onClick={editHandlerContactInfo}
              onSave={handleSaveEdit}
              fieldKeysToEdit={["phone_number", "email", "address"]}
            />
          </div>
          <div>
            <p>
              <strong>Phone number:</strong> {candidate?.phone_number}
            </p>
            <p>
              <strong>Email:</strong> {candidate?.email}
            </p>
            <p>
              <strong>Address:</strong> {candidate?.address}
            </p>
          </div>
        </CardContainer>

        {/* Laguages */}
        <CardContainer className={styling.lowerContainer}>
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
            values={candidate}
            setValues={setCandidate}
            onSave={handleSaveEdit}
          />
          <ProgressBarComponent candidate={candidate} />
        </CardContainer>

        {/* Experience */}
        <CardContainer className={styling.lowerContainer}>
          <div className={styling.profileCompletedEditIcon}>
            <h3>Experience</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          <ContentBlock sections={sectionsExperience} />
        </CardContainer>
      </div>

      {/* Uploaded documents */}
      <CardContainer className={styling.valuesContainer}>
        <div className={styling.profileCompletedEditIcon}>
          <h3>Uploaded documents</h3>
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
        <ContentBlock sections={sectionsDocuments} />
      </CardContainer>
    </div>
  );
};

export default CandidateProfile;
