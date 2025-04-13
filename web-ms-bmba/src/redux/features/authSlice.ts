import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/axios';
import { RootState } from '../store/store';
import { IAuth as Auth, IAuth } from '../../models/auth';
import { IUser } from '../../models/user';

interface AuthState {
  authToken: string;
  isPasswordChanged: boolean;
  user: IUser | null;
  loading: boolean;
  error?: string | null;
}

const authTokenFromLocalStorage = localStorage.getItem('authToken') || '';
const userFromLocalStorage = localStorage.getItem('user');
const parsedUser: IUser | null = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

const initialState: AuthState = {
  authToken: authTokenFromLocalStorage,
  isPasswordChanged: false,
  user: parsedUser,
  loading: false,
  error: null,
};

export const loginAuth = createAsyncThunk<
  IAuth,
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


      console.log("API Response:", response.data);

      if (!response.data.token) {
        throw new Error("Invalid response: Token is missing");
      }

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userDto));

      return response.data;
    } catch (err: any) {
      console.error("Login API Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const registerAuth = createAsyncThunk<
  IAuth,
  { cardId: string; firstName: string; lastName: string; email: string; phoneNumber: string; userRole: string; password: string },
  { rejectValue: string }
>(
  "auth/register",
  async ({ cardId, firstName, lastName, email, phoneNumber, userRole, password }, { rejectWithValue }) => {
    try {
      const cleanValue = (val: string) => (val.trim() === "" ? null : val);

      const response = await axios.post<IAuth>(
        "/auth/register",
        {
          cardId: cleanValue(cardId),
          firstName: cleanValue(firstName),
          lastName: cleanValue(lastName),
          email: cleanValue(email),
          phoneNumber: cleanValue(phoneNumber),
          userRole: cleanValue(userRole),
          password: cleanValue(password),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data);

      return response.data;
    } catch (err: any) {
      console.error("Registration API Error:", err.response?.data);

      return rejectWithValue(
        err.response?.data?.message || "Registration failed due to a server error"
      );
    }
  }
);




export const logoutAuth = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (err: any) {
      return rejectWithValue('Logout failed');
    }
  }
);



export const loginGoogleAuth = createAsyncThunk<
  IAuth,
  { tokenId?: string, userRole: string },
  { rejectValue: string }
>(
  "auth/loginGoogle",
  async ({ tokenId, userRole }, { rejectWithValue }) => {
    try {
      const response = await axios.post<IAuth>("/auth/google-login", {
        tokenId,
        userRole
      });
      // The response should contain your own backend JWT + user info
      const { token, userDto } = response.data;

      // 2) Save to localStorage 
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userDto));

      // 3) Return Redux payload
      return response.data;
    } catch (err: any) {
      console.error("Google Login API Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Google Login failed");
    }
  }
);

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
        console.log("Registration Success - Redux State Updated:", state);
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
        console.log("Registration Failed - Redux State:", state);
      })

      .addCase(registerAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("register Pending - Redux State:", state);
      })
      .addCase(registerAuth.fulfilled, (state, action: PayloadAction<IAuth>) => {
        state.loading = false;

        state.error = null;
        console.log("Login Success - Redux State Updated:", state);
      })
      .addCase(registerAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
        console.log("Login Failed - Redux State:", state);
      })


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

    builder
      .addCase(loginGoogleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginGoogleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.authToken = action.payload.token;
        state.user = action.payload.userDto;
        state.error = null;
      })
      .addCase(loginGoogleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Google login failed";
      });

  },
});

export default authSlice.reducer;
