import React from "react";
import styling from "./Label.module.css";
import { IconX } from "@tabler/icons-react";

interface LabelProps {
  labelName: string;
  icon?: React.ReactNode;
  onCloseIcon?: () => void;
  disableCloseIcon?: boolean;
  customClass?: string;
  onClickHandle?: () => void;
}

const Labels: React.FC<LabelProps> = ({
  icon,
  labelName,
  onCloseIcon,
  disableCloseIcon,
  customClass = "styling.label",
  onClickHandle,
}) => {
  return (
    <div
      className={`${styling.labelContainer} ${customClass}`}
      onClick={onClickHandle}
    >
      <div className={styling.labelIcon}>
        {icon} {labelName}
      </div>
      {!disableCloseIcon && (
        <div className={styling.labelCloseIcon} onClick={onCloseIcon}>
          <IconX
            color={`var(--gray-medium)`}
            style={{ cursor: "pointer", color: "var(--gray-medium)" }}
          />
        </div>
      )}
    </div>
  );
};

export { Labels };
