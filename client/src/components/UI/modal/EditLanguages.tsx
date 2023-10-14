import React, { useState } from "react";
import { Modal, Input, Select, Space } from "antd";
import { Button } from "../button/Button";
import styling from "./EditLanguages.module.css";
import { Candidate } from "../../pages/types/types";

const { Option } = Select;

enum LanguageLevelText {
  Elementary = "Elementary",
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Professional = "Professional",
  Expert = "Expert",
  Native = "Native",
}

enum LanguageLevelNumber {
  Elementary = 10,
  Beginner = 20,
  Intermediate = 30,
  Advanced = 40,
  Professional = 60,
  Expert = 80,
  Native = 100,
}

interface EditLanguagesProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  values: Candidate;
  setValues: (arg: Candidate) => void;
  onSave?: (arg: Candidate) => void;
}

const EditLanguages: React.FC<EditLanguagesProps> = ({
  visible,
  setVisible,
  values,
  setValues,
  onSave,
}) => {
  const [candidateValues, setCandidateValues] = useState(values);

  const handleSave = () => {
    setValues(candidateValues);
    onSave && onSave(candidateValues);
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const addLanguage = () => {
    setCandidateValues((prevCandidate) => ({
      ...prevCandidate,
      languages: [
        ...(prevCandidate.languages || []),
        { name: "", level: "", score: 0 },
      ],
    }));
  };

  const handleChange = (index: number, key: string, value: string) => {
    setCandidateValues((prevCandidate) => {
      const updatedCandidate = { ...prevCandidate };
      if (key === "level") {
        (updatedCandidate.languages as any)[index][key] = value;
        (updatedCandidate.languages as any)[index]["score"] =
          LanguageLevelNumber[value as keyof typeof LanguageLevelText];
      }
      (updatedCandidate.languages as any)[index][key] = value;
      return updatedCandidate;
    });
  };

  return (
    <Modal
      open={visible}
      title="Edit Languages"
      onCancel={onCancel}
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
          className={styling.buttonCancel}
        >
          Cancel
        </Button>,
        <Button key="save" onClick={handleSave} className={styling.buttonSave}>
          Save
        </Button>,
      ]}
      className={styling.modal}
    >
      {candidateValues?.languages?.map((language, index) => (
        <Space key={index} direction="horizontal" className={styling.content}>
          <div>
            <label>Name:</label>
            <Input
              value={language.name || ""}
              onChange={(e) => {
                handleChange(index, "name", e.target.value);
              }}
            />
          </div>

          <div>
            <label>Level:</label>
            <Select
              style={{ width: "100%" }}
              value={language.level || ""}
              onChange={(value) => handleChange(index, "level", value)}
            >
              {Object.keys(LanguageLevelText).map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </div>
        </Space>
      ))}

      <Button key="addLanguage" onClick={addLanguage}>
        Add Language
      </Button>
    </Modal>
  );
};

export { EditLanguages };