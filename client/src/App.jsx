import { Outlet } from "react-router-dom";
import Header from "./components/header/Header.components.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main className="w-full min-h-screen bg-(--bg-light-primary) dark:bg-(--bg-dark-primary)">
      <Header />
      <Outlet />
      <Toaster
        toastOptions={{
          style: {
            color: "var(--white)",
            backgroundColor: "var(--primary)",
          },
          success: {
            style: {
              color: "var(--white)",
              backgroundColor: "var(--toast-success)",
            },
          },
          error: {
            style: {
              color: "var(--white)",
              backgroundColor: "var(--toast-error)",
            },
          },
          duration: 8000,
        }}
      />
    </main>
  );
};

export default App;
