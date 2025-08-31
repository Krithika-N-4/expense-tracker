export const getInitialTransactions = () => {
  const savedTransactions = localStorage.getItem('expenseTrackerTransactions');
  return savedTransactions ? JSON.parse(savedTransactions) : [];
};
