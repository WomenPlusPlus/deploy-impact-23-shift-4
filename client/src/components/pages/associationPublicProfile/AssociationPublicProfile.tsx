import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "../../UI/tabs/Tabs";
import { CardContainer } from "../../UI/container/CardContainer";
import PublicIniciativesComponent from "./tabs/iniciativesTab/Iniciatives";

import { getAssociationById } from "../../../api/associations";

import { Association } from "../../../types/types";

import styling from "./AssociationPublicProfile.module.scss";

import { IconMapPin, IconWorldWww } from "@tabler/icons-react";

const AssociationPublicProfile = () => {
  //State
  const [association, setAssociation] = useState({} as Association);
  const { id } = useParams();
  /**
   * Fetches the association data object by id
   */
  const fetchAssociation = async (userId: string) => {
    if (userId) {
      const association = await getAssociationById(userId);
      setAssociation(association);
    }
  };

  useEffect(() => {
    fetchAssociation(id || "");
  }, []);

  const about = (
    <CardContainer>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>About us</h2>

        <p className={styling.text}>{association?.description}</p>
      </div>
    </CardContainer>
  );

  const tabs = [
    {
      label: "About the association",
      key: "1",
      children: about,
    },
    {
      label: "Iniciatives",
      key: "2",
      children: <PublicIniciativesComponent association={association} />,
    },
  ];

  return (
    <div className={styling.main}>
      <div className={styling.container}>
        <div className={styling.header}>
          <img className={styling.logo} src={association?.logo} alt="Avatar" />

          <div>
            <h1 className={styling.headerTitle}>
              {association?.association_name}
            </h1>

            <div className={styling.subheader}>
              <IconMapPin />
              {association?.address ? (
                <p>{association?.address}</p>
              ) : (
                <p>No address</p>
              )}
              <p>|</p>
              {association?.url ? (
                <a href={association?.url} target="_blank" rel="noreferrer">
                  <IconWorldWww />
                </a>
              ) : (
                <p>No url</p>
              )}
            </div>
          </div>

          <div className={styling.icon}></div>
        </div>
      </div>

      <div className={styling.container}>
        <Tabs centered={false} items={tabs} />
      </div>
    </div>
  );
};

export default AssociationPublicProfile;
