import React from "react";
import styling from "./Card.module.css";
import { IconExternalLink } from "@tabler/icons-react";

interface CardProps {
  name?: string;
  profession?: string;
  associations?: string[];
  skills?: string[];
  bordered?: boolean;
  style?: React.CSSProperties;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({
  name,
  profession,
  associations,
  skills,
  bordered = false,
  loading = false,
}) => (
  <div className={styling.candidateCard}>
    <div className={styling.cardHeader}>
      <h2>{name}</h2>
      <div className={styling.topRightIcon}>
        <IconExternalLink color="black" />
      </div>
    </div>
    <h3>{profession}</h3>

    <div className={styling.associationTags}>
      {associations?.map((association, index) => (
        <div key={index} className={styling.smallTag}>
          {association}
        </div>
      ))}
    </div>

    <div className={styling.skillTags}>
      {skills?.map((skill, index) => (
        <div key={index} className={styling.mediumTag}>
          {skill}
        </div>
      ))}
    </div>
  </div>
);

export default Card;
