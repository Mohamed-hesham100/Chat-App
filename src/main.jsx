import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { appRouter } from "./routes/AppRoute.jsx";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import { appStore } from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
      <Toaster position="top-right" />
    </Provider>
  </StrictMode>
);
