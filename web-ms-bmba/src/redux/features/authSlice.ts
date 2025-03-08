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
  { cardId: string; email: string; phoneNumber: string; userRole: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async ({ cardId, email, phoneNumber, userRole, password }, { rejectWithValue }) => {
    try {

      const cleanValue = (val: string) => (val.trim() === "" ? null : val);

      const response = await axios.post<IAuth>(
        "/auth/login",
        {
          cardId: cleanValue(cardId),
          email: cleanValue(email),
          phoneNumber: cleanValue(phoneNumber),
          userRole: cleanValue(userRole),
          password: cleanValue(password),
        },
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

export const registerAuth = createAsyncThunk<
  IAuth,
  { cardId: string; userName: string; email: string; phoneNumber: string; userRole: string; password: string },
  { rejectValue: string }
>(
  "auth/register",
  async ({ cardId, userName, email, phoneNumber, userRole, password }, { rejectWithValue }) => {
    try {
      // Helper function to handle nullable values
      const cleanValue = (val: string) => (val.trim() === "" ? null : val);

      const response = await axios.post<IAuth>(
        "/auth/register",
        {
          cardId: cleanValue(cardId),
          userName: cleanValue(userName),
          email: cleanValue(email),
          phoneNumber: cleanValue(phoneNumber),
          userRole: cleanValue(userRole),
          password: cleanValue(password),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ API Response:", response.data);

      return response.data;
    } catch (err: any) {
      console.error("❌ Registration API Error:", err.response?.data);

      return rejectWithValue(
        err.response?.data?.message || "Registration failed due to a server error"
      );
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
        console.log("🔄 Registration Pending - Redux State:", state);
      })
      .addCase(loginAuth.fulfilled, (state, action: PayloadAction<IAuth>) => {
        state.loading = false;
        state.authToken = action.payload.token;
        state.user = action.payload.userDto;
        state.error = null;
        console.log("✅ Registration Success - Redux State Updated:", state);
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
        console.log("❌ Registration Failed - Redux State:", state);
      })
      
      .addCase(registerAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("🔄 register Pending - Redux State:", state);
      })
      .addCase(registerAuth.fulfilled, (state, action: PayloadAction<IAuth>) => {
        state.loading = false;

        state.error = null;
        console.log("✅ Login Success - Redux State Updated:", state);
      })
      .addCase(registerAuth.rejected, (state, action) => {
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
