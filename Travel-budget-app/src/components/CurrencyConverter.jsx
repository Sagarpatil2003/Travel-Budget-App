import React, { useState } from 'react';
import useCurrency from '../hooks/useCurrency';

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

function CurrencyConverter() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const converted = useCurrency(from, to, amount);

  return (
    <div>
      <input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        type="number"
      />
      <select value={from} onChange={e => setFrom(e.target.value)}>
        {currencyOptions.map(code => (
          <option value={code} key={code}>{code}</option>
        ))}
      </select>
      <select value={to} onChange={e => setTo(e.target.value)}>
        {currencyOptions.map(code => (
          <option value={code} key={code}>{code}</option>
        ))}
      </select>
      <div>Converted: {converted}</div>
    </div>
  );
}

export default CurrencyConverter;
