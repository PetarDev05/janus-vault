export const setExpirationDate = () => {
  let expDate = new Date();
  expDate.setHours(expDate.getHours() + Number(process.env.JWT_REF_EXP_TIME));
  return expDate;
};
