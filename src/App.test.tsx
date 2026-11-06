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
    localStorage.clear();
  });

  it("renders login boot or form on root", () => {
    container = document.createElement("div");
    document.body.append(container);

    renderApp(container);

    const text = container.textContent ?? "";
    expect(text.includes("Carregando") || text.includes("Entre na sua conta")).toBe(true);
  });
});
