import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../tests/mocks/server";
import { apiService } from "./api";

describe("apiService", () => {
  describe("getNotes", () => {
    it("should fetch all notes successfully", async () => {
      const notes = await apiService.getNotes();
      expect(notes).toHaveLength(2);
      expect(notes[0]).toHaveProperty("id");
      expect(notes[0]).toHaveProperty("body");
    });

    it("should throw error on network failure", async () => {
      server.use(
        http.get(`${import.meta.env.VITE_API_URL}/notes`, () => {
          return HttpResponse.json({ error: "Network error" }, { status: 500 });
        })
      );

      await expect(apiService.getNotes()).rejects.toThrowError();
    });
  });

  describe("getNoteById", () => {
    it("should fetch a single note successfully", async () => {
      const newNote = { id: 1, body: JSON.stringify({ title: "New note 1", content: "New note", updatedAt: "2024-11-13T00:00:00.000Z" }) };

      server.use(
        http.get(`${import.meta.env.VITE_API_URL}/notes/1`, () => {
          return HttpResponse.json({ id: "1", body: JSON.stringify(newNote) });
        })
      );

      const note = await apiService.getNoteById("1");
      expect(note).toHaveProperty("id", "1");
      expect(note).toHaveProperty("body");
    });

    it("should throw error when note is not found", async () => {
      await expect(apiService.getNoteById("999")).rejects.toThrow(
        "Failed to fetch note with id: 999"
      );
    });
  });

  describe("createNote", () => {
    const newNote = { title: "New note", content: "New note", updatedAt: "2024-11-13T00:00:00.000Z" };

    it("should create a note successfully", async () => {
      server.use(
        http.post(`${import.meta.env.VITE_API_URL}/notes`, () => {
          return HttpResponse.json({ id: "1", body: JSON.stringify(newNote) });
        })
      );

      const createdNote = await apiService.createNote(newNote);
      expect(createdNote).toHaveProperty("id");
      expect(createdNote.body).toBe(JSON.stringify(newNote));
    });

    it("should throw error when creation fails", async () => {
      server.use(
        http.post(`${import.meta.env.VITE_API_URL}/notes`, () => {
          return HttpResponse.json({ error: "Network error" }, { status: 400 });
        })
      );

      await expect(apiService.createNote(newNote)).rejects.toThrow(
        "Failed to create note"
      );
    });


    it("should update a note successfully", async () => {
      const editedNote = { title: "Edited note", content: "Edited note", updatedAt: "2024-11-13T00:00:00.000Z" };

      server.use(
        http.put(`${import.meta.env.VITE_API_URL}/notes/1`, () => {
          return HttpResponse.json({ id: "1", body: JSON.stringify(editedNote) });
        })
      );

      const updatedNote = await apiService.updateNote({ id: "1", ...editedNote });
      expect(updatedNote).toHaveProperty("id");
      expect(updatedNote.body).toBe(JSON.stringify(editedNote));
    }); 

    it("should throw error when update fails", async () => {
      const editedNote = { title: "Edited note", content: "Edited note", updatedAt: "2024-11-13T00:00:00.000Z" };

      server.use(
        http.put(`${import.meta.env.VITE_API_URL}/notes/1`, () => {
          return HttpResponse.json({ error: "Network error" }, { status: 400 });
        })
      );

      await expect(apiService.updateNote({ id: "1", ...editedNote })).rejects.toThrow("Failed to update note");
    }); 
  });


  describe("searchUsers", () => {
    it("should search users successfully", async () => {

      server.use(
        http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
          return HttpResponse.json([{ id: "1", name: "John Doe", username: "johndoe" }, { id: "2", name: "Jane Doe", username: "janedoe" }]);
        })
      );
      const users = await apiService.searchUsers("Doe");
      expect(users).toHaveLength(2);
    });

    it("should search users successfully with partial match", async () => {

      server.use(
        http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
          return HttpResponse.json([{ id: "1", name: "John Doe", username: "johndoe" }, { id: "2", name: "Jane Doe", username: "janedoe" }]);
        })
      );
      const users = await apiService.searchUsers("John");
      expect(users).toHaveLength(1);
    });

    it("should return empty array if no users are found", async () => {
      server.use(
        http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
          return HttpResponse.json([{ id: "1", name: "John Doe", username: "johndoe" }, { id: "2", name: "Jane Doe", username: "janedoe" }]);
        })
      );
      const users = await apiService.searchUsers("nonexistentuser");
      expect(users).toEqual([]);
    });
  });
});
