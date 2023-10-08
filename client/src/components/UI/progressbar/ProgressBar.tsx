import "./ProgressBar.css";

interface ProgressBarProps {
  progress: number;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = "2rem",
}) => {
  return (
    <div>
      <div className="progress-bar" style={{ height: height }}>
        <div
          className="progress-completed"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export { ProgressBar };
