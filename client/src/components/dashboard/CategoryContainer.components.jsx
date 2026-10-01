import { useDataContext } from "../../hooks/context_hooks/useDataContext.hooks.jsx";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";

const CategoryContainer = () => {
  const {
    categories,
    filterSecrets,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
  } = useDataContext();
  const { setCategoryWindow } = useGlobalContext();

  return (
    <div className="w-full flex flex-col items-start gap-7">
      <h2 className="w-full text-lg min-[500px]:text-xl text-(--primary) pl-2">
        Categories
      </h2>
      {!categories || !categories.length ? (
        <p className="w-full text-md text-(--text-light) pl-2">
          No categories found.{" "}
          <span
            onClick={() => setCategoryWindow(true)}
            className="text-(--primary)/70 underline cursor-pointer"
          >
            Create new category
          </span>
        </p>
      ) : (
        <div className="w-full flex flex-row items-center justify-start flex-wrap gap-2">
          <button
            onClick={() => {
              filterSecrets("All");
              setSelectedCategoryFilter({ name: "All", categoryID: "" });
            }}
            className={`px-4 py-1 text-[12px]  ${selectedCategoryFilter.name === "All" ? "bg-(--primary)/70 text-(--white)" : "text-(--primary)/70"} border border-(--primary)/70 rounded-md cursor-pointer ${!categories || !categories.length ? "hidden" : ""}`}
          >
            All
          </button>
          {categories.map((category, i) => (
            <button
              key={`${i}-category`}
              onClick={() => {
                filterSecrets(category._id);
                setSelectedCategoryFilter({
                  name: category.name,
                  categoryID: category._id,
                });
              }}
              className={`px-4 py-1 text-[12px] ${selectedCategoryFilter.name === category.name ? "bg-(--primary)/70 text-(--white)" : "text-(--primary)/70 "} border border-(--primary)/70 rounded-md cursor-pointer`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <hr className="w-full text-(--border-light) dark:text-(--border-dark)" />
    </div>
  );
};

export default CategoryContainer;
