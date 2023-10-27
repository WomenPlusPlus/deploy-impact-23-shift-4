import { useEffect, useState } from "react";
import Card from "../../UI/card/Card";
import "./Candidates.css";
import Filter from "../../UI/filter/Filter";
import { getAllCandidates } from "../../../api/candidates";
import { useNavigate } from "react-router-dom";
import Searchbar from "../../UI/searchbar/Searchbar";
import { Candidate, User } from "../../../types/types";
import { getCompanyById } from "../../../api/companies";
import { getAssociationById } from "../../../api/associations";
import Spinner from "../../UI/spinner/Spinner";

const Candidates = () => {
  const skillsOptions = ["JavaScript", "React", "Node.js", "SQL"];
  const associationsOptions = ["Woman++", "Power Coders"];

  const navigate = useNavigate();

  //State
  const userId =
    JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id || "";
  const userType = JSON.parse(localStorage.getItem("auth") || "{}")?.user
    ?.user_type;
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /**
   * Handle filter change
   * @param filteredCandidates - filtered candidates
   */
  const handleFilterChange = (filteredCandidates: Candidate[]) => {
    setFilteredCandidates(filteredCandidates);
  };

  /**
   * Fetches the candidates data object by id
   */
  const fetchCandidates = async () => {
    try {
      const candidates = await getAllCandidates();
      // here I fetch or company or association
      if (userType === "association") {
        // exclude the association that is logged in
        const association = await getAssociationById(userId);
        setUser(association);
      } else {
        const company = await getCompanyById(userId);
        setUser(company);
      }
      setCandidates(candidates);
      setFilteredCandidates(candidates);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="main">
      <h1 className="header">The best talent is right here!</h1>
      <div className="filters">
        <Searchbar
          placeholder="Search..."
          width={800}
          onSearch={() => {
            console.log("search");
          }}
        />
        <div className={"filter-dropdown"}>
          <Filter
            options={skillsOptions}
            data={candidates}
            criteria="skills"
            onFilterChange={handleFilterChange}
          />
          <Filter
            options={associationsOptions}
            data={candidates}
            criteria="associations"
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="cards">
        {filteredCandidates?.map((candidate, index) => (
          <Card
            key={index}
            candidate={candidate}
            user={user}
            user_type={userType}
            header={`${
              (candidate?.experience && candidate.experience[0]?.role) ||
              "Not specified"
            }`}
            // subheader="Software Engineer"
            associations={candidate?.associations}
            skills={candidate?.skills}
            onClickRedirect={() => {
              navigate(`/candidate/${candidate.user_id}`);
            }}
            isBookmarkVisible={userType === "company"}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
