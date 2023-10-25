import React from "react";
import styling from "./Card.module.css";
import { IconExternalLink } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import Avatar from "../avatar/Avatar";
import { Association } from "../../../types/types";

interface CardProps {
  association?: Association;
  logo?: string;
  header?: string;
  subheader?: string;
  description?: string;
  skills?: object[] | undefined;
  values?: string[];
  onClickRedirect?: () => void;
}

const AssociationCard: React.FC<CardProps> = ({
  association,
  logo,
  header,
  subheader,
  description,
  skills,
  values,
  onClickRedirect,
}) => {
  // pass company, pass candidateID
  // state
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <div className={styling.candidateCard}>
      <div className={styling.cardHeader}>
        {logo ? <Avatar size={50} imageSrc={logo} /> : <Avatar size={50} />}
        <div>
          <h2 className={styling.header} onClick={onClickRedirect}>
            {association?.association_name || header}
          </h2>
          <p className={styling.subheader}>{subheader}</p>
        </div>
        <div className={styling.topRightIcon}>
          <IconExternalLink color="black" onClick={onClickRedirect} />
        </div>
      </div>

      <div className={styling.description}>
        <p>{description}</p>
      </div>
      <hr className={styling.divider} />
      <div className={styling.container}>
        <div className={styling.labelContainer}>
          {association?.iniciatives?.map((initiative, index) => (
            <Labels
              key={index}
              labelName={initiative?.title!}
              customClass={styling.label}
              disableCloseIcon
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssociationCard;
