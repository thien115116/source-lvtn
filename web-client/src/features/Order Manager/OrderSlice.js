import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order_today: [],
    order: [],
  },
  reducers: {
    emptyOrder(state) {
      state.order_today = [];
      state.order = [];
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
  },
});

const { actions, reducer } = orderSlice;
export const { emptyOrder, setOrderToday, setOrder } = actions;
export default reducer;
