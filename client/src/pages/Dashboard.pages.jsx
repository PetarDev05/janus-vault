import NewCategoryWindow from "../components/global/units/NewCategoryWindow.components.jsx";
import { useAuthContext } from "../hooks/context_hooks/useAuthContext.hooks.jsx";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/context_hooks/useGlobalContext.hooks.jsx";

const Dashboard = () => {
  const { authStatus } = useAuthContext();
  const { categoryWindow } = useGlobalContext();

  if (authStatus === "unauthenticated") {
    return <Navigate to="/sign_in" />;
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-5  dark:bg-(--bg-dark-primary) ">
      {categoryWindow && <NewCategoryWindow />}
    </div>
  );
};

export default Dashboard;
