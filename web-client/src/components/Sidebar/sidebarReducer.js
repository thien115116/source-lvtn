import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "dashboard",
  initialState: {
    active: false,
  },
  reducers: {
    setActive(state, action) {
      state.active = action.payload;
    },
  },
});

const { actions, reducer } = sidebarSlice;
export const { setActive } = actions;
export default reducer;
