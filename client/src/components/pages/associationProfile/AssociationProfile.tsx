import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../../UI/tabs/Tabs";
import { CardContainer } from "../../UI/container/CardContainer";
import InvitesComponent from "./tabs/invitesTab/Invites";
import RequestsComponent from "./tabs/requestsTab/Requests";
import IniciativesComponent from "./tabs/iniciativesTab/Iniciatives";

import { getAssociationById } from "../../../api/associations";

import { Association } from "../../../types/types";

import styling from "./AssociationProfile.module.scss";

import {
  IconBrandLinkedin,
  IconEdit,
  IconMapPin,
  IconWorldWww,
} from "@tabler/icons-react";
import Spinner from "../../UI/spinner/Spinner";

const AssociationProfile = () => {
  //State
  const [association, setAssociation] = useState({} as Association);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /**
   * Fetches the association data object by id
   */
  const fetchAssociation = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth?.user?.id;

    if (userId) {
      const association = await getAssociationById(userId);
      setAssociation(association);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociation();
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
      label: "Iniciatives",
      key: "1",
      children: (
        <IniciativesComponent
          association={association}
          callback={fetchAssociation}
        />
      ),
    },
    {
      label: "Invites",
      key: "2",
      children: (
        <InvitesComponent
          association={association}
          callback={fetchAssociation}
        />
      ),
    },
    {
      label: "Requests",
      key: "3",
      children: <RequestsComponent association={association} />,
    },
    {
      label: "About the association",
      key: "4",
      children: about,
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }

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
                <p>Add address</p>
              )}
              <p>|</p>
              {association?.url ? (
                <a href={association?.url} target="_blank" rel="noreferrer">
                  <IconWorldWww />
                </a>
              ) : (
                <p>Add url</p>
              )}
            </div>
          </div>

          <div className={styling.icon}>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>

      <div className={styling.container}>
        <Tabs centered={false} items={tabs} />
      </div>
    </div>
  );
};

export default AssociationProfile;
