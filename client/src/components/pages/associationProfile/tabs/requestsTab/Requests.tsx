import { Space } from "antd";
import { Association } from "../../../../../types/types";
import { CardContainer } from "../../../../UI/container/CardContainer";
import Table from "../../../../UI/table/Table";
import styling from "./Requests.module.scss";

const RequestsComponent = ({ association }: { association: Association }) => {
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
      title: "Approval",
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

  return (
    <CardContainer className={styling.requestsTab}>
      <h1 className={styling.titleTables}>Approval requests</h1>
      <Table columns={headerRequests} data={data} />
    </CardContainer>
  );
};

export default RequestsComponent;
