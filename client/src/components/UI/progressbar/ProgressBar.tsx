import "./ProgressBar.css";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="container-progressbar">
      <p className="paragraph">You've completed {progress}% </p>
      <div className="progress">
        <div className="progress-bar">
          <div
            className="progress-completed"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
