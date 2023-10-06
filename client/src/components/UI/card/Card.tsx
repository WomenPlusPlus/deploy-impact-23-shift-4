import React from "react";

import "./Card.css";
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
  <div className="candidate-card">
    <div className="card-header">
      <h2>{name}</h2>
      <div className="top-right-icon">{<IconExternalLink color="black" />}</div>
    </div>
    <h3>{profession}</h3>

    <div className="association-tags">
      {associations?.map((association, index) => (
        <div key={index} className="small-tag">
          {association}
        </div>
      ))}
    </div>

    <div className="skill-tags">
      {skills?.map((skill, index) => (
        <div key={index} className="medium-tag">
          {skill}
        </div>
      ))}
    </div>
  </div>
);

export default Card;
