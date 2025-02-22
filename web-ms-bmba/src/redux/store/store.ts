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
