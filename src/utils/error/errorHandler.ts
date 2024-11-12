type ApiErrorType = {
  message: string;
  status?: number;
  data?: unknown;
};

const createApiError = (message: string, status?: number, data?: unknown): ApiErrorType => ({
  message,
  status,
  data,
});

const handleApiError = (error: unknown, customMessage?: string): never => {
  if (error instanceof Response) {
    throw createApiError(customMessage || 'Network response was not ok', error.status);
  }
  throw createApiError(customMessage || 'An unexpected error occurred', 500);
};

const checkResponse = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    throw createApiError('Network response was not ok', response.status, null);
  }
  return response;
};

export { createApiError, handleApiError, checkResponse };
