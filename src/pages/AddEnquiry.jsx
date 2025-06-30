// src/components/AddEnquiry.jsx
import React, { useState } from "react";
import {
  continents,
  countriesByContinent,
  highPayingCourses,
} from "./ContinentalsCourses";

export default function AddEnquiry() {
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    passoutCourse: "",
    percentage: "",
    status: "",
    passoutYear: "",
    dob: "",
    gender: "",
    continent: "",
    country: "",
    university: "",
    branch: "",
    course: "",
    fathersOccupation: "",
    fathersIncome: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");

    if (!email || !role) {
      alert("Please login first.");
      return;
    }

    const enquiryData = {
      name: formData.name,
      phone_no: formData.phone,
      email: formData.email,
      address: "N/A",
      landmark: "N/A",
      state: "N/A",
      district: "N/A",
      continent: formData.continent,
      country: formData.country,
      course: formData.course,
      enquiry_date: new Date().toISOString().split("T")[0],
      photoUrl: formData.photo ? formData.photo.name : "",
      createdByEmail: email,
      role: role,
      branchCode: formData.branch,
    };

    const body = new FormData();
    body.append("enquiry", JSON.stringify(enquiryData));
    if (formData.photo) {
      body.append("image", formData.photo);
    }

    try {
      const res = await fetch(`http://localhost:8080/createEnquiry?role=${role}&email=${email}`, {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error("Submission failed");

      alert("✅ Enquiry Saved Successfully");

      setFormData({
        name: "",
        phone: "",
        email: "",
        passoutCourse: "",
        percentage: "",
        status: "",
        passoutYear: "",
        dob: "",
        gender: "",
        continent: "",
        country: "",
        university: "",
        branch: "",
        course: "",
        fathersOccupation: "",
        fathersIncome: "",
        photo: null,
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("❌ Failed to save enquiry");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-[100px] mt-[60px] -ml-[350px] font-['Segoe_UI',sans-serif]">
      <h2 className="text-2xl font-semibold mb-5 text-center">Add Enquiry</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2">
        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition" />
        <input name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="Phone No." className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition" />
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition" />

        <select name="passoutCourse" value={formData.passoutCourse} onChange={handleChange} className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition">
          <option>Passout Course</option>
          <option value="B.Tech">B.Tech</option>
          <option value="BBA">BBA</option>
          <option value="BSc">BSc</option>
        </select>

        <input name="percentage" value={formData.percentage} onChange={handleChange} type="text" placeholder="Percentage" className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition" />

        <select name="status" value={formData.status} onChange={handleChange} className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition">
          <option>Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="relative w-[92%]">
          <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-blue-600 z-10">Passout Year</label>
          <input name="passoutYear" value={formData.passoutYear} onChange={handleChange} type="date" className="w-full h-10 mt-4 border border-gray-300 rounded-md p-2" />
        </div>

        <div className="relative w-[92%]">
          <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-blue-600 z-10">Date of Birth</label>
          <input name="dob" value={formData.dob} onChange={handleChange} type="date" className="w-full h-10 mt-4 border border-gray-300 rounded-md p-2" />
        </div>

        <select name="gender" value={formData.gender} onChange={handleChange} className="p-[1px] text-base w-[90%] border border-gray-300 rounded-md h-[43px] mt-5 bg-white transition">
          <option>Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select name="continent" value={formData.continent} onChange={(e) => {
          handleChange(e);
          setSelectedContinent(e.target.value);
          setFormData({ ...formData, country: "" });
        }} className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition">
          <option value="">All Continentals*</option>
          {continents.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        {formData.continent && (
          <select name="country" value={formData.country} onChange={handleChange} className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition">
            <option value="">All Countries*</option>
            {countriesByContinent[formData.continent]?.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        )}

        <select name="university" value={formData.university} onChange={handleChange} className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition">
          <option>All Universities</option>
          <option value="MIT">MIT</option>
          <option value="Harvard">Harvard</option>
        </select>

        <select name="branch" value={formData.branch} onChange={handleChange} className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition">
          <option>All Branches</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <select name="course" value={formData.course} onChange={handleChange} className="p-2 text-base w-[90%] border border-gray-300 rounded-md bg-white transition">
          <option value="">All Courses*</option>
          {highPayingCourses.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>

        <input name="fathersOccupation" value={formData.fathersOccupation} onChange={handleChange} type="text" placeholder="Father's Occupation" className="p-[1px] text-base w-[90%] border border-gray-300 rounded-md h-[43px] mt-5 bg-white transition" />

        <input name="fathersIncome" value={formData.fathersIncome} onChange={handleChange} type="text" placeholder="Father's Annual Income" className="p-[1px] text-base w-[90%] border border-gray-300 rounded-md h-[43px] mt-5 bg-white transition" />

        <div className="relative w-[92%]">
          <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-blue-600 z-10">Upload Photo</label>
          <input name="photo" type="file" onChange={handleChange} className="w-full h-10 mt-4 border border-gray-300 rounded-md p-2 text-sm" />
        </div>

        <p
          className="text-blue-900 font-bold cursor-pointer col-span-4 text-left hover:underline"
          onClick={() => setShowExtraFields(!showExtraFields)}
        >
          {showExtraFields ? "— Less Fields" : "+ Add Fields"}
        </p>

        {showExtraFields && <></>}

        <div className="col-span-4 flex justify-center mt-5">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 text-base rounded-md hover:bg-blue-800 transition">
            💾 Save
          </button>
        </div>
      </form>
    </div>
  );
}
