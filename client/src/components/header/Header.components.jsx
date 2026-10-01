import Logo from "../global/units/Logo.components.jsx";
import SearchBar from "./units/SearchBar.components.jsx";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";

const Header = () => {
  const { menu, setMenu } = useGlobalContext();

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-20 p-2.5 flex flex-row items-center justify-between border-b border-(--border-light) dark:border-(--border-dark) bg-(--bg-light-primary) dark:bg-(--bg-dark-primary) backdrop-blur-xl">
      <Logo />
      <div className="max-[500px]:hidden ">
        <SearchBar />
      </div>
      <button
        onClick={() => setMenu((prev) => !prev)}
        className="min-[500px]:hidden text-(--white) text-sm px-3 py-1.5 rounded-md bg-(--primary)/90 flex flex-row items-center gap-2 cursor-pointer"
      >
        <RxMagnifyingGlass />
        {menu ? "Hide" : "Search"}
      </button>
    </header>
  );
};

export default Header;
