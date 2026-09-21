import { useAuthContext } from "../hooks/context_hooks/useAuthContext.hooks.jsx";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { authStatus } = useAuthContext();

  if (authStatus === "unauthenticated") {
    return <Navigate to="/sign_in" />;
  }

  return <div className="p-20">DASHBOARD</div>;
};

export default Dashboard;
