import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { Candidate } from "../../pages/types/types";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "../button/Button";
import styling from "./EditJobSearchPref.module.css";

const { Option } = Select;

interface ContentBlockModalProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  candidate: Candidate;
  showModal: () => void;
  onSave?: (arg: Candidate) => void;
  allFields?: string[];
}

const EditJobSearchPref: React.FC<ContentBlockModalProps> = ({
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
    if (candidate?.salary_expectation) {
      setMinSalary(candidate?.salary_expectation[0] || "");
    }
    if (candidate?.salary_expectation) {
      setMaxSalary(candidate?.salary_expectation[1] || "");
    }
    if (candidate?.notice_period) {
      setNotice(candidate?.notice_period);
    }
    if (candidate?.visa_status) {
      setVisaFields(candidate?.visa_status as string[]);
    }
  }, [candidate]);

  const handleAddField = () => {
    if (selectedField) {
      if (
        (selectedField === "Salary range" || selectedField === "Notice") &&
        additionalFields.includes(selectedField)
      ) {
        return; // Allow adding Salary and Notice only once
      } else if (
        selectedField === "Visa Status" &&
        !visaFields.includes(visaStatus)
      ) {
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

      updatedCandidate.visible_information =
        editedSections.concat(additionalFields);

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
              <Select
                value={notice}
                onChange={(value) => setNotice(value)}
                style={{ minWidth: "100%" }}
              >
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
                style={{ minWidth: "100%" }}
              >
                <Option value="EU">EU valid visa</Option>
                <Option value="CH">CH valid visa</Option>
                <Option value="US">US valid visa</Option>
              </Select>
            </div>
          ));
        default:
          return null;
      }
    });
  };

  const renderExistingFieldsForField = (field: string) => {
    switch (field) {
      case "Salary range":
        return (
          <div >
            <h3>{field}</h3>
            <div className={styling.row}>
              <p>Min: </p>
              <Input
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Min Salary"
              />
              <p>Max: </p>
              <Input
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="Max Salary"
              />
            </div>
          </div>
        );
      case "Notice":
        return (
          <div>
            <h3>{field}</h3>
            <Select
              value={notice}
              onChange={(value) => setNotice(value)}
              style={{ minWidth: "100%" }}
            >
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
              style={{ minWidth: "100%" }}
            >
              <Option value="EU">EU valid visa</Option>
              <Option value="CH">CH valid visa</Option>
              <Option value="US">US valid visa</Option>
            </Select>
          </div>
        ));
      default:
        return null;
    }
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
        title="Edit Information"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel} className={styling.cancel}>
            Cancel
          </Button>,
          <Button key="save" onClick={handleSave} className={styling.button}>
            Save
          </Button>,
        ]}
      >
        {/* Display existing fields based on selected additional fields */}
        {additionalFields.map((field) => (
          <div key={field}>
            {renderExistingFieldsForField(field)}
            <hr />
          </div>
        ))}
        {/* Add fields */}
        <div className={styling.row}>
          <Select
            value={selectedField}
            onChange={(value) => setSelectedField(value)}
            style={{ minWidth: "35rem", marginBottom: "1rem" }}
          >
            {fieldsToShow.map((field) => (
              <Option key={field} value={field}>
                {field}
              </Option>
            ))}
          </Select>
          <Button onClick={handleAddField}>Add Field</Button>
        </div>
      </Modal>
    </>
  );
};

export { EditJobSearchPref };
