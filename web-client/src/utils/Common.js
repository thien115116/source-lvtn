export const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};
export const getToken = () => {
  return localStorage.getItem("token") || null;
};
export const setUserLocalStorage = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};
export const removeUserLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
