import { Association } from "../../../types/types";
import { CardContainer } from "../../../../UI/container/CardContainer";
import { Button } from "../../../../UI/button/Button";
import Table from "../../../../UI/table/Table";
import styling from "./Invites.module.css";

interface Invite {
  key: number;
  name: string;
  email: string;
  userType: string;
  expiresIn: string;
}

const InvitesComponent = ({ association }: { association: Association }) => {
  const today = new Date();

  const inviteCandidateData: Invite[] = (association?.invites || [])
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

  const inviteCompanyData: Invite[] = (association?.invites || [])
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

  return (
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

        <Table columns={headerInvited} data={inviteCandidateData} />
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

        <Table columns={headerInvited} data={inviteCompanyData} />
      </div>
    </CardContainer>
  );
};

export default InvitesComponent;
