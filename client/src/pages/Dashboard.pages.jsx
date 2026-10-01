import NewCategoryWindow from "../components/global/NewCategoryWindow.components.jsx";
import { useAuthContext } from "../hooks/context_hooks/useAuthContext.hooks.jsx";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/context_hooks/useGlobalContext.hooks.jsx";
import NewSecretWindow from "../components/global/NewSecretWindow.components.jsx";
import CategoryContainer from "../components/dashboard/CategoryContainer.components.jsx";
import SecretContainer from "../components/dashboard/SecretContainer.components.jsx";
import UpdateSecretWindow from "../components/global/UpdateSecretWindow.components.jsx";
import ConfirmationWindow from "../components/global/ConfirmationWindow.components.jsx";

const Dashboard = () => {
  const { authStatus } = useAuthContext();
  const { categoryWindow, secretWindow, secretIDUpdateWindow, confirmationWindow } =
    useGlobalContext();

  if (authStatus === "unauthenticated") {
    return <Navigate to="/sign_in" />;
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-start justify-start gap-5 pt-22.5 pl-5 pb-10 min-[500px]:pl-25 pr-5 max-[500px]:pb-25 bg-(--bg-light-primary) dark:bg-(--bg-dark-primary)">
      {categoryWindow && <NewCategoryWindow />}
      {secretWindow && <NewSecretWindow />}
      {secretIDUpdateWindow && <UpdateSecretWindow />}
      {confirmationWindow.show && <ConfirmationWindow />}
      <CategoryContainer />
      <SecretContainer />
    </div>
  );
};

export default Dashboard;
