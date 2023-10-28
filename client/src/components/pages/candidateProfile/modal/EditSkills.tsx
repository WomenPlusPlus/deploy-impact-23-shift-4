import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../../../UI/labels/Label";
import styling from "./EditSkills.module.css";
import { AllSkill, Candidate, Skill } from "../../../../types/types";

const { Option } = Select;

interface EditSkillsProps {
  candidate: Candidate;
  setCandidate: (updatedCandidate: Candidate) => void;
  icon: React.ReactNode;
  titleName: string;
  allLabels: AllSkill[];
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
  const [candidateHardSkills, setCandidateHardSkills] = useState<Skill[]>([]);
  const [candidateSoftSkills, setCandidateSoftSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<AllSkill[]>([]);

  const fetchSkills = async () => {
    // add only hard skills
    console.log("candidate", candidate?.skills);
    const hardSkills = (candidate?.skills as Skill[])?.filter(
      (skill) => skill?.category === "hard_skill"
    );
    const softSkills = (candidate?.skills as Skill[])?.filter(
      (skill) => skill?.category === "soft_skill"
    );
    setCandidateHardSkills(hardSkills);
    setCandidateSoftSkills(softSkills);
    setFilteredSkills(allLabels);
    updateFilteredSkills(candidate?.skills as Skill[]);
  };

  useEffect(() => {
    fetchSkills();
  }, [candidate, allLabels]);

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
    updateFilteredSkills(candidateHardSkills, searchText);
  };

  const updateFilteredSkills = (
    skillsToDelete: Skill[],
    searchText?: string
  ) => {
    if (skillsToDelete?.length > 0) {
      const updatedFilteredSkills = allLabels?.filter((skill) => {
        const isSkillInCandidate = skillsToDelete?.every(
          (candidateSkill) => candidateSkill?.skill_name !== skill?.name
        );
        if (!searchText) {
          return isSkillInCandidate;
        } else {
          return (
            (isSkillInCandidate &&
              skill?.name
                ?.toLowerCase()
                .startsWith(searchText.toLowerCase())) ||
            skill?.name?.toLowerCase().includes(searchText.toLowerCase())
          );
        }
      });
      setFilteredSkills(updatedFilteredSkills);
    }
  };

  const handleCloseHardSkill = (skillToRemove: string) => {
    const updatedSkills = candidateHardSkills.filter(
      (skill) => skill?.skill_name !== skillToRemove
    );
    setCandidateHardSkills(updatedSkills as Skill[]);
    updateFilteredSkills(updatedSkills);
  };

  const handleCloseSoftSkill = (skillToRemove: string) => {
    const updatedSkills = candidateSoftSkills.filter(
      (skill) => skill?.skill_name !== skillToRemove
    );
    setCandidateSoftSkills(updatedSkills as Skill[]);
    updateFilteredSkills(updatedSkills);
  };

  const addSkillToCandidateSkills = (skillToAdd: AllSkill) => {
    // Check if candidateHardSkills is not empty
    const candidateSkill: Skill = {
      skill_id: "",
      skill_name: skillToAdd?.name,
      skill_level: "",
      category: skillToAdd?.category,
    };

    if (candidateHardSkills) {
      const updatedSkills = [...candidateHardSkills, candidateSkill];
      setCandidateHardSkills(updatedSkills);
      updateFilteredSkills(updatedSkills);
    } else {
      // If it's empty, initialize candidateHardSkills with an array containing the skillToAdd
      setCandidateHardSkills([candidateSkill]);
      updateFilteredSkills([candidateSkill]);
    }
  };

  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setCandidate({ ...candidate, skills: candidateHardSkills });
      onSave &&
        onSave({ ...candidate, skills: candidateHardSkills } as Candidate);
      setSearchText("");
    }, 300);
  };

  const handleCancel = () => {
    setVisible(false);
    setCandidateHardSkills(candidate?.skills as Skill[]);
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
          {candidateHardSkills &&
            candidateHardSkills?.map((skill, index) => (
              <div className={styling.row} key={index}>
                <Labels
                  icon={icon}
                  labelName={skill.skill_name}
                  onCloseIcon={() => handleCloseHardSkill(skill.skill_name)}
                  disableCloseIcon={false}
                  customClass={styling.labelClassSelected}
                />
                {skill?.category === "hard_skill" && (
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select skill level"
                    defaultValue={skill.skill_level}
                    onChange={(value) => {
                      const updatedSkills = candidateHardSkills?.map((item) =>
                        item.skill_id === skill.skill_id
                          ? { ...item, skill_level: value }
                          : item
                      );
                      setCandidateHardSkills(updatedSkills);
                    }}
                  >
                    <Option value="beginner">🌱 Beginner</Option>
                    <Option value="intermediate">🌟 Intermediate</Option>
                    <Option value="advanced">🚀 Advanced</Option>
                    <Option value="pro">🌌 Pro</Option>
                  </Select>
                )}
              </div>
            ))}
          {candidateSoftSkills &&
            candidateSoftSkills?.length > 0 &&
            candidateSoftSkills?.map((skill, index) => (
              <div className={styling.row} key={index}>
                <Labels
                  icon={icon}
                  labelName={skill.skill_name}
                  onCloseIcon={() => handleCloseSoftSkill(skill.skill_name)}
                  disableCloseIcon={false}
                  customClass={styling.labelClassSelected}
                />
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
              {filteredSkills?.slice(0, 10).map((skill, index) => (
                <Labels
                  key={index}
                  icon={icon}
                  labelName={skill.name}
                  disableCloseIcon={true}
                  customClass={
                    skill?.category === "hard_skill"
                      ? styling.labelHardSkill
                      : styling.labelSoftSkill
                  }
                  onClickHandle={() => addSkillToCandidateSkills(skill)}
                />
              ))}
              {filteredSkills?.length > 10 && (
                <Labels
                  key="more-label"
                  labelName={`+ ${filteredSkills.length - 10} more`}
                  customClass={styling.labelHardSkill}
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
