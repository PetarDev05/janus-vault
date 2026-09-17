import { useState } from "react";
import { GlobalContext } from "./GlobalContext.context.jsx";
import { toast } from "react-hot-toast";

const GlobalContextProvider = ({ children }) => {
  const [httpError, setHttpError] = useState(null);
  const [theme, setTheme] = useState("light");

  const html = document.documentElement;

  // switches
  const switchTheme = () => {
    theme === "light"
      ? html.classList.add("dark")
      : html.classList.remove("dark");
    setTheme(theme === "light" ? "dark" : "light");
  };

  const notify = (message, flag) => {
    if (flag === "S") {
      toast.success(message);
    } else if (flag === "F") {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  const handleError = (error) => {
    notify(error.message, "F");
    setHttpError(error);
  };

  const handleSuccess = (message) => {
    notify(message, "S");
  };

  const value = {
    httpError,
    setHttpError,
    theme,
    switchTheme,
    notify,
    handleError,
    handleSuccess,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
