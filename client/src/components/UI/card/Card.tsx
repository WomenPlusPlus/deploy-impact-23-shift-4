import React from "react";
import styling from "./Card.module.css";
import { IconExternalLink } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import Avatar from "../avatar/Avatar";

interface CardProps {
  logo?: string;
  header?: string;
  subheader?: string;
  associations?: string[];
  description?: string;
  skills?: string[];
  values?: string[];
  bordered?: boolean;
  style?: React.CSSProperties;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({
  logo,
  header,
  subheader,
  description,
  associations,
  skills,
  values,
  bordered = false,
  loading = false,
}) => (
  <div className={styling.candidateCard}>
    <div className={styling.cardHeader}>
      <Avatar size={50} />
      <div>
        <h2 className={styling.header}>{header}</h2>
        <p className={styling.subheader}>{subheader}</p>
      </div>
      <div className={styling.topRightIcon}>
        <IconExternalLink color="black" />
      </div>
    </div>

    <div className={styling.description}>
      <p>{description}</p>
    </div>

    <div className={styling.container}>
      <div className={styling.labelContainer}>
        {associations?.map((association) => (
          <Labels
            labelName={association}
            customClass={styling.associationLabel}
            disableCloseIcon
          />
        ))}
      </div>

      <div className={styling.labelContainer}>
        {skills?.map((skill) => (
          <Labels
            labelName={skill}
            customClass={styling.label}
            disableCloseIcon
          />
        ))}
      </div>

      <div className={styling.labelContainer}>
        {values?.map((value) => (
          <Labels
            labelName={value}
            customClass={styling.label}
            disableCloseIcon
          />
        ))}
      </div>
    </div>
  </div>
);

export default Card;
