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
