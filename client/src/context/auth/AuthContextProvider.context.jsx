import { useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext.context.jsx";
import { fetchWrapper } from "../../services/fetchWrapper.services.js";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { setAccessToken } from "../../storage/accessTokenStorage.storage.js";

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
  const { handleSuccess } = useGlobalContext();
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const [authLoading, setAuthLoading] = useState("");
  const [authStatus, setAuthStatus] = useState("initializing");

  useEffect(() => {
    const renewSession = async () => {
      setAuthLoading("refresh");
      const response = await fetchWrapper(
        authStatus === "authenticated",
        "user",
        "refresh",
        "",
        "POST",
        null,
        false,
        true,
      );

      if (response.success) {
        const { data } = response;
        handleSuccess(`Welcome back ${data.user.username}`); // ovo mozda i obrisi, ali samo odavde
        dispatch({ type: "SET_USER", payload: data });
        setAccessToken(data.accessToken);
        setAuthStatus("authenticated");
      } else {
        setAuthStatus("unauthenticated");
      }

      setAuthLoading("");
    };

    renewSession();
  }, []);

  const value = {
    ...state,
    dispatchUser: dispatch,
    authLoading,
    setAuthLoading,
    authStatus,
    setAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
