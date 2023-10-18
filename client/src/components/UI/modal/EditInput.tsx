// import React, { useEffect, useState } from "react";
// import { Modal, Input, Select } from "antd";
// import { Button } from "../button/Button";
// import { IconEdit } from "@tabler/icons-react";
// import { Candidate, EditInputProps } from "../../pages/types/types";
// const { Option } = Select;

// enum LanguageLevelText {
//   Look = "Looking for a job",
//   NotLook = "Not looking for a job",
// }

// const linkOptions = [
//   "LinkedIn",
//   "Github",
//   "Portfolio",
//   "Personal Website",
//   "Other",
// ];

// const EditInput: React.FC<EditInputProps<Candidate>> = ({
//   onSave,
//   showModal,
//   setVisible,
//   setValuesToEdit,
//   visible,
//   candidate,
//   fieldsToDisplay, // Array of nicely formatted fields to display
//   fieldKeysToEdit, // Array of keys of the fields to edit
// }) => {
//   // State
//   const [values, setValues] = useState({} as Candidate);
//   const [links, setLinks] = useState([{ name: "", url: "" }]);
//   const [selectedLinkName, setSelectedLinkName] = useState("");
//   const [linkUrl, setLinkUrl] = useState("");

//   /**
//    * Save the values to edit
//    */
//   const handleSave = () => {
//     setValuesToEdit(values);
//     onSave && onSave(values);
//     setVisible(false);
//   };

//   /**
//    * Close the modal
//    */
//   const onCancel = () => {
//     setLinkUrl("");
//     setSelectedLinkName("");
//     setVisible(false);
//   };

//   const addLink = () => {
//     const newLink = { name: selectedLinkName, url: linkUrl };
//     setLinks([...links, newLink]);
//     setValues((prevCandidate) => ({
//       ...prevCandidate,
//       links: Array.isArray(prevCandidate.links)
//         ? [...prevCandidate.links, newLink]
//         : [newLink],
//     }));
//     setSelectedLinkName("");
//     setLinkUrl("");
//   };

//   /**
//    * Set the values to edit when the modal is opened
//    */
//   useEffect(() => {
//     setValues(candidate);
//   }, [candidate]);

//   return (
//     <>
//       <IconEdit
//         color="black"
//         style={{ cursor: "pointer" }}
//         onClick={showModal}
//       />

//       <Modal
//         open={visible}
//         title="Edit Information"
//         onCancel={onCancel}
//         footer={[
//           <Button key="cancel" onClick={onCancel}>
//             Cancel
//           </Button>,
//           <Button key="save" onClick={handleSave}>
//             Save
//           </Button>,
//         ]}
//       >
//         {fieldKeysToEdit &&
//           fieldKeysToEdit?.map((field: string, index) => (
//             <div key={index}>
//               <p>{fieldsToDisplay[index]}</p>

//               {field === "job_status" ? (
//                 <Select
//                   style={{ width: "100%" }}
//                   value={(values && values[field]) || ""}
//                   onChange={(value) => {
//                     setValues((prevValues) => ({
//                       ...prevValues,
//                       [field]: value,
//                     }));
//                   }}
//                 >
//                   {Object.entries(LanguageLevelText).map(([level, text]) => (
//                     <Option key={level} value={text}>
//                       {text}
//                     </Option>
//                   ))}
//                 </Select>
//               ) : (
//                 <Input
//                   value={
//                     (values && (values[field as keyof Candidate] as string)) ||
//                     ""
//                   }
//                   onChange={(e) => {
//                     setValues((prevValues) => ({
//                       ...prevValues,
//                       [field]: e.target.value,
//                     }));
//                   }}
//                 />
//               )}
//               {/* Links */}
//               {field === "links" && (
//                 <div>
//                   <p>Links:</p>
//                   {values?.links?.map((link, index) => (
//                     <div key={index}>
//                       {/* Show existing links */}
//                       <Input
//                         value={link.name}
//                         onChange={(e) => {
//                           const updatedLinks = [...links];
//                           updatedLinks[index].name = e.target.value;
//                           setLinks(updatedLinks);
//                         }}
//                       />
//                       <Input
//                         value={link.url}
//                         onChange={(e) => {
//                           const updatedLinks = [...links];
//                           updatedLinks[index].url = e.target.value;
//                           setLinks(updatedLinks);
//                         }}
//                       />
//                     </div>
//                   ))}
//                   <div>
//                     <p>Additional Link:</p>
//                     <Select
//                       placeholder="Name"
//                       value={selectedLinkName}
//                       onChange={(value) => {
//                         setSelectedLinkName(value);
//                       }}
//                     >
//                       <Select.Option value="LinkedIn">LinkedIn</Select.Option>
//                       <Select.Option value="GitHub">GitHub</Select.Option>
//                       {/* Add more options as needed */}
//                     </Select>
//                     <Input
//                       placeholder="Link URL"
//                       value={linkUrl}
//                       onChange={(e) => {
//                         setLinkUrl(e.target.value);
//                       }}
//                     />
//                     <Button onClick={addLink}>Add Link</Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//       </Modal>
//     </>
//   );
// };

