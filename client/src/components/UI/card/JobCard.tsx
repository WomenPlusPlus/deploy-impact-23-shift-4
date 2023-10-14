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
      <div className={styling["card-content"]}>
        <div className={styling["job-header"]}>
          <Avatar className={styling.avatar} src={avatarUrl} />
          <div className={styling["company-info"]}>
            <h4 className={styling["company-name"]}>{company_name}</h4>
            <h5 className={styling["company-location"]}>{company_location}</h5>
            <h6 className={styling.employee}>{employees} employees</h6>
          </div>
          <div className={styling["top-right-icon"]}>
            {<IconExternalLink color="black" />}
          </div>
        </div>
        <div className={styling["job-info"]}>
          <div>
            <h2 className={styling["job-title"]}>{name}</h2>
            <h3 className={styling["job-level"]}>
            {level} | {location} | {department}{" "}
            </h3>
          </div>
          <div className={styling["matches-tag"]}>{match} matches</div>
        </div>
        <div className={styling["job-description"]}>{truncatedDescription}</div>
        <div className={styling["go-talents"]}>
          <Button className={styling["go-to-talents"]}>Go to talents</Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
