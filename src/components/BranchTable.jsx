import React, { useState } from "react";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";

export default function BranchTable({ branches, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const exportToCSV = () => {
    const csvRows = [
      [
        "Name", "Email", "Contact", "Head", "Address", "City", "County",
        "Pincode", "State", "District", "Status", "Branch Code"
      ],
      ...branches.map(b => [
        b.branchName, b.branchEmail, b.contact, b.branchHeadName, b.address,
        b.city, b.county, b.pincode, b.state, b.district, b.status, b.branchCode,
      ]),
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "branches.csv";
    a.click();
  };

  const totalPages = Math.ceil(branches.length / itemsPerPage);
  const currentData = branches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (branches.length === 0)
    return <p className="text-gray-600">No branches created yet.</p>;

  return (
    <div>
      <div className="flex justify-end mb-2 w-[1300px] mx-auto">
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-1 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <FaDownload />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {[
                "#", "Name", "Email", "Contact", "Head", "Address", "City", "County",
                "Pincode", "State", "District", "Status", "Branch Code", "Actions",
              ].map((h) => (
                <th key={h} className="border px-2 py-1">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((b, i) => (
              <tr key={b.bid || i} className="hover:bg-gray-50 text-center">
                <td className="border px-2 py-1">
                  {(currentPage - 1) * itemsPerPage + i + 1}
                </td>
                <td className="border px-2 py-1">{b.branchName}</td>
                <td className="border px-2 py-1">{b.branchEmail}</td>
                <td className="border px-2 py-1">{b.contact}</td>
                <td className="border px-2 py-1">{b.branchHeadName}</td>
                <td className="border px-2 py-1">{b.address}</td>
                <td className="border px-2 py-1">{b.city}</td>
                <td className="border px-2 py-1">{b.county}</td>
                <td className="border px-2 py-1">{b.pincode}</td>
                <td className="border px-2 py-1">{b.state}</td>
                <td className="border px-2 py-1">{b.district}</td>
                <td className="border px-2 py-1">{b.status}</td>
                <td className="border px-2 py-1">{b.branchCode}</td>
                <td className="border px-2 py-1 flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(b)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      if (b.bid) {
                        onDelete(b.bid);
                      } else {
                        alert("Branch ID is missing. Cannot delete.");
                        console.error("Missing branch ID:", b);
                      }
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
