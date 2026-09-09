import Header from "./components/header/Header.components.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main className="w-full min-h-screen bg-(--bg-light-primary) dark:bg-(--bg-dark-primary)">
      <Header />
      <Toaster
        toastOptions={{
          style: {
            color: "var(--white)",
            backgroundColor: "var(--toast-info)",
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
          duration: 4000,
        }}
      />
    </main>
  );
};

export default App;
