import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";
import "./index.css";
import { AccountsPage, BillsPage, Home, NewBill } from "./pages/index.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {
  loaderAccountsPage,
  loaderBillsPage,
  loaderHeader,
  loaderHome,
  loaderNewBills,
} from "./routes/loaders/index.ts";
import LayoutHeader from "./pages/layout/LayoutHeader.tsx";
import {
  actionAccountsPage,
  actionBills,
  actionHome,
  actionNewBills,
} from "./routes/actions/index.ts";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <LayoutHeader />,
        loader: loaderHeader,
        children: [
          {
            index: true,
            element: <Home />,
            loader: loaderHome,
            action: actionHome,
          },
          {
            path: "newBill",
            element: <NewBill />,
            loader: loaderNewBills,
            action: actionNewBills,
          },
          {
            path: "accounts",
            element: <AccountsPage />,
            loader: loaderAccountsPage,
            action: actionAccountsPage,
          },
          {
            path: "bills",
            element: <BillsPage />,
            loader: loaderBillsPage,
            action: actionBills,
          },
          {
            path: "settings",
            element: <p>settings</p>,
          },
        ],
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
