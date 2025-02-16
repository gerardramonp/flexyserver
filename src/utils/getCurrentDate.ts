export const getCurrentDate = () => {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "CET" });
};
