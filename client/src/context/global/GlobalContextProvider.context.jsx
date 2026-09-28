import { useState } from "react";
import { GlobalContext } from "./GlobalContext.context.jsx";
import { toast } from "react-hot-toast";

const GlobalContextProvider = ({ children }) => {
  const [httpError, setHttpError] = useState(null);
  const [httpSuccess, setHttpSuccess] = useState(null);

  const [theme, setTheme] = useState("light");
  const [menu, setMenu] = useState(false);
  const [settings, setSettings] = useState(false);
  const [creationWindow, setCreationWindow] = useState(false);
  const [profileWindow, setProfileWindow] = useState(false);
  const [categoryWindow, setCategoryWindow] = useState(false);
  const [secretWindow, setSecretWindow] = useState(false);
  const [secretIDUpdateWindow, setSecretIDUpdateWindow] = useState(null);

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
    if (!error) {
      setHttpError(null);
      return;
    }

    notify(error.message, "F");
    setHttpError(error);
  };

  const handleSuccess = (message) => {
    if (!message) {
      setHttpSuccess(null);
      return;
    }
    notify(message, "S");
    setHttpSuccess(true);
  };

  const value = {
    httpError,
    setHttpError,
    httpSuccess,
    setHttpSuccess,
    theme,
    switchTheme,
    notify,
    handleError,
    handleSuccess,
    menu,
    setMenu,
    settings,
    setSettings,
    creationWindow,
    setCreationWindow,
    profileWindow,
    setProfileWindow,
    categoryWindow,
    setCategoryWindow,
    secretWindow,
    setSecretWindow,
    secretIDUpdateWindow,
    setSecretIDUpdateWindow,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
