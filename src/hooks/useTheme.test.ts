import { act, renderHook, waitFor } from "@testing-library/react";
import useTheme from "./useTheme";

describe('useTheme', () => {

  it('returns the initial theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('toggles theme back to light', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });
});