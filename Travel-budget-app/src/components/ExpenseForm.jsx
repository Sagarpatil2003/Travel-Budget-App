import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, updateExpense } from '../store/expenseSlice';
import useCurrency from '../hooks/useCurrency';
import { toast } from 'react-toastify';

const currencyOptions = [
  "USD", // US Dollar
  "EUR", // Euro
  "GBP", // UK Pound Sterling
  "INR", // Indian Rupee
  "JPY", // Japanese Yen
  "AUD", // Australian Dollar
  "CAD", // Canadian Dollar
  "CNY", // Chinese Yuan
  "CHF", // Swiss Franc
  "RUB", // Russian Ruble
  "SGD", // Singapore Dollar
  "HKD", // Hong Kong Dollar
  "ZAR", // South African Rand
  "BRL"  // Brazilian Real
];

const schema = yup.object().shape({
  description: yup.string().min(3, "Description must be at least 3 characters").required(),
  amount: yup.number().positive().required("Amount required"),
  date: yup.date().required("Date required"),
  category: yup.string().required("Select category"),
  currency: yup.string().required("Currency required"),
  notes: yup.string().max(250, "Max 250 characters"),
  receipt: yup.mixed()
});

function ExpenseForm({ initial = {}, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.list) || [];
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: initial,
    resolver: yupResolver(schema)
  });
  const amount = watch('amount');
  const currency = watch('currency');
  const converted = useCurrency(currency, 'USD', amount);

  const receiptRef = useRef();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    const expenseData = {
      ...data,
      receipt: data.receipt?.[0] || null
    };
    if (initial.id) dispatch(updateExpense({ id: initial.id, ...expenseData }));
    else dispatch(addExpense(expenseData));
    toast.success('Expense saved!');
    if (onClose) onClose();
  };

  return (
    <form className="bg-white p-6 rounded shadow grid gap-3 max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <label className="font-bold">Description</label>
      <input {...register("description")} placeholder="Expense description" className="input" autoFocus />
      {errors.description && <span className="text-sm text-red-600">{errors.description.message}</span>}

      <label className="font-bold">Amount</label>
      <input {...register("amount")} type="number" step="0.01" placeholder="Amount" className="input" />
      {errors.amount && <span className="text-sm text-red-600">{errors.amount.message}</span>}

      <div className="flex gap-2">
        <div>
          <label className="font-bold">Currency</label>
          <select {...register("currency")} className="input">
            {currencyOptions.map(cur => (
              <option value={cur} key={cur}>{cur}</option>
            ))}
          </select>
          {errors.currency && <span className="text-sm text-red-600">{errors.currency.message}</span>}
        </div>
        <div>
          <label className="font-bold">Converted (USD)</label>
          <div className="input bg-gray-100">{converted}</div>
        </div>
      </div>

      <label className="font-bold">Category</label>
      <select {...register("category")} className="input">
        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
      </select>
      {errors.category && <span className="text-sm text-red-600">{errors.category.message}</span>}

      <label className="font-bold">Date</label>
      <input {...register("date")} type="date" className="input" />
      {errors.date && <span className="text-sm text-red-600">{errors.date.message}</span>}

      <label className="font-bold">Notes (optional)</label>
      <textarea {...register("notes")} placeholder="Extra details" className="input" maxLength={250} rows={2} />
      {errors.notes && <span className="text-sm text-red-600">{errors.notes.message}</span>}

      <label className="font-bold">Receipt (optional)</label>
      <input
        {...register("receipt")}
        ref={receiptRef}
        type="file"
        accept="image/*,.pdf"
        className="input"
        onChange={handleFileChange}
      />
      {preview && <img src={preview} alt="Preview" className="max-h-24 object-contain mt-2" />}

      <div className="flex gap-2 mt-3">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
