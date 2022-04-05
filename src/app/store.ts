import { configureStore } from "@reduxjs/toolkit";
import maternityReducer from "../features/maternitySlice";

export const store = configureStore({
  reducer: {
    maternity: maternityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
