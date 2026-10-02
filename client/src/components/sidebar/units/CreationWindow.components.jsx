import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { useDataContext } from "../../../hooks/context_hooks/useDataContext.hooks.jsx";

const CreationWindow = () => {
  const { setCreationWindow, setCategoryWindow, setSecretWindow } =
    useGlobalContext();
  const { categories } = useDataContext();

  return (
    <div className="h-fit absolute left-1/2 -bottom-1 max-[500px]:-translate-x-1/2 min-[500px]:-left-1 min-[500px]:-top-1 p-1 min-[500px]:pt-20 max-[500px]:pb-20 rounded-lg border border-(--border-light) dark:border-(--border-dark) bg-(--card-light) dark:bg-(--card-dark) backdrop-blur-xl z-15 flex flex-col items-center gap-1">
      <span
        onClick={() => setCreationWindow((prev) => !prev)}
        className="absolute right-3 top-3 p-1 text-xl rounded hover:bg-(--delete-red)/20 text-(--delete-red) transition-all duration-200 cursor-pointer max-[500px]:hidden"
      >
        <IoClose />
      </span>
      <div
        onClick={() => {
          categories.length && setCreationWindow((prev) => !prev);
          categories.length && setSecretWindow((prev) => !prev);
        }}
        className={`w-full px-5 min-[500px]:px-10 py-1.5 rounded-lg border border-(--border-light) dark:border-(--border-dark) bg-(--bg-card-light) dark:bg-(--card-dark) text-nowrap text-center text-(--text-light) text-sm ${categories.length ? "hover:bg-(--primary)/70 hover:text-(--white)" : "opacity-60"}  transition-all duration-300 cursor-pointer `}
      >
        New Secret
      </div>
      <div
        onClick={() => {
          setCreationWindow((prev) => !prev);
          setCategoryWindow((prev) => !prev);
        }}
        className="w-full px-5 min-[500px]:px-10 py-1.5 rounded-lg border border-(--border-light) dark:border-(--border-dark) bg-(--bg-card-light) dark:bg-(--card-dark) text-nowrap text-center text-(--text-light) text-sm hover:bg-(--primary)/70 hover:text-(--white) transition-all duration-300 cursor-pointer "
      >
        New Category
      </div>
    </div>
  );
};

export default CreationWindow;
