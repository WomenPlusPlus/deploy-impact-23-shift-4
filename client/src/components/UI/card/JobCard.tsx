import { Card, Avatar, Button } from "antd";
import { IconExternalLink } from "@tabler/icons-react";
import styling from "./JobCard.module.css";

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
}) => {
  const truncatedDescription: string | undefined = description
    ? typeof description === "string" && description.length > 370
      ? `${description.slice(0, 370)}...`
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
            <h2 className={styling.jobTitle}>{name}</h2>
            <h3 className={styling.jobLevel}>
              {level} | {location} | {department}
            </h3>
          </div>
          <div className={styling.matchesTag}>{match} matches</div>
        </div>
        <div className={styling.jobDescription}>{truncatedDescription}</div>
        <div className={styling.goTalents}>
          <Button className={styling.goToTalents}>Go to talents</Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
