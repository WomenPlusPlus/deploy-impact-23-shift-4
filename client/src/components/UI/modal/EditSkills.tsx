import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import styling from "./EditSkills.module.css";
import { Candidate } from "../../pages/types/types";

interface Skill {
  skill_name: string;
  skill_id: string;
  score: number;
}

interface EditSkillsProps {
  candidate: Candidate;
  setCandidate: (updatedCandidate: Candidate) => void;
  icon: React.ReactNode;
  titleName: string;
  allLabels: Skill[];
  onSave?: (arg: Candidate) => void;
  visible: boolean;
  setVisible: (arg: boolean) => void;
  showModal: () => void;
}

const EditSkills: React.FC<EditSkillsProps> = ({
  candidate,
  icon,
  titleName,
  setCandidate,
  allLabels,
  onSave,
  visible,
  setVisible,
  showModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [labelsToDeleteState, setLabelsToDeleteState] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setLabelsToDeleteState(candidate?.skills as Skill[]);
    updateFilteredSkills(candidate?.skills as Skill[]);
  }, [candidate?.skills]);

  const updateFilteredSkills = (skillsToDelete: Skill[]) => {
    const updatedFilteredSkills = allLabels?.filter((skill) => {
      const isSkillInCandidate = skillsToDelete?.every(
        (candidateSkill) => candidateSkill.skill_id !== skill.skill_id
      );
      return (
        isSkillInCandidate &&
        skill.skill_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredSkills(updatedFilteredSkills);
  };

  const handleCloseSkill = (skillToRemove: Skill) => {
    const updatedSkills = labelsToDeleteState.filter(
      (skill) => skill.skill_id !== skillToRemove.skill_id
    );
    setLabelsToDeleteState(updatedSkills as Skill[]);
    updateFilteredSkills(updatedSkills); // Update filteredSkills
  };

  const addSkillToDeleteState = (skillToAdd: Skill) => {
    // Check if labelsToDeleteState is not empty
    if (labelsToDeleteState) {
      const updatedSkills = [...labelsToDeleteState, skillToAdd];
      setLabelsToDeleteState(updatedSkills);
      updateFilteredSkills(updatedSkills); // Update filteredSkills
    } else {
      // If it's empty, initialize labelsToDeleteState with an array containing the skillToAdd
      setLabelsToDeleteState([skillToAdd]);
      updateFilteredSkills([skillToAdd]); // Update filteredSkills
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setCandidate({ ...candidate, skills: labelsToDeleteState });
      onSave &&
        onSave({ ...candidate, skills: labelsToDeleteState } as Candidate);
      setSearchText("");
    }, 300);
  };

  const handleCancel = () => {
    setVisible(false);
    setLabelsToDeleteState(candidate.skills as Skill[]);
    setSearchText("");
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
        title={titleName}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        {/* Candidates skills */}
        <div className={styling.elementInOneRow}>
          {labelsToDeleteState &&
            labelsToDeleteState?.map((skill, index) => (
              <Labels
                key={index}
                icon={icon}
                labelName={skill.skill_name}
                onCloseIcon={() => handleCloseSkill(skill)}
                disableCloseIcon={false}
                customClass={styling.labelClassSelected}
              />
            ))}
        </div>
        <Input
          className={styling.searchInput}
          placeholder="Search Skills"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className={styling.elementInOneRow}>
          {allLabels &&
            allLabels?.map((skill, index) => (
              <Labels
                key={index}
                icon={icon}
                labelName={skill.skill_name}
                disableCloseIcon={true}
                customClass={styling.labelClass}
                onClickHandle={() => addSkillToDeleteState(skill)}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export { EditSkills };
