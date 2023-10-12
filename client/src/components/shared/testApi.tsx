import { useEffect } from "react";
import { updateCompanyById } from "../../api/companies";

function YourFrontendComponent() {
  useEffect(() => {
    async function fetchData() {
      try {
        const skills = await updateCompanyById(
          "0ee03b7e-1f81-40aa-94b1-58a38ded6f69",
          { address: "123 Alpine Street, Zurich" }
        );
        console.log("response", skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Skills</h1>
      <ul></ul>
    </div>
  );
}

export default YourFrontendComponent;
