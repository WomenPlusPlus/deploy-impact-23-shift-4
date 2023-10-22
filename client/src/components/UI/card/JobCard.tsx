import React from "react";
import { Card, Avatar } from "antd";
import { Labels } from "../labels/Label";
import { IconBookmark, IconMapPin, IconShoppingBag } from "@tabler/icons-react";
import { PieChartFilled } from "@ant-design/icons";

import styling from "./JobCard.module.css";
import { Candidate, Company, Job } from "../../../types/types";

interface JobCardProps {
  job: Job;
  companies: Company[];
  candidate?: Candidate;
  isMatchVisible?: boolean;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  companies,
  isMatchVisible = true,
  candidate,
  onClick,
}) => {
  const truncatedDescription: string | undefined = job?.description
    ? typeof job?.description === "string" && job?.description?.length > 150
      ? `${job?.description.slice(0, 150)}...`
      : job?.description
    : undefined;

  // Return the company name for a given job
  const getCompanyName = (job: Job) => {
    const company = companies?.find(
      (company) => company?.user_id === job?.company_id
    );
    return company?.company_name;
  };

  const logo = companies?.find(
    (company) => company?.user_id === job?.company_id
  )?.logo;
  const company_name = getCompanyName(job);

  // Get the matching score for a given job
  const matchingJobs = candidate?.matching_jobs;
  let matchScore = 0;
  if (matchingJobs) {
    const matchScores = matchingJobs.map((matchingJob: any) => {
      if (matchingJob?.id === job?.id) {
        return matchingJob?.score;
      } else {
        return 0;
      }
    });

    matchScore = matchScores.reduce((acc: any, score: any) => acc + score, 0);
  }

  return (
    <>
      <Card className={styling.card} onClick={onClick}>
        <div className={styling.jobHeader}>
          <div>
            <Avatar className={styling.avatar} src={logo} />
          </div>
          <div className={styling.jobTitle}>
            <h2 className={styling.jobName}>{job?.title}</h2>
            <p className={styling.companyName}>@{company_name}</p>
          </div>
          <div>
            <IconBookmark />{" "}
          </div>
        </div>

        <div className={styling.jobDescription}>
          <div className={styling.iconAndText}>
            {isMatchVisible && matchScore > 0 && (
              <>
                <PieChartFilled style={{ color: "#10239E" }} />
                <span>{matchScore}% Match</span>
              </>
            )}
          </div>
          <div className={styling.iconAndText}>
            <IconMapPin />
            <span>{job?.location_city}</span>
          </div>
          <div className={styling.iconAndText}>
            <IconShoppingBag />
            <span>{job?.employment_type}</span>
          </div>
        </div>
        <hr className={styling.horizontalLine} />
        <div className={styling.skillTag}>
          {job?.skills && (
            <>
              {job?.skills?.map((skill, index) => (
                <Labels
                  key={`technical_${index}`}
                  labelName={skill?.skill_name}
                  customClass={styling.label}
                  disableCloseIcon
                />
              ))}
              {job?.soft_skills?.map((softSkill, index) => (
                <Labels
                  key={`soft_${index}`}
                  labelName={softSkill}
                  customClass={styling.label}
                  disableCloseIcon
                />
              ))}
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export { JobCard };
