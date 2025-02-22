import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// PLACEHOLDER for auth Reducer
// You must manually copy your old logic from authReducer.tsx into this file.
// e.g. initialState, extraReducers or normal reducers, etc.
// ---------------------------------------------------------------------------

interface authState {
  example: string;
  // TODO: Add the rest of your actual auth state here
}

const initialState: authState = {
  example: "Placeholder for auth",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<string>) {
      state.example = action.payload;
    },
    // TODO: Insert your real logic from authReducer here
  },
  // If you had async logic or switch cases, convert them via createAsyncThunk & extraReducers
  extraReducers: (builder) => {
    // e.g. builder.addCase(someAsyncThunk.pending, (state) => {...});
  },
});

export const { setExample } = authSlice.actions;
export default authSlice.reducer;
