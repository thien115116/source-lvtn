import { configureStore } from "@reduxjs/toolkit";
import merchantReducer from "features/Merchant/merchantSlice";
import attReducer from "features/Attribute Manager/attributeSlice";
import toppingReducer from "features/Topping Manager/toppingSlice";
import orderReducer from "features/Order Manager/OrderSlice";
import menuReducer from "features/Menu/menuSlice";
const store = configureStore({
  reducer: {
    merchant: merchantReducer,
    att: attReducer,
    topping: toppingReducer,
    order: orderReducer,
    menu: menuReducer,
  },
});
export default store;
