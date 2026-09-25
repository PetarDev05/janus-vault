import { useEffect, useReducer } from "react";
import { DataContext } from "./DataContext.context.jsx";
import { useAuthContext } from "../../hooks/context_hooks/useAuthContext.hooks.jsx";
import { fetchWrapper } from "../../services/fetchWrapper.services.js";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { getAccessToken } from "../../storage/accessTokenStorage.storage.js";

const dataReducer = ({ secrets, categories }, { type, payload }) => {
  switch (type) {
    case "FETCH_DATA":
      return { secrets: payload.secrets, categories: payload.categories };
    case "CREATE_NEW_CATEGORY":
      return {
        secrets,
        categories: [...categories, payload],
      };
    case "CREATE_NEW_SECRET":
      return {
        secrets: [...secrets, payload],
        categories,
      };
    case "DELETE_CATEGORY":
      return {
        secrets,
        categories: categories.filter((c) => c._id !== payload),
      };
    case "DELETE_SECRET":
      return {
        secrets: secrets.filter((s) => s._id !== payload),
        categories,
      };
    case "UPDATE_SECRET":
      return {
        secrets: secrets.map((s) => (s._id === payload._id ? payload : s)),
        categories,
      };
    default:
      return { secrets, categories };
  }
};

const DataContextProvider = ({ children }) => {
  const { handleError } = useGlobalContext();
  const { authStatus } = useAuthContext();

  const [state, dispatch] = useReducer(dataReducer, {
    secrets: [],
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (
        authStatus === "intializing" ||
        authStatus === "unauthenticated" ||
        !getAccessToken()
      ) {
        return;
      }

      const response = await fetchWrapper(
        authStatus === "authenticated",
        "data",
        "all",
        "",
        "GET",
        null,
        true,
        false,
      );

      if (response.success) {
        dispatch({ type: "FETCH_DATA", payload: response.data });
      } else {
        handleError(response);
      }
    };

    fetchData();
  }, [authStatus]);

  const value = {
    ...state,
    dispatchData: dispatch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
