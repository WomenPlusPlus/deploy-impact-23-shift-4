import Card from "../../UI/card/Card";
import "./Candidates.css";

const Candidates = () => {
  const candidates = [
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: [
        "JavasScript",
        "React",
        "Node.js",
        "SQL",
        "JavasScript",
        "React",
        "Node.js",
        "SQL",
        "JavasScript",
        "React",
        "Node.js",
        "SQL",
      ],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
    {
      name: "John Doe",
      profession: "Software Engineer",
      associations: ["Woman++", "Power Coders"],
      skills: ["JavasScript", "React", "Node.js", "SQL"],
    },
  ];

  return (
    <div className="mainContainer">
      <h1 className="header">The best talent is right here!</h1>
      <div className="cards">
        {candidates.map((candidate) => (
          <Card
            name={candidate.name}
            profession={candidate.profession}
            associations={candidate.associations}
            skills={candidate.skills}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
