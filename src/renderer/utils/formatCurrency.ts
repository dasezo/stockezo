const formatCurrency = (value: number) => {
  return value.toLocaleString('ar-DZ', {
    style: 'currency',
    currency: 'DZD',
  });
};

export default formatCurrency;
