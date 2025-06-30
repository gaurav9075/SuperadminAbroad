// src/components/EnquiryList.jsx
import React, { useEffect, useState } from "react";
import "./EnquiryList.css";

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    continent: "",
    country: "",
    branch: "",
    course: "",
    status: "",
    year: "",
  });

  // Fetch from backend
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const email = sessionStorage.getItem("email") || "admin@example.com";
        const role = sessionStorage.getItem("role") || "SuperAdmin";

        const response = await fetch(
          `http://localhost:8080/getAllEnquiries?role=${role}&email=${email}`
        );
        const data = await response.json();
        setEnquiries(data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredData = enquiries.filter((item) => {
    return (
      (!filters.name || item.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.continent || item.continent === filters.continent) &&
      (!filters.country || item.country === filters.country) &&
      (!filters.branch || item.branchCode === filters.branch) &&
      (!filters.course || item.course === filters.course) &&
      (!filters.status || item.status === filters.status) &&
      (!filters.year || new Date(item.enquiry_date).getFullYear().toString() === filters.year)
    );
  });

  return (
    <div className="filter-form">
      <input name="name" value={filters.name} onChange={handleFilterChange} placeholder="Search by Name" className="filter-input" />
      <select name="continent" value={filters.continent} onChange={handleFilterChange} className="filter-input">
        <option value="">Select Continent</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
      </select>
      <select name="country" value={filters.country} onChange={handleFilterChange} className="filter-input">
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="France">France</option>
      </select>
      <select name="branch" value={filters.branch} onChange={handleFilterChange} className="filter-input">
        <option value="">Select Branch</option>
        <option value="Pune">Pune</option>
        <option value="Paris">Paris</option>
        <option value="Mumbai">Mumbai</option>
      </select>
      <select name="course" value={filters.course} onChange={handleFilterChange} className="filter-input">
        <option value="">Select Course</option>
        <option value="MBA">MBA</option>
        <option value="MS">MS</option>
        <option value="BBA">BBA</option>
      </select>

      <div className="filter-buttons">
        <input type="text" value={`Total Count: ${filteredData.length}`} className="filter-input" readOnly />
        <select name="status" value={filters.status} onChange={handleFilterChange} className="filter-input">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="in-progress">In Progress</option>
        </select>
        <select name="year" value={filters.year} onChange={handleFilterChange} className="filter-input">
          <option value="">Select Year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <div className="enquiry-results">
        <h3 className="my-3">Enquiry List</h3>
        {filteredData.length === 0 ? (
          <p>No enquiries found.</p>
        ) : (
          <table className="enquiry-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Continent</th>
                <th>Country</th>
                <th>Branch</th>
                <th>Course</th>
                <th>Status</th>
                <th>Enquiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_no}</td>
                  <td>{item.continent}</td>
                  <td>{item.country}</td>
                  <td>{item.branchCode}</td>
                  <td>{item.course}</td>
                  <td>{item.status || "N/A"}</td>
                  <td>{item.enquiry_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
