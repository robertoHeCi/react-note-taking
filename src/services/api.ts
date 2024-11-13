import { checkResponse, handleApiError } from "@/utils/error/errorHandler";

export const apiService = {
  getNotes: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
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
  }
};
