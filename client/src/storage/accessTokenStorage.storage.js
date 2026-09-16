let accessToken = null;

export const getAccessToken = () => {
  return accessToken;
};

export const setAccessToken = (newAccessToken) => {
  accessToken = newAccessToken;
};

export const removeAccessToken = () => {
  accessToken = null;
};
