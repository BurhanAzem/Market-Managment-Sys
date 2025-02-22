// ============================================================================
// productSlice.ts
//
// This slice fully replaces your old productReducer.tsx and productActions.tsx,
// implementing their logic via Redux Toolkit's createSlice & createAsyncThunk.
// ============================================================================

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/axios'; // Adjust path if needed
import { IProduct } from '../../models/product';
import { IProductsRes } from '../../models/productRes';
import { IDiscount } from '../../models/discount';
import { RootState } from '../store/store';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// OLD: interface IProductsState { ... }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export interface IProductsState {
  products: IProduct[];
  pageNumber: number;
  totalPages: number;
  discount: IDiscount | null;
  product: IProduct | null;
  loading: boolean;
  isAddProductModalOpen: boolean;
  isEditProductModalOpen: boolean;
  error: string | null;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// OLD: const initialState = { ... }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState: IProductsState = {
  pageNumber: 1,
  totalPages: 1,
  products: [],
  discount: null,
  product: null,
  loading: false,
  isAddProductModalOpen: false,
  isEditProductModalOpen: false,
  error: null,
};

/* ============================================================================
   1) CREATE ASYNC THUNKS (replacing old productActions)
   ============================================================================ */

// NOTE: The old code used "ThunkAction", "ThunkDispatch", etc. from redux-thunk.
// With RTK, we can use createAsyncThunk for simpler, robust async calls.

interface IGetProductsQuery {
  productName?: string;
  categoryName?: string;
  selfCode?: string;
  supplierName?: string;
  pageNumber?: number;
  pageSize?: number;
}

// getProducts
export const getProducts = createAsyncThunk<
  IProductsRes,       // fulfilled payload
  IGetProductsQuery,  // argument
  { rejectValue: string }
>('product/getProducts', async (query, { rejectWithValue }) => {
  try {
    // Construct the query string
    const queryString = Object.entries(query)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&');

    const url = `products/?${queryString}`;
    const response = await axios.get<IProductsRes>(url);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data ?? 'Failed to fetch products');
  }
});

// addProduct
export const addProduct = createAsyncThunk<
  IProduct,
  IProduct,
  { rejectValue: string }
>('product/addProduct', async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post<IProduct>('/products', product);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data ?? 'Add product failed');
  }
});

// editDiscount
export const editDiscount = createAsyncThunk<
  IProduct,
  IProduct,
  { rejectValue: string }
>('product/editDiscount', async (product, { rejectWithValue }) => {
  try {
    const response = await axios.put<IProduct>('/products', product);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data ?? 'Edit discount failed');
  }
});

// deleteDiscount
export const deleteDiscount = createAsyncThunk<
  number, // returning the productId
  number, // argument
  { rejectValue: string }
>('product/deleteDiscount', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/discounts/${productId}`);
    // If the API returns anything, you can parse here; we only need the ID.
    return productId;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data ?? 'Delete discount failed');
  }
});

/* ============================================================================
   2) CREATE THE SLICE (replaces your old productReducer switch statement)
   ============================================================================
*/
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Synchronous actions (OPEN_ADD_PRODUCT_MODAL, etc.)
    openAddProductModal(state) {
      state.isAddProductModalOpen = true;
    },
    closeAddProductModal(state) {
      state.isAddProductModalOpen = false;
    },
    openEditProductModal(state) {
      state.isEditProductModalOpen = true;
    },
    closeEditProductModal(state) {
      state.isEditProductModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    // getProducts
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pageNumber = action.payload.pageNumber;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // addProduct
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      // Optionally push the new product to the array
      state.products.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // editDiscount
    builder.addCase(editDiscount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editDiscount.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload;
      const idx = state.products.findIndex((p) => p.id === updated.id);
      if (idx !== -1) {
        state.products[idx] = updated;
      }
    });
    builder.addCase(editDiscount.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // deleteDiscount
    builder.addCase(deleteDiscount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDiscount.fulfilled, (state, action) => {
      state.loading = false;
      // remove the product from state
      const deletedId = action.payload;
      state.products = state.products.filter((p) => p.id !== deletedId);
    });
    builder.addCase(deleteDiscount.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

// Export synchronous actions
export const {
  openAddProductModal,
  closeAddProductModal,
  openEditProductModal,
  closeEditProductModal,
} = productSlice.actions;

// Export the final reducer
export default productSlice.reducer;
