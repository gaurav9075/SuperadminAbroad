import React from 'react';

const TransactionTable = ({ transactions, onEdit, onDelete }) => (
  <table className="w-full table-auto border">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border">Title</th>
        <th className="p-2 border">Amount</th>
        <th className="p-2 border">Type</th>
        <th className="p-2 border">Category</th>
        <th className="p-2 border">Date</th>
        <th className="p-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(tx => (
        <tr key={tx.id}>
          <td className="p-2 border">{tx.title}</td>
          <td className="p-2 border">₹{tx.amount}</td>
          <td className="p-2 border">{tx.type}</td>
          <td className="p-2 border">{tx.category}</td>
          <td className="p-2 border">{new Date(tx.date).toLocaleDateString()}</td>
          <td className="p-2 border">
            <button onClick={() => onEdit(tx)} className="text-blue-600 mr-2">Edit</button>
            <button onClick={() => onDelete(tx.id)} className="text-red-600">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionTable;