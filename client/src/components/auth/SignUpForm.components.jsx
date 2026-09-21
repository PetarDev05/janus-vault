import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Logo from "../global/units/Logo.components";
import { useHttpRequest } from "../../hooks/http_hooks/useHttpRequest.hooks.jsx";
import { RiLoader2Fill } from "react-icons/ri";
import { useAuthContext } from "../../hooks/context_hooks/useAuthContext.hooks.jsx";

const SignUpForm = () => {
  const httpRequest = useHttpRequest();
  const { authLoading } = useAuthContext();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [visibility, setVisibility] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await httpRequest("user", "register", "", "POST", input, false, true);

    setInput({ username: "", email: "", password: "" });
  };

  return (
    <form
      className="w-full max-w-90 flex flex-col items-center gap-4 px-6 py-8 border border-(--border-light) dark:border-(--border-dark) bg-transparent rounded-xl backdrop-blur-xl shadow"
      onSubmit={handleSubmit}
    >
      <Logo />
      {/* <h2 className="text-(--heading-light) dark:text-(--heading-dark) font-semibold text-2xl">
        Sign up
      </h2> */}
      <p className="text-(--text-light) text-center text-lg dark:text-(--text-dark) mb-3">
        Create your personal account
      </p>
      <label
        htmlFor="username-sign-up"
        className="w-full text-(--text-light) dark:text-(--text-dark) font-semibold"
      >
        Username
      </label>
      <input
        id="username-sign-up"
        name="username"
        type="text"
        value={input.username}
        onChange={handleInputChange}
        placeholder="John Doe"
        className="w-full py-2 px-4 border border-(--border-light) dark:border-(--border-dark) text-(--text-light) dark:text-(--text-dark) rounded-full outline-1 outline-transparent focus:outline-(--primary)"
      />
      <label
        htmlFor="email-sign-in"
        className="w-full text-(--text-light) dark:text-(--text-dark) font-semibold"
      >
        Email
      </label>
      <input
        id="email-sign-up"
        name="email"
        type="email"
        value={input.email}
        onChange={handleInputChange}
        placeholder="john@gmail.com"
        className="w-full py-2 px-4 border border-(--border-light) dark:border-(--border-dark) text-(--text-light) dark:text-(--text-dark) rounded-full outline-1 outline-transparent focus:outline-(--primary)"
      />
      <label
        htmlFor="password-sign-in"
        className="w-full text-(--text-light) dark:text-(--text-dark) font-semibold"
      >
        Password
      </label>
      <div id="password-sign-up" className="relative w-full">
        <input
          name="password"
          type={visibility ? "text" : "password"}
          value={input.password}
          onChange={handleInputChange}
          placeholder="\/**+**\/"
          className="w-full py-2 px-4 border border-(--border-light) dark:border-(--border-dark) text-(--text-light) dark:text-(--text-dark) rounded-full outline-1 outline-transparent focus:outline-(--primary)"
        />
        <span
          onClick={() => setVisibility((prev) => !prev)}
          className="absolute right-5 z-5 top-1/2 -translate-y-1/2 text-(--text-light) dark:text-(--text-dark) cursor-pointer"
        >
          {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
      <button className="w-full py-2 bg-(--primary) rounded-full text-(--white) font-semibold cursor-pointer mt-5 h-10 flex items-center justify-center">
        {authLoading === "sign_up" ? (
          <RiLoader2Fill className="animate-spin text-xl" />
        ) : (
          "Sign up"
        )}
      </button>
      <p className="text-center text-(--text-light) dark:text-(--text-dark)">
        Already have an account?{" "}
        <Link to="/sign_in" className="text-(--primary) cursor-pointer">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
