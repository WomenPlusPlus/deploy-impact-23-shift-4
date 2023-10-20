import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import styling from "./EditValues.module.css";
import { Candidate } from "../../pages/types/types";

interface Value {
  value_name: string;
  value_id: string;
  score: number;
}

interface EditValuesProps {
  candidate: Candidate;
  setCandidate: (updatedCandidate: Candidate) => void;
  icon: React.ReactNode;
  titleName: string;
  allLabels: string[]; // Change the type to an array of strings
  onSave?: (arg: Candidate) => void;
  visible: boolean;
  setVisible: (arg: boolean) => void;
  showModal: () => void;
}

const EditValues: React.FC<EditValuesProps> = ({
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
  const [labelsToDeleteState, setLabelsToDeleteState] = useState<string[]>([]); // Change the type to an array of strings
  const [filteredValues, setFilteredValues] = useState<string[]>([]); // Change the type to an array of strings

  useEffect(() => {
    setLabelsToDeleteState(candidate?.values as string[]);
    updateFilteredValues(candidate?.values as string[]);
  }, [candidate?.values]);

  const updateFilteredValues = (valuesToDelete: string[]) => {
    const updatedFilteredValues = allLabels?.filter((value) => {
      const isValueInCandidate = valuesToDelete?.every(
        (candidateValue) => candidateValue !== value
      );
      return (
        isValueInCandidate &&
        value.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredValues(updatedFilteredValues);
  };

  const handleCloseValue = (valueToRemove: string) => {
    const updatedValues = labelsToDeleteState.filter(
      (value) => value !== valueToRemove
    );
    setLabelsToDeleteState(updatedValues);
    updateFilteredValues(updatedValues); // Update filteredValues
  };

  const addSkillToDeleteState = (skillToAdd: string) => {
    // Check if labelsToDeleteState is not empty
    if (labelsToDeleteState) {
      const updatedValues = [...labelsToDeleteState, skillToAdd];
      setLabelsToDeleteState(updatedValues);
      updateFilteredValues(updatedValues); // Update filteredValues
    } else {
      // If it's empty, initialize labelsToDeleteState with an array containing the skillToAdd
      setLabelsToDeleteState([skillToAdd]);
      updateFilteredValues([skillToAdd]); // Update filteredValues
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setCandidate({ ...candidate, values: labelsToDeleteState });
      onSave && onSave({ ...candidate, values: labelsToDeleteState } as Candidate);
      setSearchText("");
    }, 300);
  };
  
  const handleCancel = () => {
    setVisible(false);
    setLabelsToDeleteState(candidate.values as string[]); // Change the type to an array of strings
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
        {/* Candidates values */}
        <div className={styling.elementInOneRow}>
          {labelsToDeleteState &&
            labelsToDeleteState?.map((value, index) => (
              <Labels
                key={index}
                icon={icon}
                labelName={value}
                onCloseIcon={() => handleCloseValue(value)}
                disableCloseIcon={false}
                customClass={styling.labelClassSelected}
              />
            ))}
        </div>
        <Input
          className={styling.searchInput}
          placeholder="Search values"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* All values */}
        <div className={styling.elementInOneRow}>
          {allLabels &&
            allLabels?.map((value, index) => (
              <Labels
                key={index}
                icon={icon}
                labelName={value}
                disableCloseIcon={true}
                customClass={styling.labelClass}
                onClickHandle={() => addSkillToDeleteState(value)}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export { EditValues };
