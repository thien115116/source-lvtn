import { createSlice } from "@reduxjs/toolkit";

const workSlice = createSlice({
  name: "work",
  initialState: { reqList: [], option: [], reqUpdate: [] },
  reducers: {
    empty(state, payload) {
      state.option = [];
      state.reqList = [];
    },
    setAllRequest(state, action) {
      state.reqList = action.payload;
    },
    setRequestUpdate(state, action) {
      state.reqUpdate = action.payload;
    },
    setOption(state, action) {
      action.payload.forEach((element) => {
        state.option.push({
          value: { id: element.id_admin, url_img: element.url_img },
          label: element.full_name,
        });
      });
    },
  },
});

const { actions, reducer } = workSlice;
export const {
  setAllRequest,
  setImgAdmin,
  setOption,
  empty,
  setRequestUpdate,
} = actions;
export default reducer;
