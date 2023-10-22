import configureAxios from "./../config";

const axios = configureAxios();

/**
 * Fetches all the users
 * @returns
 */
export async function getAllUsers(): Promise<any> {
  try {
    const response = await axios.get("/api/get_all_users", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data.users;
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error occurred during the API call.";
  }
}

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
