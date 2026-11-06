import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { createAppQueryClient } from "../shared/lib/query-client.ts";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createAppQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
