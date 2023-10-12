/**
 * Fetches all companies from the server
 * @returns an array of all company objects
 */
export async function getAllCompanies() {
  try {
    const response = await fetch("/api/get_all_companies");
    if (response.ok) {
      const data = await response.json();
      return data.companies;
    } else {
      throw new Error("Failed to fetch companies");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Fetches the company data object by id
 * @param userId the id of the company
 * @returns the company data object
 */
export async function getCompanyById(userId: string) {
  try {
    const response = await fetch(`/api/get_company_by_id?user_id=${userId}`);
    if (response.ok) {
      const data = await response.json();
      return data.companies;
    } else if (response.status === 404) {
      throw new Error("Company not found");
    } else {
      throw new Error("Failed to fetch company");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Updates the company data object by id
 * @param userId the id of the company
 * @param updateData the data to update
 * @returns
 */
export async function updateCompanyById(userId: string, updateData: object) {
  try {
    const response = await fetch("/api/update_company", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, ...updateData }),
    });

    if (response.ok) {
      return { message: "Company updated successfully" };
    } else if (response.status === 404) {
      throw new Error("Company not found");
    } else {
      throw new Error("Failed to update company");
    }
  } catch (error) {
    throw error;
  }
}
