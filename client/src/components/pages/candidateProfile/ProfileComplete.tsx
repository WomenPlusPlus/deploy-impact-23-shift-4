import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
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
  editValues?: () => void;
  editProfile?: () => void;
  editExperience?: () => void;
  editTypeOfJobs?: () => void;
  editDocuments?: () => void;
  editVisibleInformation?: () => void;
}

const ProfileComplete: React.FC<ProfileCompletedProps> = ({
  candidate,
  allCategories,
  className,
  editContactInfo,
  editLanguages,
  editSkills,
  editValues,
  editProfile,
  editExperience,
  editTypeOfJobs,
  editDocuments,
  editVisibleInformation,
}) => {
  // state
  const [fieldsByCategory, setFieldsByCategory] = useState(
    {} as { [key: string]: number }
  );

  useEffect(() => {
    setFieldsByCategory(countNullFieldsByCategory(candidate, allCategories));
  }, [candidate]);

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
      case "Values":
        if (editValues) {
          editValues();
        }
        break;
      case "Profile":
        if (editProfile) {
          editProfile();
        }
        break;
      case "Experience":
        if (editExperience) {
          editExperience();
        }
        break;
      case "Type of jobs":
        if (editTypeOfJobs) {
          editTypeOfJobs();
        }
        break;
      case "Documents":
        if (editDocuments) {
          editDocuments();
        }
        break;
      case "Visible Information":
        if (editVisibleInformation) {
          editVisibleInformation();
        }
        break;
      default:
        break;
    }
  };
  console.log("FIELD", fieldsByCategory);

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
          allCategories &&
            allCategories?.map((category) => (
              <div key={category} className={styling.profileCompletedCategory}>
                {/* <h4>{category}</h4> */}
                {fieldsByCategory && fieldsByCategory[category] > 0 ? (
                  <ProfileCompletedFields
                    key={category}
                    isCompleted={true}
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
