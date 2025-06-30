// import React, { useState } from "react";

// export default function BranchAdd() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [Branch, setBranch] = useState([]);
//   const [showBranch, setShowBranch] = useState(false);
//   const [BranchName, setBranchName] = useState("");

//   const handleCreateBranch = () => {
//     if (BranchName.trim() === "") return;
//     setBranch([...Branch, BranchName]);
//     setBranchName("");
//     setShowPopup(false);
//   };

//   return (
//     <div className="mt-20 ml-6 max-w-7xl">
//       <div className="flex gap-4 mb-4">
//         <button
//           className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
//           onClick={() => setShowPopup(true)}
//         >
//           ADD Branch
//         </button>
//         <button
//           className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
//           onClick={() => setShowBranch(!showBranch)}
//         >
//           {showBranch ? "HIDE Branch" : "SHOW Branch"}
//         </button>
//       </div>

//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//             <h3 className="text-xl font-bold mb-4 text-center">Add Branch</h3>
//             <div>
//               <label className="block text-sm font-medium mb-1">Branch Name</label>
//               <input
//                 type="text"
//                 value={BranchName}
//                 onChange={(e) => setBranchName(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter Branch name"
//               />
//               <div className="flex justify-between mt-4">
//                 <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => setShowPopup(false)}>
//                   Close
//                 </button>
//                 <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onClick={handleCreateBranch}>
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showBranch && (
//         <div className="mt-6 bg-white p-4 rounded-lg shadow-md overflow-x-auto w-full">
//           <h3 className="text-lg font-semibold mb-4">Saved Branch</h3>
//           {Branch.length === 0 ? (
//             <p className="text-gray-600">No Branch added yet.</p>
//           ) : (
//             <table className="min-w-full border border-gray-300 text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-2 text-left">#</th>
//                   <th className="border px-4 py-2 text-left">Branch Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Branch.map((Branch, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="border px-4 py-2">{index + 1}</td>
//                     <td className="border px-4 py-2">{Branch}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
