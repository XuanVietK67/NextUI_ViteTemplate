import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
            <App/>
          </QueryClientProvider>
        </NextUIProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
