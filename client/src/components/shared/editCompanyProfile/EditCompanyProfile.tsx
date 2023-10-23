import React, { useState } from "react";
import { Modal as AntModal, AutoComplete, Input } from "antd";

import styling from "./EditCompanyProfile.module.css";
import TextArea from "antd/es/input/TextArea";
import { Button } from "../../UI/button/Button";
import { Labels } from "../../UI/labels/Label";

interface ModalProps {
  open: boolean;
  onOk: (payload: any) => void;
  onCancel: () => void;
  confirmLoading: boolean;
  companyId: string;
  companyInfo: any;
  associations?: string[];
}

const EditCompanyProfile: React.FC<ModalProps> = ({
  open,
  onOk,
  onCancel,
  confirmLoading,
  companyId,
  companyInfo,
}) => {
  const MAX_LABELS_DISPLAYED = 6;
  const arrayOfValues = ["Teamwork", "Accountability", "Diversity"];
  console.log("companyInfo", companyInfo.company_name);

  // State
  const [company_name, setCompanyName] = useState<string>(
    companyInfo.company_name || ""
  );
  const [company_size, setCompanySize] = useState<string>(
    companyInfo.company_size || ""
  );

  const [description, setDescription] = useState<string>(
    companyInfo.company_description || ""
  );
  const [values, setValues] = useState<string[]>(companyInfo.values || []);
  const [address, setAddress] = useState<string>(companyInfo.address || "");
  const [kununu_url, setKununuUrl] = useState<string>(
    companyInfo.kununu_url || ""
  );
  const [linkedin_url, setLinkedinUrl] = useState<string>(
    companyInfo.linkedin_url || ""
  );
  const [logo, setLogo] = useState<string>(companyInfo.logo || "");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [valueDataSource, setValueDataSource] =
    useState<string[]>(arrayOfValues);

  const handleOk = () => {
    const payload = {
      company_id: companyId,
      company_name: company_name,
      company_size: company_size,
      company_description: description,
      company_address: address,
      values: values,
      kununu_url: kununu_url,
      linkedin_url: linkedin_url,
      logo: logo,
    };

    onOk(payload);
  };

  const addValue = () => {
    if (selectedValue && !values.includes(selectedValue)) {
      setValues([...values, selectedValue]);
      setSelectedValue("");
    }
  };

  const removeValue = (value: string) => {
    setValues(values.filter((v) => v !== value));
  };

  const renderValueLabels = () => {
    const visibleValues = values.slice(0, MAX_LABELS_DISPLAYED);
    const hiddenValueCount = values.length - MAX_LABELS_DISPLAYED;

    return (
      <div className={styling.labelContainer}>
        {visibleValues?.map((value) => (
          <Labels
            customClass={styling.label}
            labelName={value}
            onCloseIcon={() => removeValue(value)}
            key={value}
          />
        ))}
        {hiddenValueCount > 0 && (
          <Labels
            customClass={styling.label}
            labelName={`+${hiddenValueCount}`}
            disableCloseIcon={true}
          />
        )}
      </div>
    );
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
        <h2 className={styling.header}>Edit company information</h2>
        <div className={styling.twoColumn}>
          <div className={styling.section}>
            <p className={styling.sectionName}>Company name:</p>
            <Input
              className={styling.input}
              placeholder="Company name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className={styling.section}>
            <p className={styling.sectionName}>Company size:</p>
            <Input
              className={styling.input}
              placeholder="Company size"
              value={company_size}
              onChange={(e) => setCompanySize(e.target.value)}
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
          <p className={styling.sectionName}>Values:</p>
          <div className={styling.autocomplete}>
            <AutoComplete
              placeholder="Search for values"
              value={selectedValue}
              dataSource={valueDataSource}
              onSelect={setSelectedValue}
              style={{ width: "100%" }}
              onSearch={(searchText) => {
                if (searchText === "") {
                  setValueDataSource(arrayOfValues);
                }
                setSelectedValue(searchText);

                const filteredValues = arrayOfValues.filter((value) =>
                  value.toLowerCase().includes(searchText.toLowerCase())
                );
                setValueDataSource(filteredValues);
              }}
            />

            <Button onClick={addValue}>Add</Button>
          </div>

          {renderValueLabels()}
        </div>

        <div className={styling.section}>
          <p className={styling.sectionName}>LinkedIn URL:</p>
          <Input
            className={styling.input}
            placeholder="LinkedIn URL"
            value={linkedin_url}
            onChange={(e) => setLinkedinUrl(e.target.value)}
          />
        </div>

        <div className={styling.section}>
          <p className={styling.sectionName}>Kununu URL:</p>
          <Input
            className={styling.input}
            placeholder="Kununu URL"
            value={kununu_url}
            onChange={(e) => setKununuUrl(e.target.value)}
          />
        </div>
      </AntModal>
    </>
  );
};

export default EditCompanyProfile;
