import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Creating the Queryclient instance
const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* The query client provider that provides the client for child components. */}
    <QueryClientProvider client={client}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </QueryClientProvider>
  </StrictMode>
);
