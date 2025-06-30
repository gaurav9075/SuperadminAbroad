export const getTransactions = async () => {
  const localData = localStorage.getItem('transactions');
  return localData ? JSON.parse(localData) : [];
};

export const saveTransactions = async (data) => {
  localStorage.setItem('transactions', JSON.stringify(data));
  // When backend is ready, replace with API POST/PUT
};