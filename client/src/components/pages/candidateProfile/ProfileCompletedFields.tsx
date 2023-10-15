import { IconCircleCheck, IconProgressAlert } from "@tabler/icons-react";
import styling from "./ProfileCompletedFields.module.css";

interface ProfileCompletedFieldsProps {
  isCompleted: boolean;
  category: string;
}

const ProfileCompletedFields = ({
  isCompleted,
  category,
}: ProfileCompletedFieldsProps) => {

  return (
    <>
      <div className={styling.profileCompletedIcon}>
        {isCompleted ? (
          <IconCircleCheck color="green" />
        ) : (
          <IconProgressAlert color="#FAAD14" />
        )}
        <p className={styling.profileCompletedText}>{category}</p>
      </div>
      <div hidden={isCompleted}>
        <button className={styling.profileUncompletedButton}>Add</button>
      </div>
    </>
  );
};

export default ProfileCompletedFields;
