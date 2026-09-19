import { Outlet } from "react-router-dom";
import Header from "./components/header/Header.components.jsx";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/sidebar/Sidebar.components.jsx";
import SidebarMobile from "./components/sidebar/SideBarMobile.components.jsx";
import SearchMenu from "./components/header/units/SearchMenu.components.jsx";
// import { useAuthContext } from "./hooks/context_hooks/useAuthContext.hooks.jsx";

const App = () => {
  // const { user } = useAuthContext();

  return (
    <main className="w-full min-h-screen bg-(--bg-light-primary) dark:bg-(--bg-dark-primary)">
      {/* {user && <Header />} */}
      <Header />
      <Sidebar />
      <SidebarMobile />
      <SearchMenu />
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
