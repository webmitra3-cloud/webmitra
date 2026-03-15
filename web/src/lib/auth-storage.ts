const ACCESS_TOKEN_KEY = "wm_access_token";
const CSRF_TOKEN_KEY = "wm_csrf_token";

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getCsrfToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CSRF_TOKEN_KEY);
}

export function setCsrfToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CSRF_TOKEN_KEY, token);
}

export function clearCsrfToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CSRF_TOKEN_KEY);
}

export function clearSession() {
  clearAccessToken();
  clearCsrfToken();
}
