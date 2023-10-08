import "./MatchesCard.css";
import { Button } from "../button/Button";
import Avatar from "./../avatar/Avatar";

const MatchesCard = () => {
  const positionTitle = "Developer europe remote";
  const matchingText = [
    "Your dream job is waiting for you",
    "Great match for this role!",
    "Give it a shot, you might be a good fit!",
  ];
  return (
    <div className="matches-element">
      <Avatar firstName="Company" size={70} />

      <div className="text-matches">
        <h2>{positionTitle}</h2>
        <p>{matchingText[0]}</p>
      </div>

      <Button className="button-style">Go to description</Button>
    </div>
  );
};

export { MatchesCard };
