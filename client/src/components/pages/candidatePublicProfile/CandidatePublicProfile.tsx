import { useParams } from "react-router-dom";
import styling from "./CandidatePublicProfile.module.css";

const CandidatePublicProfile = () => {
  const { id } = useParams();

  return (
    <>
      <p>"CandidatePublicProfile":{id}</p>
    </>
  );
};

export default CandidatePublicProfile;
