import { GoGear } from "react-icons/go";
import SettingsWindow from "./units/SettingsWindow.components.jsx";
import { FiUser } from "react-icons/fi";
import { VscDiffAdded } from "react-icons/vsc";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";

const Sidebar = () => {
  const { settings, setSettings } = useGlobalContext();

  return (
    <div className="max-[500px]:hidden w-20 min-h-screen fixed left-0 border-r border-(--border-light) dark:border-(--border-dark) bg-(--bg-light-primary) backdrop-blur-xl flex flex-col items-center justify-between pt-25 pb-8 px-1 z-18 transition-all duration-200">
      <div className="flex flex-col items-center gap-5">
        <span className="w-full p-3 rounded-lg text-2xl text-(--text-light) hover:bg-(--primary)/50 hover:text-(--white) cursor-pointer transition-all duration-300 flex flex-col items-center gap-2">
          <VscDiffAdded />
          <p className="text-[10px]">Add new</p>
        </span>
        <span className="w-full p-3 rounded-lg text-2xl text-(--text-light) hover:bg-(--primary)/50 hover:text-(--white) cursor-pointer transition-all duration-300 flex flex-col items-center gap-2">
          <FiUser />
          <p className="text-[10px]">Profile</p>
        </span>
      </div>
      <div className="relative cursor-pointer transition-all duration-300 flex flex-row items-center gap-5 pb-10">
        <span
          onClick={() => setSettings((prev) => !prev)}
          className={`w-full flex flex-col items-center gap-2 p-3 rounded-lg text-2xl text-(--text-light) ${!settings ? "hover:bg-(--primary)/50 hover:text-(--white)" : ""} z-18 transition-all duration-300`}
        >
          <GoGear
            className={`${settings ? "rotate-90" : ""} transition-all duration-300`}
          />
          <p className="text-[10px]">Settings</p>
        </span>
        {settings && <SettingsWindow />}
      </div>
    </div>
  );
};

export default Sidebar;
