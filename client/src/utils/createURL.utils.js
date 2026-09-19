export const createURL = (type, service, params) => {
  const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
  
  let url = `${urlBase}/${type}/${service}`;

  if (params) {
    url += `/${params}`;
  }

  return url;
}