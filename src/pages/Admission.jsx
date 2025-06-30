import React, { useEffect, useState, useRef } from 'react';
import {
  getAllAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission,
} from '../api/admissionApi';
import AdmissionModal from '../components/AdmissionModal';

export default function Admission() {
  const [admissions, setAdmissions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [email] = useState(sessionStorage.getItem('email'));
  const tableRef = useRef(null);

  const fetchData = async () => {
    const data = await getAllAdmissions();
    setAdmissions(data);
  };

  useEffect(() => {
    fetchData();
    fetch(`http://localhost:8080/superAdmin/permissionForAdmin?email=${email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  }, [email]);

  const handleSave = async () => {
    if (editing.id) {
      await updateAdmission(editing.id, editing);
    } else {
      await createAdmission(editing);
    }
    fetchData();
    setModalVisible(false);
    setEditing(null);
    setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);

  };

  const handleDelete = async (id) => {
    await deleteAdmission(id);
    fetchData();
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Course', 'Country', 'Status'],
      ...admissions.map((a) => [a.name, a.course, a.country, a.status]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'admissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = admissions.filter((a) =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  );

  const total = admissions.length;
  const pending = admissions.filter((a) => a.status === 'Pending').length;
  const approved = admissions.filter((a) => a.status === 'Approved').length;

  return (
    <div className="min-h-screen mt-[100px] px-4 py-8 bg-gray-100 w-350 ">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Header & Actions */}
        <div className="sticky top-0 z-10 bg-white pb-4 mt-5">
          <div className="flex justify-between flex-wrap items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-blue-700">Admission Management</h1>
            <div className="flex gap-2 flex-wrap">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  setEditing({});
                  setModalVisible(true);
                }}
              >
                + Add New Admission
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => alert('Redirect to all applications page')}
              >
                View All Applications
              </button>
              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded"
                onClick={exportToCSV}
              >
                Export to CSV
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded shadow text-center">
              <h2 className="text-lg font-semibold text-blue-700">Total Applications</h2>
              <p className="text-2xl font-bold">{total}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded shadow text-center">
              <h2 className="text-lg font-semibold text-yellow-700">Pending Reviews</h2>
              <p className="text-2xl font-bold">{pending}</p>
            </div>
            <div className="bg-green-50 p-4 rounded shadow text-center">
              <h2 className="text-lg font-semibold text-green-700">Approved Admissions</h2>
              <p className="text-2xl font-bold">{approved}</p>
            </div>
          </div>
        </div>


        {/* Search */}
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full max-w-sm"
        />

        {/* Admission Table */}
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto" ref={tableRef}>
          <table className="w-full table-auto border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone No</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Course</th>
                <th className="border p-2">Country</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
                {/* {(role === 'SuperAdmin' || role === 'Branch') && <th className="border p-2">Actions</th>} */}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td className="border p-2">{a.name}</td>
                  <td className="border p-2">{a.phone}</td>
                  <td className="border p-2">{a.email}</td>
                  <td className="border p-2">{a.course}</td>
                  <td className="border p-2">{a.country}</td>
                  <td className="border p-2">{a.status}</td>
                  {/* {(role === 'SuperAdmin' || role === 'Branch') && ( */}
                    <td className="border p-2 space-x-2">
                      <button className="text-blue-600" onClick={() => { setEditing(a); setModalVisible(true); }}>Edit</button>
                      <button className="text-red-600" onClick={() => handleDelete(a.id)}>Delete</button>
                    </td>
                  {/* )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admission Modal */}
      {modalVisible && (
        <AdmissionModal
          admission={editing}
          onChange={(field, val) => setEditing({ ...editing, [field]: val })}
          onClose={() => {
            setModalVisible(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
