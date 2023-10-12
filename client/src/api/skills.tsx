/**
 * Fetches all skills data from the server
 * @returns all skills data object
 */
export async function getAllSkills() {
  try {
    const response = await fetch("/api/get_all_skills");
    if (response.ok) {
      const data = await response.json();
      return data.skills;
    } else {
      throw new Error("Failed to fetch skills");
    }
  } catch (error) {
    throw error;
  }
}
