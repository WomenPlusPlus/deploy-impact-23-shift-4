import React, { useEffect, useState } from "react";

import { Modal as AntdModal, Input, Select, Divider, AutoComplete } from "antd";
import { Button } from "../../UI/button/Button";
import { Labels } from "../../UI/labels/Label";

import { Skill } from "../../../types/types";

import { getAllSkills } from "../../../api/skills";

import styling from "./AddEditJob.module.css";

const { TextArea } = Input;
const { Option } = Select;

interface ModalProps {
  open: boolean;
  onOk: (payload: any) => void;
  onCancel: () => void;
  confirmLoading: boolean;
  companyId: string;
  companyValues: string[];
  associations: string[];
}

const AddEditJob: React.FC<ModalProps> = ({
  open,
  onOk,
  onCancel,
  confirmLoading,
  companyId,
  companyValues,
  associations,
}) => {
  // Constants
  const skillLevels = ["beginner", "intermediate", "advanced", "pro"];

  // State
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [hiring_process_duration, setHiringProcessDuration] =
    useState<string>("");
  const [minSalary, setMinSalary] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");
  const [location_city, setLocationCity] = useState<string>("");
  const [location_country, setLocationCountry] = useState<string>("");
  const [work_location, setWorkLocation] = useState<string>("");
  const [employment_type, setEmploymentType] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [selectedSkillLevel, setSelectedSkillLevel] =
    useState<string>("beginner");
  // Initial state of skills
  const [skillDataSource, setSkillDataSource] = useState<string[]>();
  // Filtered skill through autocomplete
  const [filteredSkills, setFilteredSkills] = useState<string[]>();

  /**
   * Handle the ok button click
   */
  const handleCreate = () => {
    const payload = {
      associations: associations,
      company_id: companyId,
      title: title,
      description: description,
      values: companyValues,
      skills: selectedSkills,
      hiring_process_duration: hiring_process_duration,
      matching_candidates: [],
      salary: [minSalary, maxSalary],
      location_city: location_city,
      location_country: location_country,
      work_location: work_location,
      employment_type: employment_type,
    };

    console.log(payload);
    onOk(payload);
  };

  /**
   * Add a skill to the selected skills array
   */
  const addSkill = () => {
    if (
      selectedSkill &&
      filteredSkills?.includes(selectedSkill) &&
      !selectedSkills.some((skill) => skill.skill_name === selectedSkill)
    ) {
      const newSkill = {
        skill_name: selectedSkill,
        skill_level: selectedSkillLevel,
      };
      setSelectedSkills([...selectedSkills, newSkill]);
      setSelectedSkill("");
    }
  };

  /**
   * Remove a skill from the selected skills array
   * @param skillName the name of the skill to remove
   */
  const removeSkill = (skillName: string) => {
    setSelectedSkills(
      selectedSkills?.filter((skill) => skill?.skill_name !== skillName)
    );
  };

  /**
   * Fetches all skills from the server
   */
  const fetchSkills = async () => {
    const allSkills = await getAllSkills();
    const skills = allSkills?.map((skill: any) => skill?.name);
    setSkillDataSource(skills);
    setFilteredSkills(skills);
  };

  /**
   * Fetches all skills on component mount
   */
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <AntdModal
      className={styling.modal}
      open={open}
      onOk={handleCreate}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText="Create"
    >
      <h2 className={styling.header}>Create new job</h2>
      <Divider>Job Info</Divider>
      <Input
        className={styling.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        className={styling.description}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className={styling.twoColumn}>
        <div className={styling.sider}>
          <Divider>Skills</Divider>
          <div className={styling.autocomplete}>
            <AutoComplete
              placeholder="Search for skills"
              value={selectedSkill}
              options={filteredSkills?.map((skill) => ({ value: skill }))}
              onSelect={(value) => {
                setSelectedSkill(value);
              }}
              style={{ width: "100%" }}
              popupClassName="scrollable-dropdown"
              popupMatchSelectWidth={false}
              onSearch={(searchText) => {
                setSelectedSkill(searchText);
                if (searchText === "") {
                  setFilteredSkills(skillDataSource);
                } else {
                  const filterSkills = skillDataSource?.filter((skill) =>
                    skill.toLowerCase().includes(searchText.toLowerCase())
                  );
                  setFilteredSkills(filterSkills);
                }
              }}
              onBlur={() => {
                if (!selectedSkill) {
                  // When the input field is cleared, reset the filteredSkills to the initial options
                  setFilteredSkills(skillDataSource);
                }
              }}
            />
            <Select
              placeholder="Skill Level"
              value={selectedSkillLevel}
              onChange={(value) => setSelectedSkillLevel(value)}
              style={{ width: "100%" }}
            >
              {skillLevels.map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>

            <Button onClick={addSkill}>Add</Button>
          </div>
          <div className={styling.labelContainer}>
            {selectedSkills?.map((skill: any, index: number) => (
              <Labels
                key={index}
                customClass={styling.label}
                labelName={`${skill?.skill_name} | ${skill?.skill_level}`}
                onCloseIcon={() => removeSkill(skill?.skill_name)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styling.twoColumn}>
        <div className={styling.sider}>
          <Divider>Job details</Divider>
          <p className={styling.sectionName}>Employment type:</p>
          <Select
            className={styling.dropdown}
            placeholder="Employment Type"
            value={employment_type}
            onChange={(value) => setEmploymentType(value)}
          >
            <Option value="Full time">Full time</Option>
            <Option value="Part time">Part time</Option>
            <Option value="Internship">Internship</Option>
          </Select>

          <p className={styling.sectionName}>Hiring process duration:</p>
          <Input
            className={styling.input}
            placeholder="Hiring Process Duration"
            value={hiring_process_duration}
            onChange={(e) => setHiringProcessDuration(e.target.value)}
          />

          <p className={styling.sectionName}>Annual salary:</p>
          <div className={styling.salary}>
            <Input
              className={styling.input}
              placeholder="Minimum Salary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
            <Input
              className={styling.input}
              placeholder="Maximum Salary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
            />
          </div>
        </div>

        <div className={styling.sider}>
          <Divider>Location</Divider>
          <p className={styling.sectionName}>Work location:</p>
          <Select
            className={styling.dropdown}
            placeholder="Work Location"
            value={work_location}
            onChange={(value) => setWorkLocation(value)}
          >
            <Option value="On site">On site</Option>
            <Option value="Hybrid">Hybrid</Option>
            <Option value="Remote">Remote</Option>
          </Select>

          <p className={styling.sectionName}>City:</p>
          <Input
            className={styling.input}
            placeholder="City"
            value={location_city}
            onChange={(e) => setLocationCity(e.target.value)}
          />

          <p className={styling.sectionName}>Country:</p>
          <Input
            className={styling.input}
            placeholder="Country"
            value={location_country}
            onChange={(e) => setLocationCountry(e.target.value)}
          />
        </div>
      </div>
    </AntdModal>
  );
};

export default AddEditJob;
