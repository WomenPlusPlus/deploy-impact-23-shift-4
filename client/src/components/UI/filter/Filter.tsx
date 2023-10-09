import { Select } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

interface FilterProps {
  options: string[];
  candidates: any[];
  criteria: string;
  onFilterChange: (filteredCandidates: any[]) => void;
}

const Filter = ({
  options,
  candidates,
  criteria,
  onFilterChange,
}: FilterProps) => {
  const [selectedCriteria, setSelectedCriteria] = useState(["All"]);

  const handleChange = (value: any) => {
    console.log(value);
    setSelectedCriteria(value);
  };

  useEffect(() => {
    const filteredCandidates = selectedCriteria.includes("All")
      ? candidates
      : candidates.filter((candidate) =>
          candidate[criteria].some((item: any) =>
            selectedCriteria.includes(item)
          )
        );
    onFilterChange(filteredCandidates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCriteria]);

  return (
    <div className="filter">
      <Select
        id="filter"
        mode="multiple"
        style={{ minWidth: 150 }}
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