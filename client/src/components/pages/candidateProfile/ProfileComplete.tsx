import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
import { IconEdit } from "@tabler/icons-react";
import styling from "./ProfileComplete.module.css";
import { countFieldsByCategory } from "./helpers/helper";
import { Candidate } from "../types/types";

interface ProfileCompletedProps {
  candidate: Candidate;
  allCategories: string[];
  className?: string;
}

const ProfileComplete: React.FC<ProfileCompletedProps> = ({
  candidate,
  allCategories,
  className,
}) => {
  const fieldsByCategory = countFieldsByCategory(candidate, allCategories);
  console.log("FIELDS", fieldsByCategory);
  return (
    <CardContainer
      className={`${styling.profileCompletedElement} ${className}`}
    >
      <div className={styling.profileCompletedEditIcon}>
        <h3>Your profile is complete.</h3>
        <IconEdit color="black" style={{ cursor: "pointer" }} />
      </div>
      <ProgressBar progress={100} />
      <div className={styling.profileCompletedFields}>
        {
          /* Display fields by category */
          allCategories.map((category) => (
            <div key={category} className={styling.profileCompletedCategory}>
              {/* <h4>{category}</h4> */}
              {fieldsByCategory[category] > 0 ? (
                <ProfileCompletedFields
                  key={category}
                  isCompleted={false}
                  category={category}
                />
              ) : (
                <div className={styling.profileCompletedNoFields}>
                  <ProfileCompletedFields
                    key={category}
                    isCompleted={true}
                    category={category}
                  />
                </div>
              )}
            </div>
          ))
        }
      </div>
    </CardContainer>
  );
};

export { ProfileComplete };
