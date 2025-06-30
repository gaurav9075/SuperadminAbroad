const LOCAL_KEY = 'admissionsData';

// Fallback: Get from localStorage
export const getAllAdmissions = async () => {
  const local = localStorage.getItem(LOCAL_KEY);
  return local ? JSON.parse(local) : [];
};

export const createAdmission = async (data) => {
  const all = await getAllAdmissions();
  const newEntry = { ...data, id: Date.now() };
  const updated = [...all, newEntry];
  localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  return newEntry;
};

export const updateAdmission = async (id, data) => {
  const all = await getAllAdmissions();
  const updated = all.map((item) => (item.id === id ? { ...item, ...data } : item));
  localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  return data;
};

export const deleteAdmission = async (id) => {
  const all = await getAllAdmissions();
  const updated = all.filter((item) => item.id !== id);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
};
