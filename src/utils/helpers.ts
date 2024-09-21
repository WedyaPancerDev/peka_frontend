import { VITE_APP_ENV } from "./env";

export const getEnv = (): "prod" | "dev" => {
  const env = VITE_APP_ENV === "production" ? "prod" : "dev";

  return env;
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
