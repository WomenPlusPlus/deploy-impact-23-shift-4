import React, { useEffect } from "react";
import { Card, Avatar } from "antd";
import { Labels } from "../labels/Label";
import { IconBookmark, IconMapPin, IconShoppingBag } from "@tabler/icons-react";
import { PieChartFilled } from "@ant-design/icons";

import styling from "./JobCard.module.css";
import { Candidate, Company, Job } from "../../../types/types";
import { updateCandidateById } from "../../../api/candidates";

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
  // state
  const [isSaved, setIsSaved] = React.useState(false);
  const userType = JSON.parse(localStorage.getItem("auth") || "{}")?.user
    ?.user_type;

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

  const saveJob = async () => {
    // add to local storage
    setIsSaved(!isSaved);
    // if not yet saved
    if (!isSaved) {
      // Check if the job is already saved
      const isJobSaved = candidate?.saved_items?.includes(job?.id);
      if (isJobSaved) {
        return;
      } else {
        localStorage.setItem(
          "saved_items",
          JSON.stringify([...(candidate?.saved_items || []), job?.id])
        );
        await updateCandidateById(candidate?.user_id || "", {
          saved_items: [...(candidate?.saved_items || []), job?.id],
        });
      }
    } else {
      // if already saved
      const savedItems = JSON.parse(
        localStorage.getItem("saved_items") || "[]"
      );
      // Check if the job is already saved in local storage
      const isJobSaved = savedItems.includes(job?.id);
      if (!isJobSaved) {
        return;
      }
      const filtered = savedItems.filter(
        (savedItem: string) => savedItem !== job?.id
      );
      localStorage.setItem("saved_items", JSON.stringify(filtered));
      await updateCandidateById(candidate?.user_id || "", {
        saved_items: filtered,
      });
    }
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("saved_items") || "[]");
    if (savedItems.includes(job?.id)) {
      setIsSaved(true);
    }
  }, []);

  return (
    <>
      <Card className={styling.card}>
        <div className={styling.jobHeader}>
          <div className={styling.row}>
            <Avatar
              className={styling.avatar}
              src={logo}
              size={70}
              onClick={onClick}
            />
            <div className={styling.title}>
              <h2 className={styling.jobTitle} onClick={onClick}>
                {job?.title}
              </h2>
              <p className={styling.companyName} onClick={onClick}>
                @{getCompanyName(job)}
              </p>
            </div>
          </div>
          {userType === "candidate" && (
            <div>
              {isSaved ? (
                <IconBookmark
                  className={`${styling.bookmark} ${styling.savedBookmark}`}
                  onClick={saveJob}
                />
              ) : (
                <IconBookmark className={styling.bookmark} onClick={saveJob} />
              )}
            </div>
          )}
        </div>

        <div className={styling.jobDescription}>
          {isMatchVisible && matchScore > 0 && (
            <div className={styling.iconAndText}>
              <PieChartFilled style={{ color: "#10239E" }} />
              <span>{matchScore}% Match</span>
            </div>
          )}

          <div className={styling.iconAndText}>
            <IconMapPin />
            <span>
              {job?.location_city} ({job?.work_location})
            </span>
          </div>
          <div className={styling.iconAndText}>
            <IconShoppingBag />
            <span>{job?.employment_type}</span>
          </div>
        </div>

        <hr className={styling.horizontalLine} />

        {/* Skills */}
        <div className={styling.skillTag}>
          {job?.skills && (
            <>
              {job?.skills?.map((skill, index) => (
                <Labels
                  key={index}
                  labelName={skill?.skill_name}
                  customClass={styling.label}
                  disableCloseIcon
                />
              ))}
              {job?.soft_skills?.map((softSkill, index) => (
                <Labels
                  key={index + 1}
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
