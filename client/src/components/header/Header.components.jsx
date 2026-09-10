import Logo from "../global/units/Logo.components.jsx";
import ProfileIcon from "./units/ProfileIcon.components.jsx";
import SearchBar from "./units/SearchBar.components.jsx";

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-20 p-4 flex flex-row items-center justify-between border-b border-(--border-light) dark:border-(--border-dark) backdrop-blur-xl">
      <Logo />
      <SearchBar />
      <ProfileIcon />
    </header>
  );
};

export default Header;