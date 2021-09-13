import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: [],
    foodOfMenu: [],
  },
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setFoodOfMenu(state, action) {
      state.foodOfMenu = action.payload;
    },
    addFoodOfMenu(state, action) {
      state.foodOfMenu.forEach((element) => {
        if (element.id_product === action.payload) {
          element.is_check = true;
        }
      });
    },
    countFoodOfMenu(state, action) {
      state.menu.forEach((element) => {
        if (element.id_menu === action.payload) {
          element.quantity++;
        }
      });
    },
    deleteFoodOfMenu(state, action) {
      state.foodOfMenu.forEach((element) => {
        if (element.id_product === action.payload) {
          element.is_check = false;
        }
      });
    },
    addNew(state, action) {
      state.menu = [...state.menu, action.payload];
    },
    deleteMenu(state, action) {
      state.menu = state.menu.filter((item) => item.id_menu !== action.payload);
    },
    updateMenuInfo(state, action) {
      state.menu.forEach((element) => {
        if (element.id_menu === action.payload.id_menu) {
          element.name_menu = action.payload.name_menu;
          element.view = action.payload.view;
        }
      });
    },
  },
});

const { actions, reducer } = menuSlice;
export const {
  setMenu,
  setFoodOfMenu,
  addNew,
  addFoodOfMenu,
  deleteFoodOfMenu,
  deleteMenu,
  countFoodOfMenu,
  updateMenuInfo,
} = actions;
export default reducer;
