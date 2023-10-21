import { CardContainer } from "../../../../UI/container/CardContainer";
import { Button } from "../../../../UI/button/Button";
import { HorizontalCard } from "../../../../UI/horizontalCard/HorizontalCard";
import { Association } from "../../../../../types/types";
import styling from "./Iniciatives.module.css";

const IniciativesComponent = ({
  association,
}: {
  association: Association;
}) => {
  return (
    <CardContainer>
      <div className={styling.mainSection}>
        <div className={styling.sectionHeader}>
          <h2 className={styling.titles}>Latest iniciatives</h2>
          <Button className={styling.button}>Add new iniciative</Button>
        </div>
        {association?.iniciatives?.map((iniciative: any) => (
          <HorizontalCard
            avatar={true}
            button="Details"
            firstName={association.association_name}
            title={iniciative.name}
            subtitle={iniciative.description}
          />
        ))}
      </div>
    </CardContainer>
  );
};

export default IniciativesComponent;
