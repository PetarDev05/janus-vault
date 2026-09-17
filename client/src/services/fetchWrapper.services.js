import { httpRequestHandler } from "../handlers/httpRequestHandler.handlers.js";
import { setAccessToken } from "../storage/accessTokenStorage.storage.js";
import {
  getRefreshPromise,
  removeRefreshPromise,
  setRefreshPromise,
} from "../storage/refreshPromiseStorage.storage.js";

export const fetchWrapper = async (
  isAuthenticated,
  type,
  service,
  params,
  method,
  body,
  needAuth,
  needCredentials,
) => {
  try {
    const originalPromise = httpRequestHandler(
      type,
      service,
      params,
      method,
      body,
      needAuth,
      needCredentials,
    );

    const originalResponse = await originalPromise;

    if (originalResponse.success) {
      return originalResponse;
    }

    if (originalResponse.code !== "AUTHORIZATION_ERROR") {
      throw originalResponse;
    }

    if (!getRefreshPromise()) {
      let promise = httpRequestHandler(
        "user",
        "refresh",
        "",
        "POST",
        null,
        false,
        true,
      );
      setRefreshPromise(promise);
    }

    let promise = getRefreshPromise();
    let refreshResponse = await promise;

    if (!refreshResponse.success) {
      if (isAuthenticated) {
        if (getRefreshPromise()) {
          removeRefreshPromise();
        }

        throw refreshResponse;
      }

      return;
    }

    removeRefreshPromise();
    setAccessToken(refreshResponse.data.accessToken);

    const retryResponse = await originalPromise;

    if (retryResponse.success) {
      return retryResponse;
    }

    throw retryResponse;
  } catch (error) {
    return error;
  }
};
