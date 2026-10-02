import ThemeSwitcher from "./ThemeSwitcher.components.jsx";
import { useHttpRequest } from "../../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { useAuthContext } from "../../../hooks/context_hooks/useAuthContext.hooks.jsx";
import { RiLoader2Fill } from "react-icons/ri";

const SettingsWindow = () => {
  const { setSettings, setConfirmationWindow } = useGlobalContext();
  const { authLoading } = useAuthContext();
  const httpRequest = useHttpRequest();

  const signOut = async () => {
    await httpRequest("user", "sign_out", "", "PATCH", null, false, true);
    setSettings(false);
  };

  const deleteAccount = async () => {
    setConfirmationWindow({
      show: true,
      color: "red",
      message: "remove your account",
      actionText: "Remove account",
      secretID: "",
    });
    setSettings(false);
  };

  return (
    <div className="absolute -left-1 -bottom-1 p-5 pb-20 w-70 min-[500px]:w-120 rounded-lg border border-(--border-light) dark:border-(--border-dark) bg-(--card-light) dark:bg-(--card-dark) backdrop-blur-xl z-15 flex flex-col items-start gap-4">
      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="text-(--primary) text-lg">Settings</h2>
        <span
          onClick={() => setSettings((prev) => !prev)}
          className="p-1 text-xl rounded hover:bg-(--delete-red)/20 text-(--delete-red) transition-all duration-200"
        >
          <IoClose />
        </span>
      </div>
      <div className="w-full flex flex-row items-center justify-between gap-4 px-2">
        <p className="text-(--text-light) text-sm">Switch theme</p>
        <ThemeSwitcher />
      </div>
      <hr className="w-full text-(--text-light)/40" />
      <div className="w-full flex flex-col min-[500px]:flex-row items-start min-[500px]:items-center justify-between gap-4 px-2">
        <p className="text-(--text-light) text-sm">Remove current session</p>
        <button
          onClick={signOut}
          className="px-3 py-1.5 text-sm text-(--white) rounded-md bg-(--sign-out-orange)/90 cursor-pointer flex items-center justify-center"
        >
          {authLoading === "sign_out" ? (
            <RiLoader2Fill className="animate-spin text-lg" />
          ) : (
            "Sign out"
          )}
        </button>
      </div>
      <hr className="w-full text-(--text-light)/40" />
      <div className="w-full flex flex-col min-[500px]:flex-row items-start min-[500px]:items-center justify-between gap-4 px-2">
        <p className="text-(--text-light) text-sm">
          Delete this account permanently
        </p>
        <button
          onClick={deleteAccount}
          className="px-3 py-1.5 text-sm text-(--white) rounded-md bg-(--delete-red)/90 cursor-pointer flex items-center justify-center"
        >
          {authLoading === "delete" ? (
            <RiLoader2Fill className="animate-spin text-lg" />
          ) : (
            "Remove account"
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsWindow;
