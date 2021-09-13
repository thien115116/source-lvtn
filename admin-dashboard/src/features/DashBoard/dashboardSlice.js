import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    topMerchant: [],
    totalOrder: [],
  },
  reducers: {
    setTopMerchant(state, action) {
      state.topMerchant = action.payload;
    },
    setTotalOrder(state, action) {
      state.totalOrder = action.payload;
    },
  },
});

const { actions, reducer } = dashboardSlice;
export const { setTopMerchant, setTotalOrder } = actions;
export default reducer;
