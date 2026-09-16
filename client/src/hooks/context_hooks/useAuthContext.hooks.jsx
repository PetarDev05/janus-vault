import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext.context.jsx";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth context not found.");
  }

  return context;
};
