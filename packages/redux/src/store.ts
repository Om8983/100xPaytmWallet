import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// exporting the type for the dispatch and the state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
