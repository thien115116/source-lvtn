import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: { list: [] },
  reducers: {
    initialLocation(state, action) {
      state.list = action.payload;
    },
  },
});

const { actions, reducer } = locationSlice;
export const { initialLocation } = actions;
export default reducer;
