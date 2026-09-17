// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.layouts.jsx";
import SignUp from "./pages/SignUp.pages.jsx";
import SignIn from "./pages/SignIn.pages.jsx";
import UserLayout from "./layouts/UserLayout.layouts.jsx";
import Dashboard from "./pages/Dashboard.pages.jsx";
import GlobalContextProvider from "./context/global/GlobalContextProvider.context.jsx";
import AuthContextProvider from "./context/auth/AuthContextProvider.context.jsx";
import DataContextProvider from "./context/data/DataContextProvider.context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "sign_up",
            element: <SignUp />,
          },
          {
            path: "sign_in",
            element: <SignIn />,
          },
        ],
      },
      {
        element: <UserLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
    errorElement: <div>PAGE NOT FOUND</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GlobalContextProvider>
    <AuthContextProvider>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </AuthContextProvider>
  </GlobalContextProvider>,
  // </StrictMode>,
);
