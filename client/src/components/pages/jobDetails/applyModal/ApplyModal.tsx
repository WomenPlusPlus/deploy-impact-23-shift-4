import { useState } from "react";
import ToggleModal from "../../../shared/toggleModal/ToggleModal";
import { updateCompanyById } from "../../../../api/companies";

interface ApplyModalProps {
  companyId: string;
  jobId: string;
  candidateId: string | undefined;
  isApplyModalOpen: boolean;
  callback?: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({
  companyId,
  jobId,
  candidateId,
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
    await updateCompanyById(companyId, {
      interested_candidates: {
        job_id: jobId,
        candidate_id: candidateId,
        visible_informations: enabledStrings,
        message: message,
      },
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
        buttonText="Share interest"
        onToggle={handleToggle}
        onAcceptWithEnabledStrings={handleShare}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ApplyModal;
