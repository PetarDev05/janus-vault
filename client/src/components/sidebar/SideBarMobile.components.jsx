import { GoGear } from "react-icons/go";
import SettingsWindow from "./units/SettingsWindow.components.jsx";
import { FiUser } from "react-icons/fi";
import { VscDiffAdded } from "react-icons/vsc";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";

const SidebarMobile = () => {
  const { settings, setSettings } = useGlobalContext();

  return (
    <div className="min-[500px]:hidden w-full fixed bottom-0 left-0 right-0 border-t border-(--border-light) dark:border-(--border-dark) bg-(--bg-light-primary) backdrop-blur-xl flex flex-row items-center justify-between px-5 py-3 z-18 transition-all duration-200">
      <div className="relative cursor-pointer transition-all duration-300 flex flex-row items-center gap-5">
        <span
          onClick={() => setSettings((prev) => !prev)}
          className={`flex flex-row items-center gap-5 p-3 rounded-lg text-3xl text-(--text-light) ${!settings ? "hover:bg-(--primary)/50 hover:text-(--white)" : ""} z-18 transition-all duration-300`}
        >
          <GoGear
            className={`${settings ? "rotate-90" : ""} transition-all duration-300`}
          />
        </span>
        {settings && <SettingsWindow />}
      </div>
      <span className="p-3 rounded-lg text-3xl text-(--text-light) hover:bg-(--primary)/50 hover:text-(--white) cursor-pointer transition-all duration-300">
        <VscDiffAdded />
      </span>
      <span className="p-3 rounded-lg text-3xl text-(--text-light) hover:bg-(--primary)/50 hover:text-(--white) cursor-pointer transition-all duration-300">
        <FiUser />
      </span>
    </div>
  );
};

export default SidebarMobile;
