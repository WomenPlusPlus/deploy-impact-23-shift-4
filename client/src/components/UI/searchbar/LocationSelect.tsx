import React, { useEffect, useState } from "react";
import { Select } from "antd";

const { Option } = Select;

interface FilterProps {
  options: string[];
  data: any[];
  criteria: string;
  onFilterChange: (filteredData: any[]) => void;
}

const Filter = ({ options, data, criteria, onFilterChange }: FilterProps) => {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const handleChange = (value: string[]) => {
    setSelectedCriteria(value);
  };

  useEffect(() => {
    const filteredData =
      selectedCriteria.length === 0
        ? data
        : data.filter((job) => selectedCriteria.includes(job[criteria]));
    onFilterChange(filteredData);
  }, [selectedCriteria, criteria, data, onFilterChange]);

  return (
    <div className="filter">
      <Select
        id="filter"
        mode="multiple"
        style={{ minWidth: 200 }}
        placeholder={"Select " + criteria}
        value={selectedCriteria}
        onChange={handleChange}
        maxTagCount={3}
        maxTagTextLength={10}
        dropdownStyle={{ maxHeight: 200, overflowY: "auto" }}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Filter;
