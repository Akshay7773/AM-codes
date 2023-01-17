import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "aksh", id: 1, marks: 32 },
  { name: "ak", id: 2, marks: 2 },
];

const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
});
export const { postAdded } = FormSlice.actions;
export default FormSlice.reducer;
