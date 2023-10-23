import React, { useState, ChangeEvent } from "react";
import { Input } from "antd";
import { Company, Job } from "../../../types/types";

const { Search } = Input;

interface SearchJobsProps {
  onSearch: (results: (Company | Job)[]) => void;
  data: (Company | Job)[];
}

interface SearchableField {
    title?: string;
    work_location?: string;
    location_city?: string;
    salary?: string;
  }

// const isJob = (item: Company | Job): item is Job => {
//   return (item as Job).title !== undefined;
// };

const SearchJobs: React.FC<SearchJobsProps> = ({ onSearch, data }) => {
  const [query, setQuery] = useState<string>("");
 
  
//   const handleSearch = () => {
//     const result = data.filter((item) => {
        
//       if (isJob(item) && item.title && item.title.toLowerCase().includes(query.toLowerCase())) {
//         return true;
//       }
//       if (!isJob(item) && item.company_name && item.company_name.toLowerCase().includes(query.toLowerCase())) {
//         return true;
//       }
//       return false;
//     });

//     onSearch(result);
//   };

const keys: (keyof SearchableField)[] = ["title", "work_location", "location_city", "salary"];

const handleSearch = () => {
  const result= data.filter((item) =>
    keys.some((key) => {
      const fieldValue = (item as SearchableField)[key];
      return fieldValue && fieldValue.toLowerCase().includes(query.toLowerCase());
    })
    
  );

  onSearch(result);
  console.log("h")
};

  return (
    <div>
      <Search
        placeholder="Input search text"
        allowClear
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            handleSearch(); 
          }}        
      />
    </div>
  );
};

export default SearchJobs;
