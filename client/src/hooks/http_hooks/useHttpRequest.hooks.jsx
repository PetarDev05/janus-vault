import { fetchWrapper } from "../../services/fetchWrapper.services.js";
import {
  removeAccessToken,
  setAccessToken,
} from "../../storage/accessTokenStorage.storage.js";
import { useAuthContext } from "../context_hooks/useAuthContext.hooks.jsx";
import { useGlobalContext } from "../context_hooks/useGlobalContext.hooks.jsx";

export const useHttpRequest = () => {
  const { user, dispatchUser, setAuthLoading, setAuthStatus } = useAuthContext();
  const { handleError, handleSuccess } = useGlobalContext();
  // ovde moras da uvezes i dataLoading, zato sto moze biti jedan ili drugi, pa ti shodno tome trebaju dva uvezena loading state-a.

  const httpRequest = async (
    type,
    service,
    params,
    method,
    body,
    needAuth,
    needCredentials,
  ) => {
    setAuthLoading(service); // ovde moras da dodas loading za data
    const response = await fetchWrapper(
      user === null,
      type,
      service,
      params,
      method,
      body,
      needAuth,
      needCredentials,
    );

    setAuthLoading("");

    if (!response.success) {
      handleError(response);

      if (response.action === "SIGN_OUT") {
        dispatchUser({ type: "REMOVE_USER" });
        removeAccessToken();
        setAuthStatus("unauthenticated");
      }

      if (type === "user" && service !== "refresh") {
        setAuthStatus("unauthenticated");
      }

      return;
    }

    handleSuccess(response.message);

    if (type === "user") {
      if (service === "sign_out" || service === "delete") {
        dispatchUser({ type: "REMOVE_USER" });
        removeAccessToken();
        setAuthStatus("unauthenticated");
      } else {
        dispatchUser({ type: "SET_USER", payload: response.data });
        setAccessToken(response.data.accessToken);
        setAuthStatus("authenticated");
      }

      return;
    }

    // ovde pravis dispatch "switch" koji ce da pronadje odgovarajucu akciju u data modulu i da je dispatch-uje.

    
  };

  return httpRequest;
};
