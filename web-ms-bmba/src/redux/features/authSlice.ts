import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/axios';
import { RootState } from '../store/store';
import { IAuth as Auth, IAuth } from '../../models/auth';
import { IUser } from '../../models/user';

// Define state interface
interface AuthState {
  authToken: string;
  isPasswordChanged: boolean;
  user: IUser | null;
  loading: boolean;
  error?: string | null;
}

// Get token and user from localStorage
const authTokenFromLocalStorage = localStorage.getItem('authToken') || '';
const userFromLocalStorage = localStorage.getItem('user');
const parsedUser: IUser | null = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

// Initial state
const initialState: AuthState = {
  authToken: authTokenFromLocalStorage,
  isPasswordChanged: false,
  user: parsedUser,
  loading: false,
  error: null,
};

// ✅ Fixed `loginAuth` Thunk
export const loginAuth = createAsyncThunk<
  IAuth, // ✅ Ensure it matches the API response
  { cardId: string; email: string; phoneNumber: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async ({ cardId, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post<IAuth>(
        "/auth/login",
        { email, phoneNumber, cardId, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ API Response:", response.data); // Debugging

      if (!response.data.token) {
        throw new Error("Invalid response: Token is missing");
      }

      // ✅ Store token and user correctly
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userDto));

      return response.data; // Ensure this is returning the correct type
    } catch (err: any) {
      console.error("❌ Login API Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);



// ✅ Fixed `logoutAuth` Thunk
export const logoutAuth = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Clear auth data from localStorage correctly
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (err: any) {
      return rejectWithValue('Logout failed');
    }
  }
);

// ✅ Updated `authSlice` with proper reducers
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("🔄 Login Pending - Redux State:", state);
      })
      .addCase(loginAuth.fulfilled, (state, action: PayloadAction<IAuth>) => {
        state.loading = false;
        state.authToken = action.payload.token;
        state.user = action.payload.userDto;
        state.error = null;
        console.log("✅ Login Success - Redux State Updated:", state);
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
        console.log("❌ Login Failed - Redux State:", state);
      })


      // ✅ Updated Logout Reducers
      .addCase(logoutAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.loading = false;
        state.authToken = '';
        state.user = null;
        state.error = null;
      })
      .addCase(logoutAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Logout failed';
      });
  },
});

// ✅ Export Reducer
export default authSlice.reducer;
