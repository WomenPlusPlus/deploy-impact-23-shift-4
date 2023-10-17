import React, { useState } from "react";
import { Modal, Button, Upload, Input, message, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { Candidate } from "../../pages/types/types";
import { IconEdit } from "@tabler/icons-react";
import { transformCandidateData } from "../../pages/candidateProfile/helpers/helper";

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

  const handleUpload = () => {
    // Upload the CV and certificates and update the candidate object
    if (cvFile) {
      if (candidate) {
        candidate.cv_reference = cvFile.name;
      }
    }
    if (certificateFiles.length > 0) {
      if (candidate) {
        candidate.certificates = certificateFiles.map(({ file, name }) => ({
          name,
          reference: file.name as string, // You can set this reference as needed
        }));
      }
    }

    // Trigger the onSave callback to save the updated candidate
    if (onSave) {
      onSave(candidate);
      const transformedData = transformCandidateData(candidate);
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
      setCertificateFiles([
        ...certificateFiles,
        { file, name: certificateName },
      ]);
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

    if (candidate) {
      candidate.certificates = candidate?.certificates?.filter(
        (cert) => cert.name !== name
      );
    }
    if (onSave) {
      onSave(candidate);
    }
  };

  const deleteCV = () => {
    setCvFile(null);
    if (candidate) {
      candidate.cv_reference = null;
    }
    if (onSave) {
      onSave(candidate);
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
        {candidate?.cv_reference ? (
          <>
            <h3>Your CV:</h3>
            <p>{candidate?.cv_reference}</p>
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
        {candidate?.certificates && candidate?.certificates.length > 0 ? (
          <>
            <h3>Your certificates:</h3>
            <ul>
              {candidate?.certificates.map(({ name, reference }) => (
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
          </>
        ) : (
          <>
            <p>Upload certificates (multiple files allowed):</p>
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
          </>
        )}
      </Modal>
    </>
  );
};

export { FileUploadModal };
