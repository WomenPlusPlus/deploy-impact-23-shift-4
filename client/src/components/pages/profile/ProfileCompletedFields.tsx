import { IconCircleCheck, IconProgressAlert } from "@tabler/icons-react";
import "./ProfileCompletedFields.css";

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
      <div className="profile-completed-icon">
        {isCompleted ? (
          <IconCircleCheck color="green" />
        ) : (
          <IconProgressAlert color="#FAAD14" />
        )}
        <p className="profile-completed-text">{field}</p>
      </div>
      <div hidden={isCompleted}>
        <button className="profile-uncompleted-button">Add</button>
      </div>
    </>
  );
};

export default ProfileCompletedFields;
