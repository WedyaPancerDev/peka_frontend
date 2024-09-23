import { VITE_APP_ENV } from "./env";

export const getEnv = (): "prod" | "dev" => {
  const env = VITE_APP_ENV === "production" ? "prod" : "dev";

  return env;
};

export const remove62Number = (phoneNumber: string): string => {
  return phoneNumber.replace(/^62/, "0");
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
