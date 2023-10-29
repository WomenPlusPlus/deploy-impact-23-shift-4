import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { IconEdit } from "@tabler/icons-react";
import { Candidate } from "../../../../types/types";
import { Certificates } from "./UploadCertificates";
import { CV } from "./UploadCV";

interface CertificateUploadModalProps {
  candidate: Candidate;
  showModal: () => void;
  visible: boolean;
  setVisible: (arg: boolean) => void;
  onSave?: (arg: {
    cv_reference: string | null | undefined;
    certificates: { name: string; reference: string }[];
  }) => void;
}

const DocumentUploadModal: React.FC<CertificateUploadModalProps> = ({
  candidate,
  visible,
  showModal,
  setVisible,
  onSave,
}) => {
  const [certificates, setCertificates] = useState<
    { name: string; reference: string }[]
  >([]);
  const [cvReference, setCvReference] = useState<string | null>();
  const [cvFile, setCvFile] = useState<string | null>();
  const [currentCertificateTitle, setCurrentCertificateTitle] = useState("");

  useEffect(() => {
    setCertificates(
      candidate?.certificates as { name: string; reference: string }[]
    );
    setCvReference(candidate?.cv_reference);
  }, [candidate]);

  const handleCancel = () => {
    setCurrentCertificateTitle("");
    setCvFile(null);
    setCvReference(null);
    setVisible(false);
  };

  const handleSave = () => {
    if (onSave) {
      if (cvFile) {
        if (candidate) {
          candidate.cv_reference = cvFile;
        }
      }
      if (certificates) {
        if (candidate) {
          candidate.certificates = certificates;
        }
      }
      onSave({ cv_reference: cvFile, certificates });
    }
    setVisible(false);
  };

  return (
    <div>
      <IconEdit onClick={showModal} style={{ cursor: "pointer" }} />
      <Modal
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <h1>Upload Documents</h1>
        <CV
          candidate={candidate}
          cvFile={cvFile}
          setCvFile={setCvFile}
          cvReference={cvReference}
          setCVReference={setCvReference}
        />
        <hr style={{ marginTop: "1rem" }} />
        <Certificates
          candidate={candidate}
          certificates={certificates}
          setCertificates={setCertificates}
          currentCertificateTitle={currentCertificateTitle}
          setCurrentCertificateTitle={setCurrentCertificateTitle}
        />
      </Modal>
    </div>
  );
};

export { DocumentUploadModal };
