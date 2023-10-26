import { useEffect, useState } from "react";
import Filter from "../../UI/filter/Filter";
import Searchbar from "../../UI/searchbar/Searchbar";
import styling from "./Associations.module.css";
import { getAllAssociations } from "../../../api/associations";
import { Association } from "../../../types/types";
import AssociationCard from "../../UI/card/AssociationCard";
import { useNavigate } from "react-router-dom";

const Associations = () => {
  const associationsOptions = ["Woman++", "Power Coders"];
  const userId =
    JSON.parse(localStorage.getItem("auth") || "{}")?.user?.id || "";
  const userType =
    JSON.parse(localStorage.getItem("auth") || "{}")?.user?.user_type || "";
  const [filteredAssociations, setFilteredAssociations] = useState<
    Association[]
  >([]);

  const navigate = useNavigate();

  const fetchInfo = async () => {
    const associations = await getAllAssociations();
    if (userType === "association") {
      // exclude the association that is logged in
      const filteredAssociations = associations.filter(
        (association: Association) => association?.user_id !== userId
      );
      setFilteredAssociations(filteredAssociations);
    } else {
      setFilteredAssociations(associations);
    }
  };

  const handleFilterChange = (filteredAssociations: Association[]) => {
    setFilteredAssociations(filteredAssociations);
  };

  const onClickRedirect = (userId: string) => {
    navigate(`/association/${userId}`);
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  console.log(filteredAssociations);

  return (
    <div className={styling.main}>
      <h1>Associations</h1>
      <div className={styling.filters}>
        <Searchbar
          placeholder="Search..."
          width={800}
          onSearch={() => {
            console.log("search");
          }}
        />
        <div className={styling.filterDropdown}>
          <Filter
            options={associationsOptions}
            data={filteredAssociations}
            criteria="associations"
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className={styling.cards}>
        {filteredAssociations.map((association: Association, index) => (
          <AssociationCard
            key={index}
            avatar={association?.association_name}
            association={association}
            subheader={association?.email}
            onClickRedirect={() => onClickRedirect(association?.user_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Associations;
