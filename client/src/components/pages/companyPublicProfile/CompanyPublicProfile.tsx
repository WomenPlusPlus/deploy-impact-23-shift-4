import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./CompanyPublicProfile.module.css";
import Tabs from "../../UI/tabs/Tabs";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../../api/companies";
import { useCallback, useEffect, useState } from "react";
import { Company } from "../types/types";

const CompanyPublicProfile = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<Company>();

  const fetchCompany = useCallback(async () => {
    if (id) {
      const company = await getCompanyById(id);
      setCompany(company);
    }
  }, [id]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const jobs = (
    <div className={styling.mainSection}>
      <div className={styling.sectionHeader}>
        <h2 className={styling.titles}>Published jobs</h2>
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
  );

  const about = (
    <div className={styling.mainSection}>
      <h2 className={styling.titles}>About the company</h2>

      <p>This is about the company</p>
    </div>
  );

  const culture = (
    <div className={styling.mainSection}>
      <h2 className={styling.titles}>Company culture</h2>

      <p>This is about the culture</p>
    </div>
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
      <CardContainer className={styling.container}>
        <div className={styling.header}>
          <img className={styling.logo} src={company?.logo} alt="Avatar" />

          <div>
            <h1>{company?.company_name}</h1>

            <p>
              {company?.address} | {"> 500 employees"}
            </p>
          </div>
        </div>
      </CardContainer>

      <CardContainer className={styling.container}>
        <Tabs defaultActiveKey={"1"} centered items={tabs} />
      </CardContainer>
    </div>
  );
};

export default CompanyPublicProfile;
