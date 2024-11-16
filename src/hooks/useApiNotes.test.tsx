import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiNotes } from "./useApiNotes";
import { apiService } from "../services/api";
import { Mock, vi } from "vitest";

vi.mock("../services/api", () => ({
  apiService: {
    getNotes: vi.fn(),
    createNote: vi.fn(),
    updateNote: vi.fn()
  }
}));

describe("useApiNotes", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch notes successfully", async () => {
    const mockNotes = [{ id: "1", body: JSON.stringify({ title: "Test Note", content: "Test Content" }) }];
    (apiService.getNotes as Mock).mockResolvedValueOnce(mockNotes);

    const { result } = renderHook(() => useApiNotes(), {
      wrapper: createWrapper()
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.notes).toEqual(mockNotes);
    expect(apiService.getNotes).toHaveBeenCalledTimes(1);
  });

  it("should create a note successfully", async () => {
    const newNote = { id: "1", body: JSON.stringify({ title: "Test Note", content: "Test Content" }) };
    (apiService.createNote as jest.Mock).mockResolvedValueOnce(newNote);

    const { result } = renderHook(() => useApiNotes(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.createNote(newNote);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(apiService.createNote).toHaveBeenCalledWith(newNote);
  });

  it("should update a note successfully", async () => {
    const updatedNote = { id: "1", body: JSON.stringify({ title: "Updated Note", content: "Updated Content" }) };
    (apiService.updateNote as Mock).mockResolvedValueOnce(updatedNote);

    const { result } = renderHook(() => useApiNotes(), {
      wrapper: createWrapper()
    });

    act(() => {
      result.current.updateNote(updatedNote);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(apiService.updateNote).toHaveBeenCalledWith(updatedNote);
  });


  it("should handle errors", async () => {
    (apiService.getNotes as Mock).mockRejectedValueOnce(new Error("Failed to fetch notes"));

    const { result } = renderHook(() => useApiNotes(), {
      wrapper: createWrapper()
    });

    expect(result.current.error).toBeDefined();
  }); 
});
