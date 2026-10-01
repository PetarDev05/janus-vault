import SearchBar from "./SearchBar.components.jsx";
import { useGlobalContext } from "../../../hooks/context_hooks/useGlobalContext.hooks.jsx";

const SearchMenu = () => {
  const { menu } = useGlobalContext();

  return (
    <div
      className={`w-full min-[500px]:hidden p-5 fixed ${menu ? "translate-y-16" : "-translate-y-full"} bg-(--bg-light-primary) dark:bg-(--bg-dark-primary) border-b border-(--border-light) dark:border-(--border-dark) transition-all duration-300 flex items-center justify-center z-19`}
    >
      <SearchBar />
    </div>
  );
};

export default SearchMenu;
