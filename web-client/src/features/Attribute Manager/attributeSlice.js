import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "att",
  initialState: {
    att: [],
  },
  reducers: {
    getAll(state, action) {
      state.att = action.payload;
    },
    deleteAtt(state, action) {
      let newArr = state.att.filter((item) => item.id_attr !== action.payload);
      state.att = newArr;
    },
    addAtt(state, action) {
      state.att = [...state.att, action.payload];
    },
    updateAtt(state, action) {
      let i = 0;
      for (let index = 0; index < state.att.length; index++) {
        const element = state.att[index];
        if (element.id_attr === action.payload.id_attr) {
          i = index;
          state.att[i].name = action.payload.name;
          state.att[i].type = action.payload.type;
        }
      }
    },
  },
});

const { actions, reducer } = merchantSlice;
export const { getAll, addAtt, deleteAtt, updateAtt } = actions;
export default reducer;
