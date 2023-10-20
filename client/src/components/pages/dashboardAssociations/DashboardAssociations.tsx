import styling from "./DashboardAssociations.module.scss";
import {
  IconBrandLinkedin,
  IconExternalLink,
  IconMapPin,
  IconWorldWww,
} from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";
import Table from "../../UI/table/Table";
import { Space } from "antd";
import { useEffect, useState } from "react";
import SendInviteModal from "../../shared/sendInvite/SendInviteModal";
import { useNavigate } from "react-router-dom";
import { getAssociationById } from "../../../api/associations";

const DashboardAssociations = () => {
  const navigate = useNavigate();

  //State
  const [association, setAssociation] = useState<any>(null);

  /**
   * Fetches the association data object by id
   */
  const fetchAssociation = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth.user.id;

    if (userId) {
      const association = await getAssociationById(userId);
      setAssociation(association);
    }
  };

  useEffect(() => {
    fetchAssociation();
  }, []);

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
          <button
            className={styling.accept}
            onClick={() => handleAccept(record)}
          >
            Accept
          </button>
          <button
            className={styling.reject}
            onClick={() => handleReject(record)}
          >
            Decline
          </button>
        </Space>
      ),
    },
  ];

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
      title: "User type",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Expires in",
      dataIndex: "expiresIn",
      key: "expiresIn",
    },
  ];

  const data = [
    {
      key: "1",
      candidate: "Anna Brown",
      project: "deploy(impact)",
    },
    {
      key: "2",
      candidate: "Roger Nilsen",
      project: "deploy(impact)",
    },
    {
      key: "3",
      candidate: "Joe Black",
      project: "deploy(impact)",
    },
  ];

  const today = new Date();
  const dataInvite = association?.invites.map((invite: any, index: number) => {
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

  const [tableData, setTableData] = useState(data);
  const [isSendInviteCandidateOpen, setSendInviteCandidateOpen] =
    useState(false);
  const [isSendInviteCompanyOpen, setSendInviteCompanyOpen] = useState(false);

  const handleAccept = (record: any) => {
    console.log(`Accepted: ${record.candidate}`);
    // Filter out the row with the accepted candidate
    const updatedData = tableData.filter((item) => item.key !== record.key);
    setTableData(updatedData);
  };

  const handleReject = (record: any) => {
    console.log(`Rejected: ${record.candidate}`);
    // Filter out the row with the rejected candidate
    const updatedData = tableData.filter((item) => item.key !== record.key);
    setTableData(updatedData);
  };

  const handleSendCompanyInvite = (email: any) => {
    console.log(`Sending invite to company${email}`);
    setSendInviteCompanyOpen(false);
  };

  const handleSendCandidateInvite = (email: any) => {
    console.log(`Sending invite to candidate ${email}`);
    setSendInviteCandidateOpen(false);
  };

  return (
    <div className={styling.main}>
      {/* Profile component */}
      <CardContainer className={styling.profile}>
        {association?.logo ? (
          <img className={styling.logo} src={association?.logo} alt="Avatar" />
        ) : (
          <Avatar firstName={association?.association_name} size={80} />
        )}

        <div className={styling.header}>
          <h2 className={styling.headerTitle}>
            Welcome back, {association?.association_name}
          </h2>
          <div className={styling.location}>
            <IconMapPin />
            <p>{association?.address}</p>
            <p>|</p>
            <IconBrandLinkedin />
            <IconWorldWww />
          </div>
        </div>

        <IconExternalLink
          color="var(--gray-dark)"
          onClick={() => navigate("association-profile")}
        />
      </CardContainer>

      <div className={styling.invites}>
        <CardContainer className={styling.inviteSection}>
          <h1 className={styling.inviteHeader}>Invite candidates</h1>
          <p>
            Share your unique invitation link with potential candidates and
            let's connect them with their dream jobs.
          </p>
          <Button
            className={styling.inviteButton}
            onClick={() => setSendInviteCandidateOpen(true)}
          >
            Invite
          </Button>
          <SendInviteModal
            isOpen={isSendInviteCandidateOpen}
            onClose={() => setSendInviteCandidateOpen(false)}
            handleSend={handleSendCandidateInvite}
          />
        </CardContainer>

        <CardContainer className={styling.inviteSection}>
          <h1 className={styling.inviteHeader}>Invite companies</h1>
          <p>
            {" "}
            Share your exclusive invitation link with organizations seeking
            skilled professionals, and let's help them find their ideal
            candidates.
          </p>
          <Button
            className={styling.inviteButton}
            onClick={() => setSendInviteCompanyOpen(true)}
          >
            Invite
          </Button>
          <SendInviteModal
            isOpen={isSendInviteCompanyOpen}
            onClose={() => setSendInviteCompanyOpen(false)}
            handleSend={handleSendCompanyInvite}
          />
        </CardContainer>
      </div>

      <div className={styling.tables}>
        <CardContainer className={styling.requests}>
          <h1 className={styling.titleTables}>Already invited</h1>
          <Table columns={headerInvited} data={dataInvite} />
        </CardContainer>

        <CardContainer className={styling.requests}>
          <h1 className={styling.titleTables}>Approval requests</h1>
          <Table columns={headerRequests} data={tableData} />
        </CardContainer>
      </div>
    </div>
  );
};

export default DashboardAssociations;
