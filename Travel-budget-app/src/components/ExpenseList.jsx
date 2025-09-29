import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../store/expenseSlice';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

function ExpenseList() {
  const expenses = useSelector(state => state.expenses.list);
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteExpense(id));
    toast.info('Expense deleted');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-50">
        <thead>
          <tr>
            <th>Date</th><th>Desc</th><th>Amount</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{format(new Date(exp.date), 'yyyy-MM-dd')}</td>
              <td>{exp.description}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>
                <button className="btn-danger" onClick={() => onDelete(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ExpenseList;
aut