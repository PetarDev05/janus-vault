import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/context_hooks/useAuthContext.hooks.jsx";

const IndexRouteGuard = () => {
  const { authStatus } = useAuthContext();

  if (authStatus === "authenticated") {
    return <Navigate to="/dashboard" />;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/sign_in" />;
  }
};

export default IndexRouteGuard;
