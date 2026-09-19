import { fetchWrapper } from "../../services/fetchWrapper.services.js";
import {
  removeAccessToken,
  setAccessToken,
} from "../../storage/accessTokenStorage.storage.js";
import { useAuthContext } from "../context_hooks/useAuthContext.hooks.jsx";
import { useGlobalContext } from "../context_hooks/useGlobalContext.hooks.jsx";

export const useHttpRequest = () => {
  const { user, dispatchUser } = useAuthContext();
  const { handleError, handleSuccess } = useGlobalContext();

  const httpRequest = async (
    type,
    service,
    params,
    method,
    body,
    needAuth,
    needCredentials,
  ) => {
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

    console.log(response); // ovo obrisi kasnije

    if (!response.success) {
      handleError(response);

      if (response.action === "SIGN_OUT") {
        dispatchUser({ type: "REMOVE_USER" });
        removeAccessToken();
      }

      return;
    }

    handleSuccess(response.message);

    if (type === "user") {
      if (service === "sign_out" || service === "delete") {
        dispatchUser({ type: "REMOVE_USER" });
        removeAccessToken();
      } else {
        dispatchUser({ type: "SET_USER", payload: response.data });
        setAccessToken(response.data.accessToken);
      }

      return;
    }

    // ovde pravis dispatch "switch" koji ce da pronadje odgovarajucu akciju u data modulu i da je dispatch-uje.
  };

  return httpRequest;
};
