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
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Modal {...mockProps} isOpen={false} />
      </QueryClientProvider>
    );
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('calls setIsOpen when close button is clicked', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Modal {...mockProps} />
      </QueryClientProvider>
    );
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(mockProps.setIsOpen).toHaveBeenCalledWith(false);
  });
}); 