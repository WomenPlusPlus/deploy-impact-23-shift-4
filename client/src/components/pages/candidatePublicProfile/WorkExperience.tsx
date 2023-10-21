import { Candidate } from "../types/types";
import { IconBriefcase2 } from "@tabler/icons-react";
import styling from "./WorkExperience.module.css";

interface WorkExperienceProps {
  candidate: Candidate;
  customClass?: string;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  candidate,
  customClass,
}) => {
  return (
    <div>
      {candidate?.experience?.map((work, index) => (
        <div key={work.id} className={`${customClass}`}>
          <div className={`${styling.row}`}>
            <IconBriefcase2 size={40} color="black" />
            <div className={`${styling.column} ${styling.mainDiv}`}>
              <h3 className={styling.h3}>{work.role}</h3>
              <div className={styling.row}>
                {work.company_name && (
                  <>
                    <p>{work.company_name}</p> <p> | </p>
                  </>
                )}
                {work.industries && (
                  <>
                    <p>{work.industries}</p>
                    <p> | </p>
                  </>
                )}
                {work.start_date && (
                  <>
                    <p>{work.start_date}</p>
                    <p> | </p>
                  </>
                )}
                {work.end_date && (
                  <>
                    <p>{work.end_date}</p>
                    <p> | </p>
                  </>
                )}
                {work.years_of_experience && (
                  <>
                    <p>{work.years_of_experience} years</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Add horizontal line only if it's not last element */}
          {candidate?.experience && index !== candidate?.experience?.length - 1 && (
            <hr key={index+1} className={styling.hr}/>
          )}
        </div>
      ))}
    </div>
  );
};

export { WorkExperience };
