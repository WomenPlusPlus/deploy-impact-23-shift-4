import React, { useState } from "react";
import { Select } from "antd";
import "./SortBy.css";
const { Option } = Select;

interface SortByProps {
  onChange: (value: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ onChange }) => {
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    onChange(value);
  };

  const customSelectStyle = {
    border: "none",
    backgroundColor: "transparent",
  };

  return (
    <div>
      <span>Sort by date: </span>
      <Select
        defaultValue="Date"
        onChange={handleSortChange}
        placeholder="Date"
        className="custom-select"
      >
        <Option value="asc">Ascending</Option>
        <Option value="desc">Descending</Option>
      </Select>
    </div>
  );
};

export default SortBy;
