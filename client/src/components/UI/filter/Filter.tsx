import { Select } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

interface FilterProps {
  options: string[];
  data: any[];
  criteria: string;
  onFilterChange: (filteredData: any[]) => void;
}

const Filter = ({ options, data, criteria, onFilterChange }: FilterProps) => {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const handleChange = (value: any) => {
    setSelectedCriteria(value);
  };

  useEffect(() => {
    const filteredData =
      selectedCriteria.length === 0
        ? data
        : data.filter((candidate) =>
            candidate[criteria]?.some((item: string) =>
              selectedCriteria.includes(item)
            )
          );
    onFilterChange(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCriteria]);

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
