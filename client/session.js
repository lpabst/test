export const AUTH_CODE = "auth-code";
export const AUTH_TOKEN = "auth-token";
export const AUTH_TYPE = "auth-type";
export const USER_ID = "user-id";

export const checkSessionAuthentication = () => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN);
  const authType = sessionStorage.getItem(AUTH_TYPE);
  let isAuthenticated = authToken !== null && authType === "AuthenticatedUser";
  return isAuthenticated;
};

export const endSession = () => {
  sessionStorage.removeItem(AUTH_TOKEN);
  sessionStorage.removeItem(AUTH_TYPE);
  sessionStorage.removeItem("isAuthenticated");
};
