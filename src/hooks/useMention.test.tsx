import { renderHook, act, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import useMention from './useMention';
import { vi } from 'vitest';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('onInsertMention', () => {
  const contentRef = {
    current: document.createElement('div')
  };

  it('should insert mention correctly', () => {
    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    act(() => {
      result.current.handleOnKeyUp({ key: '@' } as React.KeyboardEvent<HTMLDivElement>);
    });

    contentRef.current.innerHTML = '@test';

    act(() => {
      result.current.onInsertMention('test user');
    });

    expect(contentRef.current.innerHTML).toContain('span');
    expect(contentRef.current.innerHTML).toContain('test user');
    expect(result.current.showMentions).toBe(false);
  });

  it('should hide mentions when space is typed', () => {
    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    act(() => {
      result.current.handleOnKeyUp({ key: '@' } as React.KeyboardEvent<HTMLDivElement>);
    });

    act(() => {
      result.current.handleOnKeyUp({ key: ' ' } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(result.current.showMentions).toBe(false);
    expect(result.current.mentionQuery).toBe('');
  });

  it('should handle multiple mentions', () => {

    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    act(() => {
      result.current.handleOnKeyUp({ key: '@test' } as React.KeyboardEvent<HTMLDivElement>);
    });

    contentRef.current.innerHTML = '@test';

    act(() => {
      result.current.onInsertMention('test user2');
    });

    expect(contentRef.current.innerHTML).toContain('span');
    expect(contentRef.current.innerHTML).toContain('test user2');

    waitFor(() => {
      expect(result.current.showMentions).toBe(false);
    });


    act(() => {
      result.current.handleOnKeyUp({ key: '@test3' } as React.KeyboardEvent<HTMLDivElement>);
    });

    contentRef.current.innerHTML = '@test3';

    waitFor(() => {
      expect(result.current.showMentions).toBe(true);
    });

    act(() => {
      result.current.onInsertMention('test user3');
    });

    expect(contentRef.current.innerHTML).toContain('span');
    expect(contentRef.current.innerHTML).toContain('test user3');

  });
})


describe('handleOnKeyUp', () => {
  // Mock contentRef
  const contentRef = {
    current: document.createElement('div')
  };

  beforeEach(() => {
    // Reset contentRef innerHTML before each test
    contentRef.current.innerHTML = '';

    // Mock window.getSelection
    window.getSelection = vi.fn().mockReturnValue({
      getRangeAt: vi.fn().mockReturnValue({
        cloneRange: vi.fn().mockReturnValue({
          selectNodeContents: vi.fn(),
          setEnd: vi.fn(),
          toString: vi.fn().mockReturnValue('test')
        }),
        endContainer: document.createTextNode(''),
        endOffset: 0
      }),
      rangeCount: 1
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    expect(result.current.showMentions).toBe(false);
    expect(result.current.mentionQuery).toBe('');
  });

  it('should show mentions when @ is typed', () => {
    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    act(() => {
      result.current.handleOnKeyUp({ key: '@' } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(result.current.showMentions).toBe(true);
  });

  it('should hide mentions when backspace removes @', () => {
    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    // First show mentions
    act(() => {
      result.current.handleOnKeyUp({ key: '@' } as React.KeyboardEvent<HTMLDivElement>);
    });

    // Then simulate backspace
    contentRef.current.innerHTML = 'test'; // Simulate removing @ symbol
    act(() => {
      result.current.handleOnKeyUp({ key: 'Backspace' } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(result.current.showMentions).toBe(false);
    expect(result.current.mentionQuery).toBe('');
  });

  it('should update mention query while typing', () => {
    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    // Show mentions
    act(() => {
      result.current.handleOnKeyUp({ key: '@' } as React.KeyboardEvent<HTMLDivElement>);
    });

    // Simulate typing 'test'
    contentRef.current.textContent = '@test';
    act(() => {
      result.current.handleOnKeyUp({ key: 't' } as React.KeyboardEvent<HTMLDivElement>);
    });

    waitFor(() => {
      expect(result.current.mentionQuery).toBe('test');
    });
  });



});

describe('getCaretPosition', () => {
  let contentRef: { current: HTMLDivElement };

  beforeEach(() => {
    // Create a fresh div element for each test
    contentRef = {
      current: document.createElement('div')
    };
    contentRef.current.contentEditable = 'true';
  });

  it('should return -1 when there is no selection', () => {
    window.getSelection = vi.fn().mockReturnValue(null);

    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    expect(result.current.getCaretPosition()).toBe(-1);
  });

  it('should return -1 when there is no range', () => {
    window.getSelection = vi.fn().mockReturnValue({ rangeCount: 0 });

    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    expect(result.current.getCaretPosition()).toBe(-1);
  });

  it('should return correct position for simple text', () => {
    const mockRange = {
      cloneRange: vi.fn().mockReturnThis(),
      selectNodeContents: vi.fn(),
      setEnd: vi.fn(),
      toString: vi.fn().mockReturnValue('Hello'),
      endContainer: document.createTextNode('Hello'),
      endOffset: 5
    };

    window.getSelection = vi.fn().mockReturnValue({
      rangeCount: 1,
      getRangeAt: vi.fn().mockReturnValue(mockRange)
    });

    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    expect(result.current.getCaretPosition()).toBe(5);
  });

  it('should handle nested elements correctly', () => {
    contentRef.current.innerHTML = 'Hello <span>World</span>';

    const textNode = document.createTextNode('World');
    const mockRange = {
      cloneRange: vi.fn().mockReturnThis(),
      selectNodeContents: vi.fn(),
      setEnd: vi.fn(),
      toString: vi.fn().mockReturnValue('Hello World'),
      endContainer: textNode,
      endOffset: 5
    };

    window.getSelection = vi.fn().mockReturnValue({
      rangeCount: 1,
      getRangeAt: vi.fn().mockReturnValue(mockRange)
    });

    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    expect(result.current.getCaretPosition()).toBe(11);
  });

  it('should handle empty content', () => {
    const mockRange = {
      cloneRange: vi.fn().mockReturnThis(),
      selectNodeContents: vi.fn(),
      setEnd: vi.fn(),
      toString: vi.fn().mockReturnValue(''),
      endContainer: document.createTextNode(''),
      endOffset: 0
    };

    window.getSelection = vi.fn().mockReturnValue({
      rangeCount: 1,
      getRangeAt: vi.fn().mockReturnValue(mockRange)
    });

    const { result } = renderHook(() => useMention({ contentRef }), {
      wrapper: Wrapper
    });

    expect(result.current.getCaretPosition()).toBe(0);
  });
});
