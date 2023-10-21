import { IconEdit } from "@tabler/icons-react";
import { Candidate } from "../../../../types/types";
import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";

interface EditExperienceProps {
  candidate: Candidate;
  setCandidate: (updatedCandidate: Candidate) => void;
  icon?: React.ReactNode;
  titleName?: string;
  onSave?: (arg: Candidate) => void;
  visible: boolean;
  setVisible: (arg: boolean) => void;
  showModal?: () => void;
}

interface Experience {
  role: string;
  industries: string;
  years_of_experience?: number;
}

const EditExperience: React.FC<EditExperienceProps> = ({
  candidate,
  icon,
  titleName,
  setCandidate,
  onSave,
  visible,
  setVisible,
  showModal,
}) => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [currentRole, setCurrentRole] = useState("");
  const [currentIndustries, setCurrentIndustries] = useState("");
  const [currentYearsOfExperience, setCurrentYearsOfExperience] = useState("");
  const [experienceToDelete, setExperienceToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (candidate && candidate.experience) {
      setExperience(candidate.experience as Experience[]);
    }
  }, [candidate.experience, candidate]);

  const handleSave = () => {
    const updatedCandidate = { ...candidate, experience: experience };
    setCandidate(updatedCandidate);
    if (onSave) {
      onSave(updatedCandidate);
    }
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const addExperience = () => {
    if (currentRole && currentIndustries) {
      const newExperience: Experience = {
        role: currentRole,
        industries: currentIndustries,
      };
      if (currentYearsOfExperience) {
        newExperience.years_of_experience = parseInt(
          currentYearsOfExperience,
          10
        );
      }
      setExperience((prevExperience) => [...prevExperience, newExperience]);
      setCurrentRole("");
      setCurrentIndustries("");
      setCurrentYearsOfExperience("");
    }
  };

  const updateExperience = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      role: currentRole,
      industries: currentIndustries,
      years_of_experience: parseInt(currentYearsOfExperience, 10) || undefined,
    };
    setExperience(updatedExperience);
    handleSave();
  };

  // Function to delete experience by index
  const deleteExperience = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  return (
    <>
      <IconEdit
        color="black"
        style={{ cursor: "pointer" }}
        onClick={showModal}
      />
      <Modal
        open={visible}
        title="Edit Experience"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {/* Show current experience */}
        {experience &&
          experience?.map((exp, index) => (
            <div key={index}>
              <Input
                placeholder="Role"
                value={exp.role}
                onChange={(e) => {
                  const updatedExperience = [...experience];
                  updatedExperience[index].role = e.target.value;
                  setExperience(updatedExperience);
                }}
              />
              <Input
                placeholder="Industries"
                value={exp.industries}
                onChange={(e) => {
                  const updatedExperience = [...experience];
                  updatedExperience[index].industries = e.target.value;
                  setExperience(updatedExperience);
                }}
              />
              <Input
                placeholder="Years of Experience"
                value={exp.years_of_experience?.toString() || ""}
                onChange={(e) => {
                  const updatedExperience = [...experience];
                  updatedExperience[index].years_of_experience =
                    parseInt(e.target.value, 10) || undefined;
                  setExperience(updatedExperience);
                }}
              />
              <div key={index}>
                {/* ... (other input fields) */}
                <Button onClick={() => deleteExperience(index)}>
                  Delete Experience
                </Button>
                <Button onClick={() => updateExperience(index)}>
                  Update Experience
                </Button>
              </div>
            </div>
          ))}
        <hr />
        {/* Add new experience */}
        <Input
          placeholder="Role"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
        />
        <Input
          placeholder="Industries"
          value={currentIndustries}
          onChange={(e) => setCurrentIndustries(e.target.value)}
        />
        <Input
          placeholder="Years of Experience"
          value={currentYearsOfExperience}
          onChange={(e) => setCurrentYearsOfExperience(e.target.value)}
        />
        <Button onClick={addExperience}>Add Experience</Button>
      </Modal>
    </>
  );
};

export { EditExperience };
