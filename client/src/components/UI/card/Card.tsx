import React, { useEffect } from "react";
import styling from "./Card.module.css";
import { IconBookmark, IconExternalLink } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import Avatar from "../avatar/Avatar";
import { Candidate, Company } from "../../../types/types";
import { updateCompanyById } from "../../../api/companies";

interface CardProps {
  company?: Company;
  candidate?: Candidate;
  logo?: string;
  header?: string;
  subheader?: string;
  associations?: string[];
  description?: string;
  skills?: object[] | undefined;
  values?: string[];
  isBookmarkVisible?: boolean;
  onClickRedirect?: () => void;
}

const Card: React.FC<CardProps> = ({
  logo,
  header,
  company,
  candidate,
  subheader,
  description,
  associations,
  skills,
  values,
  isBookmarkVisible = false,
  onClickRedirect,
}) => {
  // pass company, pass candidateID
  // state
  const [isSaved, setIsSaved] = React.useState(false);

  // functions
  const handleSaveShortlist = async () => {
    if (isBookmarkVisible) {
      // add to local storage
      setIsSaved(!isSaved);
      // if not yet saved
      if (!isSaved) {
        // Check if the job is already saved
        const isJobSaved = company?.saved_items?.includes(
          candidate?.user_id || ""
        );
        if (isJobSaved) {
          return;
        } else {
          localStorage.setItem(
            "saved_items",
            JSON.stringify([
              ...(company?.saved_items || []),
              candidate?.user_id,
            ])
          );
          await updateCompanyById(company?.user_id || "", {
            saved_items: [...(company?.saved_items || []), candidate?.user_id],
          });
        }
      } else {
        // if already saved
        const savedItems = JSON.parse(
          localStorage.getItem("saved_items") || "[]"
        );
        // Check if the job is already saved in local storage
        const isJobSaved = savedItems.includes(candidate?.user_id);
        if (!isJobSaved) {
          return;
        }
        const filtered = savedItems.filter(
          (savedItem: string) => savedItem !== candidate?.user_id
        );
        localStorage.setItem("saved_items", JSON.stringify(filtered));
        await updateCompanyById(company?.user_id || "", {
          saved_items: filtered,
        });
      }
    }
  };

  const renderBookmark = () => {
    if (isBookmarkVisible) {
      if (isSaved || company?.saved_items?.includes(candidate?.user_id || "")) {
        return (
          <IconBookmark
            className={styling.savedBookmark}
            onClick={handleSaveShortlist}
          />
        );
      } else {
        return <IconBookmark onClick={handleSaveShortlist} />;
      }
    }
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("saved_items") || "[]");
    if (savedItems?.includes(candidate?.id)) {
      setIsSaved(true);
    }
  }, []);

  return (
    <div className={styling.candidateCard}>
      <div className={styling.cardHeader}>
        <Avatar
          firstName={candidate?.first_name}
          lastName={candidate?.last_name}
          size={50}
        />
        <div>
          <h2 className={styling.header} onClick={onClickRedirect}>
            {header}
          </h2>
          <p className={styling.subheader}>{subheader}</p>
        </div>
        <div className={styling.topRightIcon}>
          {renderBookmark()}
          <IconExternalLink color="black" onClick={onClickRedirect} />
        </div>
      </div>

      <div className={styling.description}>
        <p>{description}</p>
      </div>

      <div className={styling.container}>
        <div className={styling.labelContainer}>
          {associations?.map((association, index) => (
            <Labels
              key={index}
              labelName={association}
              customClass={styling.associationLabel}
              disableCloseIcon
            />
          ))}
        </div>

        <div className={styling.labelContainer}>
          {skills?.map((skill: any, index) => (
            <Labels
              key={index}
              labelName={skill?.skill_name}
              customClass={styling.label}
              disableCloseIcon
            />
          ))}
        </div>

        <div className={styling.labelContainer}>
          {values?.map((value, index) => (
            <Labels
              key={index}
              labelName={value}
              customClass={styling.label}
              disableCloseIcon
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
