import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type DiscussPayload = {
  title: string;
  content: string;
  creator_id: string;
};

export const createDiscuss = async (
  payload: DiscussPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/event/create", payload);

  return result.data as ApiResponse<null>;
};

export type CommentDiscussPayload = {
  content: string;
  creator_id: string;
};

export const createCommentByDiscuss = async (
  discussId: string,
  payload: DiscussPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post(
    `/discuss/comment/create/${discussId}`,
    payload
  );

  return result.data as ApiResponse<null>;
};

export const createLikeByDiscuss = async (
  discussId: string,
  userId: string
): Promise<ApiResponse<null>> => {
  const result = await axios.post(`/discuss/liked/${discussId}/${userId}`);

  return result.data as ApiResponse<null>;
};
