import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useHttpRequest } from "../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { useAuthContext } from "../../hooks/context_hooks/useAuthContext.hooks.jsx";
import { RiLoader2Fill } from "react-icons/ri";
import LogoOut from "../global/units/LogoOut.components.jsx";

const SignInForm = () => {
  const httpRequest = useHttpRequest();
  const { authLoading } = useAuthContext();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [visibility, setVisibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await httpRequest("user", "sign_in", "", "POST", input, false, true);

    setInput({
      username: "",
      password: "",
    });
  };

  return (
    <form
      className="w-full max-w-90 flex flex-col items-center gap-4 px-6 py-8 border border-(--border-light) dark:border-(--border-dark) bg-(--card-light)/40 dark:bg-(--card-dark)/40 rounded-xl backdrop-blur-xl"
      onSubmit={handleSubmit}
    >
      <LogoOut />

      <p className="text-(--text-light) text-center text-lg dark:text-(--text-dark) mb-3">
        Sign in to an existing account
      </p>
      <label
        htmlFor="username-sign-in"
        className="w-full text-(--text-light) dark:text-(--text-dark) font-semibold"
      >
        Username
      </label>
      <input
        id="username-sign-in"
        name="username"
        type="text"
        value={input.username}
        onChange={handleChange}
        placeholder="John Doe"
        className="w-full py-2 px-4 border border-(--border-light) bg-(--bg-light-primary) dark:bg-(--bg-dark-primary) dark:border-(--border-dark) text-(--text-light) dark:text-(--text-dark) rounded-full outline-1 outline-transparent focus:outline-(--primary)"
      />
      <label
        htmlFor="password-sign-in"
        className="w-full text-(--text-light) dark:text-(--text-dark) font-semibold"
      >
        Password
      </label>
      <div id="password-sign-in" className="relative w-full">
        <input
          name="password"
          type={visibility ? "text" : "password"}
          value={input.password}
          onChange={handleChange}
          placeholder="\/**+**\/"
          className="w-full py-2 px-4 border border-(--border-light) bg-(--bg-light-primary) dark:bg-(--bg-dark-primary) dark:border-(--border-dark) text-(--text-light) dark:text-(--text-dark) rounded-full outline-1 outline-transparent focus:outline-(--primary)"
        />
        <span
          onClick={() => setVisibility((prev) => !prev)}
          className="absolute right-5 z-5 top-1/2 -translate-y-1/2 text-(--text-light) dark:text-(--text-dark) cursor-pointer"
        >
          {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
      {/* <p className="w-full text-(--primary)  text-end cursor-pointer">
        Forgot password?
      </p> */}
      <button className="w-full py-2 bg-(--primary) rounded-full text-(--white) font-semibold cursor-pointer mt-5 h-10 flex items-center justify-center">
        {authLoading === "sign_in" ? (
          <RiLoader2Fill className="animate-spin text-xl" />
        ) : (
          "Sign in"
        )}
      </button>
      <p className="text-center text-(--text-light) dark:text-(--text-dark)">
        Don't have an account?{" "}
        <Link to="/sign_up" className="text-(--primary) cursor-pointer ">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
