import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  email: string;
  password: string;
};

const initState: User = {
  email: "test@email.com",
  password: "testPass",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    updateData: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { updateData } = userSlice.actions;
export default userSlice.reducer;
