import { useState, useEffect } from 'react';

export default function useCurrency(from, to, amount) {
  const [converted, setConverted] = useState(amount);
  useEffect(() => {
    if (!from || !to || !amount) return;
    fetch(`https://v6.exchangerate-api.com/v6/e99a4b46a0e7793f8fc612bd/latest/${from}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[to];
        setConverted(rate ? amount * rate : amount);
      });
  }, [from, to, amount]);
  return converted;
}
