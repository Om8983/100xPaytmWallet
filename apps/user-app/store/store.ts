import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "@repo/redux/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
