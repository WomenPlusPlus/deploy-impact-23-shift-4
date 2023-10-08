import "./CandidateProfile.css";
import greyImage from "../../../media/gray_square.jpeg";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import ProfileCompletedFields from "./ProfileCompletedFields";
import { CardContainer } from "../../UI/container/CardContainer";
import {
  IconEdit,
  IconMapPin,
  IconBrandLinkedin,
  IconWorldWww,
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

  return (
    <div className="main-containerr">
      <div className="first-containerr">
        {/* Profile text */}
        <CardContainer className="profile-section-element profilee-component">
          <div className="avatar">
            <img src={greyImage} alt="Avatar" />
          </div>
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
            <div className="icon">
              <IconEdit color="black" style={{ cursor: "pointer" }} />
            </div>
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
                {list
                  .slice(0, Math.ceil(list.length / 2))
                  .map((field, index) => (
                    <div
                      key={index}
                      className="profile-completed-fields-element"
                    >
                      <ProfileCompletedFields
                        isCompleted={false}
                        field={field}
                      />
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
          <CardContainer className="profile-completed-element">
            <div className="profile-completed-edit-icon">
              <h3>Anonymous profile</h3>
              <IconEdit color="black" style={{ cursor: "pointer" }} />
            </div>
          </CardContainer>
        </div>
        <div>
          <CardContainer>
            <h3>Anonymous profile</h3>
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
