import { useDataContext } from "../../hooks/context_hooks/useDataContext.hooks.jsx";

const CategoryContainer = () => {
  const { categories } = useDataContext();

  return (
    <div className="w-full flex flex-col items-start gap-7">
      <h2 className="w-full text-lg min-[500px]:text-xl text-(--primary) pl-2">
        Categories
      </h2>
      {/* <div className="w-full flex flex-row items-center justify-between">
        ovde je bio h2 sa tekstom
        <button className="py-2 px-4 text-sm bg-(--primary)/60 rounded-md text-(--white) cursor-pointer">
          New Category
        </button>
      </div> */}
      <div className="w-full flex flex-row items-center justify-start flex-wrap gap-2">
        <button className="px-4 py-1 text-[12px] text-(--primary)/60 border rounded-md cursor-pointer">
          All
        </button>
        {categories.map((category, i) => (
          <button
            key={`${i}-category`}
            className="px-4 py-1 text-[12px] text-(--primary)/60 border rounded-md cursor-pointer"
          >
            {category.name}
          </button>
        ))}
      </div>
      <hr className="w-full text-(--border-light)" />
    </div>
  );
};

export default CategoryContainer;
