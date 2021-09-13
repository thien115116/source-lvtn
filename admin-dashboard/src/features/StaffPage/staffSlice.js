import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staff",
  initialState: { reqList: [], reqUpdate: [], current_req: null },
  reducers: {
    setAllRequest(state, action) {
      state.reqList = action.payload;
    },
    setRequestUpdate(state, action) {
      state.reqUpdate = action.payload;
    },
  },
});

const { actions, reducer } = staffSlice;
export const { setAllRequest, setRequestUpdate } = actions;
export default reducer;
