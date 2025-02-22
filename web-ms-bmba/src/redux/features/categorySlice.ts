import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define category type
interface ICategory {
  id: number;
  name: string;
}

// Define state shape
interface CategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk for fetching categories
export const getCategories = createAsyncThunk<ICategory[], void>(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ICategory[]>('categories');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

// Create slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions & reducer
export const { setExample } = categorySlice.actions;
export default categorySlice.reducer;
