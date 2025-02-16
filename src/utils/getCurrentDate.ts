export const getCurrentDate = () => {
  return new Date().toLocaleString("sv-SE", { timeZone: "CET" });
};
