import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// PLACEHOLDER for supplier Reducer
// You must manually copy your old logic from supplierReducer.tsx into this file.
// e.g. initialState, extraReducers or normal reducers, etc.
// ---------------------------------------------------------------------------

interface supplierState {
  example: string;
  // TODO: Add the rest of your actual supplier state here
}

const initialState: supplierState = {
  example: "Placeholder for supplier",
};

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<string>) {
      state.example = action.payload;
    },
    // TODO: Insert your real logic from supplierReducer here
  },
  // If you had async logic or switch cases, convert them via createAsyncThunk & extraReducers
  extraReducers: (builder) => {
    // e.g. builder.addCase(someAsyncThunk.pending, (state) => {...});
  },
});

export const { setExample } = supplierSlice.actions;
export default supplierSlice.reducer;
