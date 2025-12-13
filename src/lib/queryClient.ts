import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient;

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 1, // 1min
          retry: false,
        },
      },
    });
  }
  return queryClient;
};

export { queryClient };