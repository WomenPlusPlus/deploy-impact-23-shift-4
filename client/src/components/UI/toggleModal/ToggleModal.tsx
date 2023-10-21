import React from "react";
import { Modal, Switch } from "antd";
import { Button } from "../button/Button";
import styling from "./ToggleModal.module.css";
import TextArea from "antd/es/input/TextArea";

interface StringSelectorModalProps {
  visible: boolean;
  strings: string[];
  selectedStrings: boolean[];
  title: string;
  subtitle?: string;
  buttonText: string;
  onToggle: (index: number) => void;
  onAcceptWithEnabledStrings: (enabledStrings: string[]) => void;
  onCancel: () => void;
  isTextAreaVisible?: boolean;
}

const ToggleModal: React.FC<StringSelectorModalProps> = ({
  visible,
  strings,
  selectedStrings,
  title,
  subtitle,
  buttonText,
  onToggle,
  onAcceptWithEnabledStrings,
  onCancel,
  isTextAreaVisible = true,
}) => {
  const handleOk = () => {
    const enabledStrings = strings.filter((_, index) => selectedStrings[index]);
    onAcceptWithEnabledStrings(enabledStrings);
  };
  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <div className={styling.buttonContainer}>
          <Button className={styling.button} onClick={handleOk}>
            {buttonText}
          </Button>
        </div>,
      ]}
    >
      <h2 className={styling.title}>{title}</h2>
      <p className={styling.subtitle} hidden={!subtitle}>
        {subtitle}
      </p>
      <div className={styling.center}>
        {strings.map((string, index) => (
          <div key={index} className={styling.options}>
            <p className={styling.field}>{string}</p>
            <Switch
              checked={selectedStrings[index]}
              onChange={() => onToggle(index)}
            />
          </div>
        ))}
        {isTextAreaVisible && (
          <TextArea
            className={styling.text}
            placeholder="Message to recruiter (optional)"
          />
        )}
      </div>
    </Modal>
  );
};

export default ToggleModal;
