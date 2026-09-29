import { LuCopy } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";

const CardField = ({ field }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full flex flex-row items-center justify-between">
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
  );
};

export default CardField;
