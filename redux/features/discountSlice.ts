import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// PLACEHOLDER for discount Reducer
// You must manually copy your old logic from discountReducer.tsx into this file.
// e.g. initialState, extraReducers or normal reducers, etc.
// ---------------------------------------------------------------------------

interface discountState {
  example: string;
  // TODO: Add the rest of your actual discount state here
}

const initialState: discountState = {
  example: "Placeholder for discount",
};

export const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<string>) {
      state.example = action.payload;
    },
    // TODO: Insert your real logic from discountReducer here
  },
  // If you had async logic or switch cases, convert them via createAsyncThunk & extraReducers
  extraReducers: (builder) => {
    // e.g. builder.addCase(someAsyncThunk.pending, (state) => {...});
  },
});

export const { setExample } = discountSlice.actions;
export default discountSlice.reducer;
