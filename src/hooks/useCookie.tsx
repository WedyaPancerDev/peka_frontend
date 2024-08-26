import nookies, { setCookie, destroyCookie } from "nookies";

type ReturnTypes = {
  saveCookie: (args: SaveCookieProps) => void;
  getCurrentCookie: (keyActive?: string) => string | null;
  removeFromCookie: () => void;

  saveToLocalStorage: (key: string, value: string) => void;
  getFromLocalStorage: (key: string) => string | null;
  removeFromLocalStorage: (key: string) => void;
};

type SaveCookieProps = {
  token: string;
  keyActive?: string;
  exp?: number;
};

const key = "@access-point";

const useCookie = (): ReturnTypes => {
  const getCurrentCookie = (keyActive: string = key): string | null => {
    const currentToken = nookies.get();

    return currentToken[keyActive] || null;
  };

  const saveCookie = ({
    token,
    keyActive = key,
    exp,
  }: SaveCookieProps): void => {
    const currentToken = getCurrentCookie();

    if (!currentToken) {
      setCookie(null, keyActive, String(token), {
        maxAge: exp || 1 * 60 * 60 * 24,
        path: "/",
      });
    }
  };

  const removeFromCookie = (): void => {
    destroyCookie(null, key);
  };

  const saveToLocalStorage = (key: string, value: string): void => {
    typeof window !== "undefined" && localStorage.setItem(key, value);
  };

  const getFromLocalStorage = (key: string): string | null => {
    const result = typeof window !== "undefined" && localStorage.getItem(key);

    if (!result) return null;

    return result;
  };

  const removeFromLocalStorage = (key: string): void => {
    typeof window !== "undefined" && localStorage.removeItem(key);
  };

  return {
    saveCookie,
    getCurrentCookie,
    removeFromCookie,

    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
  };
};

export default useCookie;
