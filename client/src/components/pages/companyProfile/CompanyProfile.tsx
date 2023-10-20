import { IconEdit } from "@tabler/icons-react";
import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./CompanyProfile.module.css";
import Tabs from "../../UI/tabs/Tabs";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { Button } from "../../UI/button/Button";

const CompanyProfile = () => {
  const company = {
    logo: "https://via.placeholder.com/150",
    name: "Dream Company",
    location: "New York, NY",
    size: "1000+ employees",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.",
  };

  const jobs = (
    <CardContainer className={styling.container}>
      <div className={styling.mainSection}>
        <div className={styling.sectionHeader}>
          <h2 className={styling.titles}>Published jobs</h2>
          <Button className={styling.button}>Create new job</Button>
        </div>
        <HorizontalCard
          avatar={true}
          button="Go to description"
          firstName="Laura"
          lastName="Purcaro"
        />
        <HorizontalCard
          avatar={true}
          button="Go to description"
          firstName="Laura"
          lastName="Purcaro"
        />
        <HorizontalCard
          avatar={true}
          button="Go to description"
          firstName="Laura"
          lastName="Purcaro"
        />
      </div>
    </CardContainer>
  );

  const about = (
    <CardContainer className={styling.container}>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>Company jobs</h2>

        <p>This is about the company</p>
      </div>
    </CardContainer>
  );

  const culture = (
    <CardContainer className={styling.container}>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>Company culture</h2>

        <p>This is about the culture</p>
      </div>
    </CardContainer>
  );

  const tabs = [
    {
      label: "Company jobs",
      key: "1",
      children: jobs,
    },
    {
      label: "About the company",
      key: "2",
      children: about,
    },
    {
      label: "Company culture",
      key: "3",
      children: culture,
    },
  ];

  return (
    <div className={styling.main}>
      <div className={styling.container}>
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
      </div>

      <Tabs centered={false} items={tabs} />
    </div>
  );
};

export default CompanyProfile;
