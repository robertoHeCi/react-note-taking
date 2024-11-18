import { checkResponse, handleApiError } from "@/utils/error/errorHandler";

export const apiService = {
  getNotes: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_SESSION_ID}/notes`);
      await checkResponse(response);
      return response.json();
    } catch (error) {
      handleApiError(error, "Failed to fetch notes");
    }
  },

  getNoteById: async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notes/${id}`
      );
      await checkResponse(response);
      return response.json();
    } catch (error) {
      handleApiError(error, `Failed to fetch note with id: ${id}`);
    }
  },

  createNote: async (noteData: { [key: string]: string }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_SESSION_ID}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: JSON.stringify({
            ...noteData,
            "updatedAt": new Date().toISOString()
          })
        })
      });
      await checkResponse(response);
      return response.json();
    } catch (error) {
      handleApiError(error, "Failed to create note");
    }
  },

  updateNote: async (noteData: { [key: string]: string }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_SESSION_ID}/notes/${noteData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: JSON.stringify({
            ...noteData,
            "updatedAt": new Date().toISOString()
          })
        })
      });
      await checkResponse(response);
      return response.json();
    } catch (error) {
      handleApiError(error, "Failed to update note");
    }
  },

  searchUsers: async (query: string): Promise<Api.User[]> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users?search=${encodeURIComponent(query)}`
      );
      await checkResponse(response);
      const users = await response.json();
      const filteredUsers = users
        .filter((user: Api.User) => 
          user?.first_name?.toLowerCase().includes(query.toLowerCase()) ||
          user?.username?.toLowerCase().includes(query.toLowerCase())
        );

      // Return only top 5 most relevant results
      return filteredUsers.slice(0, 5);
    } catch (error) {
      handleApiError(error, "Failed to fetch users");
      return [];
    }
  },
};
