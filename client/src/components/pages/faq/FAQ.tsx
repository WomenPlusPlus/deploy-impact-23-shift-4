import { useState } from "react";
import styling from "./FAQ.module.css";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Ant Design?",
      answer:
        "Ant Design is a design system for enterprise-level applications. It provides a set of high-quality React components and layout templates for building modern, responsive web applications.",
    },
    {
      question: "How can I get started with Ant Design?",
      answer:
        "To get started with Ant Design, you can install the Ant Design library using npm or yarn and import the components you need in your React application. Visit the official documentation for detailed instructions.",
    },
    {
      question: "Is Ant Design free to use?",
      answer:
        "Yes, Ant Design is open-source and free to use. It is released under the MIT license, which allows you to use it in both open-source and commercial projects.",
    },
    {
      question: "Can I customize the Ant Design styles?",
      answer:
        "Yes, you can customize Ant Design styles to match your project's branding. Ant Design provides a theming system that allows you to change colors, fonts, and other design elements easily.",
    },
  ];

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const togglePanel = (index: number) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((item) => item !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div className={styling.main}>
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className={styling.panel}>
          <div className={styling.question} onClick={() => togglePanel(index)}>
            {item.question}
            <span>
              {activeIndexes.includes(index) ? (
                <IconChevronUp />
              ) : (
                <IconChevronDown />
              )}
            </span>
          </div>
          {activeIndexes.includes(index) && (
            <div className={styling.answer}>{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
