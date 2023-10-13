import axios from "axios";

const CandidateGetProfile = async () => {
    const res = await axios.get("/api/candidate/profile", {withCredentials: true});
    return res.data;
};

export { CandidateGetProfile };
