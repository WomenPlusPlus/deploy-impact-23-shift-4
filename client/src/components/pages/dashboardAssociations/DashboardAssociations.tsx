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
import { Space, message } from "antd";
import { useEffect, useState } from "react";
import SendInviteModal from "../../shared/sendInvite/SendInviteModal";
import { useNavigate } from "react-router-dom";
import {
  getAssociationById,
  updateAssociationById,
} from "../../../api/associations";
import { sendInvite } from "../../../api/invite";
import { getAllUsers } from "../../../api/user";

interface Payload {
  name: string;
  user_type: string | null;
  recipient_email: string;
  association: string;
}

const DashboardAssociations = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id;
  //State
  const [association, setAssociation] = useState<any>(null);
  const [isSendInviteOpen, setSendInviteOpen] = useState(false);
  const [defaultOption, setDefaultOption] = useState("");

  /**
   * Sends the invite to the backend
   * @param payload - The payload to be sent to the backend
   */
  const handleSendInvite = async (payload: Payload) => {
    const payloadInvite = {
      user_type: payload?.user_type,
      recipient_email: payload?.recipient_email,
      association: association?.association_name,
    };

    // Check if user already exists in the database
    const users = await getAllUsers();
    const user = users.find(
      (user: any) => user.email === payload.recipient_email
    );

    if (user) {
      message.error("User already exists");
      return;
    }

    if (!association.invites) {
      association.invites = [];
    }

    // Send invite
    const isInviteSent = await sendInvite(payloadInvite);

    const payloadInvites = {
      name: payload?.name,
      email: payload?.recipient_email,
      user_type: payload?.user_type,
      createdAt: new Date(),
    };

    // Update association invites array
    await updateAssociationById(association?.user_id, {
      invites: [...association?.invites, payloadInvites],
    });

    setSendInviteOpen(false);

    fetchAssociation();

    if (isInviteSent?.success) {
      message.success("Invite sent");
    } else {
      message.error("Error sending invite. Please try again");
    }
  };

  /**
   * Opens the send invite modal
   * @param defaultOption - The default option to be selected
   */
  const handleOpenInvite = (defaultOption: any) => {
    setDefaultOption(defaultOption);
    setSendInviteOpen(true);
  };

  /**
   * Fetches the association data object by id
   */
  const fetchAssociation = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth?.user?.id;

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
      dataIndex: "user_type",
      key: "user_type",
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
  const dataInvite = association?.invites?.map((invite: any, index: number) => {
    const inviteDate = new Date(invite?.createdAt);
    const timeDifference = today.getTime() - inviteDate.getTime();

    const expiresInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return {
      key: index,
      name: invite?.name,
      email: invite?.email,
      user_type: invite?.user_type,
      expiresIn: expiresInDays > 0 ? `${expiresInDays} days` : "Expired",
    };
  });

  const [tableData, setTableData] = useState(data);

  const handleAccept = (record: any) => {
    console.log(`Accepted: ${record?.candidate}`);
    // Filter out the row with the accepted candidate
    const updatedData = tableData.filter((item) => item?.key !== record?.key);
    setTableData(updatedData);
  };

  const handleReject = (record: any) => {
    console.log(`Rejected: ${record?.candidate}`);
    // Filter out the row with the rejected candidate
    const updatedData = tableData.filter((item) => item?.key !== record?.key);
    setTableData(updatedData);
  };

  console.log(association);
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

        <IconExternalLink
          color="var(--gray-dark)"
          onClick={() => navigate(`/association-profile/${userId}`)}
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
            onClick={() => {
              handleOpenInvite("Candidate");
            }}
          >
            Invite
          </Button>
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
            onClick={() => {
              handleOpenInvite("Company");
            }}
          >
            Invite
          </Button>
        </CardContainer>
      </div>
      <SendInviteModal
        isOpen={isSendInviteOpen}
        defaultOption={defaultOption}
        onClose={() => setSendInviteOpen(false)}
        handleSend={handleSendInvite}
      />

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
