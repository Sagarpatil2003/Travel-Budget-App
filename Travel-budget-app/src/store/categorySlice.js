import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const snapshot = await getDocs(collection(db, 'categories'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addCategory = createAsyncThunk('categories/add', async (data) => {
  const docRef = await addDoc(collection(db, 'categories'), data);
  return { id: docRef.id, ...data };
});

export const updateCategory = createAsyncThunk('categories/update', async ({id, ...data}) => {
  await updateDoc(doc(db, 'categories', id), data);
  return { id, ...data };
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id) => {
  await deleteDoc(doc(db, 'categories', id));
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { list: [], status: null },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'success';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.list.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
