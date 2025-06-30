import React, { useState } from "react";
import { createBranch, getBranchCodeByEmail, updateBranch } from "../api/api";

export default function BranchModal({ onClose, onSave, editBranch = null }) {
  const [branchData, setBranchData] = useState(
    editBranch || {
      branchName: "",
      branchEmail: "",
      contact: "",
      branchHeadName: "",
      address: "",
      city: "",
      county: "",
      pincode: "",
      password: "",
      state: "",
      district: "",
      status: "",
      branchCode: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailBlur = async () => {
    if (branchData.branchEmail && !editBranch) {
      try {
        const res = await getBranchCodeByEmail(branchData.branchEmail);
        if (res?.branchCode) {
          setBranchData((prev) => ({ ...prev, branchCode: res.branchCode }));
        } else {
          alert("Branch code not received.");
          console.log("Branch code response:", res);
        }
      } catch (err) {
        alert("Error generating branch code.");
        console.error("Branch Code Error:", err);
      }
    }
  };

  const handleSubmit = async () => {
    const superAdminEmail = sessionStorage.getItem("superAdminEmail") || "";
    let response;

    if (editBranch) {
      response = await updateBranch(editBranch.id, branchData);
    } else {
      response = await createBranch(branchData, superAdminEmail);
    }

    if (response && response.bid) {
      alert(`Branch ${editBranch ? "updated" : "created"} successfully!`);
      onSave(response); // 🔁 send the actual response to update the table
    } else {
      alert(response.message || `Failed to ${editBranch ? "update" : "create"} branch.`);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg mt-[100px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {editBranch ? "Edit Branch" : "Create New Branch"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Branch Name", "branchName"],
            ["Branch Mail", "branchEmail"],
            ["Branch Contact", "contact"],
            ["Branch Head Name", "branchHeadName"],
            ["Branch Address", "address"],
            ["Branch City", "city"],
            ["Branch County", "county"],
            ["Branch Pincode", "pincode"],
            ["Branch Password", "password"],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={name === "password" ? "password" : "text"}
                name={name}
                value={branchData[name]}
                onChange={handleChange}
                onBlur={name === "branchEmail" ? handleEmailBlur : undefined}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}

          {/* Show branch code if available */}
          {branchData.branchCode && (
            <div>
              <label className="block text-sm font-medium mb-1">Branch Code</label>
              <input
                type="text"
                name="branchCode"
                value={branchData.branchCode}
                readOnly
                className="w-full border px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          )}

          {/* Dropdowns */}
          {["state", "district", "status"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <select
                name={field}
                value={branchData[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select {field}</option>
                <option value="Sample">{field} Sample</option>
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editBranch ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
