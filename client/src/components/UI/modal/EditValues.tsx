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
  allLabels: Value[];
  onSave?: (arg: Candidate) => void;
}

const EditValues: React.FC<EditValuesProps> = ({
  candidate,
  icon,
  titleName,
  setCandidate,
  allLabels,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [labelsToDeleteState, setLabelsToDeleteState] = useState<Value[]>([]);
  const [filteredValues, setFilteredValues] = useState<Value[]>([]);

  useEffect(() => {
    setLabelsToDeleteState(candidate.values as Value[]);
    updateFilteredValues(candidate.values as Value[]);
  }, [candidate.values]);

  const updateFilteredValues = (valuesToDelete: Value[]) => {
    const updatedFilteredValues = allLabels?.filter((value) => {
      const isValueInCandidate = valuesToDelete?.every(
        (candidateValue) => candidateValue.value_id !== value.value_id
      );
      return isValueInCandidate && value.value_name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredValues(updatedFilteredValues);
  };

  const handleCloseValue = (valueToRemove: Value) => {
    const updatedValues = labelsToDeleteState.filter(
      (value) => value.value_id !== valueToRemove.value_id
    );
    setLabelsToDeleteState(updatedValues as Value[]);
    updateFilteredValues(updatedValues); // Update filteredValues
  };

  const addSkillToDeleteState = (skillToAdd: Value) => {
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

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setCandidate({ ...candidate, values: labelsToDeleteState });
      onSave &&
        onSave({ ...candidate, values: labelsToDeleteState } as Candidate);
      setSearchText("");
    }, 300);
  };

  const handleCancel = () => {
    setOpen(false);
    setLabelsToDeleteState(candidate.values as Value[]);
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
        open={open}
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
                labelName={value.value_name}
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
          {filteredValues &&
            filteredValues?.map((value, index) => (
              <Labels
                key={index}
                icon={icon}
                labelName={value.value_name}
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
