
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useHttpRequest } from "../../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { useGlobalContext } from "../../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import CardField from "./CardField.components.jsx";

const SecretCard = ({ secret }) => {
  const httpRequest = useHttpRequest();
  const { setSecretIDUpdateWindow } = useGlobalContext();

  const deleteSecret = async () => {
    await httpRequest(
      "data",
      "delete_secret",
      secret._id,
      "DELETE",
      null,
      true,
      false,
    );
  };

  return (
    <div className="w-full p-5 rounded-xl border border-(--border-light) dark:border-(--border-dark) flex flex-col items-center justify-between gap-8">
      <div className="w-full flex flex-col items-center gap-3">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="">{secret.name}</p>
          <p className="">{secret.categoryName}</p>
        </div>
        <hr className="w-full text-(--border-light)" />
        <div className="w-full flex flex-col items-center gap-3">
          {secret.fields.map((field) => (
            // ovo ispod mora da bude posebna komponenta
            <CardField key={field._id} field={field} />
            // --------------------------------------
          ))}
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-end gap-3">
        <button
          onClick={() => setSecretIDUpdateWindow(secret._id)}
          className="p-2 text-md bg-(--primary)/60 text-(--white) rounded-md cursor-pointer"
        >
          <HiOutlinePencilAlt />
        </button>
        <button
          onClick={deleteSecret}
          className="p-2 text-md bg-(--delete-red) text-(--white) rounded-md cursor-pointer"
        >
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default SecretCard;
