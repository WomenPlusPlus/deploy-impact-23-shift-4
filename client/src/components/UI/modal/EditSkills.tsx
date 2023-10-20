import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import styling from "./EditSkills.module.css";
import { Candidate, Skill } from "../../pages/types/types";

const { Option } = Select;

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
  const [candidateLabels, setCandidateLabels] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setCandidateLabels(candidate?.skills as Skill[]);
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
    const updatedSkills = candidateLabels.filter(
      (skill) => skill.skill_id !== skillToRemove.skill_id
    );
    setCandidateLabels(updatedSkills as Skill[]);
    updateFilteredSkills(updatedSkills); // Update filteredSkills
  };

  const addSkillToCandidateSkills = (skillToAdd: Skill) => {
    // Check if candidateLabels is not empty
    if (candidateLabels) {
      const updatedSkills = [...candidateLabels, skillToAdd];
      setCandidateLabels(updatedSkills);
      updateFilteredSkills(updatedSkills); // Update filteredSkills
    } else {
      // If it's empty, initialize candidateLabels with an array containing the skillToAdd
      setCandidateLabels([skillToAdd]);
      updateFilteredSkills([skillToAdd]); // Update filteredSkills
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setCandidate({ ...candidate, skills: candidateLabels });
      onSave && onSave({ ...candidate, skills: candidateLabels } as Candidate);
      setSearchText("");
    }, 300);
  };

  const handleCancel = () => {
    setVisible(false);
    setCandidateLabels(candidate.skills as Skill[]);
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
        <div className={styling.column}>
          {candidateLabels &&
            candidateLabels?.map((skill, index) => (
              <div className={styling.row} key={index}>
                <Labels
                  icon={icon}
                  labelName={skill.skill_name}
                  onCloseIcon={() => handleCloseSkill(skill)}
                  disableCloseIcon={false}
                  customClass={styling.labelClassSelected}
                />

                <Select
                  style={{ width: "100%" }}
                  placeholder="Select skill level"
                  onChange={(value) => {
                    const updatedSkills = candidateLabels.map((item) =>
                      item.skill_id === skill.skill_id
                        ? { ...item, skill_level: value }
                        : item
                    );
                    setCandidateLabels(updatedSkills);
                  }}
                >
                  <Option value="beginner">🌱 Novice Explorer</Option>
                  <Option value="intermediate">🌟 Adventurous Learner</Option>
                  <Option value="advanced">🚀 Skilled Pioneer</Option>
                  <Option value="pro">🌌 Master Voyager</Option>
                </Select>
              </div>
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
                onClickHandle={() => addSkillToCandidateSkills(skill)}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export { EditSkills };
