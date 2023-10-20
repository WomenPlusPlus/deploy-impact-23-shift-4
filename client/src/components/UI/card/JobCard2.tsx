import React from "react";
import { Card, Avatar, Button } from "antd";
import { IconExternalLink } from "@tabler/icons-react";
//import styling from "./JobCard.module.css";
import { Labels } from "../labels/Label";
import { IconBookmark, IconMapPin, IconShoppingBag } from "@tabler/icons-react";
import { PieChartFilled } from "@ant-design/icons";

import styling from "./JobCard2.module.css";

interface JobCard2Props {
  name?: string;
  company_name?: string;
  company_location?: string;
  description?: string;
  avatarUrl?: string;
  employees?: string;
  level?: string;
  match?: string;
  location?: string;
  department?: string;
  skills?: { technicalSkills: string[]; softSkills: string[] };
  contract_type?: string;
}

const JobCard: React.FC<JobCard2Props> = ({
  name,
  company_name,
  company_location,
  description,
  avatarUrl,
  employees,
  level,
  match,
  location,
  department,
  skills,
  contract_type,
}) => {
  const truncatedDescription: string | undefined = description
    ? typeof description === "string" && description.length > 150
      ? `${description.slice(0, 150)}...`
      : description
    : undefined;

  return (
    <>
      <Card className={styling.card}>
        <div className={styling.jobHeader}>
          <div>
            <Avatar className={styling.avatar} src={avatarUrl} />
          </div>
          <div className={styling.jobTitle}>
            <h2 className={styling.jobName}>{name}</h2>
            <p className={styling.companyName}>@{company_name}</p>
          </div>
          <div>
            <IconBookmark />{" "}
          </div>
        </div>

        <div className={styling.jobDescription}>
          <div className={styling.iconAndText}>
            <PieChartFilled style={{ color: "#10239E" }} />
            <span>{match} % Match</span>
          </div>
          <div className={styling.iconAndText}>
            <IconMapPin />
            <span>{location}</span>
          </div>
          <div className={styling.iconAndText}>
            <IconShoppingBag />
            <span>{contract_type}</span>
          </div>
        </div>
        <hr className={styling.horizontalLine} />
        <div className={styling.skillTag}>
          {skills && (
            <>
              {skills.technicalSkills.map((technicalSkill, index) => (
                <Labels
                  key={`technical_${index}`}
                  labelName={technicalSkill}
                  customClass={styling.label}
                  disableCloseIcon
                />
              ))}
              {skills.softSkills.map((softSkill, index) => (
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

export default JobCard;
