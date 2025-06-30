import React, { useState } from "react";
import { FaPlus, FaList } from "react-icons/fa";

export default function PartnerDetails({ sidebarExpanded }) {
  const [showPopup, setShowPopup] = useState(false);
  const [partners, setPartners] = useState([]);
  const [showPartners, setShowPartners] = useState(false);

  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    county: "",
    pincode: "",
    password: "",
    state: "",
    district: "",
    status: "",
  });

  const handleChange = (e) => {
    setPartnerData({ ...partnerData, [e.target.name]: e.target.value });
  };

  const handleCreatePartner = () => {
    setPartners([...partners, partnerData]);
    setPartnerData({
      name: "",
      email: "",
      contact: "",
      address: "",
      city: "",
      county: "",
      pincode: "",
      password: "",
      state: "",
      district: "",
      status: "",
    });
    setShowPopup(false);
  };

  return (
    <>
      {/* Top Submenu */}
      <div
        className={`fixed top-[70px] ${
          sidebarExpanded ? "left-64" : "left-16"
        } right-0 h-16 bg-blue-600 text-white flex items-center px-4 z-40 transition-all duration-300`}
      >
        <div className="flex flex-row space-x-6 overflow-x-auto w-full">
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <FaPlus />
            <span>Create Partner</span>
          </button>
          <button
            onClick={() => setShowPartners(!showPartners)}
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <FaList />
            <span>{showPartners ? "Hide Partners" : "Show Partners"}</span>
          </button>
        </div>
      </div>

      {/* Partner Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4 text-center">Create Partner</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Partner Name", "name"],
                ["Partner Email", "email"],
                ["Partner Contact", "contact"],
                ["Partner Address", "address"],
                ["Partner City", "city"],
                ["Partner County", "county"],
                ["Partner Pincode", "pincode"],
                ["Partner Password", "password"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    type={name === "password" ? "password" : "text"}
                    name={name}
                    value={partnerData[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              {["state", "district", "status"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                  <select
                    name={field}
                    value={partnerData[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select {field}</option>
                    <option value="Sample">{field} Sample</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleCreatePartner}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Partner Table */}
      {showPartners && (
        <div className="mt-32 p-4">
          <h3 className="text-lg font-bold mb-4">Created Partners</h3>
          {partners.length === 0 ? (
            <p className="text-gray-600">No partners created yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">#</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Email</th>
                    <th className="border px-2 py-1">Contact</th>
                    <th className="border px-2 py-1">Password</th>
                    <th className="border px-2 py-1">Address</th>
                    <th className="border px-2 py-1">City</th>
                    <th className="border px-2 py-1">County</th>
                    <th className="border px-2 py-1">Pincode</th>
                    <th className="border px-2 py-1">State</th>
                    <th className="border px-2 py-1">District</th>
                    <th className="border px-2 py-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border px-2 py-1">{i + 1}</td>
                      <td className="border px-2 py-1">{p.name}</td>
                      <td className="border px-2 py-1">{p.email}</td>
                      <td className="border px-2 py-1">{p.contact}</td>
                      <td className="border px-2 py-1">{p.password}</td>
                      <td className="border px-2 py-1">{p.address}</td>
                      <td className="border px-2 py-1">{p.city}</td>
                      <td className="border px-2 py-1">{p.county}</td>
                      <td className="border px-2 py-1">{p.pincode}</td>
                      <td className="border px-2 py-1">{p.state}</td>
                      <td className="border px-2 py-1">{p.district}</td>
                      <td className="border px-2 py-1">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
