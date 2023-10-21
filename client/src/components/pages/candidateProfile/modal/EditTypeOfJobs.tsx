import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../../../UI/labels/Label";
import styling from "./EditTypeOfJobs.module.css";
import { Candidate } from "../../../../types/types";

interface TypeOfJobs {
  job_name: string;
  job_id: string;
}

interface EditTypeOfJobsProps {
  candidate: Candidate;
  setCandidate: (updatedCandidate: Candidate) => void;
  icon: React.ReactNode;
  titleName: string;
  allLabels: TypeOfJobs[];
  onSave?: (arg: Candidate) => void;
  visible: boolean;
  setVisible: (arg: boolean) => void;
  showModal?: () => void;
}

const EditTypeOfJobs: React.FC<EditTypeOfJobsProps> = ({
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

  const [labelsToDeleteState, setLabelsToDeleteState] = useState<TypeOfJobs[]>(
    []
  );
  const [filteredTypeOfJobs, setFilteredTypeOfJobs] = useState<TypeOfJobs[]>(
    []
  );

  useEffect(() => {
    setLabelsToDeleteState(candidate?.preferred_jobs as TypeOfJobs[]);
    updateFilteredTypeOfJobss(candidate?.preferred_jobs as TypeOfJobs[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate?.preferred_jobs]);

  const updateFilteredTypeOfJobss = (jobsToDelete: TypeOfJobs[]) => {
    const updatedFilteredTypeOfJobss = allLabels?.filter((job) => {
      const isValueInCandidate = jobsToDelete?.every(
        (candidateValue) => candidateValue.job_id !== job.job_id
      );
      return (
        isValueInCandidate &&
        job.job_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredTypeOfJobs(updatedFilteredTypeOfJobss);
  };

  const handleCloseTypeOfJobs = (valueToRemove: TypeOfJobs) => {
    const updatedTypeOfJobs = labelsToDeleteState.filter(
      (job) => job.job_id !== valueToRemove.job_id
    );
    setLabelsToDeleteState(updatedTypeOfJobs);
    updateFilteredTypeOfJobss(updatedTypeOfJobs); // Update filteredTypeOfJobss
  };

  const addSkillToDeleteState = (jobToAdd: TypeOfJobs) => {
    // Check if labelsToDeleteState is not empty
    if (labelsToDeleteState) {
      const updatedTypeOfJobss = [...labelsToDeleteState, jobToAdd];
      setLabelsToDeleteState(updatedTypeOfJobss);
      updateFilteredTypeOfJobss(updatedTypeOfJobss); // Update filteredTypeOfJobss
    } else {
      // If it's empty, initialize labelsToDeleteState with an array containing the skillToAdd
      setLabelsToDeleteState([jobToAdd]);
      updateFilteredTypeOfJobss([jobToAdd]); // Update filteredTypeOfJobss
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setCandidate({ ...candidate, preferred_jobs: labelsToDeleteState });
      onSave &&
        onSave({
          ...candidate,
          preferred_jobs: labelsToDeleteState,
        } as Candidate);
      setSearchText("");
    }, 300);
  };

  const handleCancel = () => {
    setVisible(false);
    setLabelsToDeleteState(candidate.preferred_jobs as TypeOfJobs[]);
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
            labelsToDeleteState?.map((job, index) => (
              <Labels
                key={index}
                icon={icon}
                labelName={job.job_name}
                onCloseIcon={() => handleCloseTypeOfJobs(job)}
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
        <div className={styling.elementInOneRow}>
          {allLabels &&
            allLabels?.map((job, index) => (
              <Labels
                key={index}
                icon={icon}
                labelName={job.job_name}
                disableCloseIcon={true}
                customClass={styling.labelClass}
                onClickHandle={() => addSkillToDeleteState(job)}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export { EditTypeOfJobs };
