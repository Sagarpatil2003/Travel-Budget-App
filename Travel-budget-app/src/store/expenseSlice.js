import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const fetchExpenses = createAsyncThunk('expenses/fetch', async () => {
  const snapshot = await getDocs(collection(db, 'expenses'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addExpense = createAsyncThunk('expenses/add', async (data) => {
  const docRef = await addDoc(collection(db, 'expenses'), data);
  return { id: docRef.id, ...data };
});

export const updateExpense = createAsyncThunk('expenses/update', async ({id, ...data}) => {
  await updateDoc(doc(db, 'expenses', id), data);
  return { id, ...data }; 
});

export const deleteExpense = createAsyncThunk('expenses/delete', async (id) => {
  await deleteDoc(doc(db, 'expenses', id));
  return id;
});

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: { list: [], status: null, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'success';
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const idx = state.list.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.id !== action.payload);
      });
  },
});

export default expenseSlice.reducer;
