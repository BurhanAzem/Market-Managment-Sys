import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// PLACEHOLDER for Alert Reducer
// You must manually copy your old logic from AlertReducer.tsx into this file.
// e.g. initialState, extraReducers or normal reducers, etc.
// ---------------------------------------------------------------------------

interface AlertState {
  example: string;
  // TODO: Add the rest of your actual Alert state here
}

const initialState: AlertState = {
  example: "Placeholder for Alert",
};

export const AlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<string>) {
      state.example = action.payload;
    },
    // TODO: Insert your real logic from AlertReducer here
  },
  // If you had async logic or switch cases, convert them via createAsyncThunk & extraReducers
  extraReducers: (builder) => {
    // e.g. builder.addCase(someAsyncThunk.pending, (state) => {...});
  },
});

export const { setExample } = AlertSlice.actions;
export default AlertSlice.reducer;
