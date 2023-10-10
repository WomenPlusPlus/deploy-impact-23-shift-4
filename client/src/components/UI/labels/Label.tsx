import React from "react";
import styling from "./Label.module.css";
import { IconX } from "@tabler/icons-react";

interface LabelProps {
  icon: React.ReactNode;
  labelName: string;
  onCloseIcon?: () => void;
  disableCloseIcon?: boolean;
  backgroundColor?: string;
  borderRadius?: string;
}

const Labels: React.FC<LabelProps> = ({
  icon,
  labelName,
  onCloseIcon,
  disableCloseIcon,
  backgroundColor = "var(--white)",
  borderRadius = "var(--tag-radius)",
}) => {
  return (
    <div
      className={styling.labelContainer}
      style={{ backgroundColor: backgroundColor, borderRadius: borderRadius }}
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
