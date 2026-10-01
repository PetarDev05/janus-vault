import { GoGear } from "react-icons/go";
import SettingsWindow from "./units/SettingsWindow.components.jsx";
import { FiUser } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import CreationWindow from "./units/CreationWindow.components.jsx";

const SidebarMobile = () => {
  const { settings, setSettings, creationWindow, setCreationWindow } =
    useGlobalContext();

  return (
    <div className="min-[500px]:hidden w-full fixed bottom-0 border-b left-0 right-0 border-t border-(--border-light) dark:border-(--border-dark) bg-(--bg-light-primary) dark:bg-(--bg-dark-primary) backdrop-blur-xl flex flex-row items-center justify-between px-5 py-3 z-18">
      <div className="relative cursor-pointer transition-all duration-300 flex flex-row items-center gap-5">
        <span
          onClick={() => setSettings((prev) => !prev)}
          className={`flex flex-row items-center gap-5 p-3 rounded-lg text-3xl text-(--text-light) ${!settings ? "hover:bg-(--primary)/50 hover:text-(--white) z-10" : "z-18"}`}
        >
          <GoGear
            className={`${settings ? "rotate-90" : ""} transition-all duration-300`}
          />
        </span>
        {settings && <SettingsWindow />}
      </div>
      <div className="relative cursor-pointer transition-all duration-300 flex flex-row items-center gap-5">
        <span
          onClick={() => setCreationWindow((prev) => !prev)}
          className={`p-3 rounded-lg text-3xl text-(--text-light) cursor-pointer ${creationWindow ? "z-18" : "hover:bg-(--primary)/50 hover:text-(--white) z-10"}`}
        >
          <IoIosAddCircleOutline
            className={`${creationWindow ? "rotate-45" : ""} transition-all duration-300`}
          />
        </span>
        {creationWindow && <CreationWindow />}
      </div>
      <div className="relative cursor-pointer transition-all duration-300 flex flex-row items-center gap-5">
        <span className="p-3 rounded-lg text-3xl text-(--text-light) hover:bg-(--primary)/50 hover:text-(--white) cursor-pointer transition-all duration-300">
          <FiUser />
        </span>
      </div>
    </div>
  );
};

export default SidebarMobile;
