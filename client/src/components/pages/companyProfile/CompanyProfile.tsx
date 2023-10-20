import {
  IconBrandLinkedin,
  IconEdit,
  IconMapPin,
  IconWorldWww,
} from "@tabler/icons-react";
import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./CompanyProfile.module.css";
import Tabs from "../../UI/tabs/Tabs";
import { HorizontalCard } from "../../UI/card/HorizontalCard";
import { Button } from "../../UI/button/Button";
import { useEffect, useState } from "react";
import AddEditJob from "../../shared/addEditJob/AddEditJob";
import { getCompanyById, updateCompanyById } from "../../../api/companies";
import { Company } from "../../pages/types/types";
import { addJob, getAllJobs } from "../../../api/jobs";
import EditCompanyProfile from "../../shared/editCompanyProfile/EditCompanyProfile";
import { Spin } from "antd";
import Spinner from "../../UI/spinner/Spinner";

const CompanyProfile = () => {
  // State
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState({} as Company);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmEditCompanyLoading, setConfirmEditCompanyLoading] =
    useState(false);
  const [openEditJobModal, setOpenEditJobModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the toggle of the Add Job modal
   */
  const toggleAddJobModal = () => {
    setOpen(!open);
  };

  /**
   * Handles the toggle of the Edit Company modal
   */
  const toggleEditCompanyModal = () => {
    setOpenEditJobModal(!openEditJobModal);
  };

  /**
   * Handles the save and update of the company profile
   * @param payload the company data to update
   */
  const handleModalSave = async (payload: object) => {
    console.log("Received payload from EditCompanyProfile:", payload);
    await updateCompanyById(company.user_id, payload);

    setConfirmEditCompanyLoading(true);
    setOpenEditJobModal(false);
    fetchCompanyInfo();
  };

  /**
   * Handles the creation of a new job
   * @param payload the job data to add
   */
  const handleAddJobPayload = async (payload: object) => {
    console.log("Received payload from AddEditJob:", payload);
    await addJob(payload);

    setConfirmLoading(true);
    setOpen(false);
    fetchCompanyInfo();
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

    setJobs(jobs);
    setCompany(company);
    setIsLoading(true);
  };

  /**
   * Fetches the company data object by id
   */
  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  // Content for "Company jobs" tab
  const jobsTemp = (
    <CardContainer>
      <div className={styling.mainSection}>
        <div className={styling.sectionHeader}>
          <h2 className={styling.titles}>Published jobs</h2>
          <Button onClick={toggleAddJobModal} className={styling.button}>
            Create new job
          </Button>
        </div>
        {jobs.map((job: Record<string, any>, index: number) => {
          return (
            <HorizontalCard
              key={index}
              avatar={true}
              button="Go to description"
              firstName={company.company_name}
              title={job.title}
              subtitle={job.description}
            />
          );
        })}
      </div>
    </CardContainer>
  );

  // Content for "About the company" tab
  const about = (
    <CardContainer>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>About us</h2>

        <p>This is about the company</p>
      </div>
    </CardContainer>
  );

  // Content for "Company culture" tab
  const culture = (
    <CardContainer>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>Company culture</h2>

        <p>This is about the culture</p>
      </div>
    </CardContainer>
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

  const content = (
    <>
      <div className={styling.container}>
        <div className={styling.header}>
          <img className={styling.logo} src={company.logo} alt="Avatar" />

          <div>
            <h1 className={styling.title}>{company.company_name}</h1>

            <div className={styling.subtitle}>
              <IconMapPin />
              {company.address} | {company.company_size} employees |
              <IconBrandLinkedin /> <IconWorldWww />
            </div>
          </div>

          <div className={styling.icon}>
            <IconEdit
              color="black"
              style={{ cursor: "pointer" }}
              onClick={toggleEditCompanyModal}
            />
          </div>
          <EditCompanyProfile
            open={openEditJobModal}
            onOk={handleModalSave}
            onCancel={toggleEditCompanyModal}
            confirmLoading={confirmEditCompanyLoading}
            companyId={company.user_id}
            associations={company.associations}
            companyInfo={company}
          />
        </div>
      </div>

      <div className={styling.container}>
        <Tabs centered={false} items={tabs} />
      </div>

      <AddEditJob
        open={open}
        onOk={handleAddJobPayload}
        onCancel={toggleAddJobModal}
        confirmLoading={confirmLoading}
        companyId={company.user_id}
        associations={company.associations}
      />
    </>
  );

  return (
    <div className={styling.main}>{isLoading ? content : <Spinner />}</div>
  );
};

export default CompanyProfile;
