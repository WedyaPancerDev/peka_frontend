import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type NewsResponse = {
  id: number;
  slug: string;
  title: string;
  banner: string | null;
  description: string;
  news_code: string;
  hastag: string[];
  status: "published" | "draft" | "archived";
  category: string;
  published_at: string;
  url_news: string;
  users_author: {
    fullname: string;
    email: string;
  };
  users_editor: {
    fullname: string;
    email: string;
  };
};

export const getNews = async (): Promise<ApiResponse<NewsResponse[]>> => {
  const result = await axios.get("/news/all");

  return result.data as ApiResponse<NewsResponse[]>;
};

export type NewsPayload = {
  title: string;
  description: string;
  banner: string;
  category: string[];
  hastag: string[];
  status: "published" | "draft" | "archived";
  url_news: string;
  published_at: string;
  author: string;
};

export const createNews = async (
  payload: NewsPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/news/create", payload);

  return result.data as ApiResponse<null>;
};

export const updateNews = async (
  newsCode: string,
  payload: NewsPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.put(`/news/update/${newsCode}`, payload);

  return result.data as ApiResponse<null>;
};

export const deleteNews = async (
  newsCode: string
): Promise<ApiResponse<null>> => {
  const result = await axios.delete(`/news/delete/${newsCode}`);

  return result.data as ApiResponse<null>;
};

export const restoreNews = async (
  newsCode: string
): Promise<ApiResponse<null>> => {
  const result = await axios.put(`/news/restore/${newsCode}`);

  return result.data as ApiResponse<null>;
};
