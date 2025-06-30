import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import BranchModal from "../components/BranchModal";
import BranchTable from "../components/BranchTable";
import { getAllBranches, deleteBranch } from "../api/api";

export default function BranchManagement() {
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editBranch, setEditBranch] = useState(null);

  const loadBranches = async () => {
  const data = await getAllBranches();
  //console.log("Fetched branches with IDs:", data); // 🔍 Check this in console
  setBranches(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handleSave = (savedBranch) => {
    const updated = editBranch
      ? branches.map((b) => (b.bid === savedBranch.bid ? savedBranch : b))
      : [...branches, savedBranch];
    setBranches(updated);
    setShowModal(false);
    setEditBranch(null);
  };



  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid branch ID.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        const response = await deleteBranch(id);
        if (response.message === "Deleted" || response.success) {
          setBranches(branches.filter((b) => b.id !== id));
          alert("Branch deleted successfully.");
        } else {
          alert(response.message || "Failed to delete branch.");
          console.error("Delete response:", response);
        }
      } catch (error) {
        alert("Error deleting branch. See console for details.");
        console.error("Delete error:", error);
      }
    }
  };

  const handleEdit = (branch) => {
    setEditBranch(branch);
    setShowModal(true);
  };

  return (
    <div className="p-6 mt-24">
      <button
        onClick={() => {
          setEditBranch(null);
          setShowModal(true);
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow mb-4 flex items-center gap-2 hover:bg-blue-700"
      >
        <FaPlus />
        Create New Branch
      </button>

      <BranchTable
        branches={branches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <BranchModal
          onClose={() => {
            setShowModal(false);
            setEditBranch(null);
          }}
          onSave={handleSave}
          editBranch={editBranch}
        />
      )}
    </div>
  );
}
