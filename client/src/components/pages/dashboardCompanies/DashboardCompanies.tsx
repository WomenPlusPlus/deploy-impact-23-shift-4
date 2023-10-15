import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";

import styling from "./DashboardCompanies.module.css";

const DashboardCompany = () => {
  const company_name = "Dream Company";
  const location = "New York, NY";

  const navigate = useNavigate();

  const progress = 80;
  return (
    <div className={styling.main}>
      {/* Profile component */}
      <CardContainer className={styling.profile}>
        <Avatar firstName={company_name} size={80} />

        <div className={styling.header}>
          <h2>Welcome back, {company_name}</h2>
          <p>{location}</p>
        </div>

        <IconExternalLink
          className={styling.icon}
          color="black"
          onClick={() => navigate("/company-profile")}
        />
      </CardContainer>

      {/* Progress bar */}
      <CardContainer className={styling.progress}>
        <p>You've completed {progress}% </p>

        <div className={styling.progressSection}>
          <div className={styling.progressBar}>
            <ProgressBar progress={progress} />
          </div>

          <Button>Complete your profile</Button>
        </div>
      </CardContainer>

      {/* Find Jobs */}
      <div className={styling.section}>
        <CardContainer className={styling.card}>
          <h1>Newest matches</h1>
          <HorizontalCard avatar firstName="John" lastName="Doe" />
          <HorizontalCard avatar firstName="John" lastName="Doe" />
        </CardContainer>

        <CardContainer className={styling.card}>
          <h1>Our listings</h1>
          <HorizontalCard avatar={false} />
        </CardContainer>
      </div>
    </div>
  );
};

export default DashboardCompany;
