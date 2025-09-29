import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, deleteCategory } from '../store/categorySlice';

function CategoryManager() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.list);

  const onAdd = () => {
    if (!name) return;
    dispatch(addCategory({ name }));
    setName('');
  };

  const onDelete = (id) => dispatch(deleteCategory(id));

  return (
    <div className="bg-white rounded shadow-lg p-6 max-w-md mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category name"
          className="input border-gray-300 w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onAdd}
          className="btn-primary px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >Add</button>
      </div>
      <ul className="list-disc pl-5 space-y-2">
        {categories.map(cat => (
          <li key={cat.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded group">
            <span className="text-gray-800">{cat.name}</span>
            <button
              onClick={() => onDelete(cat.id)}
              className="btn-danger px-3 py-1 rounded ml-4 bg-red-500 text-white hover:bg-red-600 transition"
            >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;
