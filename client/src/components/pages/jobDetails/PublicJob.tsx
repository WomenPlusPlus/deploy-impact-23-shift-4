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
import { Job, Company } from "../../../types/types";
import { TimeAgo } from "../candidateProfile/helpers/helper";
import { SkillsLevelGuide } from "../../shared/skillsLevelGuide/SkillsLevelGuide";
import { Labels } from "../../UI/labels/Label";

const PublicJob = () => {
  // Job id from url
  const { id } = useParams<{ id: string }>();
  const iconSize = 20;
  const companyIconSize = 15;
  const matchScore = 80;
  // state
  const [jobData, setJobData] = useState<Job>();
  const [companyData, setCompanyData] = useState<Company>();

  const getInfo = async (id: string) => {
    const getJob = await getJobById(id);

    if (getJob) {
      const getCompany = await getCompanyById(getJob?.company_id ?? "");
      setCompanyData(getCompany);
      setJobData(getJob);
    }
  };

  useEffect(() => {
    getInfo(id ?? "");
  }, [id]);

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
          <IconBookmark />
          <Button>Apply</Button>
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
        <Button className={styling.applyButton}>Apply</Button>
      </CardContainer>

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
            <Button>Company Profile</Button>
          </div>
          <div>
            <h2 className={styling.h2Title}>About us</h2>
            <p>{companyData?.company_description}</p> 
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default PublicJob;
