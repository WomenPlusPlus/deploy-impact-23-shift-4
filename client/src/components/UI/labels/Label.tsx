import React from "react";
import styling from "./Label.module.css";
import { IconX } from "@tabler/icons-react";

interface LabelProps {
  icon: React.ReactNode;
  labelName: string;
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
  customClass = "",
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
      <div
        className={styling.labelCloseIcon}
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
