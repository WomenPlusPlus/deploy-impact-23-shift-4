import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
import { IconEdit } from "@tabler/icons-react";
import styling from "./ProfileComplete.module.css";
import { countNullFieldsByCategory, percentage } from "./helpers/helper";
import { Candidate } from "../types/types";
import { useEffect, useState } from "react";

interface ProfileCompletedProps {
  candidate: Candidate;
  allCategories: string[];
  className?: string;
  editContactInfo?: () => void;
  editLanguages?: () => void;
  editSkills?: () => void;
}

const ProfileComplete: React.FC<ProfileCompletedProps> = ({
  candidate,
  allCategories,
  className,
  editContactInfo,
  editLanguages,
  editSkills,
}) => {
  // state
  const [fieldsByCategory, setFieldsByCategory] = useState(
    {} as { [key: string]: number }
  );

  useEffect(() => {
    setFieldsByCategory(countNullFieldsByCategory(candidate, allCategories));
  }, [candidate, allCategories]);

  console.log("FIELDS", fieldsByCategory);
  const progress = percentage({
    completedCategories: Object.values(fieldsByCategory).filter(
      (fraction) => fraction > 0
    ).length,
    totalCategories: allCategories.length,
  });

  const handleAddClick = (category: string) => {
    console.log("ADD CLICK", category);
    switch (category) {
      case "Contact info":
        if (editContactInfo) {
          editContactInfo();
        }
        break;
      case "Languages":
        if (editLanguages) {
          editLanguages();
        }
        break;
      case "Skills":
        if (editSkills) {
          editSkills();
        }
        break;
      default:
        break;
    }
    // setOpenCategory(category);
  };

  return (
    <CardContainer className={`${className}`}>
      <div className={styling.profileCompletedEditIcon}>
        <h3>Your profile is complete.</h3>
        {/* <IconEdit color="black" style={{ cursor: "pointer" }} /> */}
      </div>
      <ProgressBar progress={progress} />
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
                <ProfileCompletedFields
                  key={category}
                  isCompleted={false}
                  category={category}
                  onAddClick={() => handleAddClick(category)}
                />
              )}
            </div>
          ))
        }
      </div>
    </CardContainer>
  );
};

export { ProfileComplete };
