import React from 'react';
import DatePicker from 'react-datepicker';

const ModalForm = ({ isEdit, formData, onChange, onSave, onClose, categories }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} Transaction</h2>
      <input type="text" value={formData.title} onChange={(e) => onChange('title', e.target.value)} className="border w-full p-2 rounded mb-2" placeholder="Title" />
      <input type="number" value={formData.amount} onChange={(e) => onChange('amount', e.target.value)} className="border w-full p-2 rounded mb-2" placeholder="Amount" />
      <select value={formData.type} onChange={(e) => onChange('type', e.target.value)} className="border w-full p-2 rounded mb-2">
        <option>Income</option>
        <option>Expense</option>
      </select>
      <select value={formData.category} onChange={(e) => onChange('category', e.target.value)} className="border w-full p-2 rounded mb-2">
        <option value="">Select Category</option>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>
      <DatePicker selected={new Date(formData.date)} onChange={(date) => onChange('date', date)} className="w-full border p-2 rounded mb-2" />
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  </div>
);

export default ModalForm;