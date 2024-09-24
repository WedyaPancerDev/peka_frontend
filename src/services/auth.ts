import axios from "utils/axios";
import type { ApiResponse } from "types/response";
import type { Role } from "types";

export type LoginResponse = {
  token: string;
  token_type: string;
  role: Role;
  phone: string;
  user_id: string;
  exp: number;
};

export type LoginPayload = {
  phone: string;
  password: string;
};

export const authLogin = async (
  payload: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  const result = await axios.post("/auth/login", payload);

  return result?.data as ApiResponse<LoginResponse>;
};

export type RegisterPayload = {
  password: string;
  fullname: string;
  phone: string;
};

export const authRegister = async (
  payload: RegisterPayload,
  only?: Role
): Promise<ApiResponse<null>> => {
  const roleList: Role[] = ["admin_organization", "super_admin"];
  const url = roleList.includes(only as Role)
    ? `/auth/register?only=${only}`
    : "/auth/register";

  const result = await axios.post(url, payload);

  return result.data;
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
};

export const authChangePassword = async (
  payload: ChangePasswordPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.patch("/auth/change-password", payload);

  return result.data;
};

export type UpdateProfilePayload = {
  email: string;
  fullname: string;
  phone: string;
  password?: string;
  birth_of_date?: string;
};

export const authUpdateProfile = async (
  payload: UpdateProfilePayload
): Promise<ApiResponse<null>> => {
  const result = await axios.put("/user/update-profile", payload);

  return result.data;
};

export interface UpdateUserByIdPayload extends UpdateProfilePayload {
  role: Role;
}

export const authUserById = async (
  userId: string,
  payload: UpdateUserByIdPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.put(`/user/update/${userId}`, payload);

  return result.data;
};

export type UserProfileResponse = {
  id: string;
  fullname: string;
  email: string;
  avatar: string | null;
  gender: "male" | "female";
  phone: string;
  role: Role;
  account_status: "active" | "inactive";
};

export const getUserProfile = async (): Promise<
  ApiResponse<UserProfileResponse>
> => {
  const result = await axios.get("/auth/me");

  return result.data as ApiResponse<UserProfileResponse>;
};

export const authLogout = async (): Promise<ApiResponse<null>> => {
  const result = await axios.post("/auth/logout/new");

  return result.data as ApiResponse<null>;
};
