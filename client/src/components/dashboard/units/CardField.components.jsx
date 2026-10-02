import { LuCopy } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { useState } from "react";

const CardField = ({ field }) => {
  const [visible, setVisible] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(field.value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="w-full flex max-[500px]:flex-col max-[500px]:items-start flex-row items-center justify-between max-[500px]:gap-2 gap-5">
      <p className="text-(--text-light)">
        {field.key.length <= 10 ? field.key : field.key.slice(0, 10) + "..."}
        :{" "}
      </p>
      <div className="flex flex-row items-center gap-3">
        <input
          value={field.value}
          type={`${visible ? "text" : "password"}`}
          readOnly
          className="rounded-md border border-(--border-light) dark:border-(--border-dark) text-(--text-light) outline-none py-1.5 px-4 w-full min-w-0 text-sm overflow-scroll dark:bg-(--bg-dark-primary) max-w-35"
        />
        <span
          onClick={handleCopy}
          className="relative p-1.75 text-(--primary)/70 border border-(--primary)/70 rounded-md cursor-pointer text-md dark:bg-(--bg-dark-primary)"
        >
          {copied && (
            <p className="absolute left-0 -top-7 text-(--success-green) bg-(--success-green)/10 px-3 py-0.5 border border-(--success-green) text-[12px] rounded backdrop-blur-3xl">
              Copied
            </p>
          )}
          {copied ? <IoCheckmark /> : <LuCopy />}
        </span>
        <span
          onClick={() => setVisible((prev) => !prev)}
          className={`p-1.75 ${visible ? "text-(--white) bg-(--primary)/70" : "text-(--primary)/70 bg-(--white) dark:bg-transparent"} rounded-md cursor-pointer text-md border border-(--primary)/70`}
        >
          {visible ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
    </div>
  );
};

export default CardField;
