import React, { useState } from "react";
import {
  Modal as AntdModal,
  Input,
  Select,
  Divider,
  AutoComplete,
  Tag,
  InputNumber,
} from "antd";
import { Button } from "../../UI/button/Button";

import styling from "./AddEditJob.module.css";
import { Labels } from "../../UI/labels/Label";

const { TextArea } = Input;
const { Option } = Select;

interface ModalProps {
  open: boolean;
  onOk: (payload: any) => void;
  onCancel: () => void;
  confirmLoading: boolean;
  modalTitle: string;
  companyId: string;
  associations: string[];
}

const AddEditJob: React.FC<ModalProps> = ({
  open,
  onOk,
  onCancel,
  confirmLoading,
  modalTitle,
  companyId,
  associations,
}) => {
  const MAX_LABELS_DISPLAYED = 6;
  const arrayOfValues = ["Teamwork", "Accountability", "Diversity"];
  const arrayOfSkills = ["React", "Node.js", "TypeScript"];

  // State
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [values, setValues] = useState<string[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [hiring_process_duration, setHiringProcessDuration] =
    useState<string>("");
  const [salary, setSalary] = useState<number>();
  const [location_city, setLocationCity] = useState<string>("");
  const [location_country, setLocationCountry] = useState<string>("");
  const [work_location, setWorkLocation] = useState<string>("");
  const [employment_type, setEmploymentType] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const [valueDataSource, setValueDataSource] =
    useState<string[]>(arrayOfValues);
  const [skillDataSource, setSkillDataSource] =
    useState<string[]>(arrayOfSkills);

  /**
   * Handle the ok button click
   */
  const handleOk = () => {
    const currentTimestamp = new Date();

    const payload = {
      associations: associations,
      company_id: companyId,
      title: title,
      description: description,
      values: values,
      skills: skills,
      hiring_process_duration: hiring_process_duration,
      posting_date: currentTimestamp,
      matching_candidates: [],
      salary: salary,
      location_city: location_city,
      location_country: location_country,
      work_location: work_location,
      employment_type: employment_type,
    };

    onOk(payload);
  };

  const addValue = () => {
    if (selectedValue && !values.includes(selectedValue)) {
      setValues([...values, selectedValue]);
      setSelectedValue("");
    }
  };

  const removeValue = (value: string) => {
    setValues(values.filter((v) => v !== value));
  };

  const addSkill = () => {
    if (
      selectedSkill &&
      !skills.some((skill) => skill.skill_name === selectedSkill)
    ) {
      setSkills([...skills, { skill_name: selectedSkill, skill_level: 1 }]);
      setSelectedSkill("");
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter((skill) => skill.skill_name !== skillName));
  };

  const renderValueLabels = () => {
    const visibleValues = values.slice(0, MAX_LABELS_DISPLAYED);
    const hiddenValueCount = values.length - MAX_LABELS_DISPLAYED;

    return (
      <div className={styling.labelContainer}>
        {visibleValues.map((value) => (
          <Labels
            customClass={styling.label}
            labelName={value}
            onCloseIcon={() => removeValue(value)}
            key={value}
          />
        ))}
        {hiddenValueCount > 0 && (
          <Labels
            customClass={styling.label}
            labelName={`+${hiddenValueCount}`}
            disableCloseIcon={true}
          />
        )}
      </div>
    );
  };

  const renderSkillLabels = () => {
    const visibleSkills = skills.slice(0, MAX_LABELS_DISPLAYED);
    const hiddenSkillCount = skills.length - MAX_LABELS_DISPLAYED;

    return (
      <div className={styling.labelContainer}>
        {visibleSkills.map((skill) => (
          <Labels
            customClass={styling.label}
            labelName={skill.skill_name}
            onCloseIcon={() => removeSkill(skill.skill_name)}
            key={skill.skill_name}
          />
        ))}
        {hiddenSkillCount > 0 && (
          <Labels
            customClass={styling.label}
            labelName={`+${hiddenSkillCount}`}
            disableCloseIcon={true}
          />
        )}
      </div>
    );
  };

  return (
    <AntdModal
      className={styling.modal}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText="Save"
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

      <div className={styling.middle}>
        <div className={styling.sider}>
          <Divider>Values</Divider>
          <div className={styling.autocomplete}>
            <AutoComplete
              placeholder="Search for values"
              value={selectedValue}
              dataSource={valueDataSource}
              onSelect={setSelectedValue}
              style={{ width: "100%" }}
              onSearch={(searchText) => {
                if (searchText === "") {
                  setValueDataSource(arrayOfValues);
                }
                setSelectedValue(searchText);

                const filteredValues = arrayOfValues.filter((value) =>
                  value.toLowerCase().includes(searchText.toLowerCase())
                );
                setValueDataSource(filteredValues);
              }}
            />

            <Button onClick={addValue}>Add</Button>
          </div>

          {renderValueLabels()}
        </div>

        <div className={styling.sider}>
          <Divider>Skills</Divider>
          <div className={styling.autocomplete}>
            <AutoComplete
              placeholder="Search for skills"
              value={selectedSkill}
              dataSource={skillDataSource}
              onSelect={setSelectedSkill}
              style={{ width: "100%" }}
              onSearch={(searchText) => {
                if (searchText === "") {
                  setSkillDataSource(arrayOfSkills);
                }

                setSelectedSkill(searchText);

                const filteredSkills = arrayOfSkills.filter((skill) =>
                  skill.toLowerCase().includes(searchText.toLowerCase())
                );
                setSkillDataSource(filteredSkills);
              }}
            />

            <Button onClick={addSkill}>Add</Button>
          </div>

          {renderSkillLabels()}
        </div>
      </div>

      <div className={styling.bottomContainer}>
        <div className={styling.sider}>
          <Divider>Job details</Divider>
          <Select
            className={styling.dropdown}
            placeholder="Employment Type"
            value={employment_type}
            onChange={(value) => setEmploymentType(value)}
          >
            <Option value="Internship">Internship</Option>
            <Option value="Full time">Full time</Option>
            <Option value="Part time">Part time</Option>
          </Select>

          <Input
            className={styling.input}
            placeholder="Hiring Process Duration"
            value={hiring_process_duration}
            onChange={(e) => setHiringProcessDuration(e.target.value)}
          />

          <InputNumber
            className={styling.inputNumber}
            placeholder="Salary"
            value={salary}
            onChange={(value: any) => setSalary(value)}
          />
        </div>

        <div className={styling.sider}>
          <Divider>Location</Divider>
          <Input
            className={styling.input}
            placeholder="Work Location"
            value={work_location}
            onChange={(e) => setWorkLocation(e.target.value)}
          />

          <Input
            className={styling.input}
            placeholder="City"
            value={location_city}
            onChange={(e) => setLocationCity(e.target.value)}
          />

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
