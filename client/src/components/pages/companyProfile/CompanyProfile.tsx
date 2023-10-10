import { IconEdit } from "@tabler/icons-react";
import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./CompanyProfile.module.css";

const CompanyProfile = () => {
  const company = {
    logo: "https://via.placeholder.com/150",
    name: "Dream Company",
    location: "New York, NY",
    size: "1000+ employees",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.",
  };

  return (
    <div className={styling.main}>
      <CardContainer className={styling.container}>
        <div className={styling.header}>
          <img className={styling.logo} src={company.logo} alt="Avatar" />

          <div>
            <h1>{company.name}</h1>

            <p>
              {company.location} | {company.size}
            </p>
          </div>

          <div className={styling.icon}>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className={styling.description}>{company.description}</div>
      </CardContainer>

      <CardContainer className={styling.container}>
        <h2>Values</h2>
      </CardContainer>

      <CardContainer className={styling.container}>
        <h2>Our job listings</h2>
      </CardContainer>
    </div>
  );
};

export default CompanyProfile;
