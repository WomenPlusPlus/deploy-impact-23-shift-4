import styling from "./PublicJob.module.css";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";
import { Button } from "../../UI/button/Button";
import {
  IconBookmark,
  IconMapPin,
  IconBriefcase2,
  IconChartPie,
} from "@tabler/icons-react";

const PublicJob = () => {
  const iconSize = 20;
  const job = {
    postedAgo: "1 day",
    company_name: "Dream Company",
    matchScore: 80,
    location_city: "Basel",
    location_country: "CH",
    job_type: "Full-time",
    work_location: "Remote",
    employment_type: "Full-time",
    title: "Front-end Developer",
  };
  return (
    <div className={styling.main}>
      {/* First line */}
      <div className={styling.rowEnd}>
        <div className={styling.row}>
          <Avatar firstName={job.company_name} size={50} />
          <h3>{job.company_name}</h3>
          <p>|</p>
          <p>Posted {job.postedAgo} ago</p>
        </div>
        <div className={styling.row}>
          <IconBookmark />
          <Button>Apply</Button>
        </div>
      </div>

      {/* Second line */}
      <div>
        <h1 className={styling.jobTitle}>{job.title}</h1>
        <div className={styling.row}>
          <div className={styling.row}>
            <IconChartPie size={iconSize} />
            <p>{job.matchScore}% Match</p>
          </div>

          <div className={styling.row}>
            <IconMapPin size={iconSize} />{" "}
            <p>
              {job.location_city}, {job.location_country} ({job.work_location})
            </p>
          </div>
          <div className={styling.row}>
            <IconBriefcase2 size={iconSize} /> <p>{job.employment_type}</p>
          </div>
        </div>
      </div>

      {/* Third line */}
      <div className={styling.row}>
        <CardContainer className={styling.cardCont}>
          <h1>Role and Job type</h1>
        </CardContainer>
        <CardContainer className={styling.cardCont}>
          <h1>Rate</h1>
        </CardContainer>
      </div>
      <CardContainer className={styling.cardCont}>
        <h1>Skills</h1>
      </CardContainer>
      <CardContainer className={styling.cardCont}>
        <h1>Job Description</h1>
      </CardContainer>
      <CardContainer className={styling.cardCont}>
        <h1>Accepting applications</h1>
      </CardContainer>
      <CardContainer className={styling.cardCont}>
        <h1>Company details</h1>
      </CardContainer>
    </div>
  );
};

export default PublicJob;
