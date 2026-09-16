export const createURL = async (type, service, params) => {
  const urlBase = import.meta.env.SERVER_URL_BASE;
  let url = `${urlBase}/${type}/${service}`;

  if (params) {
    url += `/${params}`;
  }

  return url;
}