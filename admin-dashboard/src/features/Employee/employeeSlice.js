import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: { list: [] },
  reducers: {
    emptyEmployee(state) {
      state.list = [];
    },
    initialEmployee(state, action) {
      state.list = action.payload;
    },
    addAccount(state, action) {
      state.list.push(action.payload);
    },
    deleteAccount(state, action) {
      state.list = state.list.filter(
        (item) => item.id_admin !== action.payload
      );
    },
  },
});

const { actions, reducer } = employeeSlice;
export const { initialEmployee, addAccount, emptyEmployee, deleteAccount } =
  actions;
export default reducer;
