import { IconEdit } from "@tabler/icons-react";
import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./AssociationProfile.module.css";
import Tabs from "../../UI/tabs/Tabs";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { Button } from "../../UI/button/Button";
import { getAssociationById } from "../../../api/associations";
import { useEffect, useState } from "react";

const AssociationProfile = () => {
  //State
  const [association, setAssociation] = useState<any>(null);

  /**
   * Fetches the association data object by id
   */
  const fetchAssociation = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth.user.id;
    console.log(userId);

    if (userId) {
      const association = await getAssociationById(userId);
      console.log(association);
      setAssociation(association);
    }
  };

  useEffect(() => {
    fetchAssociation();
  }, []);

  const iniciatives = (
    <div className={styling.mainSection}>
      <div className={styling.sectionHeader}>
        <h2 className={styling.titles}>Published jobs</h2>
        <Button className={styling.button}>Add new iniciative</Button>
      </div>
      <HorizontalCard
        avatar={true}
        button="Details"
        firstName="Deploy(impact)"
        title="deploy(impact)"
        subtitle="Description"
      />
      <HorizontalCard
        avatar={true}
        button="Details"
        firstName="Deploy(impact)"
        title="deploy(impact)"
        subtitle="Description"
      />
      <HorizontalCard
        avatar={true}
        button="Details"
        firstName="Deploy(impact)"
        title="deploy(impact)"
        subtitle="Description"
      />
    </div>
  );

  const about = (
    <div className={styling.mainSection}>
      <h2 className={styling.titles}>Invites</h2>

      <p className={styling.text}>This is about the company</p>
    </div>
  );

  const culture = (
    <div className={styling.mainSection}>
      <h2 className={styling.titles}>About us</h2>

      <p className={styling.text}>{association?.description}</p>
    </div>
  );

  const tabs = [
    {
      label: "Iniciatives",
      key: "1",
      children: iniciatives,
    },
    {
      label: "Invites",
      key: "2",
      children: about,
    },
    {
      label: "About the association",
      key: "3",
      children: culture,
    },
  ];

  return (
    <div className={styling.main}>
      <CardContainer className={styling.container}>
        <div className={styling.header}>
          <img className={styling.logo} src={association?.logo} alt="Avatar" />

          <div>
            <h1>{association?.association_name}</h1>

            <p className={styling.subtitle}>
              {association?.address} | {association?.size}
            </p>
          </div>

          <div className={styling.icon}>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </div>
      </CardContainer>

      <CardContainer className={styling.container}>
        <Tabs defaultActiveKey={"1"} centered items={tabs} />
      </CardContainer>
    </div>
  );
};

export default AssociationProfile;
