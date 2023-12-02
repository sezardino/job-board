export * from "./hydrate";
export * from "./provider";

import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          staleTime: 1000 * 60,
          refetchOnWindowFocus: process.env.NODE_ENV !== "development",
        },
      },
    })
);
export default getQueryClient;
