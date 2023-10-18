import { IconEdit } from "@tabler/icons-react";
import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./CompanyProfile.module.css";
import Tabs from "../../UI/tabs/Tabs";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { Button } from "../../UI/button/Button";
import { useEffect, useState } from "react";
import AddEditJob from "../../shared/addEditJob/AddEditJob";
import { getCompanyById } from "../../../api/companies";
import { Company } from "../../pages/types/types";
import { addJob, getAllJobs } from "../../../api/jobs";

const CompanyProfile = () => {
  // const company = {
  //   logo: "https://via.placeholder.com/150",
  //   name: "Dream Company",
  //   location: "New York, NY",
  //   size: "1000+ employees",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.",
  // };

  // State
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState({} as Company);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  /**
   * Handles the OK button
   */
  const handlePayload = async (payload: object) => {
    console.log("Received payload from AddEditJob:", payload);
    await addJob(payload);

    setConfirmLoading(true);
    setOpen(false);
  };

  /**
   * Handle cancel button
   */
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  /**
   * Fetches the company data object by id
   */
  const fetchCompanyInfo = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth.user.id;

    const company = await getCompanyById(userId);
    const allJobs = await getAllJobs();
    const jobs = allJobs.map((job: Record<string, any>) => {
      // get all jobs that belong to this company
      if (job["company_id"] === userId) {
        return job;
      }
    });

    console.log("jobs", allJobs);
    setJobs(jobs);
    setCompany(company);
  };

  /**
   * Fetches the company data object by id
   */
  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  // Content for "Company jobs" tab
  const jobsTemp = (
    <div className={styling.mainSection}>
      <div className={styling.sectionHeader}>
        <h2 className={styling.titles}>Published jobs</h2>
        <Button onClick={showModal} className={styling.button}>
          Create new job
        </Button>
      </div>
      {jobs.map((job: Record<string, any>) => {
        return (
          <HorizontalCard
            avatar={true}
            button="Go to description"
            firstName={company.company_name}
            title={job.title}
            subtitle={job.description}
          />
        );
      })}
    </div>
  );

  // Content for "About the company" tab
  const about = (
    <div className={styling.mainSection}>
      <h2 className={styling.titles}>Company jobs</h2>

      <p>This is about the company</p>
    </div>
  );

  // Content for "Company culture" tab
  const culture = (
    <div className={styling.mainSection}>
      <h2 className={styling.titles}>Company culture</h2>

      <p>This is about the culture</p>
    </div>
  );

  // Tabs
  const tabs = [
    {
      label: "Company jobs",
      key: "1",
      children: jobsTemp,
    },
    {
      label: "About the company",
      key: "2",
      children: about,
    },
    {
      label: "Company culture",
      key: "3",
      children: culture,
    },
  ];

  return (
    <div className={styling.main}>
      <CardContainer className={styling.container}>
        <div className={styling.header}>
          <img className={styling.logo} src={company.logo} alt="Avatar" />

          <div>
            <h1>{company.company_name}</h1>

            <p>
              {company.address} | {company.company_size}
            </p>
          </div>

          <div className={styling.icon}>
            <IconEdit color="black" style={{ cursor: "pointer" }} />
          </div>
        </div>
      </CardContainer>

      <CardContainer className={styling.container}>
        <Tabs defaultActiveKey={"1"} centered items={tabs} />
      </CardContainer>

      <AddEditJob
        modalTitle="Create new job"
        open={open}
        onOk={handlePayload}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        companyId={company.user_id}
        associations={company.associations}
      />
    </div>
  );
};

export default CompanyProfile;
