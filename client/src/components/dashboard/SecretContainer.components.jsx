import { useDataContext } from "../../hooks/context_hooks/useDataContext.hooks.jsx";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { useHttpRequest } from "../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import DataLoadingScreen from "../global/units/DataLoadingScreen.components.jsx";
import SecretCard from "./units/SecretCard.components.jsx";

const SecretContainer = () => {
  const {
    secrets,
    categories,
    filterSecrets,
    filteredSecrets,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    dataLoading,
  } = useDataContext();
  const { setSecretWindow } = useGlobalContext();
  const httpRequest = useHttpRequest();

  const deleteCategory = async () => {
    if (!selectedCategoryFilter.categoryID) {
      return;
    }

    await httpRequest(
      "data",
      "delete_category",
      selectedCategoryFilter.categoryID,
      "DELETE",
      null,
      true,
      false,
    );
    filterSecrets("All");
    setSelectedCategoryFilter({
      name: "All",
      categoryID: "",
    });
  };

  if (dataLoading) {
    return <DataLoadingScreen />;
  }

  return (
    <div className="w-full flex flex-col items-start gap-7">
      <h2 className="w-full text-lg min-[500px]:text-xl text-(--primary) pl-2">
        Secrets
      </h2>

      {(!secrets.length || (secrets.length && !filteredSecrets.length)) && (
        <div className="w-full py-50 px-10 flex flex-col items-center justify-center gap-3 text-(--text-light) text-center">
          {!secrets.length && (
            <>
              <p>
                All categories are empty.{" "}
                {categories.length !== 0 && (
                  <span
                    onClick={() => setSecretWindow(true)}
                    className="text-(--primary)/60 underline cursor-pointer"
                  >
                    Create your first secret.
                  </span>
                )}
              </p>
              {selectedCategoryFilter.name !== "All" && (
                <p
                  onClick={deleteCategory}
                  className="text-(--primary)/60 underline cursor-pointer"
                >
                  Delete this category
                </p>
              )}
            </>
          )}
          {secrets.length !== 0 && !filteredSecrets.length && (
            <p>This category is empty.</p>
          )}
          {categories.length !== 0 &&
            secrets.length !== 0 &&
            !filteredSecrets.length && (
              <p>
                Either{" "}
                <span
                  onClick={deleteCategory}
                  className="text-(--primary)/60 underline cursor-pointer"
                >
                  delete this category
                </span>{" "}
                or{" "}
                <span
                  onClick={() => setSecretWindow(true)}
                  className="text-(--primary)/60 underline cursor-pointer"
                >
                  create new secret.
                </span>
              </p>
            )}
        </div>
      )}

      {secrets.length !== 0 && filteredSecrets.length !== 0 && (
        <div className="w-full max-w-310 grid grid-cols-3 gap-5">
          {filteredSecrets.map((secret, i) => (
            <SecretCard key={`${i}-${secret._id}`} secret={secret} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SecretContainer;
