import { createSlice } from "@reduxjs/toolkit";

const toppingSlice = createSlice({
  name: "topping",
  initialState: {
    topping: [],
  },
  reducers: {
    getAll(state, action) {
      state.topping = action.payload;
    },
    deleteTopping(state, action) {
      let newArr = state.topping.filter(
        (item) => item.id_topping !== action.payload
      );
      state.topping = newArr;
    },
    addTopping(state, action) {
      state.topping = [...state.topping, action.payload];
    },
    updateTopping(state, action) {
      let i = 0;
      for (let index = 0; index < state.topping.length; index++) {
        const element = state.topping[index];
        if (element.id_topping === action.payload.id_topping) {
          i = index;
          state.topping[i].name = action.payload.name;
          state.topping[i].price = action.payload.price;
        }
      }
    },
  },
});

const { actions, reducer } = toppingSlice;
export const { getAll, addTopping, deleteTopping, updateTopping } = actions;
export default reducer;
