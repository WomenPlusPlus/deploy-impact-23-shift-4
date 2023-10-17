import { useEffect, useState } from "react";

import Avatar from "../../UI/avatar/Avatar";

import { Labels } from "../../UI/labels/Label";
import { EditSkills } from "../../UI/modal/EditSkills";
import { EditValues } from "../../UI/modal/EditValues";
import { EditInput } from "../../UI/modal/EditInput";
import { EditLanguages } from "../../UI/modal/EditLanguages";
import { EditTypeOfJobs } from "../../UI/modal/EditTypeOfJobs";
import { EditExperience } from "../../UI/modal/EditExperience";
import { VisibleSection } from "../../UI/modal/VisibleSection";
import { getFakeData, transformCandidateData } from "./helpers/helper";
import { FileUploadModal } from "../../UI/modal/EditUploadDocuments";
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
  const allFields = [
    "Visible Information",
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
  const [sectionDocuments, setSectionDocuments] = useState([] as any);
  // Is edit
  const [isEditContactInfo, setIsEditContactInfo] = useState(false);
  const [isEditLanguages, setIsEditLanguages] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isAnonymousProfileEdit, setIsAnonymousProfileEdit] = useState(false);
  const [isSkillsEdit, setIsSkillsEdit] = useState(false);
  const [isValuesEdit, setIsValuesEdit] = useState(false);
  const [isTypeOfJobsEdit, setIsTypeOfJobsEdit] = useState(false);
  const [isExperienceEdit, setIsExperienceEdit] = useState(false);
  const [isDocumentsEdit, setIsDocumentsEdit] = useState(false);

  const [allSkills, setAllSkills] = useState([]);
  const [allValues, setAllValues] = useState([]);
  const [allTypeOfJobs, setAllTypeOfJobs] = useState([]);

  const fetchCandidate = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    console.log("user_id", auth.user.id);
    try {
      const candidateFetched = await getCandidateById(auth.user.id);
      setCandidate(candidateFetched);
      const transformedData = transformCandidateData(candidateFetched);
      setSectionDocuments(transformedData);
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
  };

  const editValues = () => {
    setIsValuesEdit(true);
  };

  const editTypeOfJobs = () => {
    setIsTypeOfJobsEdit(true);
  };

  const editExperience = () => {
    setIsExperienceEdit(true);
  };

  const editDocuments = () => {
    setIsDocumentsEdit(true);
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
      <CardContainer className={`${styling.profileComponent}`}>
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
            {candidate.city && candidate?.country ? (
              <p>
                {candidate?.city}, {candidate?.country}
              </p>
            ) : (
              <p onClick={editHandlerProfile}>Add your location</p>
            )}
            <p>|</p>
            {candidate.links && candidate.links.length > 0 ? (
              candidate.links.map((link, index) => (
                <div key={index}>
                  {link.name === "LinkedIn" ? (
                    <a href={link.url} target="_blank" rel="noreferrer">
                      <IconBrandLinkedin color="black" />
                    </a>
                  ) : link.name === "Website" ? (
                    <a href={link.url} target="_blank" rel="noreferrer">
                      <IconWorldWww color="black" />
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <>
                <p onClick={editHandlerProfile}>Add links</p>
              </>
            )}
          </div>
        </div>

        <div className={styling.editIcon}>
          <EditInput
            visible={isProfileEdit}
            setVisible={setIsProfileEdit}
            candidate={candidate}
            setValuesToEdit={setCandidate}
            fieldsToDisplay={getFakeData().fieldsToDisplayProfile}
            showModal={editHandlerProfile}
            onSave={handleSaveEdit}
            fieldKeysToEdit={[
              "first_name",
              "last_name",
              "job_status",
              "city",
              "country",
              "links",
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
          editValues={editValues}
          editProfile={editHandlerProfile}
          editTypeOfJobs={editTypeOfJobs}
          editExperience={editExperience}
          editDocuments={editDocuments}
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
              showModal={editHandlerAnonymousProfile}
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
              visible={isTypeOfJobsEdit}
              setVisible={setIsTypeOfJobsEdit}
              showModal={editTypeOfJobs}
            />
          </div>

          <div className={styling.associationContainerLabels}>
            {candidate?.preferred_jobs &&
              candidate?.preferred_jobs?.map((label, index) => (
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
          {candidate?.skills &&
            candidate?.skills?.map((label, index) => (
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
            titleName="Choose your values"
            onSave={handleSaveEdit}
            visible={isValuesEdit}
            setVisible={setIsValuesEdit}
            showModal={editValues}
          />
        </div>
        <div className={styling.valuesContainerLabels}>
          {candidate?.values &&
            candidate?.values?.map((label, index) => (
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
              showModal={editContactInfo}
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
            <EditExperience
              visible={isExperienceEdit}
              setVisible={setIsExperienceEdit}
              showModal={editExperience}
              candidate={candidate}
              setCandidate={setCandidate}
              onSave={handleSaveEdit}
            />
          </div>
          <ContentBlock sections={sectionsExperience} />
          <p>
            Candidate:{" "}
            {candidate?.experience &&
              candidate.experience.length > 0 &&
              candidate.experience[0].role}
            {candidate?.experience && candidate.experience[0].industries}
            {candidate?.experience &&
              candidate.experience[0].years_of_experience}
          </p>
        </CardContainer>
      </div>

      {/* Uploaded documents */}
      <CardContainer className={styling.valuesContainer}>
        <div className={styling.profileCompletedEditIcon}>
          <h3>Uploaded documents</h3>
          <FileUploadModal
            candidate={candidate}
            visible={isDocumentsEdit}
            setVisible={setIsDocumentsEdit}
            showModal={editDocuments}
            onSave={handleSaveEdit}
            setSectionDocuments={setSectionDocuments}
          />
        </div>
        <ContentBlock sections={sectionDocuments} />
      </CardContainer>
    </div>
  );
};

export default CandidateProfile;
