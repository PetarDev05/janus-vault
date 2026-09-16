import { useReducer } from "react";
import { AuthContext } from "./AuthContext.context.jsx";

const authReducer = ({ user }, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return { user: payload.user };
    case "REMOVE_USER":
      return { user: null };
    default:
      return { user };
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const value = {
    ...state,
    dispatchUser: dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
