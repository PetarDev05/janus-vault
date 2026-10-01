import { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useDataContext } from "../../../hooks/context_hooks/useDataContext.hooks.jsx";

const SearchBar = () => {
  const { secrets, setFilteredSecrets } = useDataContext();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const search = () => {
    if (!searchTerm) {
      return;
    }

    const filtered = secrets.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredSecrets(filtered);
  };

  return (
    <div className="flex flex-row items-center gap-5 z-5">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="rounded-md border border-(--border-light) dark:border-(--border-dark) text-(--text-light) outline-none focus:border-(--primary)/70 py-1.5 px-4 w-full min-w-0 max-w-60"
        placeholder="Search..."
      />
      <span
        onClick={search}
        className="py-2 px-4 text-xl bg-(--primary)/70 rounded-md text-(--white) cursor-pointer"
      >
        <RxMagnifyingGlass />
      </span>
    </div>
  );
};

export default SearchBar;
