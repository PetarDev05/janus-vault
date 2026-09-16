import { useReducer } from "react";
import { DataContext } from "./DataContext.context.jsx";

const dataReducer = ({ secrets, categories }, { type, payload }) => {
  switch (type) {
    case "FETCH_DATA":
      return { secrets: payload.secrets, categories: payload.categories };
    case "CREATE_NEW_CATEGORY":
      return {
        secrets,
        categories: [...categories, payload.newCategory],
      };
    case "CREATE_NEW_SECRET":
      return {
        secrets: [...secrets, payload.newSecret],
        categories,
      };
    case "DELETE_CATEGORY":
      return {
        secrets,
        categories: categories.filter((c) => c !== payload.category),
      };
    case "DELETE_SECRET":
      return {
        secrets: secrets.filter((s) => s._id !== payload.secret._id),
        categories,
      };
    default:
      return { secrets, categories };
  }
};

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    secrets: null,
    categories: null,
  });

  const value = {
    ...state,
    dispatchData: dispatch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
