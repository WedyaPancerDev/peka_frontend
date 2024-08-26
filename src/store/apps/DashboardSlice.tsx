import { createSlice } from "@reduxjs/toolkit";

import { type UserProfileResponse } from "services/auth";

type DashboardState = {
  profile: UserProfileResponse | null;
};

const initialState: DashboardState = {
  profile: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setProfile: (state: DashboardState, action) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
  },
});

export const { setProfile } = dashboardSlice.actions;

export default dashboardSlice.reducer;
