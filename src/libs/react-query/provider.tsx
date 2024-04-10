"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import React, { PropsWithChildren } from "react";
import { defaultReactQueryConfig } from "./config";

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [client] = React.useState(new QueryClient(defaultReactQueryConfig));

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
};
