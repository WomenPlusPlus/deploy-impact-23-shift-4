/**
 * Fetches all the candidates
 * @returns an array of all candidate data objects
 */
export async function getAllCandidates() {
  try {
    const response = await fetch("/api/get_all_candidates");
    if (response.ok) {
      const data = await response.json();
      return data.candidates;
    } else {
      throw new Error("Failed to fetch candidates");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Fetches the candidate data object by id
 * @param userId the id of the candidate
 * @returns an object with the candidate data
 */
export async function getCandidateById(userId: string) {
  try {
    const response = await fetch(`/api/get_candidate_by_id?user_id=${userId}`);
    if (response.ok) {
      const data = await response.json();
      return data.candidates;
    } else if (response.status === 404) {
      throw new Error("Candidate not found");
    } else {
      throw new Error("Failed to fetch candidate");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Updates the candidate data object by id
 * @param userId the id of the candidate
 * @param updateData the data to update
 * @returns
 */
export async function updateCandidateById(userId: string, updateData: object) {
  try {
    const response = await fetch("/api/update_candidate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, ...updateData }),
    });

    if (response.ok) {
      return { message: "Candidate updated successfully" };
    } else if (response.status === 404) {
      throw new Error("Candidate not found");
    } else {
      throw new Error("Failed to update candidate");
    }
  } catch (error) {
    throw error;
  }
}
