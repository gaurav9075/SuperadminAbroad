import React, { useEffect, useState } from 'react';
import { getTransactions, saveTransactions } from '../api/transactionService';
import TransactionTable from '../components/IncomeTable';
import ModalForm from '../components/ModalForm';
import { ChartCard } from '../components/ChartCard';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Food', 'Rent', 'Utilities', 'Salary', 'Investment'];

const IncomeExpense = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', amount: '', category: '', type: 'Income', date: new Date() });

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  const handleSave = async () => {
    let updated = editing
      ? transactions.map(t => (t.id === editing.id ? { ...formData, id: editing.id } : t))
      : [...transactions, { ...formData, id: uuidv4() }];

    await saveTransactions(updated);
    setTransactions(updated);
    setShowModal(false);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    const updated = transactions.filter(t => t.id !== id);
    await saveTransactions(updated);
    setTransactions(updated);
  };

  return (
    <div className=" bg-gray-100 mt-[80px] w-330">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Income & Expense</h1>
          <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ChartCard type="bar" transactions={transactions} />
          <ChartCard type="pie" transactions={transactions.filter(t => t.type === 'Expense')} />
        </div>

        <TransactionTable
          transactions={transactions}
          onEdit={(t) => {
            setEditing(t);
            setFormData(t);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />

        {showModal && (
          <ModalForm
            isEdit={!!editing}
            formData={formData}
            onChange={(key, val) => setFormData(prev => ({ ...prev, [key]: val }))}
            onSave={handleSave}
            onClose={() => { setShowModal(false); setEditing(null); }}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default IncomeExpense;