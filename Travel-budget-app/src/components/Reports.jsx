import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import Papa from 'papaparse';

function Reports() {
  const expenses = useSelector(state => state.expenses.list);
  const ref = useRef();

  const handlePrint = useReactToPrint({ content: () => ref.current });

  const handleCSV = () => {
    const csv = Papa.unparse(expenses);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.csv';
    link.click();
  };

  return (
    <div>
      <div ref={ref}>
        {/* Render report details here */}
        {expenses.map(exp => (
          <div key={exp.id}>{exp.description}: {exp.amount} ({exp.category})</div>
        ))}
      </div>
      <button onClick={handlePrint}>Export PDF</button>
      <button onClick={handleCSV}>Export CSV</button>
    </div>
  );
}
export default Reports;
