import { useEffect, useState } from "react";
import Card from "../../UI/card/Card";
import "./Candidates.css";
import Filter from "../../UI/filter/Filter";
import { getAllCandidates } from "../../../api/candidates";
import { useNavigate } from "react-router-dom";
import Searchbar from "../../UI/searchbar/Searchbar";
import { Candidate, Company } from "../../../types/types";
import { getCompanyById } from "../../../api/companies";

const Candidates = () => {
  const skillsOptions = ["JavaScript", "React", "Node.js", "SQL"];
  const associationsOptions = ["Woman++", "Power Coders"];

  const navigate = useNavigate();

  //State
  const userId =
    JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id || "";
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [company, setCompany] = useState({} as Company);
  /**
   * Handle filter change
   * @param filteredCandidates - filtered candidates
   */
  const handleFilterChange = (filteredCandidates: Candidate[]) => {
    setFilteredCandidates(filteredCandidates);
  };

  const takeInitials = (candidate: Candidate) => {
    const fullName = `${candidate?.first_name} ${candidate?.last_name}`;
    const initials = fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("");
    return initials;
  };

  /**
   * Fetches the candidates data object by id
   */
  const fetchCandidates = async () => {
    const candidates = await getAllCandidates();
    const company = await getCompanyById(userId);
    setCandidates(candidates);
    setFilteredCandidates(candidates);
    setCompany(company);
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
            candidate={candidate}
            company={company}
            header={`${
              (candidate?.experience && candidate.experience[0]?.role) ||
              "Software Engineer"
            }`}
            // subheader="Software Engineer"
            associations={candidate?.associations}
            skills={candidate?.skills}
            onClickRedirect={() => {
              navigate(`/candidate/${candidate.user_id}`);
            }}
            isBookmarkVisible={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
