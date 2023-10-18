import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { Candidate } from "../../pages/types/types";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "../button/Button";

const { Option } = Select;

interface ContentBlockModalProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  candidate: Candidate;
  showModal: () => void;
  onSave?: (arg: Candidate) => void;
  allFields?: string[];
}

const VisibleSection: React.FC<ContentBlockModalProps> = ({
  visible,
  setVisible,
  candidate,
  showModal,
  onSave,
}) => {
  const [selectedField, setSelectedField] = useState<string>("");
  const [editedSections, setEditedSections] = useState<string[]>([]);
  const [additionalFields, setAdditionalFields] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [visaStatus, setVisaStatus] = useState<string>("");
  const [visaFields, setVisaFields] = useState<string[]>([]);

  const fieldsToShow = ["Salary range", "Notice", "Visa Status"];

  useEffect(() => {
    if (candidate?.visible_information) {
      setEditedSections(candidate?.visible_information as string[]);
    }
  }, [candidate]);

  const handleAddField = () => {
    if (selectedField) {
      if (
        (selectedField === "Salary range" || selectedField === "Notice") &&
        additionalFields.includes(selectedField)
      ) {
        return; // Allow adding Salary and Notice only once
      } else if (selectedField === "Visa Status" && !visaFields.includes(visaStatus)) {
        setVisaFields([...visaFields, visaStatus]);
        setVisaStatus(""); // Clear Visa Status input field
      }
      setAdditionalFields([...additionalFields, selectedField]);
      setSelectedField("");
    }
  };

  const handleSave = () => {
    if (onSave) {
      let updatedCandidate: Candidate = { ...candidate };

      if (additionalFields.includes("Salary range")) {
        updatedCandidate = {
          ...updatedCandidate,
          salary_expectation: [minSalary, maxSalary],
        };
      }
      if (additionalFields.includes("Notice")) {
        updatedCandidate = {
          ...updatedCandidate,
          notice_period: notice,
        };
      }
      if (visaFields.length > 0) {
        updatedCandidate = {
          ...updatedCandidate,
          visa_status: visaFields,
        };
      }

      updatedCandidate.visible_information = editedSections.concat(additionalFields);

      onSave(updatedCandidate);
    }
    onCancel();
  };

  const onCancel = () => {
    setAdditionalFields([]);
    setMinSalary("");
    setMaxSalary("");
    setNotice("");
    setVisaStatus("");
    setSelectedField("");
    setVisible(false);
  };

  const renderAdditionalFields = () => {
    return additionalFields.map((field, index) => {
      switch (field) {
        case "Salary range":
          return (
            <div key={field}>
              <h3>{field}</h3>
              <Input
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Min Salary"
              />
              <Input
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="Max Salary"
              />
            </div>
          );
        case "Notice":
          return (
            <div key={field}>
              <h3>{field}</h3>
              <Select value={notice} onChange={(value) => setNotice(value)}>
                <Option value="1 week">1 week</Option>
                <Option value="2 weeks">2 weeks</Option>
                <Option value="1 month">1 month</Option>
              </Select>
            </div>
          );
        case "Visa Status":
          return visaFields.map((visa, index) => (
            <div key={index}>
              <h3>{field}</h3>
              <Select
                value={visa}
                onChange={(value) => {
                  const updatedVisaFields = [...visaFields];
                  updatedVisaFields[index] = value;
                  setVisaFields(updatedVisaFields);
                }}
              >
                <Option value="H1B">H1B</Option>
                <Option value="L1">L1</Option>
                <Option value="F1">F1</Option>
              </Select>
            </div>
          ));
        default:
          return null;
      }
    });
  };

  return (
    <>
      <IconEdit
        color="black"
        style={{ cursor: "pointer" }}
        onClick={showModal}
      />
      <Modal
        visible={visible}
        title="Edit Information"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="save" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Select
          value={selectedField}
          onChange={(value) => setSelectedField(value)}
          style={{ width: "100%" }}
        >
          {fieldsToShow.map((field) => (
            <Option key={field} value={field}>
              {field}
            </Option>
          ))}
        </Select>
        <Button onClick={handleAddField}>Add Field</Button>
        {renderAdditionalFields()}
      </Modal>
    </>
  );
};

export { VisibleSection };
