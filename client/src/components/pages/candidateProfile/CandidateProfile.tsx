import { useEffect, useState } from "react";

import Avatar from "../../UI/avatar/Avatar";

import { Labels } from "../../UI/labels/Label";
import { EditSkills } from "../../UI/modal/EditSkills";
import { EditValues } from "../../UI/modal/EditValues";
import { EditInput } from "../../UI/modal/EditInput";
import { EditLanguages } from "../../UI/modal/EditLanguages";
import { EditTypeOfJobs } from "../../UI/modal/EditTypeOfJobs";
import { VisibleSection } from "../../UI/modal/VisibleSection";
import { getFakeData } from "./helpers/helper";

import { CardContainer } from "../../UI/container/CardContainer";
import { ProgressBarComponent } from "../../UI/progressbar/ProgressBarComponent";
import { ContentBlock } from "../../UI/container/SectionContainer";
import { ProfileComplete } from "./ProfileComplete";
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
    "Salary expectation",
    "Notice",
    "Visa Status",
    "Documents",
    "Profile",
    "Skills",
    "Values",
    "Languages",
    "Experience",
    "Contact info",
    "Type of jobs",
  ];
  // State
  const [candidate, setCandidate] = useState({} as Candidate);
  // Is edit
  const [isEditContactInfo, setIsEditContactInfo] = useState(false);
  const [isEditLanguages, setIsEditLanguages] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isAnonymousProfileEdit, setIsAnonymousProfileEdit] = useState(false);
  const [isSkillsEdit, setIsSkillsEdit] = useState(false);
  const [isValuesEdit, setIsValuesEdit] = useState(false);
  const [isTypeOfJobsEdit, setIsTypeOfJobsEdit] = useState(false);

  const [allSkills, setAllSkills] = useState([]);
  const [allValues, setAllValues] = useState([]);
  const [allTypeOfJobs, setAllTypeOfJobs] = useState([]);

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
    setAllSkills(getFakeData().allSkill as []);
    setAllValues(getFakeData().allValue as []);
    setAllTypeOfJobs(getFakeData().allTypeOfJob as []);
  }, []);

  // handlers
  const editContactInfo = () => {
    setIsEditContactInfo(true);
  };

  const editLanguages = () => {
    setIsEditLanguages(true);
  };

  const editHandlerProfile = () => {
    setIsProfileEdit(true);
  };

  const editHandlerAnonymousProfile = () => {
    setIsAnonymousProfileEdit(true);
  };

  const editSkills = () => {
    setIsSkillsEdit(true);
  }

  const editValues = () => {
    setIsValuesEdit(true);
  }

  const editTypeOfJobs = () => {
    setIsTypeOfJobsEdit(true);
  }


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
        className={`${styling.profileComponent}`}
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
        <ProfileComplete
          className={styling.profileCompletedElement}
          candidate={candidate}
          allCategories={allFields}
          editContactInfo={editContactInfo}
          editLanguages={editLanguages}
          editSkills={editSkills}
        />

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
            {candidate?.associations?.map((label, index) => (
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
            <EditTypeOfJobs
              candidate={candidate}
              setCandidate={setCandidate}
              allLabels={allTypeOfJobs}
              icon={<IconTags />}
              titleName="Choose your type of jobs"
              onSave={handleSaveEdit}
            />
          </div>

          <div className={styling.associationContainerLabels}>
            {candidate?.preferred_jobs?.map((label, index) => (
              <Labels
                key={index}
                icon={<IconTags />}
                labelName={label.job_name}
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
            allLabels={allSkills}
            icon={<IconTags />}
            titleName="Choose your skills"
            onSave={handleSaveEdit}
            visible={isSkillsEdit}
            setVisible={setIsSkillsEdit}
            showModal={editSkills}
          />
        </div>
        <div className={styling.skillsContainerLabels}>
          {candidate.skills &&
            candidate.skills.map((label, index) => (
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
            allLabels={allValues}
            icon={<IconTags />}
            titleName="Choose your skills"
            onSave={handleSaveEdit}
          />
        </div>
        <div className={styling.valuesContainerLabels}>
          {candidate.values &&
            candidate.values.map((label, index) => (
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
              onClick={editContactInfo}
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
              onClick={editLanguages}
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
