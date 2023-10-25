import { useEffect, useState } from "react";
import Card from "../../UI/card/Card";
import styling from "./Companies.module.css";
import Filter from "../../UI/filter/Filter";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../api/companies";
import Searchbar from "../../UI/searchbar/Searchbar";

interface Company {
  user_id: string;
  company_name: string;
  address: string;
  description: string;
  associations: string[];
  values: string[];
}

const Companies = () => {
  const values = ["Teamwork", "Diversity", "Inclusion"];
  const associationsOptions = ["Woman++", "Power Coders"];

  const navigate = useNavigate();

  // State
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  /**
   * Handle filter change
   * @param filteredCompanies - filtered companies
   */
  const handleFilterChange = (filteredCompanies: Company[]) => {
    setFilteredCompanies(filteredCompanies);
  };

  /**
   * Handle the search in the companies
   * @param searchText - search text
   */
  const handleSearch = (searchText: string) => {
    if (searchText.trim() === "") {
      setFilteredCompanies(companies);
    } else {
      const filteredResults = filteredCompanies.filter(
        (item) =>
          (item.company_name &&
            item.company_name
              .toLowerCase()
              .includes(searchText.toLowerCase())) ||
          (item.address &&
            item.address.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.associations &&
            item.associations
              .join(" ")
              .toLowerCase()
              .includes(searchText.toLowerCase())) ||
          (item.values &&
            item.values
              .join(" ")
              .toLowerCase()
              .includes(searchText.toLowerCase()))
      );
      setFilteredCompanies(filteredResults);
    }
  };

  /**
   * Fetch all companies from the database
   */
  const fetchCompanies = async () => {
    try {
      const companies = await getAllCompanies();
      setCompanies(companies);
      setFilteredCompanies(companies);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  console.log(filteredCompanies);
  return (
    <div className={styling.main}>
      <h1 className={styling.header}>Our partner companies</h1>
      <div className={styling.filters}>
        <Searchbar
          placeholder="Search..."
          width={800}
          onSearch={handleSearch}
        />
        <div className={styling.filterDropdown}>
          <Filter
            options={values}
            data={companies}
            criteria="values"
            onFilterChange={handleFilterChange}
          />
          <Filter
            options={associationsOptions}
            data={companies}
            criteria="associations"
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className={styling.cards}>
        {filteredCompanies?.map((company, index) => (
          <Card
            key={index}
            header={company?.company_name}
            subheader={company?.address}
            associations={company?.associations}
            values={company?.values}
            onClickRedirect={() => {
              navigate(`/company/${company?.user_id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Companies;
