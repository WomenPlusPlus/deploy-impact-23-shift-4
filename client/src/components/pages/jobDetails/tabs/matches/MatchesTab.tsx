import { Job } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";
import Card from "../../../../UI/card/Card";

import styling from "./MatchesTab.module.css";
import { getAllCandidates } from "../../../../../api/candidates";
import { useEffect, useState } from "react";

interface Props {
  job: Job;
}

const JobMatchesTab: React.FC<Props> = ({ job }) => {
  const navigate = useNavigate();

  const [allCandidates, setAllCandidates] = useState([]);

  const fetchCandidates = async () => {
    const candidates = await getAllCandidates();
    setAllCandidates(candidates);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Match candidates from matchingCandidates with allCandidates
  const matchingCandidates = allCandidates.filter((candidate: any) => {
    return job?.matching_candidates?.map((matchedCandidate) => {
      return candidate?.user_id === matchedCandidate?.id;
    });
  });

  console.log(matchingCandidates);
  return (
    <div className={styling.main}>
      {matchingCandidates.length > 0 ? (
        <>
          <h1>Matches</h1>
          {matchingCandidates?.map((job: object, index: number) => (
            <div key={index}></div>
          ))}
          <div className={styling.cardContainer}>
            {matchingCandidates &&
              matchingCandidates?.map((candidate: any) => (
                <Card
                  key={candidate?.id}
                  candidate={candidate}
                  header={candidate.experience[0]?.role}
                  skills={candidate?.skills}
                  values={candidate?.values}
                  onClickRedirect={() =>
                    navigate(`/candidate/${candidate?.user_id}`)
                  }
                />
              ))}
          </div>
        </>
      ) : (
        <h1>Ooops, no matches found!</h1>
      )}
    </div>
  );
};

export default JobMatchesTab;
