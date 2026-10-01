import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useGlobalContext } from "../../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import CardField from "./CardField.components.jsx";

const SecretCard = ({ secret }) => {
  const { setSecretIDUpdateWindow, setConfirmationWindow } = useGlobalContext();

  const deleteSecret = async () => {
    setConfirmationWindow({
      show: true,
      color: "red",
      message: "delete this secret",
      actionText: "Delete secret",
      secretID: secret._id,
    });
  };

  return (
    <div className="w-full max-w-100 p-5 rounded-xl border border-(--border-light) dark:border-(--border-dark) flex flex-col items-center justify-between gap-8 shadow bg-(--card-light) dark:bg-(--card-dark)/40">
      <div className="w-full flex flex-col items-center gap-3">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-(--primary)">{secret.name}</p>
          <p className="text-(--text-light)">{secret.categoryName}</p>
        </div>
        <hr className="w-full text-(--border-light) dark:text-(--border-dark)" />
        <div className="w-full flex flex-col items-center max-[500px]:gap-5 gap-3">
          {secret.fields.map((field) => (
            <CardField key={field._id} field={field} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-end gap-3">
        <button
          onClick={() => setSecretIDUpdateWindow(secret._id)}
          className="p-2 text-md bg-(--primary)/70 text-(--white) rounded-md cursor-pointer"
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
