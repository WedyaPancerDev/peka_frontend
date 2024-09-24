import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type UsersResponse = {
  id: string;
  fullname: string;
  email: string | null;
  phone: string | null;
  role: string;
  account_status: string;
  birth_of_date: string | null;
  address: string | null;
  avatar: string | null;
};

export const getUsers = async (): Promise<ApiResponse<UsersResponse[]>> => {
  const result = await axios.get("/user/active");

  return result.data as ApiResponse<UsersResponse[]>;
};

export type UserDashboardResponse = {
  users: number;
  events: number;
  module: number;
  news: number;
};

export const getUserDashboard = async (): Promise<
  ApiResponse<UserDashboardResponse>
> => {
  const result = await axios.get("/user/dashboard");

  return result.data as ApiResponse<UserDashboardResponse>;
};

export const getUserById = async (
  userId: string
): Promise<ApiResponse<UsersResponse>> => {
  const result = await axios.get(`/user/active/${userId}`);

  return result.data as ApiResponse<UsersResponse>;
};

