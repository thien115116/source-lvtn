import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    list_Mer: [],
    current: null,
    current_product: [],
    default_product: [],
    att: [],
    list_req: [],
    tag: [],
    attValue: [],
    topping: [],
    brand: [],
    brandDetail: [],
  },
  reducers: {
    emptyMerchant(state) {
      state.list_Mer = [];
    },
    emptyMerchantSelected(state) {
      state.current = [];
    },
    setListMerchant(state, action) {
      state.list_Mer = action.payload;
    },
    setMerchantByID(state, action) {
      state.current = action.payload;
    },
    setDefaultSelectedProduct(state) {
      state.default_product = state.current.products[0];
    },
    setSelectedProduct(state, action) {
      state.current_product = [];
      state.default_product = [];
      state.current_product = action.payload;
    },
    getAttByType(state, action) {
      state.att = action.payload;
    },
    setReqFromMerchant(state, action) {
      state.list_req = action.payload;
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
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setBrandDetail(state, action) {
      state.brandDetail = action.payload;
    },
    deleteMerchantFromBrand(state, action) {
      state.brandDetail = state.brandDetail.filter(
        (item) => item.id_merchant !== action.payload
      );
    },
    decreaseMerchantCount(state, action) {
      for (let index = 0; index < state.brand.length; index++) {
        const element = state.brand[index];
        if (element.code === action.payload) {
          state.brand[index].count = state.brand[index].count - 1;
        }
      }
    },
  },
});

const { actions, reducer } = merchantSlice;
export const {
  emptyMerchant,
  setListMerchant,
  setMerchantByID,
  getAttByType,
  setReqFromMerchant,
  setTagOfMerchant,
  setAttValue,
  setToppingOfMerchantToMultiSelect,
  setSelectedProduct,
  emptyMerchantSelected,
  setDefaultSelectedProduct,
  setBrand,
  setBrandDetail,
  deleteMerchantFromBrand,
  decreaseMerchantCount,
} = actions;
export default reducer;
