import { useState } from "react";
import styling from "./FAQ.module.css";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const FAQ = () => {
  const faqData = [
    {
      question: "What do I need to set up in my profile?",
      answer:
        "Set up your profile with your personal and professional information for recruiters to see your skills and values. At Bridge, we believe that skills are the most important aspect of your professional experience for recruiters to look at. That’s why we recommend that you add in as many skills as you can come up with. Next to that, most recruiters find it convenient to see where you are (willing to) live and what languages you speak. Also make sure to add some additional information, like your salary expectations and experience you’ve built up over the years.",
    },

    {
      question: "Why do I need to add in my values?",
      answer:
        "Many companies these days are looking for new talent that doens’t only match their required skills, but are also a culturally good fit. For this, companies work with their own values and belief systems, often employees get more recognition for following along these value systems. To also already do the first cultural check, Bridge has added this to your profile and to the profiles of the companies so that it can be compared. For you, it’s key to select the 5 most important values to you!",
    },
    {
      question: "What can recruiters see?",
      answer:
        "Bridge wants to fight the bias that happens when hiring and seeing candidate profiles for the first time. That’s why we don’t ask you to upload any picture and don’t even show your full name to recruiters, they just see your initials. " +
        "A lot of the personal information that you add in your profile will be hidden for recruiters until you accept their request to see it. This means that they have to select based on your skill set instead of your face, gender, or the university you went to.",
    },
    {
      question: "How does the matching work?",
      answer: "",
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
