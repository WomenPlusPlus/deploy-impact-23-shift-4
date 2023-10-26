import React, { useEffect } from "react";
import { Input, Button, Upload, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Candidate } from "../../../../types/types";
import styling from "./UploadCertificates.module.css";

interface CertificatesProps {
  candidate: Candidate;
  certificates: { name: string; reference: string }[];
  setCertificates: (arg: { name: string; reference: string }[]) => void;
  currentCertificateTitle: string;
  setCurrentCertificateTitle: (arg: string) => void;
}

const Certificates: React.FC<CertificatesProps> = ({
  candidate,
  certificates,
  setCertificates,
  currentCertificateTitle,
  setCurrentCertificateTitle,
}) => {
  useEffect(() => {
    setCertificates(
      candidate?.certificates as { name: string; reference: string }[]
    );
  }, [candidate]);

  const certificateProps = {
    beforeUpload: (file: UploadFile) => {
      // Use certificateName as the name of the certificate
      if (currentCertificateTitle.trim() === "") {
        message.error("Please enter a certificate name before uploading.");
        return false;
      }

      // Add the new certificate to the certificateFiles state
      setCertificates([
        ...certificates,
        { name: currentCertificateTitle, reference: file.name },
      ]);

      // Clear the certificateName field
      setCurrentCertificateTitle("");

      return false;
    },
  };

  return (
    <>
      <h3>Your certificates</h3>
      {certificates?.map((certificate, index) => (
        <div key={index} className={styling.certificates}>
          <p>
            <strong>Title:</strong> {certificate.name}
          </p>
          <p>
            <strong>Reference:</strong> {certificate.reference}
          </p>
          <Button
            style={{ marginTop: "1rem" }}
            onClick={() =>
              setCertificates(
                certificates.filter((cert) => cert.name !== certificate.name)
              )
            }
          >
            Delete
          </Button>
        </div>
      ))}
      <Input
        placeholder="Certificate Title"
        value={currentCertificateTitle}
        onChange={(e) => setCurrentCertificateTitle(e.target.value)}
      />
      <Upload {...certificateProps} showUploadList={false}>
        <Button style={{ marginTop: "1rem" }} icon={<UploadOutlined />}>
          Upload Certificate
        </Button>
      </Upload>
    </>
  );
};

export { Certificates };
