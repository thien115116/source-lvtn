import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: { list: [], img: null },
  reducers: {
    addBanner(state, action) {
      state.list.push(action.payload);
    },
    initialBanner(state, action) {
      state.list = action.payload;
    },
    deleteBanner(state, action) {
      let newArray = state.list.filter(
        (banner) => banner.id_banner !== action.payload
      );
      state.list = newArray;
    },
  },
});

const { reducer, actions } = bannerSlice;
export const { addBanner, initialBanner, deleteBanner } = actions;
export default reducer;
