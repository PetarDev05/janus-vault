import { FaRegTrashCan } from "react-icons/fa6";

const SecretFields = ({ field, removeField }) => {
  return (
    <div className="w-full flex flex-row items-center gap-3">
      <div
        type="text"
        onClick={() => console.log(field.index)}
        className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none py-1.5 px-4 min-w-0 text-sm overflow-scroll"
      >
        {field.key}
      </div>
      <div
        type="text"
        className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none py-1.5 px-4 min-w-0 text-sm overflow-scroll"
      >
        {field.value}
      </div>
      <button
        onClick={() => removeField(field.index)}
        className="p-2 text-md bg-(--delete-red) text-(--white) rounded-md cursor-pointer"
      >
        <FaRegTrashCan />
      </button>
    </div>
  );
};

export default SecretFields;
