const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD',
  }).format(value);
};

export default formatCurrency;
