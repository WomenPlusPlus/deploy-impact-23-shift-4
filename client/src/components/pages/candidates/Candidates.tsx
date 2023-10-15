import { useState } from "react";
import Card from "../../UI/card/Card";
import "./Candidates.css";
import Filter from "../../UI/filter/Filter";

const Candidates = () => {
  const candidates = [
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavaScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Power Coders"],
      skills: ["JavaScript"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Power Coders"],
      skills: ["Node.js"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++"],
      skills: ["React"],
    },
  ];

  const skillsOptions = ["All", "JavaScript", "React", "Node.js", "SQL"];
  const associationsOptions = ["All", "Woman++", "Power Coders"];

  interface Candidate {
    name: string;
    profession: string;
    associations: string[];
    skills: string[];
  }

  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const handleFilterChange = (filteredCandidates: Candidate[]) => {
    setFilteredCandidates(filteredCandidates);
  };

  return (
    <div className="mainContainer">
      <h1 className="header">The best talent is right here!</h1>
      <div className="filters">
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
      <div className="cards">
        {filteredCandidates.map((candidate) => (
          <Card
            header={candidate.name}
            subheader={candidate.profession}
            associations={candidate.associations}
            skills={candidate.skills}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
