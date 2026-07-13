import { QueryClient } from "@tanstack/react-query"; 
export const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5, // Data is fresh for 5 min 
gcTime: 1000 * 60 * 10, 
// // Keep in memory for 10 min 
retry: 1, 
// Retry failed requests once 
 refetchOnWindowFocus: false, 
// // Don't refetch when tab regains focus 
}, mutations: { retry: 1, // Retry failed mutations once 
}, }, });