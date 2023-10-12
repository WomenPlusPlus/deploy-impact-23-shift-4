/**
 * Fetches all associations from the database
 * @returns all associations data object
 */
export async function getAllAssociations() {
  try {
    const response = await fetch("/api/get_all_associations");
    if (response.ok) {
      const data = await response.json();
      return data.associations;
    } else {
      throw new Error("Failed to fetch associations");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Fetches the association data object by id
 * @param userId the id of the association
 * @returns the association data object
 */
export async function getAssociationById(userId: string) {
  try {
    const response = await fetch(
      `/api/get_association_by_id?user_id=${userId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.associations;
    } else if (response.status === 404) {
      throw new Error("Association not found");
    } else {
      throw new Error("Failed to fetch association");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Updates the association data object by id
 * @param userId the id of the association
 * @param updateData the data to update
 * @returns
 */
export async function updateAssociationById(
  userId: string,
  updateData: object
) {
  try {
    const response = await fetch("/api/update_association", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, ...updateData }),
    });

    if (response.ok) {
      return { message: "Association updated successfully" };
    } else if (response.status === 404) {
      throw new Error("Association not found");
    } else {
      throw new Error("Failed to update association");
    }
  } catch (error) {
    throw error;
  }
}
