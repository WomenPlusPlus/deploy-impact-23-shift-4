import axios from "axios";

/**
 * Fetches all the users
 * @param userId the id of the user
 * @returns
 */
export async function deleteUser(userId: string): Promise<string> {
  try {
    const response = await axios.post(
      "/api/delete_user",
      { user_id: userId },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data.message;
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error occurred during the API call.";
  }
}
