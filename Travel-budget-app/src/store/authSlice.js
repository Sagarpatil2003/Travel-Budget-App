import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return { uid: userCred.user.uid, email: userCred.user.email };
});

export const register = createAsyncThunk('auth/register', async ({ email, password }) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return { uid: userCred.user.uid, email: userCred.user.email };
});

export const logout = createAsyncThunk('auth/logout', async () => { await signOut(auth); });

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, error: null, status: null },
  reducers: {
    setUser(state, action) { state.user = action.payload; }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(register.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(logout.fulfilled, state => { state.user = null; })
      .addCase(login.rejected, (state, action) => { state.error = action.error.message; })
      .addCase(register.rejected, (state, action) => { state.error = action.error.message; });
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
