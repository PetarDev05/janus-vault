import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const UpdateSecretFields = ({
  field,
  removeField,
  updateSecretData,
  setUpdateSecretData,
}) => {
  const [fieldForUpdate, setFieldForUpdate] = useState({
    key: field.key,
    _id: field._id,
    value: field.value,
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setFieldForUpdate({ ...fieldForUpdate, [name]: value });
  };

  useEffect(() => {
    const addUpdatedField = () => {
      let oldFields = [...updateSecretData.fields];
      let newFields = oldFields.map((fld) =>
        fld._id === fieldForUpdate._id ? fieldForUpdate : fld,
      );
      setUpdateSecretData({ ...updateSecretData, fields: newFields });
    };

    addUpdatedField();
  }, [fieldForUpdate]);

  return (
    <div className="w-full flex flex-row items-center gap-3">
      <input
        name="key"
        type="text"
        value={fieldForUpdate.key}
        onChange={handleFieldChange}
        className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none py-1.5 px-4 min-w-0 text-sm overflow-scroll dark:bg-(--bg-dark-primary) dark:border-(--border-dark)"
      />

      <input
        type="text"
        name="value"
        value={fieldForUpdate.value}
        onChange={handleFieldChange}
        className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none py-1.5 px-4 min-w-0 text-sm overflow-scroll dark:bg-(--bg-dark-primary) dark:border-(--border-dark)"
      />
      <button
        onClick={() => removeField(fieldForUpdate._id)}
        className="p-2 text-md bg-(--delete-red) text-(--white) rounded-md cursor-pointer"
      >
        <FaRegTrashCan />
      </button>
    </div>
  );
};

export default UpdateSecretFields;
