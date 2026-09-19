export const setExpirationDate = () => {
  let expDate = new Date();
  expDate.setMinutes(expDate.getMinutes() + Number(process.env.JWT_REF_EXP_TIME));
  return expDate;
};
