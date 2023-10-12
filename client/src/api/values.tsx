/**
 * Fetches all values from the server
 * @returns all values data object
 */
export async function getAllValues() {
  try {
    const response = await fetch("/api/get_all_values");
    if (response.ok) {
      const data = await response.json();
      return data.values;
    } else {
      throw new Error("Failed to fetch values");
    }
  } catch (error) {
    throw error;
  }
}
