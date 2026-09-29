import { useState } from "react";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { useHttpRequest } from "../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { useDataContext } from "../../hooks/context_hooks/useDataContext.hooks.jsx";
import { RiLoader2Fill } from "react-icons/ri";

const NewCategoryWindow = () => {
  const { setCategoryWindow } = useGlobalContext();
  const { dataLoading } = useDataContext();
  const httpRequest = useHttpRequest();
  // napravi loader
  const [categoryName, setCategoryName] = useState("");

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const createNewCategory = async () => {
    await httpRequest(
      "data",
      "create_category",
      "",
      "POST",
      { categoryName },
      true,
      false,
    );

    setCategoryName("");
    setCategoryWindow(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 rounded-lg border border-(--border-light) dark:border-(--border-dark) bg-(--card-light) backdrop-blur-xl p-5 flex flex-col items-center gap-5 z-100">
      <h2 className="w-full text-(--primary) text-lg">Create New Category</h2>
      <input
        type="text"
        value={categoryName}
        onChange={handleChange}
        className="rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/60 py-1.5 px-4 w-60 min-w-0 max-w-80 text-sm"
        placeholder="Category name"
      />
      <div className="w-full flex flex-row items-center justify-end gap-3 ">
        <button
          onClick={() => setCategoryWindow((prev) => !prev)}
          className="py-1.75 px-4 bg-transparent border border-(--primary)/60 text-(--primary)/60 rounded-md cursor-pointer text-sm"
        >
          Cancel
        </button>
        <button
          disabled={!categoryName}
          onClick={createNewCategory}
          className={`py-[7.5px] px-4 ${categoryName ? "bg-(--primary)/60" : "bg-(--primary)/30"} rounded-md text-(--white) cursor-pointer text-sm`}
        >
          {dataLoading ? (
            <RiLoader2Fill className="animate-spin text-xl" />
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
};

export default NewCategoryWindow;
