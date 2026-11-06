import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { App } from "./App.tsx";

function renderApp(container: HTMLElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  act(() => {
    createRoot(container).render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );
  });
}

describe("App", () => {
  let container: HTMLDivElement;

  afterEach(() => {
    container?.remove();
  });

  it("renders feed shell loading state", () => {
    container = document.createElement("div");
    document.body.append(container);

    renderApp(container);

    expect(container.textContent).toContain("Carregando feed");
  });
});
