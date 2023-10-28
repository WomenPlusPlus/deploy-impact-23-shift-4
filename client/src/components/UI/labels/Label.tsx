import React from "react";
import styling from "./Label.module.css";
import { IconX } from "@tabler/icons-react";

interface LabelProps {
  labelName: string | number | JSX.Element;
  icon?: React.ReactNode;
  onCloseIcon?: () => void;
  disableCloseIcon?: boolean;
  customClass?: string;
  onClickHandle?: () => void;
  isSkill?: boolean;
  skillLevel?: string;
  color?: string;
}

const Labels: React.FC<LabelProps> = ({
  icon,
  labelName,
  onCloseIcon,
  disableCloseIcon,
  customClass = "styling.label",
  onClickHandle,
  isSkill,
  skillLevel,
  color,
}) => {
  return (
    <div
      className={`${styling.labelContainer} ${customClass}`}
      onClick={onClickHandle}
      style={{ backgroundColor: color }}
    >
      {!isSkill ? (
        <div className={styling.labelIcon}>
          {icon} {labelName}
        </div>
      ) : (
        <div className={styling.labelIcon}>
          {icon} <strong>{labelName}</strong> {skillLevel ? "| " : ""}
          {skillLevel}
        </div>
      )}

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
