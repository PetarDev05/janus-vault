export const routeInspector = (req, res, next) => {
  console.log("--------------------------------------------");
  console.log(
    `[ REQUEST PATH: ${req.path} ] \n[ REQUEST METHOD: ${req.method} ]`,
  );
  console.log("--------------------------------------------");
  next();
};
