import styling from "./HorizontalCard.module.css";
import { Button } from "../button/Button";
import Avatar from "../avatar/Avatar";

interface HorizontalCardProps {
  avatar?: boolean;
  button?: string;
  firstName?: string;
  lastName?: string;
}

//TODO: add title and description props
const HorizontalCard: React.FC<HorizontalCardProps> = ({
  avatar,
  button,
  firstName,
  lastName,
}) => {
  const positionTitle = "Developer europe remote";
  const matchingText = [
    "Your dream job is waiting for you",
    "Great match for this role!",
    "Give it a shot, you might be a good fit!",
  ];
  return (
    <div className={styling.container}>
      {avatar && <Avatar firstName={firstName} lastName={lastName} size={70} />}

      <div className={styling.text}>
        <h2>{positionTitle}</h2>
        <p>{matchingText[0]}</p>
      </div>

      {button && <Button className={styling.button}>{button}</Button>}
    </div>
  );
};

export { HorizontalCard };
