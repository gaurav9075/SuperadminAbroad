// === components/AdmissionModal.jsx ===
import React, { useState } from 'react';

export default function AdmissionModal({ admission, onChange, onClose, onSave }) {
  const [error, setError] = useState('');

  const validateAndSave = () => {
    if (!admission.name || !admission.email || !admission.phone || !admission.course || !admission.country || !admission.status) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{admission.id ? 'Edit' : 'Add'} Admission</h2>

        {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}

        <input type="text" placeholder="Name" value={admission.name || ''} onChange={(e) => onChange('name', e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input type="email" placeholder="Email" value={admission.email || ''} onChange={(e) => onChange('email', e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input type="text" placeholder="Phone Number" value={admission.phone || ''} onChange={(e) => onChange('phone', e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input type="text" placeholder="Course" value={admission.course || ''} onChange={(e) => onChange('course', e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input type="text" placeholder="Country" value={admission.country || ''} onChange={(e) => onChange('country', e.target.value)} className="w-full p-2 border rounded mb-2" />
        <select value={admission.status || ''} onChange={(e) => onChange('status', e.target.value)} className="w-full p-2 border rounded mb-4">
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={validateAndSave} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
}