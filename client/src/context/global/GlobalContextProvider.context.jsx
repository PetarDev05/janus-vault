import { useState } from "react";
import { GlobalContext } from "./GlobalContext.context.jsx";

const GlobalContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");

  const html = document.documentElement;

  // switches
  const switchTheme = () => {
    theme === "light"
      ? html.classList.add("dark")
      : html.classList.remove("dark");
    setTheme(theme === "light" ? "dark" : "light");
  };

  const value = {
    error,
    setError,
    theme,
    switchTheme,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
