import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Tabs from "../../UI/tabs/Tabs";
import Spinner from "../../UI/spinner/Spinner";
import { Button } from "../../UI/button/Button";
import { HorizontalCard } from "../../UI/horizontalCard/HorizontalCard";
import { CardContainer } from "../../UI/container/CardContainer";
import AddEditJob from "../../shared/addEditJob/AddEditJob";
import EditCompanyProfile from "../../shared/editCompanyProfile/EditCompanyProfile";
import { Company, Job } from "../../../types/types";
import { addJob, getAllJobs, updateJobById } from "../../../api/jobs";
import { getCompanyById, updateCompanyById } from "../../../api/companies";

import {
  IconBrandLinkedin,
  IconEdit,
  IconMapPin,
  IconWorldWww,
} from "@tabler/icons-react";

import styling from "./CompanyProfile.module.css";
import Avatar from "../../UI/avatar/Avatar";
import DeleteJob from "../../shared/deleteJob/DeleteJob";

const CompanyProfile = () => {
  const navigate = useNavigate();

  // State
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([] as Job[]);
  const [company, setCompany] = useState({} as Company);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmEditCompanyLoading, setConfirmEditCompanyLoading] =
    useState(false);
  const [openEditJobModal, setOpenEditJobModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [job, setJob] = useState({} as Job);

  /**
   * Handles the toggle of the Add Job modal
   */
  const toggleAddJobModal = () => {
    setOpen(!open);
  };

  /**
   * Handles the toggle of the Edit Job modal
   */
  const toggleEditJobModal = (job: Job) => {
    setJob(job);
    setEditModalOpen(!isEditModalOpen);
  };

  const closeEditJobModal = () => {
    setEditModalOpen(!isEditModalOpen);
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
    await updateCompanyById(company?.user_id, payload);

    setConfirmEditCompanyLoading(true);
    setOpenEditJobModal(false);
    fetchCompanyInfo();
  };

  /**
   * Handles the creation of a new job
   * @param payload the job data to add
   */
  const handleAddJobPayload = async (payload: object) => {
    await addJob(payload);

    setConfirmLoading(true);
    setOpen(false);
    fetchCompanyInfo();
  };

  const toggleDeleteJob = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  /**
   * Handles the edit of a  job
   * @param payload the job data to edit
   */
  const handleEditJob = async (jobId: string, payload: object) => {
    setConfirmLoading(true);

    await updateJobById(jobId, payload);

    setEditModalOpen(false);
    fetchCompanyInfo();
  };

  /**
   * Fetches the company data object by id
   */
  const fetchCompanyInfo = async () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth?.user?.id;

    const company = await getCompanyById(userId);
    const allJobs = await getAllJobs();
    const jobs = allJobs?.filter((job: Record<string, any>) => {
      return job["company_id"] === userId;
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
        {jobs &&
          jobs.length > 0 &&
          jobs?.map((job: Job, index: number) => {
            return (
              <div key={index}>
                <HorizontalCard
                  avatar={true}
                  button="Delete job"
                  isButtonDisabled
                  firstName={company?.company_name}
                  title={job?.title}
                  subtitle={job?.description}
                  deleteEdit
                  onDeleteClick={toggleDeleteJob}
                  onEditClick={() => toggleEditJobModal(job)}
                  onTitleClick={() => navigate(`/job/${job?.id}`)}
                />

                <DeleteJob
                  jobId={job?.id}
                  showModal={isDeleteModalOpen}
                  setShowModal={toggleDeleteJob}
                />
              </div>
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

        <p>
          Welcome to The Dream Company, where innovation meets imagination, and
          technology takes flight. We are not just a tech company; we are
          dreamweavers, shaping the future one idea at a time. Founded on a
          shared vision of pushing the boundaries of what's possible, The Dream
          Company is a collective of brilliant minds, creatives, and tech
          enthusiasts.
        </p>
        <p>
          Our journey began with a simple yet powerful dream: to create a world
          where technology doesn't just serve us but inspires us. At The Dream
          Company, we pride ourselves on turning dreams into reality. Our
          talented team of engineers, designers, and visionaries work tirelessly
          to develop cutting-edge solutions that redefine the digital landscape.
          From web applications to artificial intelligence, cybersecurity to
          cloud computing, we're dedicated to crafting the tools that empower
          your dreams.
        </p>
      </div>
    </CardContainer>
  );

  // Content for "Company culture" tab
  const culture = (
    <CardContainer>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>Company culture</h2>

        <p>
          At The Dream Company, we're fueled by innovation, united by teamwork,
          and committed to inclusivity. We value continuous learning, promote
          work-life balance, and actively engage with our communities. Our
          culture is built on the foundation of creativity, responsibility, and
          a customer-centric approach. Join us in living the dream, where work
          is enjoyable, learning is ongoing, and making a difference is a daily
          mission.
        </p>
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
          {company.logo ? (
            <img className={styling.logo} src={company.logo} alt="Avatar" />
          ) : (
            <Avatar firstName={company.company_name} size={80} />
          )}

          <div>
            <h1 className={styling.title}>{company.company_name}</h1>

            <div className={styling.subtitle}>
              {company?.address ? (
                <>
                  <IconMapPin />
                  <p className={styling.subtext}>{company?.address}</p>
                </>
              ) : (
                <>
                  <IconMapPin />
                  <p className={styling.subtext}>Address not provided</p>
                </>
              )}
              {company.company_size ? (
                <>
                  <p className={styling.subtext}> | </p>
                  <p className={styling.subtext}>
                    {company.company_size} employees
                  </p>
                </>
              ) : null}
              {company.company_website ? (
                <>
                  <p className={styling.subtext}> | </p>
                  <IconBrandLinkedin
                    onClick={() => navigate(`${company?.company_website}`)}
                  />{" "}
                  <IconWorldWww />
                </>
              ) : null}
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
            companyId={company?.user_id}
            associations={company?.associations}
            companyInfo={company}
          />
        </div>
      </div>

      <div className={styling.container}>
        <Tabs centered={false} items={tabs} />
      </div>

      <AddEditJob
        open={isEditModalOpen}
        onEdit={handleEditJob}
        onCancel={closeEditJobModal}
        confirmLoading={confirmLoading}
        companyId={company?.user_id}
        companyValues={company?.values || []}
        associations={company?.associations}
        job={job}
      />

      <AddEditJob
        open={open}
        onOk={handleAddJobPayload}
        onCancel={toggleAddJobModal}
        confirmLoading={confirmLoading}
        companyId={company?.user_id}
        companyValues={company?.values || []}
        associations={company?.associations}
      />
    </>
  );

  if (!isLoading) {
    return <Spinner />;
  }

  return <div className={styling.main}>{content}</div>;
};

export default CompanyProfile;
