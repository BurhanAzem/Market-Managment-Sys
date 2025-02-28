import { configureStore } from '@reduxjs/toolkit';

// Import slices
import alertSlice from '../features/alertSlice';
import authSlice from '../features/authSlice';
import categorySlice from '../features/categorySlice';
import companySlice from '../features/companySlice';
import discountSlice from '../features/discountSlice';
import productSlice from '../features/productSlice';
import shelfSlice from '../features/shelfSlice';
import supplierSlice from '../features/supplierSlice';

// ---------------------------------------------------------------------------
// CREATE THE STORE
// ---------------------------------------------------------------------------
export const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    category: categorySlice,
    company: companySlice,
    discount: discountSlice,
    product: productSlice,
    shelf: shelfSlice,
    supplier: supplierSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
