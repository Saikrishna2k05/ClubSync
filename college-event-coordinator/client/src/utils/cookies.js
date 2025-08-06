// Cookie utility functions
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(
    value
  )};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(c.substring(nameEQ.length, c.length));
      } catch (e) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Auth-specific cookie functions
// Updated to handle new backend response format
export const setAuthCookies = (user, token) => {
  setCookie("isLoggedIn", true, 7);
  setCookie("user", user, 7);
  setCookie("token", token, 7);
};

export const getAuthCookies = () => {
  return {
    isLoggedIn: getCookie("isLoggedIn"),
    user: getCookie("user"),
    token: getCookie("token"),
  };
};

export const clearAuthCookies = () => {
  deleteCookie("isLoggedIn");
  deleteCookie("user");
  deleteCookie("token");
};
