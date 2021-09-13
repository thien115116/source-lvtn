import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    current: [],
    current_product: [],
    prevId: null,
    nextId: null,
    index: null,
    length: null,
    openTime: null,
    att: [],
    list_req: [],
    tag: [],
    attValue: [],
    topping: [],
  },
  reducers: {
    emptyMerchant(state) {
      state.current = [];
      state.current_product = [];
      state.att = [];
      state.list_req = [];
      state.tag = [];
      state.attValue = [];
      state.topping = [];
    },
    setMerchantByID(state, action) {
      state.current = action.payload;
      state.openTime = JSON.parse(state.current.openingHours);
      state.length = state.current.products.length;
    },
    setSelectedProduct(state, action) {
      state.current_product = [];
      state.current_product = action.payload;
      if (state.length > 1) {
        let index = state.current.products.findIndex(
          (item) => item.id_product === state.current_product.id_product
        );
        state.index = index;
        if (index === 0) {
          state.nextId = state.current.products[index + 1].id_product;
        } else if (index === state.length - 1) {
          state.prevId = state.current.products[index - 1].id_product;
        } else {
          state.prevId = state.current.products[index - 1].id_product;
          state.nextId = state.current.products[index + 1].id_product;
        }
      }
      
    },
    getAttByType(state, action) {
      state.att = action.payload;
    },
    setTagOfMerchant(state, action) {
      action.payload.forEach((tag) => {
        state.tag.push({
          label: tag.tag_name,
          value: tag.tag_name,
          id_tag: tag.id_tag,
        });
      });
    },
    setToppingOfMerchantToMultiSelect(state, action) {
      action.payload.forEach((topping) => {
        state.topping.push({
          label: topping.name,
          value: topping.name,
          id_topping: topping.id_topping,
        });
      });
    },
    setAttValue(state, action) {
      if (state.attValue.length > state.att.length) {
        state.attValue = [];
      } else {
        state.attValue.push(action.payload);
      }
    },
    setToppingFromMerchant(state, action) {
      state.topping = action.payload;
    },
    deleteProduct(state, action) {
      state.current.products = state.current.products.filter(
        (item) => item.id_product !== action.payload
      );
    },
  },
});

const { actions, reducer } = merchantSlice;
export const {
  emptyMerchant,
  setMerchantByID,
  setSelectedProduct,
  getAttByType,
  setTagOfMerchant,
  setToppingOfMerchantToMultiSelect,
  setAttValue,
  setToppingFromMerchant,
  deleteProduct,
} = actions;
export default reducer;
