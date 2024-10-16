import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";
import "./index.css";
import { Home, NewBill } from "./pages/index.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "newBill",
        element: <NewBill />,
      },
      {
        path: "accounts",
        element: <p>Accounts</p>,
      },
      {
        path: "bills",
        element: <p>bills</p>,
      },
      {
        path: "settings",
        element: <p>settings</p>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>
);
