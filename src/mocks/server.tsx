import { setupServer } from "msw/node";
import { handlers } from "./handler";

export const server = setupServer(...handlers);

// src/test-utils.tsx - Custom render with providers
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TaskContextProvider } from "../context/TasksContext";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <TaskContextProvider>{children}</TaskContextProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
