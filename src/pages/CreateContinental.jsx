import React, { useState } from "react";

const CreateContinental = () => {
  const [stage, setStage] = useState("continental");
  const [formData, setFormData] = useState({
    continental: "",
    country: "",
    university: "",
    branch: "",
    course: "",
  });
  const [allData, setAllData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = () => {
    if (!formData.continental) return;
    setStage("country");
  };

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const updated = { ...formData, [stage]: inputValue.trim() };
    setFormData(updated);
    setInputValue("");

    if (stage === "country") setStage("university");
    else if (stage === "university") setStage("branch");
    else if (stage === "branch") setStage("course");
    else if (stage === "course") {
      setAllData([...allData, { ...updated, course: inputValue.trim() }]);
      setFormData({
        continental: "",
        country: "",
        university: "",
        branch: "",
        course: "",
      });
      setStage("continental");
      setInputValue("");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mt-[100px]">
      <h2 className="text-xl font-bold mb-4">Add Hierarchical Details</h2>

      {/* Input Section */}
      {stage === "continental" && (
        <div className="flex items-center gap-4 mb-6">
          <select
            value={formData.continental}
            onChange={(e) =>
              setFormData({ ...formData, continental: e.target.value })
            }
            className="border px-4 py-2 rounded w-64"
          >
            <option value="">Select Continental</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
          </select>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSelect}
          >
            Select
          </button>
        </div>
      )}

      {(stage === "country" ||
        stage === "university" ||
        stage === "branch" ||
        stage === "course") && (
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder={`Enter ${stage}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border px-4 py-2 rounded w-64"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      )}

      {/* Table Section */}
      <table className="min-w-[1300px] w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Continental</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">University</th>
            <th className="border px-4 py-2">Branch</th>
            <th className="border px-4 py-2">Course</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((entry, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{entry.continental}</td>
              <td className="border px-4 py-2">{entry.country}</td>
              <td className="border px-4 py-2">{entry.university}</td>
              <td className="border px-4 py-2">{entry.branch}</td>
              <td className="border px-4 py-2">{entry.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateContinental;
