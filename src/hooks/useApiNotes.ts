import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';

export const useApiNotes = () => {
  const queryClient = useQueryClient();

  const { data: notes, isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: apiService.getNotes,
  });

  const createNoteMutation = useMutation({
    mutationFn: apiService.createNote,
    onSuccess: () => {
      // Invalidate and refetch notes after creation
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: apiService.updateNote,
    onSuccess: () => {
      // Invalidate and refetch notes after update
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return {
    notes,
    isLoading,
    error,
    createNote: createNoteMutation.mutate,
    isCreating: createNoteMutation.isPending,
    updateNote: updateNoteMutation.mutate,
    isUpdating: updateNoteMutation.isPending,
  };
}; 