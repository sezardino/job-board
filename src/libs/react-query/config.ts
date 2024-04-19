export * from "./hydrate";
export * from "./provider";

import { QueryClientConfig, keepPreviousData } from "@tanstack/react-query";

export const defaultReactQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: process.env.NODE_ENV !== "development",
      placeholderData: keepPreviousData,
    },
  },
};
