import { useEffect, useState } from "react";
import Card from "../../UI/card/Card";
import "./Candidates.css";
import Filter from "../../UI/filter/Filter";
import { getAllCandidates } from "../../../api/candidates";
import { useNavigate } from "react-router-dom";
import Searchbar from "../../UI/searchbar/Searchbar";

interface Candidate {
  user_id: string;
  first_name: string;
  last_name: string;
  associations: string[];
  skills: object[];
}

const Candidates = () => {
  const skillsOptions = ["JavaScript", "React", "Node.js", "SQL"];
  const associationsOptions = ["Woman++", "Power Coders"];

  const navigate = useNavigate();

  //State
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

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
    const candidates = await getAllCandidates();
    setCandidates(candidates);
    setFilteredCandidates(candidates);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="mainContainer">
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
            header={`${candidate?.first_name} ${candidate?.last_name}`}
            subheader="Software Engineer"
            associations={candidate?.associations}
            skills={candidate?.skills}
            onClickRedirect={() => {
              navigate(`/candidate/${candidate.user_id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
