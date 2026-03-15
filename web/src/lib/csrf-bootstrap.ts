import { getCsrfTokenFromServer } from "./api";

let bootstrapPromise: Promise<string | null> | null = null;

export function bootstrapCsrfToken() {
  if (!bootstrapPromise) {
    bootstrapPromise = getCsrfTokenFromServer(true).catch(() => {
      bootstrapPromise = null;
      return null;
    });
  }

  return bootstrapPromise;
}
