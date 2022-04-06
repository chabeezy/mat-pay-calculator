import { createSlice } from "@reduxjs/toolkit";

interface MaternityState {
  salary: string;
  weeks: string;
  percentage: string;
  statutory: string;
  studentLoan: string;
}

const initialState: MaternityState = {
  salary: "",
  weeks: "",
  percentage: "",
  statutory: "",
  studentLoan: "0"
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