import { Navigate } from "react-router-dom";
import SignUpForm from "../components/auth/SignUpForm.components.jsx";
import { useAuthContext } from "../hooks/context_hooks/useAuthContext.hooks.jsx";

const SignUp = () => {
  const { authStatus } = useAuthContext();

  if (authStatus === "authenticated") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-5  dark:bg-(--bg-dark-primary)">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
