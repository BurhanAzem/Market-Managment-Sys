#!/usr/bin/env bash
#
# convert_all_reducers.sh
#
# This script migrates your old Redux setup (actionCreators/actionTypes/reducers)
# to a Redux Toolkit structure. It fully implements the logic for productReducer
# (and associated productActions) because we have its code.
# For the others (Alert, auth, category, etc.), it creates placeholder slices
# where you can manually insert your old logic.

# ------------------------------------------------------------------------------
# 0) Define the list of old reducers by name (based on your screenshot).
#    "product" is special—we have its logic, so we'll do a full migration.
# ------------------------------------------------------------------------------

allReducers=( \
  "Alert" \
  "auth" \
  "category" \
  "company" \
  "discount" \
  "product" \
  "shelf" \
  "supplier" \
)

# ------------------------------------------------------------------------------
# 1) Remove old Redux folders/files
# ------------------------------------------------------------------------------
rm -rf redux/actionCreators
rm -rf redux/actionTypes
rm -rf redux/reducers

# Ensure the 'redux' folder still exists
mkdir -p redux

# ------------------------------------------------------------------------------
# 2) Create new "features" folder
# ------------------------------------------------------------------------------
mkdir -p redux/features

# ------------------------------------------------------------------------------
# 3) For each old reducer, create a new slice file.
#    We have FULL old logic for "product"; for others, we'll create placeholders.
# ------------------------------------------------------------------------------
for name in "${allReducers[@]}"; do

  sliceName="$(echo "$name" | tr '[:upper:]' '[:lower:]')"   # e.g. alert, auth, product
  sliceFile="redux/features/${name}Slice.ts"                 # e.g. AlertSlice.ts, productSlice.ts

  if [ "$sliceName" == "product" ]; then
    ############################################################################
    # PRODUCT: FULL MIGRATION
    # We embed all your productReducer + productActions logic here in createSlice.
    ############################################################################
    cat << 'EOF' > "$sliceFile"
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
EOF

    echo "Created FULL product slice with old logic: $sliceFile"

  else
    ############################################################################
    # OTHER REDUCERS (ALERT, AUTH, CATEGORY, etc.): PLACEHOLDER SLICES
    # You will need to manually integrate your old logic from <name>Reducer.tsx
    ############################################################################
    cat << EOF > "$sliceFile"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// PLACEHOLDER for ${name} Reducer
// You must manually copy your old logic from ${name}Reducer.tsx into this file.
// e.g. initialState, extraReducers or normal reducers, etc.
// ---------------------------------------------------------------------------

interface ${name}State {
  example: string;
  // TODO: Add the rest of your actual ${name} state here
}

const initialState: ${name}State = {
  example: "Placeholder for ${name}",
};

export const ${name}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {
    // Example synchronous action
    setExample(state, action: PayloadAction<string>) {
      state.example = action.payload;
    },
    // TODO: Insert your real logic from ${name}Reducer here
  },
  // If you had async logic or switch cases, convert them via createAsyncThunk & extraReducers
  extraReducers: (builder) => {
    // e.g. builder.addCase(someAsyncThunk.pending, (state) => {...});
  },
});

export const { setExample } = ${name}Slice.actions;
export default ${name}Slice.reducer;
EOF

    echo "Created PLACEHOLDER slice for $name: $sliceFile"
  fi
done

# ------------------------------------------------------------------------------
# 4) Create the store folder & store.ts using configureStore
# ------------------------------------------------------------------------------
mkdir -p redux/store

cat << 'EOF' > redux/store/store.ts
import { configureStore } from '@reduxjs/toolkit';

// Import slices
import alertReducer from '../features/AlertSlice';
import authReducer from '../features/authSlice';
import categoryReducer from '../features/categorySlice';
import companyReducer from '../features/companySlice';
import discountReducer from '../features/discountSlice';
import productReducer from '../features/productSlice';
import shelfReducer from '../features/shelfSlice';
import supplierReducer from '../features/supplierSlice';

// ---------------------------------------------------------------------------
// CREATE THE STORE
// ---------------------------------------------------------------------------
export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    category: categoryReducer,
    company: companyReducer,
    discount: discountReducer,
    product: productReducer,
    shelf: shelfReducer,
    supplier: supplierReducer,
  },
});

// Infer RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
EOF

echo "Created redux/store/store.ts (with references to all slices)"

# ------------------------------------------------------------------------------
# 5) Create typed hooks
# ------------------------------------------------------------------------------
cat << 'EOF' > redux/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use these typed hooks throughout your app instead of plain useDispatch & useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
EOF

echo "Created redux/store/hooks.ts"

# ------------------------------------------------------------------------------
# FINISH
# ------------------------------------------------------------------------------
echo "
==============================================================================
Conversion complete!
==============================================================================
1. Old Redux folders removed: actionCreators/, actionTypes/, reducers/.
2. A 'productSlice.ts' has been created with FULL old logic from productReducer
   and productActions. 
3. For each other reducer (Alert, auth, category, etc.), we created a 
   'placeholder' slice. Move your old logic from <XYZ>Reducer.tsx 
   into the new <XYZ>Slice.ts. 
4. A new store is configured at redux/store/store.ts, referencing all slices.
5. Typed hooks are in redux/store/hooks.ts.

NEXT STEPS:
- Open each placeholder slice (e.g., 'AlertSlice.ts', 'authSlice.ts') and bring
  over your old initial state, switch cases, and side effects. Consider using
  createAsyncThunk if you had async operations.
- Verify paths in 'productSlice.ts' for axios/models if your folder structure 
  differs from the script's assumption.
- Enjoy Redux Toolkit with less boilerplate!
==============================================================================
"

