import { LuCopy } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useHttpRequest } from "../../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { useGlobalContext } from "../../../hooks/context_hooks/useGlobalContext.hooks.jsx";

const SecretCard = ({ secret }) => {
  const [visible, setVisible] = useState(false);
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
          {secret.fields.map((field, i) => (
            // ovo ispod mora da bude posebna komponenta
            <div
              key={`${i}-${field.key}`}
              className="w-full flex flex-row items-center justify-between"
            >
              <p className="">{field.key}: </p>
              <div className="flex flex-row items-center gap-3">
                <input
                  value={field.value}
                  type={`${visible ? "text" : "password"}`}
                  readOnly
                  className="rounded-md border border-(--border-light) text-(--text-light) outline-none py-1.5 px-4 min-w-0 text-sm overflow-scroll w-35"
                />
                <span className="p-1.75 text-(--primary)/60 border border-(--primary)/60 rounded-md cursor-pointer text-md">
                  <LuCopy />
                </span>
                <span
                  onClick={() => setVisible((prev) => !prev)}
                  className={`p-1.75 ${visible ? "text-(--white) bg-(--primary)/60" : "text-(--primary)/60 bg-(--white)"} rounded-md cursor-pointer text-md border border-(--primary)/60`}
                >
                  {visible ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
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
