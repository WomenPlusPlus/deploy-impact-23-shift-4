import styling from "./PublicJob.module.css";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";
import { Button } from "../../UI/button/Button";
import {
  IconBookmark,
  IconMapPin,
  IconBriefcase2,
  IconChartPie,
  IconWorldWww,
  IconUsers,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobById } from "../../../api/jobs";
import { getCompanyById } from "../../../api/companies";
import { Job, Company, Candidate } from "../../../types/types";
import { TimeAgo } from "../candidateProfile/helpers/helper";
import { SkillsLevelGuide } from "../../shared/skillsLevelGuide/SkillsLevelGuide";
import { Labels } from "../../UI/labels/Label";
import { getCandidateById, updateCandidateById } from "../../../api/candidates";
import ApplyModal from "./applyModal/ApplyModal";

const PublicJob = () => {
  // Job id from url
  const { id } = useParams<{ id: string }>();
  const userId = JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id;
  const usetType = JSON.parse(localStorage.getItem("auth") || "{}")?.user
    ?.user_type;
  const iconSize = 20;
  const companyIconSize = 15;
  const matchScore = 80;
  // state
  const [candidate, setCandidate] = useState<Candidate>();
  const [jobData, setJobData] = useState<Job>({} as Job);
  const [companyData, setCompanyData] = useState<Company>();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);

  const toggleApplyModal = () => {
    setApplyModalOpen(!isApplyModalOpen);
    console.log("toggle");
  };

  /**
   * Get job and company data
   * @param id - job id
   */
  const getInfo = async (id: string) => {
    const getJob = await getJobById(id);

    if (usetType === "candidate") {
      const candidate = await getCandidateById(userId);
      const fetchIsSaved = candidate?.saved_items?.includes(getJob?.id);
      setIsSaved(fetchIsSaved);
    }

    if (getJob) {
      const getCompany = await getCompanyById(getJob?.company_id ?? "");
      setCompanyData(getCompany);
      setJobData(getJob);
    }
    setCandidate(candidate);
  };

  useEffect(() => {
    getInfo(id ?? "");
  }, [id]);

  const saveJob = async () => {
    // add to local storage
    setIsSaved(!isSaved);
    // if not yet saved
    if (!isSaved) {
      // Check if the job is already saved
      const isJobSaved = candidate?.saved_items?.includes(jobData?.id);
      if (isJobSaved) {
        return;
      } else {
        localStorage.setItem(
          "saved_items",
          JSON.stringify([...(candidate?.saved_items || []), jobData?.id])
        );
        await updateCandidateById(candidate?.user_id || "", {
          saved_items: [...(candidate?.saved_items || []), jobData?.id],
        });
      }
    } else {
      // if already saved
      const savedItems = JSON.parse(
        localStorage.getItem("saved_items") || "[]"
      );
      // Check if the job is already saved in local storage
      const isJobSaved = savedItems.includes(jobData?.id);
      if (!isJobSaved) {
        return;
      }
      const filtered = savedItems.filter(
        (savedItem: string) => savedItem !== jobData?.id
      );
      localStorage.setItem("saved_items", JSON.stringify(filtered));
      await updateCandidateById(candidate?.user_id || "", {
        saved_items: filtered,
      });
    }
  };

  return (
    <div className={styling.main}>
      {/* First line */}
      <div className={styling.rowEnd}>
        <div className={styling.row}>
          <Avatar firstName={companyData?.company_name} size={50} />
          {companyData?.company_name ? (
            <h3>{companyData?.company_name}</h3>
          ) : (
            <h3>Company</h3>
          )}
          <p>|</p>
          <p>
            Posted{" "}
            {jobData?.date_created && (
              <TimeAgo timestamp={jobData?.date_created} />
            )}
          </p>
        </div>
        <div className={styling.row}>
          {isSaved ? (
            <IconBookmark className={styling.savedBookmark} onClick={saveJob} />
          ) : (
            <IconBookmark className={styling.bookmark} onClick={saveJob} />
          )}
          <Button className={styling.companyButton}>Apply</Button>
        </div>
      </div>

      {/* Second line */}
      <div>
        <h1 className={styling.jobTitle}>{jobData?.title}</h1>
        <div className={styling.row}>
          <div className={styling.row}>
            <IconChartPie size={iconSize} />
            <p>{matchScore}% Match</p>
          </div>

          <div className={styling.row}>
            <IconMapPin size={iconSize} />{" "}
            <p>
              {jobData?.location_city}, {jobData?.location_country} (
              {jobData?.work_location})
            </p>
          </div>
          <div className={styling.row}>
            <IconBriefcase2 size={iconSize} /> <p>{jobData?.employment_type}</p>
          </div>
        </div>
      </div>

      {/* Containers */}
      <CardContainer className={styling.cardCont}>
        <h1 className={styling.titles}>Skills</h1>
        <SkillsLevelGuide />
        <div className={styling.labelDiv}>
          {jobData?.skills?.map((skill, index) => (
            <Labels
              key={`technical_${index}`}
              labelName={skill?.skill_name}
              isSkill={true}
              skillLevel={skill?.skill_level}
              disableCloseIcon={true}
              customClass={styling.label}
            />
          ))}
        </div>
      </CardContainer>

      {/* Job Description */}
      <CardContainer className={styling.cardCont}>
        <h1 className={styling.titles}>Job Description</h1>
        <h2 className={styling.h2Title}>What will you do?</h2>
        <p>{jobData?.description}</p>
      </CardContainer>

      {/* Accepting applications */}
      <CardContainer className={`${styling.cardCont} ${styling.applyDiv}`}>
        <h1 className={styling.titles}>Accepting applications</h1>
        <Button className={styling.applyButton} onClick={toggleApplyModal}>
          Show your interest in the position
        </Button>
      </CardContainer>

      <ApplyModal
        isApplyModalOpen={isApplyModalOpen}
        company={companyData}
        jobId={jobData?.id}
        candidate={candidate}
        callback={toggleApplyModal}
      />

      <CardContainer className={styling.cardCont}>
        <h1 className={styling.titles}>Company details</h1>
        <div className={`${styling.rowEnd} ${styling.allWidth}`}>
          <div className={styling.row}>
            <Avatar firstName={companyData?.company_name} size={50} />
            <div>
              {companyData?.company_name ? (
                <h3 className={styling.companyName}>
                  {companyData?.company_name}
                </h3>
              ) : (
                <h3 className={styling.companyName}>Company</h3>
              )}

              <div className={styling.row}>
                <IconMapPin size={companyIconSize} />
                {companyData?.address ? (
                  <p>{companyData?.address}</p>
                ) : (
                  <p>Basel, CH</p>
                )}
                <p>|</p>
                <div className={styling.row}>
                  <IconUsers size={companyIconSize} />
                  {companyData?.company_size ? (
                    <p>companyData?.company_size</p>
                  ) : (
                    <p>100-200</p>
                  )}
                </div>
                <p>|</p>
                <a
                  href={companyData?.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconWorldWww size={companyIconSize} color="black" />
                </a>
              </div>
            </div>
          </div>
          <div className={styling.row}>
            <Button className={styling.companyButton}>View company</Button>
          </div>
        </div>
        <div>
          <h2 className={styling.h2Title}>About us</h2>
          <p>{companyData?.company_description}</p>
        </div>
      </CardContainer>
    </div>
  );
};

export default PublicJob;
