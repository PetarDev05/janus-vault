import { LuSunMedium } from "react-icons/lu";
import { FiMoon } from "react-icons/fi";
import { useGlobalContext } from "../../../hooks/context_hooks/useGlobalContext.hooks";

const ThemeSwitcher = () => {
  const { switchTheme, theme } = useGlobalContext();

  return (
    <div className="flex flex-row items-center gap-2 text-(--text-light) dark:text-(--white) text-xl">
      <LuSunMedium />
      <div
        onClick={switchTheme}
        className={`w-9 h-5 rounded-full bg-(--text-light)/50 dark:bg-(--primary) flex flex-row items-center cursor-pointer px-1 `}
      >
        <div
          className={`${theme === "light" ? "" : "translate-x-4"} w-3 h-3 rounded-full bg-(--white) transition-all duration-200`}
        ></div>
      </div>
      <FiMoon />
    </div>
  );
};

export default ThemeSwitcher;
