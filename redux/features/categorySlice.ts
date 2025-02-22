import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// PLACEHOLDER for category Reducer
// You must manually copy your old logic from categoryReducer.tsx into this file.
// e.g. initialState, extraReducers or normal reducers, etc.
// ---------------------------------------------------------------------------

interface categoryState {
  example: string;
  // TODO: Add the rest of your actual category state here
}

const initialState: categoryState = {
  example: "Placeholder for category",
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<string>) {
      state.example = action.payload;
    },
    // TODO: Insert your real logic from categoryReducer here
  },
  // If you had async logic or switch cases, convert them via createAsyncThunk & extraReducers
  extraReducers: (builder) => {
    // e.g. builder.addCase(someAsyncThunk.pending, (state) => {...});
  },
});

export const { setExample } = categorySlice.actions;
export default categorySlice.reducer;
