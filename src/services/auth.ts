import axios from "utils/axios";
import type { ApiResponse } from "types/response";
import type { Role } from "types";

export type LoginResponse = {
  token: string;
  token_type: string;
  role: Role;
  email: string;
  user_id: string;
  exp: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const authLogin = async (
  payload: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  const result = await axios.post("/auth/login", payload);

  return result?.data as ApiResponse<LoginResponse>;
};

export type RegisterPayload = {
  email: string;
  password: string;
  fullname: string;
  gender: "male" | "female";
  avatar: string | null;
  phone: string;
};

export const authRegister = async (
  payload: RegisterPayload,
  only?: Role
): Promise<ApiResponse<null>> => {
  const roleList: Role[] = ["user", "admin_organization", "super_admin"];
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
  avatar: string;
  email: string;
  fullname: string;
  gender: string;
  phone: string;
};

export const authUpdateProfile = async (
  payload: UpdateProfilePayload
): Promise<ApiResponse<null>> => {
  const result = await axios.put("/user/update-profile", payload);

  return result.data;
};

export type UserProfileResponse = {
  user: {
    id: string;
    fullname: string;
    email: string;
    avatar: string | null;
    gender: "male" | "female";
    phone: string;
    role: Role;
    account_status: "active" | "inactive";
  };
};

export const getUserProfile = async (): Promise<
  ApiResponse<UserProfileResponse>
> => {
  const result = await axios.get("/user/profile");

  return result.data as ApiResponse<UserProfileResponse>;
};

export const authLogout = async (): Promise<ApiResponse<null>> => {
  const result = await axios.post("/auth/logout/new");

  return result.data as ApiResponse<null>;
};
