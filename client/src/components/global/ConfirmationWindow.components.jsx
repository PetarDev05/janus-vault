import { useGlobalContext } from "../../hooks/context_hooks/useGlobalContext.hooks.jsx";
import { useHttpRequest } from "../../hooks/http_hooks/useHttpRequest.hooks.jsx";

const ConfirmationWindow = () => {
  const { confirmationWindow, setConfirmationWindow } = useGlobalContext();
  const { color, message, actionText, secretID } = confirmationWindow;
  const httpRequest = useHttpRequest();

  const cancel = () => {
    setConfirmationWindow({
      show: false,
      color: "",
      message: "",
      actionText: "",
      secretID: "",
    });
  };

  const deleteAction = async () => {
    if (actionText === "Remove account") {
      await httpRequest("user", "delete", "", "DELETE", null, false, true);
    } else {
      await httpRequest(
        "data",
        "delete_secret",
        secretID,
        "DELETE",
        null,
        true,
        false,
      );
    }

    cancel();
  };

  return (
    <div className="w-[90%] max-w-95 fixed top-1/2 left-1/2 -translate-1/2 z-100 p-7 bg-(--card-light) border border-(--delete-red) rounded-xl flex flex-col items-center gap-5">
      <p className="text-(--text-light) text-center">Are you sure you want to {message}?</p>
      <div className="flex flex-row items-center gap-5">
        <button
          onClick={cancel}
          className="px-4 py-2 text-sm text-(--text-light) border border-(--border-light) rounded-md cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={deleteAction}
          className={`px-4 py-2 text-sm text-(--white) ${color === "red" ? "bg-(--delete-red)" : "bg-(--sign-out-orange)"} rounded-md cursor-pointer`}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
