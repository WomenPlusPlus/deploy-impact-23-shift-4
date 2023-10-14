import styling from "./DashboardAssociations.module.scss";
import { ProgressBar } from "../../UI/progressbar/ProgressBar";
import { IconBrandLinkedin, IconExternalLink } from "@tabler/icons-react";
import { Button } from "../../UI/button/Button";
import { CardContainer } from "../../UI/container/CardContainer";
import Avatar from "../../UI/avatar/Avatar";
import Table from "../../UI/table/Table";
import { Space } from "antd";
import { useState } from "react";

const DashboardAssociations = () => {
  const association_name = "Woman++";
  const location = "Zürich, Switzerland";

  const progress = 80;

  const header = [
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

  const [tableData, setTableData] = useState(data);

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

  return (
    <div className={styling.main}>
      {/* Profile component */}
      <CardContainer className={styling.profile}>
        <Avatar firstName={association_name} size={80} />

        <div className={styling.header}>
          <h2>Welcome back, {association_name}</h2>
          <p className={styling.subtitle}>
            {location} | <IconBrandLinkedin />
          </p>
        </div>

        <IconExternalLink color="var(--gray-dark)" />
      </CardContainer>

      {/* Do we need this for associations?????? */}
      {/* <CardContainer className={styling.progress}>
        <p>You've completed {progress}% </p>

        <div className={styling.progressSection}>
          <div className={styling.progressBar}>
            <ProgressBar progress={progress} />
          </div>

          <Button>Complete your profile</Button>
        </div>
      </CardContainer> */}

      <div className={styling.invites}>
        <CardContainer className={styling.inviteSection}>
          <h1 className={styling.inviteHeader}>Invite candidates</h1>
          <p>
            Share your unique invitation link with potential candidates and
            let's connect them with their dream jobs.
          </p>
          <Button className={styling.inviteButton}>Invite</Button>
        </CardContainer>

        <CardContainer className={styling.inviteSection}>
          <h1 className={styling.inviteHeader}>Invite companies</h1>
          <p>
            {" "}
            Share your exclusive invitation link with organizations seeking
            skilled professionals, and let's help them find their ideal
            candidates.
          </p>
          <Button className={styling.inviteButton}>Invite</Button>
        </CardContainer>
      </div>

      <CardContainer className={styling.requests}>
        <Table columns={header} data={tableData} />
      </CardContainer>
    </div>
  );
};

export default DashboardAssociations;
