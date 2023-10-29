import { CardContainer } from "../../UI/container/CardContainer";
import styling from "./CompanyPublicProfile.module.css";
import Tabs from "../../UI/tabs/Tabs";
import { HorizontalCard } from "../../UI/horizontalCard/HorizontalCard";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../../api/companies";
import { useCallback, useEffect, useState } from "react";
import { Company, Job } from "../../../types/types";
import {
  IconBrandLinkedin,
  IconMapPin,
  IconWaveSine,
  IconWorldWww,
} from "@tabler/icons-react";
import Spinner from "../../UI/spinner/Spinner";
import { getAllJobs } from "../../../api/jobs";
import { TimeAgo } from "../candidateProfile/helpers/helper";
import { useNavigate } from "react-router-dom";
import Avatar from "../../UI/avatar/Avatar";

const CompanyPublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState<Company>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState([] as Job[]);

  const fetchCompany = useCallback(async () => {
    if (id) {
      const company = await getCompanyById(id);
      const allJobs = await getAllJobs();
      const jobs = allJobs?.filter((job: Record<string, any>) => {
        return job["company_id"] === id;
      });

      setJobs(jobs);
      setCompany(company);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const AllCompanyJobs = (
    <CardContainer className={styling.container}>
      <div className={styling.mainSection}>
        <div className={styling.sectionHeader}>
          <h2 className={styling.titles}>Published jobs</h2>
        </div>
        {jobs && jobs.length > 0 ? (
          jobs?.map((job: Job, index: number) => {
            return (
              <div key={index}>
                <HorizontalCard
                  avatar={true}
                  button="Go to job"
                  firstName={company?.company_name}
                  title={job?.title}
                  subtitle={<TimeAgo timestamp={job?.date_created!} />}
                  onTitleClick={() => navigate(`/job/${job?.id}`)}
                  onClick={() => navigate(`/job/${job?.id}`)}
                />
              </div>
            );
          })
        ) : (
          <div className={styling.noPublishedJobs}>
            <p>No jobs published yet</p>
          </div>
        )}
      </div>
    </CardContainer>
  );

  const about = (
    <CardContainer className={styling.container}>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>About the company</h2>

        <p>This is about the company</p>
      </div>
    </CardContainer>
  );

  const culture = (
    <CardContainer className={styling.container}>
      <div className={styling.mainSection}>
        <h2 className={styling.titles}>Company culture</h2>

        <p>This is about the culture</p>
      </div>
    </CardContainer>
  );

  const tabs = [
    {
      label: "Company jobs",
      key: "1",
      children: AllCompanyJobs,
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styling.main}>
      <div className={styling.container}>
        <div className={styling.header}>
          {company?.logo ? (
            <img className={styling.logo} src={company?.logo} alt="Avatar" />
          ) : (
            <Avatar firstName={company?.company_name} size={80} />
          )}

          <div>
            <h1 className={styling.title}>{company?.company_name}</h1>

            <div className={styling.subtitle}>
              <div className={styling.location}>
                <IconMapPin />
                {company?.address ? company?.address : "No address provided"}
              </div>
              <p> | </p>
              {company?.company_size ? (
                <p>{company?.company_size} employees</p>
              ) : (
                "No size provided"
              )}
              {company?.company_website ||
              company?.linkedin_url ||
              company?.kununu_url ? (
                <p> | </p>
              ) : (
                ""
              )}
              {company?.company_website && <IconWorldWww />}
              {company?.linkedin_url && <IconBrandLinkedin />}
              {company?.kununu_url && <IconWaveSine />}
            </div>
          </div>
        </div>
      </div>

      <Tabs centered={false} items={tabs} />
    </div>
  );
};

export default CompanyPublicProfile;
