import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { createMessage, getMessages } from "../actions";

/**
 * Warm the React Query cache with a project's messages.
 *
 * Useful on navigation so the messages list renders instantly from cache.
 *
 * @param queryClient - The React Query client to prime.
 * @param projectId - The project whose messages should be prefetched.
 */
export const prefetchMessages = async (
  queryClient: QueryClient,
  projectId: string
) => {
  await queryClient.prefetchQuery({
    queryKey: ["messages", projectId],
    queryFn: () => getMessages(projectId),
    staleTime: 10_000,
  });
};

/**
 * React Query hook that loads and live-polls a project's messages.
 *
 * Polls every 5s while there are messages (to surface agent responses as they
 * arrive) and stops polling when the list is empty. Disabled without a
 * `projectId`.
 *
 * @param projectId - The project whose messages to fetch.
 */
export const useGetMessages = (projectId: string) => {
  return useQuery({
    queryKey: ["messages", projectId],
    queryFn: () => getMessages(projectId),
    staleTime: 10_000,
    refetchInterval: (query) => {
      return query.state.data?.length ? 5000 : false;
    },
    enabled: Boolean(projectId),
  });
};

/**
 * React Query mutation hook for sending a new message to a project.
 *
 * Invalidates the project's messages query on success so the list refetches.
 *
 * @param projectId - The project the new message belongs to.
 */
export const useCreateMessage = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: string) => createMessage(value, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", projectId] });
    },
  });
};
