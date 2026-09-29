import { GiCrystalCluster } from "react-icons/gi";
import { RiLoaderLine } from "react-icons/ri";
import { useAuthContext } from "../../../hooks/context_hooks/useAuthContext.hooks.jsx";

const GlobalLoadingScreen = () => {
  const { authStatus } = useAuthContext();

  return (
    <div
      className={`fixed inset-0 w-full min-h-screen bg-linear-to-br from-(--primary)/80 to-(--primary)/60 flex flex-col items-center justify-center gap-6 text-(--white) ${authStatus === "initializing" ? "" : "opacity-0"} transition-all duration-300 pointer-events-none z-400`}
    >
      <div className="flex flex-row items-center gap-6 text-6xl">
        <GiCrystalCluster className="text-7xl" />
        Bifrost
      </div>
      <RiLoaderLine className="text-4xl animate-spin" />
    </div>
  );
};

export default GlobalLoadingScreen;
