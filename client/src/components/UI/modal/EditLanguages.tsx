import React, { useState } from "react";
import { Modal, Input, Select, Space } from "antd";

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
  score: number
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
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(languages || []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
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
        updatedValues[index] = { ...updatedValues[index], [key]: levelName, score: LanguageLevelNumber[levelName] };
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
        !editing ? (
          <button key="edit" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <button key="save" onClick={handleSave}>
            Save
          </button>
        ),
      ]}
    >
      {values.map((language, index) => (
        <Space key={index} direction="vertical">
          <div>
            <label>Name:</label>
            {editing ? (
              <Input
                value={language.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            ) : (
              <span>{language.name}</span>
            )}
          </div>
          <div>
            <label>Level Name:</label>
            {editing ? (
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
            ) : (
              <span>{language.levelName}</span>
            )}
          </div>
        </Space>
      ))}
    </Modal>
  );
};

export {EditLanguages};
