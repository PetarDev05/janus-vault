export const sendRequest = async (url, options) => {
  const response = await fetch(url, options);
  const parsedResponse = await response.json();
  return parsedResponse;
};
