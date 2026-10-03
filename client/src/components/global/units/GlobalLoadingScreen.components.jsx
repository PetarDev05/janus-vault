import { RiLoaderLine } from "react-icons/ri";
import { useAuthContext } from "../../../hooks/context_hooks/useAuthContext.hooks.jsx";

const GlobalLoadingScreen = () => {
  const { authStatus } = useAuthContext();

  return (
    <div
      className={`fixed inset-0 w-full min-h-screen bg-linear-to-br from-(--loading-primary1) to-(--loading-primary2) flex flex-col items-center ${authStatus === "initializing" ? "" : "opacity-0"} justify-center gap-6 text-(--white)  transition-all duration-300 pointer-events-none z-400`}
    >
      <div className="text-(--primary) flex flex-col items-center gap-2">
        <img src="/janus-vault-logo.png" alt="logo" className="h-40" />
        <div className="flex flex-col items-center">
          <p className="text-5xl text-(--heading-light) dark:text-(--heading-dark) font-semibold">
            Janus
          </p>
          <p className="text-lg text-(--primary) font-semibold">VAULT</p>
        </div>
      </div>
      <RiLoaderLine className="text-4xl animate-spin" />
    </div>
  );
};

export default GlobalLoadingScreen;
