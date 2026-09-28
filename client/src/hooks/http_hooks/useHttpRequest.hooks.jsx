import { fetchWrapper } from "../../services/fetchWrapper.services.js";
import {
  removeAccessToken,
  setAccessToken,
} from "../../storage/accessTokenStorage.storage.js";
import { useAuthContext } from "../context_hooks/useAuthContext.hooks.jsx";
import { useDataContext } from "../context_hooks/useDataContext.hooks.jsx";
import { useGlobalContext } from "../context_hooks/useGlobalContext.hooks.jsx";

export const useHttpRequest = () => {
  const { user, dispatchUser, setAuthLoading, setAuthStatus } =
    useAuthContext();
  const { dispatchData, setDataLoading } = useDataContext();
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
    if (type === "user") {
      setAuthLoading(service);
    } else {
      setDataLoading(service);
    }
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
    setDataLoading("");

    if (!response.success) {
      handleError(response);

      if (response.action === "SIGN_OUT") {
        dispatchUser({ type: "REMOVE_USER" });
        removeAccessToken();
        setAuthStatus("unauthenticated");
      }

      if (type === "user" && service !== "refresh") {
        dispatchUser({ type: "REMOVE_USER" });
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
    } else {
      switch (service) {
        case "all":
          dispatchData({ type: "FETCH_DATA", payload: response.data });
          break;
        case "create_category":
          dispatchData({
            type: "CREATE_NEW_CATEGORY",
            payload: response.data.newCategory,
          });
          break;
        case "delete_category":
          dispatchData({
            type: "DELETE_CATEGORY",
            payload: response.data.categoryID,
          });
          break;
        case "create_secret":
          dispatchData({
            type: "CREATE_NEW_SECRET",
            payload: response.data.newSecret,
          });
          break;
        case "delete_secret":
          dispatchData({
            type: "DELETE_SECRET",
            payload: response.data.secretID,
          });
          break;
        case "update_secret":
          dispatchData({
            type: "UPDATE_SECRET",
            payload: response.data.updatedSecret,
          });
          break;
        default:
          break;
      }
    }
  };

  return httpRequest;
};