// export { EditInput };

import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { Button } from "../button/Button";
import { IconEdit } from "@tabler/icons-react";
import { Candidate, EditInputProps } from "../../pages/types/types";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { CloseCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

enum LanguageLevelText {
  Look = "Looking for a job",
  NotLook = "Not looking for a job",
}

const linkOptions = [
  "LinkedIn",
  "Github",
  "Portfolio",
  "Personal Website",
  "Other",
];

const EditInput: React.FC<EditInputProps<Candidate>> = ({
  onSave,
  showModal,
  setVisible,
  setValuesToEdit,
  visible,
  candidate,
  fieldsToDisplay, // Array of nicely formatted fields to display
  fieldKeysToEdit, // Array of keys of the fields to edit
}) => {
  // State
  const [values, setValues] = useState({} as Candidate);
  const [links, setLinks] = useState([{ name: "", url: "" }]);
  const [selectedLinkName, setSelectedLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  /**
   * Save the values to edit
   */
  const handleSave = () => {
    setValuesToEdit(values);
    onSave && onSave(values);
    setVisible(false);
  };

  /**
   * Close the modal
   */
  const onCancel = () => {
    setLinkUrl("");
    setSelectedLinkName("");
    setVisible(false);
  };

  const addLink = () => {
    const newLink = { name: selectedLinkName, url: linkUrl };
    setLinks([...links, newLink]);
    setValues((prevCandidate) => ({
      ...prevCandidate,
      links: Array.isArray(prevCandidate.links)
        ? [...prevCandidate.links, newLink]
        : [newLink],
    }));
    setSelectedLinkName("");
    setLinkUrl("");
  };

  /**
   * Set the values to edit when the modal is opened
   */
  useEffect(() => {
    setValues(candidate);
    setLinks(
      candidate.links
        ? (candidate.links as { name: string; url: string }[])
        : []
    );
  }, [candidate]);

  return (
    <>
      <IconEdit
        color="black"
        style={{ cursor: "pointer" }}
        onClick={showModal}
      />

      <Modal
        open={visible}
        title="Edit Information"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="save" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {fieldKeysToEdit &&
          fieldKeysToEdit?.map((field: string, index) => (
            <div key={index}>
              <p>{fieldsToDisplay[index]}</p>
              {(() => {
                switch (field) {
                  case "job_status":
                    return (
                      <Select
                        style={{ width: "100%" }}
                        value={(values && values[field]) || ""}
                        onChange={(value) => {
                          setValues((prevValues) => ({
                            ...prevValues,
                            [field]: value,
                          }));
                        }}
                      >
                        {Object.entries(LanguageLevelText).map(
                          ([level, text]) => (
                            <Option key={level} value={text}>
                              {text}
                            </Option>
                          )
                        )}
                      </Select>
                    );
                  case "links":
                    return (
                      <div>
                        {links && links.length > 0 && <p>Links:</p>}
                        {links && links?.map((link, index) => (
                          <div key={index}>
                            {/* Show existing links */}
                            <Input
                              value={link.name}
                              onChange={(e) => {
                                const updatedLinks = [...links];
                                updatedLinks[index].name = e.target.value;
                                setLinks(updatedLinks);
                              }}
                              disabled={true}
                            />
                            <Input
                              value={link.url}
                              onChange={(e) => {
                                const updatedLinks = [...links];
                                updatedLinks[index].url = e.target.value;
                                setLinks(updatedLinks);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                // Handle link deletion here
                                const updatedLinks = [...links];
                                updatedLinks.splice(index, 1);
                                setLinks(updatedLinks);
                                setValues((prevValues) => ({
                                  ...prevValues,
                                  links: updatedLinks,
                                }));
                              }}
                            >
                              <CloseCircleOutlined />
                            </button>
                          </div>
                        ))}
                        <div>
                          <p>Additional Link:</p>
                          <Select
                            placeholder="Name"
                            value={selectedLinkName}
                            onChange={(value) => {
                              setSelectedLinkName(value);
                            }}
                            style={{ minWidth: "100%" }}
                          >
                            {linkOptions.map((linkOption) => (
                              <Select.Option
                                key={linkOption}
                                value={linkOption}
                              >
                                {linkOption}
                              </Select.Option>
                            ))}
                          </Select>
                          <Input
                            placeholder="Link URL"
                            value={linkUrl}
                            onChange={(e) => {
                              setLinkUrl(e.target.value);
                            }}
                          />
                          <Button onClick={addLink}>Add Link</Button>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <Input
                        value={
                          (values &&
                            (values[field as keyof Candidate] as string)) ||
                          ""
                        }
                        onChange={(e) => {
                          setValues((prevValues) => ({
                            ...prevValues,
                            [field]: e.target.value,
                          }));
                        }}
                      />
                    );
                }
              })()}
            </div>
          ))}
      </Modal>
    </>
  );
};

export { EditInput };
