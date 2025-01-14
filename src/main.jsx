import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Creating the Queryclient instance
const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* The query client provider that provides the client for child components. */}
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
