import styling from "./SectionContainer.module.css";
import { IconCertificate, IconClipboardText } from "@tabler/icons-react";

interface Section {
  title: string;
  subtitle?: string;
  text?: string;
  subtext?: string;
  icon?: JSX.Element;
  type?: string;
}

interface ContentBlockProps {
  sections: Section[];
}

const ContentBlock: React.FC<ContentBlockProps> = ({ sections }) => (
  <div className={styling.containerVisibleInfo}>
    {sections?.map((section, index) => (
      <div key={index} className={styling.inOneRow}>
        <div className={styling.section}>
          <p className={styling.title}>{section.title}</p>
          {section.type === "cv" ? (
            <IconCertificate size={50} stroke={0.5} color="black" />
          ) : null}
          {section.type === "certificate" ? (
            <IconClipboardText size={50} stroke={0.5} color="black" />
          ) : null}
          {section.subtitle && (
            <p className={styling.subtitle}>
              <strong>{section.subtitle}</strong>
            </p>
          )}
          {section.text && (
            <p className={styling.text}>
              <strong>{section.text}</strong>
            </p>
          )}
          {section.subtext && (
            <p className={styling.subtext}>{section.subtext}</p>
          )}
        </div>
        {index < sections.length - 1 && <HorizontalLine />}
      </div>
    ))}
  </div>
);

const HorizontalLine: React.FC = () => (
  <hr className={styling.horizontalLine} />
);

export { ContentBlock, HorizontalLine };
