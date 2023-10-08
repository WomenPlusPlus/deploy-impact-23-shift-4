import React, { useState } from "react";
import "./CandidateProfile.css";
import Avatar from "../../UI/avatar/Avatar";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
import { Labels } from "../../UI/labels/Label";
import {
  IconEdit,
  IconMapPin,
  IconBrandLinkedin,
  IconWorldWww,
  IconAffiliate,
} from "@tabler/icons-react";

const CandidateProfile = () => {
  const name = "John Doe";
  const status = "Looking for a job";
  const city = "Zurich";
  const country = "CH";
  const progress = 80;
  const list = [
    "Personal details",
    "Skills",
    "Values",
    "Documents",
    "Privacy",
    "Type of Jobs",
    "Langiages",
  ];

  const associations = ["Woman++", "proFemmes", "Coders", "Kpi"];

  // State to manage the list of labels
  const [associationLabels, setAssociationLabels] = useState(associations);

  // Function to handle label deletion
  const handleLabelDelete = (labelToRemove: string) => {
    const updatedLabels = associationLabels.filter(
      (label) => label !== labelToRemove
    );
    setAssociationLabels(updatedLabels);
  };

  return (
    <div className="first-containerr">
      {/* Profile text */}
      <CardContainer className="profile-section-element profilee-component">
        <Avatar size={80} firstName="John" lastName="Doe"/>

        <div>
          <div className="user-name">
            <h3>{name}</h3>
            <h4>{status}</h4>
          </div>

          <div className="location">
            <IconMapPin color="black" />
            <p>
              {city}, {country}
            </p>
            <p>|</p>
            <IconBrandLinkedin color="black" />
            <IconWorldWww color="black" />
          </div>
        </div>

        <div className="open-icon">
          <IconEdit color="black" style={{ cursor: "pointer" }} />
        </div>
      </CardContainer>

      {/* Profile completed */}
      <div className="profile-completed-component">
        <CardContainer className="profile-completed-element">
          <div className="profile-completed-edit-icon">
            <h3>Your profile is {progress} complete.</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>

          <ProgressBar progress={progress} height="1.5rem" />

          {/* Fields completed */}
          <div className="profile-completed-fields-component">
            <div className="column">
              {list.slice(0, Math.ceil(list.length / 2)).map((field, index) => (
                <div key={index} className="profile-completed-fields-element">
                  <ProfileCompletedFields isCompleted={false} field={field} />
                </div>
              ))}
            </div>

            <div className="column">
              {list.slice(Math.ceil(list.length / 2)).map((field, index) => (
                <div key={index} className="profile-completed-fields-element">
                  <ProfileCompletedFields isCompleted={true} field={field} />
                </div>
              ))}
            </div>
          </div>
        </CardContainer>

        {/* Anonymous profile */}
        <CardContainer className="profile-completed-element">
          <div className="profile-completed-edit-icon">
            <h3>Anonymous profile</h3>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </CardContainer>
      </div>

      {/* Associations */}
      <div>
        <CardContainer className="association-container">
          <div className="profile-completed-edit-icon">
            <h2>Associations</h2>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
          <div className="association-container-labels">
            {associationLabels.map((label, index) => (
              <Labels
                key={index}
                icon={<IconAffiliate />}
                labelName={label}
                onCloseIcon={() => handleLabelDelete(label)}
              />
            ))}
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default CandidateProfile;
