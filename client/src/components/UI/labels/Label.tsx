import React from "react";
import "./Label.css";
import { IconX } from "@tabler/icons-react";

interface LabelProps {
  icon: React.ReactNode;
  labelName: string;
  onCloseIcon?: () => void;
  disableCloseIcon?: boolean;
}

const Labels: React.FC<LabelProps> = ({
  icon,
  labelName,
  onCloseIcon,
  disableCloseIcon,
}) => {

  return (
    <div className="label-container">
      <div className="label-icon">
        {icon} {labelName}
      </div>
      <div
        className="label-close-icon"
        onClick={disableCloseIcon ? undefined : onCloseIcon}
      >
        <IconX
          color={
            disableCloseIcon ? `var(--gray-disabled)` : `var(--gray-medium)`
          }
          style={
            disableCloseIcon
              ? {}
              : { cursor: "pointer", color: "var(--gray-medium)" }
          }
        />
      </div>
    </div>
  );
};

export { Labels };
