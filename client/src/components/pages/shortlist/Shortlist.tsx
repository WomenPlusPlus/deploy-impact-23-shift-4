import { useEffect, useState } from "react";
import { JobCard } from "../../UI/card/JobCard";
import styling from "./Shortlist.module.css";
import { getCandidateById } from "../../../api/candidates";
import { Candidate, Company, Job } from "../../../types/types";
import { getJobById } from "../../../api/jobs";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../api/companies";

const Shortlist = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState({} as Candidate);
  const [jobs, setJobs] = useState([] as Job[]);
  const [companies, setCompanies] = useState([] as Company[]);
  const userId = JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id;
  const user_type = JSON.parse(localStorage.getItem("auth") || "{}")?.user
    ?.user_type;

  const fetchInfo = async () => {
    if (user_type === "candidate") {
      const candidate = await getCandidateById(userId);
      const allCompanies = await getAllCompanies();

      // fetch all jobs from candidate's shortlist
      const jobsIds = candidate?.saved_items;

      if (jobsIds && jobsIds?.length > 0) {
        // Use Promise.all to fetch jobs concurrently
        const jobPromises = jobsIds?.map(async (jobId: string) => {
          return getJobById(jobId);
        });
        // Wait for all job fetch promises to resolve
        const jobs = await Promise.all(jobPromises);
        // jobs is now an array of type Job[]
        console.log(jobs);
        setJobs(jobs);
      }
      setCandidate(candidate);
      setCompanies(allCompanies);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className={styling.main}>
      <h1>Shortlist</h1>
      <p>Shortlist page</p>
      {user_type === "candidate" && (
        <div className={styling.cardContainer}>
          {jobs &&
            jobs?.map((job, index) => (
              <JobCard
                key={index}
                job={job}
                companies={companies}
                candidate={candidate}
                onClick={() => navigate(`/job/${job?.id}`)}
                isMatchVisible={true}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Shortlist;
