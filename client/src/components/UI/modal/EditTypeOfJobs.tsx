import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import styling from "./EditTypeOfJobs.module.css";
import { Candidate } from "../../pages/types/types";

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
}

const EditTypeOfJobs: React.FC<EditTypeOfJobsProps> = ({
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

  const [labelsToDeleteState, setLabelsToDeleteState] = useState<TypeOfJobs[]>([]);

  useEffect(() => {
    setLabelsToDeleteState(candidate.preferred_jobs as TypeOfJobs[]);
  }, [candidate.preferred_jobs]);

  const filteredTypeOfJobss = allLabels.filter((job) => {
    // Filter out the values that are already in the candidate's values
    const isValueInCandidate = candidate?.preferred_jobs?.every(
      (candidateValue) => candidateValue.job_id !== job.job_id
    );
    // Include the job in filteredValues if it's not in the candidate
    return isValueInCandidate && job.job_name.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleCloseTypeOfJobs = (valueToRemove: TypeOfJobs) => {
    const updatedTypeOfJobss = labelsToDeleteState.filter(
      (job) => job.job_id !== String(valueToRemove.job_id)
    );
    setLabelsToDeleteState(updatedTypeOfJobss as TypeOfJobs[]);
  };

  const addSkillToDeleteState = (jobToAdd: TypeOfJobs) => {
    // Check if labelsToDeleteState is not empty
    if (labelsToDeleteState) {
      const updatedTypeOfJobss = [...labelsToDeleteState, jobToAdd];
      setLabelsToDeleteState(updatedTypeOfJobss);
    } else {
      // If it's empty, initialize labelsToDeleteState with an array containing the skillToAdd
      setLabelsToDeleteState([jobToAdd]);
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
      setCandidate({ ...candidate, preferred_jobs: labelsToDeleteState });
      onSave &&
        onSave({ ...candidate, preferred_jobs: labelsToDeleteState } as Candidate);
      setSearchText("");
    }, 300);
  };

  const handleCancel = () => {
    setOpen(false);
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
          {filteredTypeOfJobss &&
            filteredTypeOfJobss.map((job, index) => (
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
