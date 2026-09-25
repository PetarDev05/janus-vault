import { useState } from "react";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { useHttpRequest } from "../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { useDataContext } from "../../hooks/context_hooks/useDataContext.hooks.jsx";
import SecretFields from "./units/SecretFields.components.jsx";

const NewSecretWindow = () => {
  const { setSecretWindow } = useGlobalContext();
  const { categories } = useDataContext();
  const httpRequest = useHttpRequest();

  const [secretData, setSecretData] = useState({
    categoryName: "",
    name: "",
    fields: [],
  });

  const [field, setField] = useState({
    key: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecretData({ ...secretData, [name]: value });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const addField = () => {
    if (!field.key || !field.value) {
      return;
    }

    const newFields = secretData.fields;
    newFields.push(field);

    setSecretData({ ...secretData, fields: newFields });
    setField({
      key: "",
      value: "",
    });
  };

  const createNewSecret = async () => {
    console.log(secretData);

    await httpRequest(
      "data",
      "create_secret",
      "",
      "POST",
      secretData,
      true,
      false,
    );

    setSecretWindow(false);
    setSecretData({ categoryName: "", name: "", fields: [] });
    setField({
      key: "",
      value: "",
    });
  };

  return (
    <div className="w-full max-w-100 fixed top-1/2 left-1/2 -translate-1/2 rounded-lg border border-(--border-light) dark:border-(--border-dark) bg-(--bg-light-primary) backdrop-blur-xl p-5 flex flex-col items-center gap-5 z-100">
      <h2 className="w-full text-(--primary) text-lg pl-2">
        Create New Secret
      </h2>
      <select
        onChange={handleChange}
        value={secretData.categoryName}
        className="w-full rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/60 py-1.5 px-4 min-w-0 text-sm"
        name="categoryName"
      >
        {categories.map((category, i) => (
          <option key={`${i}-${category.userID}`} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="name"
        value={secretData.name}
        onChange={handleChange}
        className="w-full rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/60 py-1.5 px-4 min-w-0 text-sm"
        placeholder="Secret name"
      />
      <div className="w-full flex flex-col items-start gap-4">
        <h3 className="w-full text-(--primary) text-md pl-2">
          Enter secret values:
        </h3>
        <div className="w-full flex flex-row items-center gap-3">
          <input
            type="text"
            name="key"
            value={field.key}
            onChange={handleFieldChange}
            className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/60 py-1.5 px-4 min-w-0 text-sm"
            placeholder="key"
          />
          <input
            type="text"
            name="value"
            value={field.value}
            onChange={handleFieldChange}
            className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/60 py-1.5 px-4 min-w-0 text-sm"
            placeholder="value"
          />
          <button
            onClick={addField}
            className="py-1.75 px-4 rounded-md bg-(--primary)/60 text-(--white) cursor-pointer text-sm"
          >
            Add
          </button>
        </div>
        <hr className="w-full text-(--border-light)" />
        {secretData.fields.map((field, i) => (
          <SecretFields key={`${i}-field`} field={field} />
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-end gap-3 ">
        <button
          onClick={() => setSecretWindow((prev) => !prev)}
          className="py-1.75 px-4 bg-transparent border border-(--primary)/60 text-(--primary)/60 rounded-md cursor-pointer text-sm"
        >
          Cancel
        </button>
        <button
          // disabled={
          //   !secretData.categoryName ||
          //   !secretData.name ||
          //   secretData.fields.length === 0
          // }
          onClick={createNewSecret}
          className={`py-1.75 px-4 ${secretData ? "bg-(--primary)/60" : "bg-(--primary)/30"} rounded-md text-(--white) cursor-pointer text-sm`}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewSecretWindow;
