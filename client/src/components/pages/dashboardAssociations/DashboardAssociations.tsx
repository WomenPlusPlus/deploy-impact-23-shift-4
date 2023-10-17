import styling from "./DashboardAssociations.module.scss";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
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

  const dataInvite = [
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@gmail.com",
      userType: "Candidate",
      expiresIn: "7 days",
    },
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@gmail.com",
      userType: "Candidate",
      expiresIn: "7 days",
    },
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@gmail.com",
      userType: "Candidate",
      expiresIn: "7 days",
    },
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@gmail.com",
      userType: "Candidate",
      expiresIn: "7 days",
    },
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@gmail.com",
      userType: "Candidate",
      expiresIn: "7 days",
    },
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@gmail.com",
      userType: "Candidate",
      expiresIn: "7 days",
    },
  ];

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
            <IconMapPin color="var(--gray-dark)" />
            <p>{association?.address}</p>
            <p>|</p>
            <IconBrandLinkedin color="var(--gray-dark)" />
            <IconWorldWww color="var(--gray-dark)" />
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
          <h2 className={styling.titleTables}>Already invited</h2>
          <Table columns={headerInvited} data={dataInvite} />
        </CardContainer>

        <CardContainer className={styling.requests}>
          <h2 className={styling.titleTables}>Approval requests</h2>
          <Table columns={headerRequests} data={tableData} />
        </CardContainer>
      </div>
    </div>
  );
};

export default DashboardAssociations;
