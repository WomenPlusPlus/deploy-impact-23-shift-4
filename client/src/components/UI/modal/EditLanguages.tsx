import React, { useState } from "react";
import { Modal, Input, Select, Space } from "antd";
import { Button } from "../button/Button";
import styling from "./EditLanguages.module.css";

const { Option } = Select;

enum LanguageLevelNumber {
  Elementary = 10,
  Beginner = 20,
  Intermediate = 30,
  Advanced = 40,
  Professional = 60,
  Expert = 80,
  Native = 100,
}

enum LanguageLevelText {
  Elementary = "Elementary",
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Professional = "Professional",
  Expert = "Expert",
  Native = "Native",
}

interface Language {
  name: string;
  levelName: string;
  score: number;
}

interface EditLanguagesProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  languages?: Language[];
  setLanguages?: (arg: Language[]) => void;
}

const EditLanguages: React.FC<EditLanguagesProps> = ({
  visible,
  setVisible,
  languages,
  setLanguages,
}) => {
  const [values, setValues] = useState(languages || []);

  const handleSave = () => {
    if (setLanguages) {
      setLanguages(values);
    }
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleChange = (index: number, key: string, value: string) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      if (key === "levelName") {
        const levelName = value as keyof typeof LanguageLevelText;
        updatedValues[index] = {
          ...updatedValues[index],
          [key]: levelName,
          score: LanguageLevelNumber[levelName],
        };
      } else {
        updatedValues[index] = { ...updatedValues[index], [key]: value };
      }
      return updatedValues;
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
      {values.map((language, index) => (
        <Space key={index} direction="horizontal" className={styling.content}>
          <div>
            <label>Name:</label>
            <Input
              value={language.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>

          <div>
            <label>Level:</label>
            <Select
              style={{ width: "100%" }}
              value={language.levelName}
              onChange={(value) => handleChange(index, "levelName", value)}
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
    </Modal>
  );
};

export { EditLanguages };
