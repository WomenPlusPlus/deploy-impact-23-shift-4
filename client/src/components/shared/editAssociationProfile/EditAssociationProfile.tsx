import React, { useState } from "react";
import { Modal as AntModal, Input } from "antd";

import styling from "./EditAssociationProfile.module.css";
import TextArea from "antd/es/input/TextArea";

interface ModalProps {
  open: boolean;
  onOk: (payload: any) => void;
  onCancel: () => void;
  confirmLoading: boolean;
  associationId: string;
  associationInfo: any;
}

const EditAssociationProfile: React.FC<ModalProps> = ({
  open,
  onOk,
  onCancel,
  confirmLoading,
  associationId,
  associationInfo,
}) => {
  // State
  const [association_name, setAssociationName] = useState<string>(
    associationInfo.association_name || ""
  );
  const [association_size, setAssociationSize] = useState<string>(
    associationInfo.association_size || ""
  );

  const [description, setDescription] = useState<string>(
    associationInfo.company_description || ""
  );
  const [address, setAddress] = useState<string>(associationInfo.address || "");
  const [association_website, setAssociationWebsite] = useState<string>(
    associationInfo.association_website || ""
  );
  const [logo, setLogo] = useState<string>(associationInfo.logo || "");

  const handleOk = () => {
    const payload = {
      company_id: associationId,
      association_name: association_name,
      association_size: association_size,
      description: description,
      address: address,
      url: association_website,
      logo: logo,
    };

    onOk(payload);
  };

  return (
    <>
      <AntModal
        className={styling.modal}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <h2 className={styling.header}>Edit your association information</h2>
        <div className={styling.twoColumn}>
          <div className={styling.section}>
            <p className={styling.sectionName}>Association name:</p>
            <Input
              className={styling.input}
              placeholder="Association name"
              value={association_name}
              onChange={(e) => setAssociationName(e.target.value)}
            />
          </div>

          <div className={styling.section}>
            <p className={styling.sectionName}>Association size:</p>
            <Input
              className={styling.input}
              placeholder="Association size"
              value={association_size}
              onChange={(e) => setAssociationSize(e.target.value)}
            />
          </div>
        </div>

        <div className={styling.twoColumn}>
          <div className={styling.section}>
            <p className={styling.sectionName}>Address:</p>
            <Input
              className={styling.input}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className={styling.section}>
            <p className={styling.sectionName}>Logo URL:</p>
            <Input
              className={styling.input}
              placeholder="Logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>
        </div>

        <div className={styling.section}>
          <p className={styling.sectionName}>Description:</p>
          <TextArea
            className={styling.description}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styling.section}>
          <p className={styling.sectionName}>Association URL:</p>
          <Input
            className={styling.input}
            placeholder="Association URL"
            value={association_website}
            onChange={(e) => setAssociationWebsite(e.target.value)}
          />
        </div>
      </AntModal>
    </>
  );
};

export default EditAssociationProfile;
