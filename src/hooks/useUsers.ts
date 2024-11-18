import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export const useUsers = (query: string) => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users', query],
    queryFn: async () => {
      const result = await apiService.searchUsers(query);
      return result ?? [];
    },
  });

  return { users, isLoading, error };
};