import { useContext } from "react";
import { DataContext } from "../../context/data/DataContext.context.jsx";

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Data context not found.");
  }

  return context;
};
