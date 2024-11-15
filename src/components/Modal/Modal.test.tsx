import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Modal Component', () => {
  const mockProps = {
    isOpen: true,
    setIsOpen: vi.fn(),
    isEditMode: false,
    noteTypeToDisplay: {
      id: '1',
      type: 'text',
      title: 'Test title',
      content: 'Test content',
      updatedAt: '2024-11-13T00:00:00.000Z'
    }
  };

  it('renders when isOpen is true', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>  
        <Modal {...mockProps} />
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText('Note title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your content here...')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Modal {...mockProps} isOpen={false} />
      </QueryClientProvider>
    );
    expect(screen.queryByPlaceholderText('Note title')).not.toBeInTheDocument();
  });

  it.skip('calls setIsOpen when close button is clicked', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Modal {...mockProps} />
      </QueryClientProvider>
    );
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockProps.setIsOpen).toHaveBeenCalledWith(false);
  });
}); 