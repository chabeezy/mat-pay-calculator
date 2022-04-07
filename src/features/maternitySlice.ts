import { createSlice } from "@reduxjs/toolkit";
import { Maternity } from "../types/maternity"

const initialState: Maternity = {
  salary: "",
  weeks: "",
  percentage: "",
  statutory: "",
  studentLoan: "0",
  maternityMonth: "0"
};


const maternitySlice = createSlice({
  name: "maternity",
  initialState,
  reducers: {
      setValues(state, action) {
          return action.payload
      }
  }
});

export const { setValues } = maternitySlice.actions;

export default maternitySlice.reducer; 