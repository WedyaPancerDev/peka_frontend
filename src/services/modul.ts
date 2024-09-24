import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type ModuleResponse = {
  id?: number;
  module_code: string;
  slug: string;
  title: string;
  banner: string;
  description: string;
  embed_video: string;
  created_by: string;
  created_at: string;
  users: {
    fullname: string;
  };
};

export const getModules = async (): Promise<ApiResponse<ModuleResponse[]>> => {
  const result = await axios.get("/module/all");

  return result.data as ApiResponse<ModuleResponse[]>;
};

export const getModuleById = async (
  moduleCode: string
): Promise<ApiResponse<ModuleResponse>> => {
  const result = await axios.get(`/module/${moduleCode}`);

  return result.data as ApiResponse<ModuleResponse>;
};

export type ModulePayload = {
  title: string;
  description: string;
  banner: string | null;
  embed_video: string;
  created_by: string;
};

export const createModule = async (
  payload: ModulePayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/module/create", payload);

  return result.data as ApiResponse<null>;
};

export const updateModule = async (
  moduleCode: string,
  payload: ModulePayload
): Promise<ApiResponse<null>> => {
  const result = await axios.put(`/module/update/${moduleCode}`, payload);

  return result.data as ApiResponse<null>;
};

export const deleteModule = async (
  moduleCode: string
): Promise<ApiResponse<null>> => {
  const result = await axios.delete(`/module/delete/${moduleCode}`);

  return result.data as ApiResponse<null>;
};

export const restoreModule = async (
  moduleCode: string
): Promise<ApiResponse<null>> => {
  const result = await axios.put(`/module/restore/${moduleCode}`);

  return result.data as ApiResponse<null>;
};
