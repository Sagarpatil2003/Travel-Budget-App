import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import categoryReducer from './categorySlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    expenses: expenseReducer,
    categories: categoryReducer,
    auth: authReducer,
  },
});
