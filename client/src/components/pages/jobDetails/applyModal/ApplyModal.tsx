import { useState } from "react";
import ToggleModal from "../../../shared/toggleModal/ToggleModal";
import { updateCompanyById } from "../../../../api/companies";
import { Candidate, Company } from "../../../../types/types";
import { updateCandidateById } from "../../../../api/candidates";

interface ApplyModalProps {
  company: Company | undefined;
  jobId: string;
  candidate: Candidate | undefined;
  isApplyModalOpen: boolean;
  callback?: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({
  company,
  jobId,
  candidate,
  isApplyModalOpen,
  callback,
}) => {
  const infoToShare = [
    "Job search preferences",
    "Languages ",
    "Contact info ",
    "Uploaded documents",
  ];

  // State
  const [selectedStrings, setSelectedStrings] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);

  /**
   * Handle toggle of the modal
   * @param index - index of the string
   */
  const handleToggle = (index: number) => {
    const updatedSelectedStrings = [...selectedStrings];
    updatedSelectedStrings[index] = !selectedStrings[index];
    setSelectedStrings(updatedSelectedStrings);
  };

  /**
   * Handle toggle of the options
   * @param enabledStrings - strings that are enabled
   */
  const handleShare = async (enabledStrings: string[], message: string) => {
    console.log("Enabled Strings:", enabledStrings);
    const requestedJobs = candidate?.requested_jobs || [];

    console.log("requestedJobs", requestedJobs);
    console.log("candidate id", candidate);
    requestedJobs?.push(jobId);
    await updateCandidateById(candidate?.user_id ?? "", {
      requested_jobs: requestedJobs,
    });

    let existingInterestedCandidates = company?.interested_candidates || [];

    console.log(candidate?.user_id);
    const newInterestedCandidate = {
      job_id: jobId,
      candidate_id: candidate?.user_id,
      visible_informations: enabledStrings,
      message: message,
    };

    existingInterestedCandidates = [
      ...existingInterestedCandidates,
      newInterestedCandidate,
    ];

    await updateCompanyById(company?.user_id ?? "", {
      interested_candidates: existingInterestedCandidates,
    });
    callback?.();
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    callback?.();
  };

  return (
    <div>
      <ToggleModal
        visible={isApplyModalOpen}
        strings={infoToShare}
        selectedStrings={selectedStrings}
        title="Show your interest in the position and share your info"
        subtitle="Select the information you want to share with the company"
        buttonText="Share"
        onToggle={handleToggle}
        onAcceptWithEnabledStrings={handleShare}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ApplyModal;
