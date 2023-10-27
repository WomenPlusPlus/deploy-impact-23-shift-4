import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../../../UI/labels/Label";
import styling from "./EditSkills.module.css";
import { Candidate, Skill } from "../../../../types/types";

const { Option } = Select;

interface EditSkillsProps {
  candidate: Candidate;
  setCandidate: (updatedCandidate: Candidate) => void;
  icon: React.ReactNode;
  titleName: string;
  allLabels: string[];
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
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

  useEffect(() => {
    setCandidateLabels(candidate?.skills as Skill[]);
    setFilteredSkills(allLabels);
    updateFilteredSkills(candidate?.skills as Skill[]);
  }, [candidate, allLabels]);

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
    updateFilteredSkills(candidateLabels, searchText);
  };

  const updateFilteredSkills = (
    skillsToDelete: Skill[],
    searchText?: string
  ) => {
    const updatedFilteredSkills = allLabels?.filter((skill) => {
      const isSkillInCandidate = skillsToDelete?.every(
        (candidateSkill) => candidateSkill.skill_name !== skill
      );
      if (!searchText) {
        return isSkillInCandidate;
      } else {
        return (
          (isSkillInCandidate &&
            skill?.toLowerCase().startsWith(searchText.toLowerCase())) ||
          skill?.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    });
    setFilteredSkills(updatedFilteredSkills);
  };

  const handleCloseSkill = (skillToRemove: string) => {
    const updatedSkills = candidateLabels.filter(
      (skill) => skill.skill_name !== skillToRemove
    );
    setCandidateLabels(updatedSkills as Skill[]);
    updateFilteredSkills(updatedSkills);
  };

  const addSkillToCandidateSkills = (skillToAdd: string) => {
    // Check if candidateLabels is not empty
    const candidateSkill = {
      skill_id: "",
      skill_name: skillToAdd,
      skill_level: "",
    };

    if (candidateLabels) {
      const updatedSkills = [...candidateLabels, candidateSkill];
      setCandidateLabels(updatedSkills);
      updateFilteredSkills(updatedSkills);
    } else {
      // If it's empty, initialize candidateLabels with an array containing the skillToAdd
      setCandidateLabels([candidateSkill]);
      updateFilteredSkills([candidateSkill]);
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
    setFilteredSkills(allLabels);
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
                  onCloseIcon={() => handleCloseSkill(skill.skill_name)}
                  disableCloseIcon={false}
                  customClass={styling.labelClassSelected}
                />

                <Select
                  style={{ width: "100%" }}
                  placeholder="Select skill level"
                  defaultValue={skill.skill_level}
                  onChange={(value) => {
                    const updatedSkills = candidateLabels.map((item) =>
                      item.skill_id === skill.skill_id
                        ? { ...item, skill_level: value }
                        : item
                    );
                    setCandidateLabels(updatedSkills);
                  }}
                >
                  <Option value="beginner">🌱 Beginner</Option>
                  <Option value="intermediate">🌟 Intermediate</Option>
                  <Option value="advanced">🚀 Advanced</Option>
                  <Option value="pro">🌌 Pro</Option>
                </Select>
              </div>
            ))}
        </div>
        <Input
          className={styling.searchInput}
          placeholder="Search Skills"
          value={searchText}
          onChange={(e) => handleSearchTextChange(e.target.value)}
        />
        <div className={styling.elementInOneRow}>
          {filteredSkills && (
            <>
              {filteredSkills.slice(0, 10).map((skill, index) => (
                <Labels
                  key={index}
                  icon={icon}
                  labelName={skill}
                  disableCloseIcon={true}
                  customClass={styling.labelClass}
                  onClickHandle={() => addSkillToCandidateSkills(skill)}
                />
              ))}
              {filteredSkills.length > 10 && (
                <Labels
                  key="more-label"
                  labelName={`+ ${filteredSkills.length - 10} more`}
                  customClass={styling.labelClass}
                  disableCloseIcon={true}
                />
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export { EditSkills };
