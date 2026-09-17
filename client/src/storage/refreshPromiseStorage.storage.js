let refreshPromise = null;

export const getRefreshPromise = () => {
  return refreshPromise;
};

export const setRefreshPromise = (promise) => {
  refreshPromise = promise;
};

export const removeRefreshPromise = () => {
  refreshPromise = null;
};
