// import React from "react";
// import { Input } from "antd";
// import styling from "./Input.module.css";
// import Filter from "../../UI/filter/Filter";
// import Jobs from "./Jobs";

// const { Search } = Input;

// const JobSearchBar: React.FC = () => {

//   const jobsData = [
//     {
//       name: "Front-end Developer Front-end Developer Front-end Developer Front-end DeveloperFront-end DeveloperFront-end Developer",
//       company_name: "ABC Tech",
//       company_location: "New York",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
//       avatarUrl:
//         "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//       employees: "50-200",
//       level: "Internship",
//       match: "10",
//       location: "Berlin",
//       department: "Hiring Manager",
//       skills: ["JavaScript", "React", "Node.js", "SQL"],
//     },
//     {
//       name: "Cloud Engineer",
//       company_name: "ABC Tech",
//       company_location: "New York",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
//       avatarUrl:
//         "https://images.unsplash.com/photo-1542361345-89e58247f2d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//       employees: "50-200",
//       level: "Internship",
//       match: "10",
//       location: "Berlin",
//       department: "Hiring Manager",
//       skills: ["JavaScript", "React", "Node.js", "SQL"],
//     },
//     {
//       name: "Back-end Developer",
//       company_name: "ABC Tech",
//       company_location: "New York",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
//       avatarUrl:
//         "https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
//       employees: "50-200",
//       level: "Internship",
//       match: "60",
//       location: "Berlin",
//       department: "Hiring Manager",
//       skills: ["JavaScript", "React", "Node.js", "SQL"],
//     },
//     {
//       name: "Front-end Developer",
//       company_name: "ABC Tech",
//       company_location: "New York",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt eleifend mi at rhoncus. Phasellus sed felis in justo finibus sagittis. Nulla facilisis augue vitae euismod ultricies. Nullam consequat, sem eget hendrerit pellentesque, magna libero maximus ipsum, id convallis nisl erat eget dolor. Pellentesque tempus eleifend eleifend. Proin auctor ligula dui, eget sodales arcu vehicula quis. Nulla in urna enim. Aenean at diam accumsan quam",
//       avatarUrl:
//         "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
//       employees: "50-200",
//       level: "Internship",
//       match: "50",
//       location: "Berlin",
//       department: "Hiring Manager",
//       skills: ["JavaScript", "React", "Node.js", "SQL"],
//     },
//   ];


//   const locationOptions = ["USA", "Switzerland", "Germany", "Netherland", "Turkey"];
//   const associationsOptions = ["All", "Woman++", "Power Coders"];


//   interface Jobs {
//     name?: string;
//     company_name?: string;
//     company_location?: string;
//     description?: string;
//     avatarUrl?: string;
//     employees?: string;
//     level?: string;
//     match?: string;
//     location?: string;
//     department?: string;
//     skills?: string[];
//   }
  




//  const [filteredJobs, setFilteredJobs] = useState<Jobs[]>([]);


//   const handleFilterChange = (filteredJobs: Jobs[]) => {
//     setFilteredJobs(filteredJobs);
//   };




//   return (
//     <div>
//       {" "}
//       <div>
//         <div>
//           <Search
//             placeholder="Ara..."
//             onSearch={(value) => console.log(value)}
//             enterButton
//           />
//         </div>
//         <div>
//         <Filter
//           options={locationOptions}
//           data={jobsData}
//           criteria="location"
//           onFilterChange={handleFilterChange}
//         />
      
//         </div>
//         <div></div>
//       </div>
//       <div></div>
//     </div>
//   );
// };

// export default JobSearchBar;
