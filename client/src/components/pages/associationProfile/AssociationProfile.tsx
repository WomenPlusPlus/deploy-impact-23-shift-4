import {
  IconBrandLinkedin,
  IconEdit,
  IconMapPin,
  IconWorldWww,
} from "@tabler/icons-react";
import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./AssociationProfile.module.scss";
import Tabs from "../../UI/tabs/Tabs";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { Button } from "../../UI/button/Button";
import { getAssociationById } from "../../../api/associations";
import { useEffect, useState } from "react";
import Table from "../../UI/table/Table";
import { Space } from "antd";

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

  const headerInvited = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Expires in",
      dataIndex: "expiresIn",
      key: "expiresIn",
    },
  ];

  const headerRequests = [
    {
      title: "Candidate",
      dataIndex: "candidate",
      key: "candidate",
    },
    {
      title: "Project / Certification",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Appproval",
      key: "approval",
      render: (_: any, record: any) => (
        <Space>
          <button className={styling.accept}>Accept</button>
          <button className={styling.reject}>Decline</button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      candidate: "John Brown",
      project: "deploy(impact)",
    },
    {
      key: "2",
      candidate: "Jim Green",
      project: "deploy(impact)",
    },
    {
      key: "3",
      candidate: "Joe Black",
      project: "deploy(impact)",
    },
  ];

  const today = new Date();

  const inviteCandidate = association?.invites
    .filter((invite: any) => invite.user_type === "candidate")
    .map((invite: any, index: number) => {
      const inviteDate = new Date(invite.createdAt);
      const timeDifference = today.getTime() - inviteDate.getTime();

      const expiresInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      return {
        key: index,
        name: invite.name,
        email: invite.email,
        userType: invite.user_type,
        expiresIn: expiresInDays > 0 ? `${expiresInDays} days` : "Expired",
      };
    });

  const inviteCompany = association?.invites
    .filter((invite: any) => invite.user_type === "company")
    .map((invite: any, index: number) => {
      const inviteDate = new Date(invite.createdAt);
      const timeDifference = today.getTime() - inviteDate.getTime();

      const expiresInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      return {
        key: index,
        name: invite.name,
        email: invite.email,
        userType: invite.user_type,
        expiresIn: expiresInDays > 0 ? `${expiresInDays} days` : "Expired",
      };
    });

  console.log(association);

  const iniciatives = (
    <CardContainer>
      <div className={styling.mainSection}>
        <div className={styling.sectionHeader}>
          <h2 className={styling.titles}>Latest iniciatives</h2>
          <Button className={styling.button}>Add new iniciative</Button>
        </div>
        {association?.iniciatives.map((iniciative: any) => (
          <HorizontalCard
            avatar={true}
            button="Details"
            firstName={association.association_name}
            title={iniciative.name}
            subtitle={iniciative.description}
          />
        ))}
      </div>
    </CardContainer>
  );

  const invites = (
    <CardContainer className={styling.invitesTab}>
      <div className={styling.invites}>
        <div className={styling.inviteHeader}>
          <h1 className={styling.titleTables}>Candidates invited</h1>
          <Button
            className={styling.button}
            onClick={() => console.log("invite")}
          >
            Invite
          </Button>
        </div>

        <Table columns={headerInvited} data={inviteCandidate} />
      </div>

      <div className={styling.invites}>
        <div className={styling.inviteHeader}>
          <h1 className={styling.titleTables}>Companies invited</h1>
          <Button
            className={styling.button}
            onClick={() => console.log("invite")}
          >
            Invite
          </Button>
        </div>

        <Table columns={headerInvited} data={inviteCompany} />
      </div>
    </CardContainer>
  );

  const requests = (
    <CardContainer className={styling.requestsTab}>
      <h1 className={styling.titleTables}>Approval requests</h1>

      <Table columns={headerRequests} data={data} />
    </CardContainer>
  );

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
      children: iniciatives,
    },
    {
      label: "Invites",
      key: "2",
      children: invites,
    },
    {
      label: "Requests",
      key: "3",
      children: requests,
    },
    {
      label: "About the association",
      key: "4",
      children: about,
    },
  ];

  return (
    <div className={styling.main}>
      <div className={styling.container}>
        <div className={styling.header}>
          <img className={styling.logo} src={association?.logo} alt="Avatar" />

          <div>
            <h1 className={styling.headerTitle}>{association?.association_name}</h1>

            <div className={styling.subheader}>
              <IconMapPin />
              <p>{association?.address}</p>
              <p>|</p>
              <IconBrandLinkedin />
              <IconWorldWww />
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
