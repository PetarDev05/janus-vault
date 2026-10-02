import { useEffect, useState } from "react";
import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { useHttpRequest } from "../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { useDataContext } from "../../hooks/context_hooks/useDataContext.hooks.jsx";
import { RiLoader2Fill } from "react-icons/ri";
import UpdateSecretFields from "./units/UpdateSecretFields.components.jsx";

const UpdateSecretWindow = () => {
  const { secretIDUpdateWindow, setSecretIDUpdateWindow } = useGlobalContext();
  const { categories, secrets, dataLoading } = useDataContext();
  // find secret by id
  const targetSecret = secrets.find((s) => s._id === secretIDUpdateWindow);
  const httpRequest = useHttpRequest();
  const [updateSecretData, setUpdateSecretData] = useState({
    categoryName: "",
    name: "",
    fields: [],
  });
  const [field, setField] = useState({
    key: "",
    value: "",
  });

  useEffect(() => {
    function changeState() {
      if (targetSecret) {
        setUpdateSecretData(targetSecret);
      }
    }

    changeState();
  }, [targetSecret]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateSecretData({ ...updateSecretData, [name]: value });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const addField = () => {
    if (!field.key || !field.value) {
      return;
    }

    let newFields = [...updateSecretData.fields];
    newFields.push(field);

    setUpdateSecretData({ ...updateSecretData, fields: newFields });
    setField({
      key: "",
      value: "",
    });
  };

  const removeField = (index) => {
    let fields = [...updateSecretData.fields];
    let filtered = fields.filter((f) => f._id !== index);
    setUpdateSecretData({ ...updateSecretData, fields: filtered });
  };

  const updateSecret = async () => {
    const response = await httpRequest(
      "data",
      "update_secret",
      targetSecret._id,
      "PATCH",
      updateSecretData,
      true,
      false,
    );

    if (response.success) {
      setSecretIDUpdateWindow(null);
      setUpdateSecretData({ categoryName: "", name: "", fields: [] });
      setField({
        key: "",
        value: "",
      });
    }
  };

  if (!targetSecret) {
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl text-(--primary)">
        <RiLoader2Fill className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-100 fixed top-1/2 left-1/2 -translate-1/2 rounded-lg backdrop-blur-xl p-5 flex flex-col items-center gap-5 z-100 shadow-[0px_0px_3px_var(--shadow-light)] dark:shadow-[0px_0px_3px_var(--shadow-dark)] bg-(--card-light) dark:bg-(--card-dark)">
      <h2 className="w-full text-(--primary) text-lg pl-2">Update Secret</h2>
      <select
        onChange={handleChange}
        value={updateSecretData?.categoryName}
        className="w-full rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/70 py-1.5 px-4 min-w-0 text-sm dark:bg-(--bg-dark-primary) appearance-none dark:border-(--border-dark)"
        name="categoryName"
      >
        <option value="">Chose category</option>
        {categories.map((category, i) => (
          <option key={`${i}-${category.userID}`} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="name"
        value={updateSecretData?.name}
        onChange={handleChange}
        className="w-full rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/70 py-1.5 px-4 min-w-0 text-sm dark:bg-(--bg-dark-primary) dark:border-(--border-dark)"
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
            className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/70 py-1.5 px-4 min-w-0 text-sm dark:bg-(--bg-dark-primary) dark:border-(--border-dark)"
            placeholder="key"
          />
          <input
            type="text"
            name="value"
            value={field.value}
            onChange={handleFieldChange}
            className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none focus:border-(--primary)/70 py-1.5 px-4 min-w-0 text-sm dark:bg-(--bg-dark-primary) dark:border-(--border-dark)"
            placeholder="value"
          />
          <button
            onClick={addField}
            className="py-1.75 px-4 rounded-md bg-(--primary)/70 text-(--white) cursor-pointer text-sm"
          >
            Add
          </button>
        </div>
        <hr className="w-full text-(--border-light) dark:text-(--border-dark)" />
        {updateSecretData?.fields.map((field, i) => (
          <UpdateSecretFields
            key={`${i}-field`}
            field={field}
            removeField={removeField}
            updateSecretData={updateSecretData}
            setUpdateSecretData={setUpdateSecretData}
          />
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-end gap-3 ">
        <button
          onClick={() => setSecretIDUpdateWindow(null)}
          className="py-1.75 px-4 bg-transparent border border-(--primary)/70 text-(--primary)/70 rounded-md cursor-pointer text-sm"
        >
          Cancel
        </button>
        <button
          disabled={
            !updateSecretData?.categoryName ||
            !updateSecretData?.name ||
            updateSecretData?.fields.length === 0
          }
          onClick={updateSecret}
          className={`py-[7.5px] px-4 ${
            !updateSecretData?.categoryName ||
            !updateSecretData?.name ||
            updateSecretData?.fields.length === 0
              ? "bg-(--primary)/30"
              : "bg-(--primary)/70"
          } rounded-md text-(--white) cursor-pointer text-sm`}
        >
          {dataLoading ? (
            <RiLoader2Fill className="animate-spin text-xl" />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateSecretWindow;
