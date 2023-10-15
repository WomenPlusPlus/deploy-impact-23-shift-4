import styling from "./SectionContainer.module.css";

interface ContentBlockProps {
  title: string;
  text: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, text }) => {
  return (
    <div className={styling.section}>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

const HorizontalLine = () => {
  return <hr className={styling.horizontalLine} />;
};

export { ContentBlock, HorizontalLine };
