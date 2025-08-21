import React from "react";
import { render as originalRender } from "@testing-library/react";
// Import any providers your components need
// import { Provider } from 'react-redux';
// import { ThemeProvider } from 'styled-components';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <Provider store={store}>
    //   <ThemeProvider theme={theme}>
    { children }
    //   </ThemeProvider>
    // </Provider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Parameters<typeof originalRender>[1]
) => originalRender(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from React Testing Library
export * from "@testing-library/react";

// Override the default render with our custom one
export { customRender as render };
