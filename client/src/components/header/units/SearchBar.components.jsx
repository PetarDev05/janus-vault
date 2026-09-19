import { RxMagnifyingGlass } from "react-icons/rx";

const SearchBar = () => {
  return (
    <div className="flex flex-row items-center gap-5">
      <input
        type="text"
        className="rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/60 py-1.5 px-4 min-w-0"
        placeholder="Search..."
      />
      <span className="py-2 px-4 text-xl bg-(--primary)/60 rounded-md text-(--white) cursor-pointer">
        <RxMagnifyingGlass />
      </span>
    </div>
  );
};

export default SearchBar;
