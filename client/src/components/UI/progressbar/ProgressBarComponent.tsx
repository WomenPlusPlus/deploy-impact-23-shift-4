import { ProgressBar } from "./ProgressBar";
import styling from "./ProgressBarComponent.module.css";

interface Language {
  name: string;
  levelName: string;
  score: number;
}

interface ProgressBarComponentProps {
  languages: Language[];
}

function LanguageItem({ language }: { language: Language }) {
  return (
    <div className={styling.elementInOneRow}>
      <p>{language.name}</p>
      <p>{language.levelName}</p>
    </div>
  );
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
  languages
}) => {
  return (
    <div>
      {languages.map((language, index) => (
        <>
          <LanguageItem key={index} language={language} />
          <ProgressBar progress={language.score} height="1.5rem" />
        </>
      ))}
    </div>
  );
};

export { ProgressBarComponent };
