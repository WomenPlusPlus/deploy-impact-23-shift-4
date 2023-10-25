import { Section } from "../../../types/types";
import styling from "./SectionContainer.module.css";
import { IconCertificate, IconClipboardText } from "@tabler/icons-react";

interface ContentBlockProps {
  customClass?: string;
  sections: Section[];
}

const ContentBlock: React.FC<ContentBlockProps> = ({ sections, customClass }) => (
  <div className={`${styling.containerVisibleInfo} ${customClass}`}>
    {sections &&
      sections?.map((section, index) => (
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

interface HorizontalLineProps {
  customClass?: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({ customClass }) => (
  <hr className={`${styling.horizontalLine} ${customClass}`} />
);

export { ContentBlock, HorizontalLine };
