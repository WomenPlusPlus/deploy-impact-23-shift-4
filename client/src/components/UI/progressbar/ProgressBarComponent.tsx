import React from "react";
import { ProgressBar } from "./ProgressBar";
import styling from "./ProgressBarComponent.module.css";
import { Candidate } from "../../pages/types/types"; // Import the Candidate interface

interface ProgressBarComponentProps {
  candidate: Candidate; // Update the prop to accept a Candidate object
}

function LanguageItem({ language }: { language: any }) {
  return (
    <div className={styling.elementInOneRow}>
      <p>{language.name}</p>
      <p>{language.level}</p>
    </div>
  );
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
  candidate,
}) => {
  return (
    <div>
      {candidate?.languages && candidate?.languages?.map((language, index) => (
        <div key={index}>
          <LanguageItem language={language} />
          <ProgressBar progress={language.score} height="1.5rem" />
        </div>
      ))}
    </div>
  );
};

export { ProgressBarComponent };

// import { ProgressBar } from "./ProgressBar";
// import styling from "./ProgressBarComponent.module.css";

// enum LanguageLevel {
//   Elementary = "Elementary",
//   Beginner = "Beginner",
//   Intermediate = "Intermediate",
//   Advanced = "Advanced",
//   Professional = "Professional",
//   Expert = "Expert",
//   Native = "Native",
// }

// interface Language {
//   name: string;
//   levelName: string;
//   score: number;
// }

// interface ProgressBarComponentProps {
//   languages: Language[];
// }

// function LanguageItem({ language }: { language: Language }) {
//   return (
//     <div className={styling.elementInOneRow}>
//       <p>{language.name}</p>
//       <p>{language.levelName}</p>
//     </div>
//   );
// }

// const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
//   languages,
// }) => {
//   return (
//     <div>
//       {languages.map((language: any, index: any) => (
//         <div key={index}>
//           <LanguageItem language={language} />
//           <ProgressBar progress={language.score} height="1.5rem" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export { ProgressBarComponent };
