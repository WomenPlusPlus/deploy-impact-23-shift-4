import { Card, Avatar, Button } from "antd";
import { IconExternalLink } from "@tabler/icons-react";
import styling from "./JobCard.module.css";
import { Labels } from "../labels/Label";

interface JobCardProps {
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
  skills?: string[];
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
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
  onClick,
}) => {
  const truncatedDescription: string | undefined = description
    ? typeof description === "string" && description.length > 150
      ? `${description.slice(0, 150)}...`
      : description
    : undefined;

  return (
    <Card className={styling.card}>
      <div className={styling.cardContent}>
        <div className={styling.jobHeader}>
          <Avatar className={styling.avatar} src={avatarUrl} />
          <div className={styling.companyInfo}>
            <h4 className={styling.companyName}>{company_name}</h4>
            <h5 className={styling.companyLocation}>{company_location}</h5>
            <h6 className={styling.employee}>{employees} employees</h6>
          </div>
          <div className={styling.topRightIcon}>
            {<IconExternalLink color="black" />}
          </div>
        </div>
        <div className={styling.jobInfo}>
          <div>
            <p className={styling.jobTitle}>{name}</p>
            <p className={styling.jobLevel}>
              {level} | {location} | {department}
            </p>
          </div>
          <div className={styling.matchesTag}>{match} matches</div>
        </div>
        <p className={styling.jobDescription}>{truncatedDescription}</p>

        <div className={styling.labelContainer}>
          {skills?.map((skill) => (
            <Labels
              labelName={skill}
              customClass={styling.label}
              disableCloseIcon
            />
          ))}
        </div>
        <div className={styling.goTalents}>
          <Button className={styling.goToTalents} onClick={onClick}>
            Go to talents
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
