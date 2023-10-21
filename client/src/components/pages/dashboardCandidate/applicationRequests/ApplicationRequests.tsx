import { Space, Table } from "antd";
import { CardContainer } from "../../../UI/container/CardContainer";
import { useState } from "react";
import styling from "./ApplicationRequests.module.scss";
import ToggleModal from "../../../shared/toggleModal/ToggleModal";

const ApplicationRequests = () => {
  const data = [
    {
      key: "1",
      position: "Frontend Developer",
      company: "The Dream Company",
    },
    {
      key: "2",
      position: "Fullstack Developer",
      company: "Yellow Company",
    },
    {
      key: "3",
      position: "React Developer",
      company: "Yeezy Company",
    },
  ];

  const strings = [
    "Job search preferences",
    "Languages ",
    "Contact info ",
    "Uploaded documents",
  ];

  const [tableData, setTableData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrings, setSelectedStrings] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null); // Initialize as null

  const handleOk = (enabledStrings: string[]) => {
    setIsModalOpen(false);
    if (selectedRecord) {
      console.log(`Accepted: ${selectedRecord.position}`);
      console.log("Enabled Strings:", enabledStrings);
      const updatedData = tableData.filter(
        (item) => item.key !== selectedRecord.key
      );
      setTableData(updatedData);
      setSelectedRecord(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleToggle = (index: number) => {
    const updatedSelectedStrings = [...selectedStrings];
    updatedSelectedStrings[index] = !selectedStrings[index];
    setSelectedStrings(updatedSelectedStrings);
  };

  const handleReview = (record: any) => {
    setSelectedRecord(record); // Set the selected record
    setIsModalOpen(true);
  };

  const handleReject = (record: any) => {
    console.log(`Rejected: ${record.position}`);
    // Filter out the row with the rejected candidate
    const updatedData = tableData.filter((item) => item.key !== record.key);
    setTableData(updatedData);
  };

  const headerRequests = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Approval",
      key: "approval",
      render: (_: any, record: any) => (
        <Space>
          <button
            className={styling.accept}
            onClick={() => handleReview(record)}
          >
            Review
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
  return (
    <>
      <CardContainer className={styling.requests}>
        <h1 className={styling.titleTables}>Application package requests</h1>
        <Table columns={headerRequests} dataSource={tableData} />
      </CardContainer>
      <ToggleModal
        visible={isModalOpen}
        strings={strings}
        selectedStrings={selectedStrings}
        title="Application package"
        subtitle="The Dream company has requested your application package for job Developer, what would you like to share with them?"
        buttonText="Share your application package"
        onToggle={handleToggle}
        onAcceptWithEnabledStrings={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ApplicationRequests;
