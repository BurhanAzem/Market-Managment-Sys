import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// PLACEHOLDER for company Reducer
// You must manually copy your old logic from companyReducer.tsx into this file.
// e.g. initialState, extraReducers or normal reducers, etc.
// ---------------------------------------------------------------------------

interface companyState {
  example: string;
  // TODO: Add the rest of your actual company state here
}

const initialState: companyState = {
  example: "Placeholder for company",
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<string>) {
      state.example = action.payload;
    },
    // TODO: Insert your real logic from companyReducer here
  },
  // If you had async logic or switch cases, convert them via createAsyncThunk & extraReducers
  extraReducers: (builder) => {
    // e.g. builder.addCase(someAsyncThunk.pending, (state) => {...});
  },
});

export const { setExample } = companySlice.actions;
export default companySlice.reducer;
