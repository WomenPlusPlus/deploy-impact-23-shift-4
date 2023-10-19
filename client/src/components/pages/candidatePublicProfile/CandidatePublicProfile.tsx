import { useParams, useNavigate } from "react-router-dom";
import styling from "./CandidatePublicProfile.module.css";
import { useEffect, useState } from "react";
import { getCandidateById } from "../../../api/candidates";
import { Candidate } from "../types/types";
import Avatar from "../../UI/avatar/Avatar";
import { IconWorldWww } from "@tabler/icons-react";
import Tabs from "../../UI/tabs/Tabs";
import { CandidateMatchesTab } from "./CandidateMatchesTab";
import { CandidateResumeTab } from "./CandidateResumeTab";

const CandidatePublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({} as Candidate);

  const fetchCandidate = async () => {
    const candidateFetched = await getCandidateById(id!);
    console.log("candidate", candidateFetched);
    setCandidate(candidateFetched);
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  const onclickLink = (link: string) => {
    navigate(link);
  };

  // Tabs
  const tabs = [
    {
      label: "Resume",
      key: "1",
      children: <CandidateResumeTab candidate={candidate} />,
    },
    {
      label: "Matches",
      key: "2",
      children: <CandidateMatchesTab />,
    },
  ];

  return (
    <>
      <div className={styling.main}>
        {/* Header */}
        <div className={`${styling.row} ${styling.margin}`}>
          <Avatar
            size={80}
            firstName={candidate?.first_name}
            lastName={candidate?.last_name}
          />
          <div className={styling.column}>
            <div>
              {candidate?.experience ? (
                <h1 className={styling.title}>
                  {candidate?.experience[0]?.role}
                </h1>
              ) : (
                <h1 className={styling.title}>Software Engineer</h1>
              )}
            </div>
            <div className={styling.row}>
              {candidate?.links
                ? candidate.links.map((link) => (
                    <div
                      className={`${styling.link}`}
                      onClick={() => onclickLink(link.link)}
                    >
                      <IconWorldWww size={20} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styling.margin}>
          <Tabs
            defaultActiveKey={"1"}
            items={tabs}
            centered={false}
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default CandidatePublicProfile;
