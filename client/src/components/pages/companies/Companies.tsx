import { useEffect, useState } from "react";
import Card from "../../UI/card/Card";
import styling from "./Companies.module.css";
import Filter from "../../UI/filter/Filter";

import { getAllCompanies } from "../../../api/companies";

const Companies = () => {
  const values = ["All", "Teamwork", "Diversity", "Inclusion"];

  const associationsOptions = ["Woman++", "Power Coders"];

  // Define company interface
  interface Company {
    company_name: string;
    address: string;
    description: string;
    associations: string[];
    values: string[];
  }

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
   * Fetch all companies from the database
   */
  const fetchCompanies = async () => {
    const companies = await getAllCompanies();
    setCompanies(companies.slice(0, 12));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  console.log(filteredCompanies);
  return (
    <div className={styling.mainContainer}>
      <h1 className={styling.header}>Browse our partner companies</h1>
      <div className={styling.filters}>
        <Filter
          options={values}
          data={companies}
          criteria="skills"
          onFilterChange={handleFilterChange}
        />
        <Filter
          options={associationsOptions}
          data={companies}
          criteria="associations"
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className={styling.cards}>
        {filteredCompanies.map((company) => (
          <Card header={company.company_name} subheader={company.address} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
