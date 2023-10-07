import "./MatchesCard.css";
import greyImage from "../../../media/gray_square.jpeg";
import { Button } from "../button/Button";

const MatchesCard = () => {
  const positionTitle = "Developer europe remote";
  const matchingText = [
    "Your dream job is waiting for you",
    "Great match for this role!",
    "Give it a shot, you might be a good fit!",
  ];
  return (
    <div className="matches-element">
      <div className="avatar-matches">
        <img src={greyImage} alt="Avatarr" />
      </div>
      <div className="text-matches">
        <div>
          <h2>{positionTitle}</h2>
          <p>{matchingText[0]}</p>
        </div>
      </div>
      <Button className="button-style">Go to description</Button>
    </div>
  );
};

export { MatchesCard };
