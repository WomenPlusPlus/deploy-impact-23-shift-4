import "./CandidateProfile.css";
import greyImage from "../../../media/gray_square.jpeg";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
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
  const list = ["name", "status", "city", "country"];

  return (
    <div className="main-containerr">
      <div className="first-containerr">
        {/* Profile text */}
        <div className="profile-section-element profilee-component">
          <div className="avatar">
            <img src={greyImage} alt="Avatar" />
          </div>
          <div>
            <div className="user-name">
              <h3>{name}</h3>
              <h3>{status}</h3>
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
        </div>
        {/* Profile completed */}
        <div className="profile-completed-component">
          <div className="profile-completed-element">
            <IconEdit color="black" style={{ cursor: "pointer" }} />
            <h3>Your profile is {progress} complete.</h3>
            <ProgressBar progress={progress} />
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
                      <div className="icon">Icon</div>
                      <div className="text">{field}</div>
                      <div className="button">
                        bb
                        {/* Your button element here */}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="column">
                {list.slice(Math.ceil(list.length / 2)).map((field, index) => (
                  <div key={index} className="profile-completed-fields-element">
                    <div className="icon">Icon</div>
                    <div className="text">{field}</div>
                    <div className="button">
                      bb
                      {/* Your button element here */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="profile-completed-element">
            <h3>Your visible information</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
