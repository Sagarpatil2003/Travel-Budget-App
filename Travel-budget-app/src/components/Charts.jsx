import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

function Charts() {
  const expenses = useSelector(state => state.expenses.list);
  const categories = useSelector(state => state.categories.list);

  // Pie data
  const pieData = categories.map(cat => ({
    name: cat.name,
    value: expenses
      .filter(e => e.category === cat.name)
      .reduce((a, b) => a + (+b.amount), 0)
  }));

  // Example Bar data (aggregate expenses by date - you may need to adapt)
  const barData = [];
  expenses.forEach(exp => {
    const date = exp.date;
    const found = barData.find(d => d.date === date);
    if (found) found.amount += +exp.amount;
    else barData.push({ date, amount: +exp.amount });
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#a3e635", "#f59e42", "#ba43aa", "#43bace"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <BarChart width={400} height={300} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Charts;
