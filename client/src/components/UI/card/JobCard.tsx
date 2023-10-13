import { Card, Avatar, Button } from "antd";
import { IconExternalLink } from "@tabler/icons-react";
import styles from "./JobCard.module.css";

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
    <Card className={styles.card}>
      <div className={styles["card-content"]}>
        <div className={styles["job-header"]}>
          <Avatar className={styles.avatar} src={avatarUrl} />
          <div className={styles["company-info"]}>
            <h4 className={styles["company-name"]}>{company_name}</h4>
            <h5 className={styles["company-location"]}>{company_location}</h5>
            <h6 className={styles.employee}>{employees} employees</h6>
          </div>
          <div className={styles["top-right-icon"]}>
            {<IconExternalLink color="black" />}
          </div>
        </div>
        <div className={styles["job-info"]}>
          <div>
            <h2 className={styles["job-title"]}>{name}</h2>
            <h3 className={styles["job-level"]}>
              {level}|{location}|{department}{" "}
            </h3>
          </div>
          <div className={styles["matches-tag"]}>{match} matches</div>
        </div>
        <div className={styles["job-description"]}>{truncatedDescription}</div>
        <div className={styles["go-talents"]}>
          <Button className={styles["go-to-talents"]}>Go to talents</Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
