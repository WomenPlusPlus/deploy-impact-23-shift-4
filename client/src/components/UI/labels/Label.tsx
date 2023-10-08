import React from "react";
import "./Label.css";
import { IconX } from "@tabler/icons-react";

interface LabelProps {
  icon: React.ReactNode;
  labelName: string;
  onCloseIcon: () => void;
}

const Labels: React.FC<LabelProps> = ({ icon, labelName, onCloseIcon }) => {
  return (
    <div className="label-container">
      <div className="label-icon">
        {icon} {labelName}
      </div>
      <div className="label-close-icon" onClick={onCloseIcon}>
        <IconX color={`var(--gray-medium)`} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export { Labels };
