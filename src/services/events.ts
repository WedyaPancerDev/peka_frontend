import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export interface EventInvite {
  fullname: string;
  email: string;
  avatar: any;
}

export interface EventResponse {
  event_code: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  address: string;
  start_date: string;
  end_date: string;
  invite_only: boolean;
  banner: string;
  created_by: string;
  status: string;
  created_at: string;
  event_invites: EventInvite[];
}

export const getEvents = async (): Promise<ApiResponse<EventResponse[]>> => {
  const result = await axios.get("/event/all");

  return result.data as ApiResponse<EventResponse[]>;
};

export type EventPayload = {
  title: string;
  description: string;
  location: string;
  address: string;
  start_date: string;
  end_date: string;
  invite_only: boolean;
  url_mail: string | null;
  total_invited_user: string[];
  banner: string;
  created_by: string;
};

export const createEvent = async (
  payload: EventPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/event/create", payload);

  return result.data as ApiResponse<null>;
};

export const updateEvent = async (
  eventCode: string,
  payload: EventPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.put(`/event/update/${eventCode}`, payload);

  return result.data as ApiResponse<null>;
};

export const deleteEvent = async (
  eventCode: string
): Promise<ApiResponse<null>> => {
  const result = await axios.delete(`/event/delete/${eventCode}`);

  return result.data as ApiResponse<null>;
};

export const updateEventParticipant = async (
  eventCode: string,
  payload: { invited_user: string[] }
): Promise<ApiResponse<null>> => {
  const result = await axios.put(
    `/event/update-participant/${eventCode}`,
    payload
  );

  return result.data as ApiResponse<null>;
};
