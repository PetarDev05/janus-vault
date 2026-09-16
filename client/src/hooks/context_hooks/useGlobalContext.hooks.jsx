import { useContext } from "react";
import { GlobalContext } from "../../context/global/GlobalContext.context.jsx";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Global context not found.");
  }

  return context;
};
