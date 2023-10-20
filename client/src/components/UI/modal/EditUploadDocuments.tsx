import React, { useEffect, useState } from "react";
import { Modal, Button, Upload, Input, message, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { Candidate } from "../../pages/types/types";
import { IconEdit } from "@tabler/icons-react";
import { transformCandidateDocs } from "../../pages/candidateProfile/helpers/helper";

interface FileUploadModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  candidate: Candidate; // Pass the candidate object
  onSave?: (updatedCandidate: Candidate) => void;
  showModal: () => void;
  setSectionDocuments: (arg: any) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  visible,
  setVisible,
  candidate,
  onSave,
  showModal,
  setSectionDocuments,
}) => {
  const [cvFile, setCvFile] = useState<UploadFile | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<
    { file: UploadFile; name: string }[]
  >([]);
  const [certificateName, setCertificateName] = useState("");
  const [candidateData, setCandidateData] = useState<Candidate | null>(null);

  useEffect(() => {
    setCandidateData(candidate);
  }, [candidate]);

  const handleUpload = () => {
    // Upload the CV and certificates and update the candidate object
    if (cvFile) {
      if (candidateData) {
        candidateData.cv_reference = cvFile.name;
      }
    }
    console.log("FILES",certificateFiles);
    if (certificateFiles.length > 0) {
      if (candidateData) {
        candidateData.certificates = certificateFiles.map(({ file, name }) => ({
          name,
          reference: file.name as string, // You can set this reference as needed
        }));
      }
    }

    // Trigger the onSave callback to save the updated candidateData
    if (onSave) {
      onSave(candidateData as Candidate);
      const transformedData = transformCandidateDocs(
        candidateData as Candidate
      );
      console.log(transformedData);
      setSectionDocuments(transformedData);
    }

    // Clear the state and close the modal
    setCvFile(null);
    setCertificateFiles([]);
    setCertificateName("");
    setVisible(false);

    message.success("Files uploaded successfully");
  };

  const cvProps = {
    onRemove: () => {
      setCvFile(null);
    },
    beforeUpload: (file: UploadFile) => {
      setCvFile(file);
      return false;
    },
  };

  const certificateProps = {
    onRemove: (file: UploadFile) => {
      const updatedFiles = certificateFiles.filter(({ file: f }) => f !== file);
      setCertificateFiles(updatedFiles);
    },
    beforeUpload: (file: UploadFile) => {
      // Use certificateName as the name of the certificate
      if (certificateName.trim() === "") {
        message.error("Please enter a certificate name before uploading.");
        return false;
      }

      // Add the new certificate to the certificateFiles state
      setCertificateFiles([
        ...certificateFiles,
        { file, name: certificateName },
      ]);

      // Clear the certificateName field
      setCertificateName("");

      return false;
    },
  };

  const onCancel = () => {
    setCvFile(null);
    setCertificateFiles([]);
    setCertificateName("");
    setVisible(false);
  };

  const deleteCertificate = (file: UploadFile, name: string) => {
    const updatedFiles = certificateFiles.filter(({ file: f }) => f !== file);
    setCertificateFiles(updatedFiles);

    if (candidateData) {
      candidateData.certificates = candidateData?.certificates?.filter(
        (cert) => cert.name !== name
      );
    }
    if (onSave) {
      onSave(candidateData as Candidate);
    }
  };

  const deleteCV = () => {
    setCvFile(null);
    if (candidateData) {
      candidateData.cv_reference = null;
    }
    if (onSave) {
      onSave(candidateData as Candidate);
    }
  };

  return (
    <>
      <IconEdit onClick={showModal} />
      <Modal
        title="Upload CV and Certificates"
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="upload"
            type="primary"
            onClick={handleUpload}
            disabled={!cvFile && certificateFiles.length === 0}
          >
            Upload
          </Button>,
        ]}
      >
        {/* Show CV */}
        {candidateData?.cv_reference ? (
          <>
            <h3>Your CV:</h3>
            <p>{candidateData?.cv_reference}</p>
            <Popconfirm
              title="Are you sure you want to delete your CV?"
              onConfirm={() => deleteCV()}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete CV</Button>
            </Popconfirm>
            <h3>Upload a new CV:</h3>
            <Upload {...cvProps}>
              {cvFile ? (
                <p>{cvFile.name}</p>
              ) : (
                <Button icon={<UploadOutlined />}>Upload CV</Button>
              )}
            </Upload>
          </>
        ) : (
          <>
            <p>Upload your CV:</p>
            <Upload {...cvProps}>
              {cvFile ? (
                <p>{cvFile.name}</p>
              ) : (
                <Button icon={<UploadOutlined />}>Upload CV</Button>
              )}
            </Upload>
          </>
        )}

        {/* Show certificate */}
        {candidateData?.certificates &&
          candidateData?.certificates.length > 0 && (
            <>
              <h3>Your certificates:</h3>
              <ul>
                {candidateData?.certificates.map(({ name, reference }) => (
                  <li key={reference}>
                    {name}{" "}
                    <Popconfirm
                      title={`Are you sure you want to delete "${name}" certificate?`}
                      onConfirm={() => deleteCertificate(reference, name)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </li>
                ))}
              </ul>
            </>
          )}
        <p>Upload a new certificate:</p>
        <Input
          placeholder="Certificate Name"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
        <Upload {...certificateProps} multiple>
          {certificateFiles.length > 0 ? (
            <ul>
              {certificateFiles.map(({ file, name }) => (
                <li key={file.uid}>{name}</li>
              ))}
            </ul>
          ) : (
            <Button icon={<UploadOutlined />}>Upload Certificates</Button>
          )}
        </Upload>
      </Modal>
    </>
  );
};

export { FileUploadModal };
