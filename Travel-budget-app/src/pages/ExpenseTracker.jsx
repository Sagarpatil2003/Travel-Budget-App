import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import CategoryManager from '../components/CategoryManager';
import Reports from '../components/Reports';

function ExpenseTracker() {
  return (
    <div>
      <ExpenseForm />
      <CategoryManager />
      <ExpenseList />
      <Reports />
    </div>
  );
}
export default ExpenseTracker;
