import "./ProgressBar.css";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress">
      <div className="progress-bar">
        <div
          className="progress-completed"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export { ProgressBar };
