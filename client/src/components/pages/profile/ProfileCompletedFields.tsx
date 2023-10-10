import { IconCircleCheck, IconProgressAlert } from "@tabler/icons-react";
import styling from "./ProfileCompletedFields.module.css";

interface ProfileCompletedFieldsProps {
  isCompleted: boolean;
  field: string;
}

const ProfileCompletedFields = ({
  isCompleted,
  field,
}: ProfileCompletedFieldsProps) => {
  return (
    <>
      <div className={styling.profileCompletedIcon}>
        {isCompleted ? (
          <IconCircleCheck color="green" />
        ) : (
          <IconProgressAlert color="#FAAD14" />
        )}
        <p className={styling.profileCompletedText}>{field}</p>
      </div>
      <div hidden={isCompleted}>
        <button className={styling.profileUncompletedButton}>Add</button>
      </div>
    </>
  );
};

export default ProfileCompletedFields;
