import { GoGear } from "react-icons/go";
import SettingsWindow from "./units/SettingsWindow.components.jsx";
import { FiUser } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import CreationWindow from "./units/CreationWindow.components.jsx";
import ProfileWindow from "./units/ProfileWindow.components.jsx";

const Sidebar = () => {
  const {
    settings,
    setSettings,
    creationWindow,
    setCreationWindow,
    profileWindow,
    setProfileWindow,
  } = useGlobalContext();

  return (
    <div className="max-[500px]:hidden w-20 min-h-screen fixed border-r border-(--border-light) dark:border-(--border-dark) bg-(--bg-light-primary) dark:bg-(--bg-dark-primary) backdrop-blur-xl flex flex-col items-center justify-between pt-25 pb-8 px-1 z-18">
      <div className="relative flex flex-col items-center gap-5">
        <span
          onClick={() => {
            setSettings(false);
            setCreationWindow((prev) => !prev);
            setProfileWindow(false);
          }}
          className={`w-full p-3 rounded-lg text-2xl text-(--text-light) ${!creationWindow ? "hover:bg-(--primary)/50 hover:text-(--white) z-10" : "z-18"} cursor-pointer transition-all duration-300 flex flex-col items-center gap-2`}
        >
          <IoIosAddCircleOutline />
          <p className="text-[10px]">Add new</p>
        </span>
        {creationWindow && <CreationWindow />}
        <span
          onClick={() => {
            setSettings(false);
            setCreationWindow(false);
            setProfileWindow((prev) => !prev);
          }}
          className={`w-full p-3 rounded-lg text-2xl text-(--text-light) ${!profileWindow ? "hover:bg-(--primary)/50 hover:text-(--white) z-10" : "z-18"} cursor-pointer transition-all duration-300 flex flex-col items-center gap-2`}
        >
          <FiUser />
          <p className="text-[10px]">Profile</p>
        </span>
        {profileWindow && <ProfileWindow />}
      </div>
      <div className="relative cursor-pointer transition-all duration-300 flex flex-row items-center gap-5">
        <span
          onClick={() => {
            setSettings((prev) => !prev);
            setCreationWindow(false);
            setProfileWindow(false);
          }}
          className={`w-full flex flex-col items-center gap-2 p-3 rounded-lg text-2xl text-(--text-light) ${!settings ? "hover:bg-(--primary)/50 hover:text-(--white) z-10" : "z-18"}  transition-all duration-300`}
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
