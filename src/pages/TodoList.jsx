import React, { useState } from "react";
import "./TodoList.css";

export default function TodoList() {
  const [showCustomDates, setShowCustomDates] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleTimeFrameChange = (e) => {
    setShowCustomDates(e.target.value === "custom");
  };

  return (
    <div className="enquiry-container">
      <div className="enquiry-form">
        {/* Status */}
        <div className="select-group">
          <label className="floating-label">Status</label>
          <select className="date-input">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>

        {/* Priority */}
        <div className="select-group">
          <label className="floating-label">Priority</label>
          <select className="date-input">
            <option value="">All Priority</option>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="very-urgent">Very Urgent</option>
          </select>
        </div>

        {/* Time Frame */}
        <div className="select-group">
          <label className="floating-label">Time Frame</label>
          <select className="date-input" onChange={handleTimeFrameChange}>
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="custom">Custom Dates</option>
          </select>
        </div>

        {showCustomDates && (
          <>
            <div className="select-group">
              <label className="floating-label">Start Date</label>
              <input type="date" className="date-input" />
            </div>
            <div className="select-group">
              <label className="floating-label">End Date</label>
              <input type="date" className="date-input" />
            </div>
          </>
        )}

        <div className="button-group">
          <button className="btn pdf" onClick={() => setShowPopup(true)}>
            CREATE TASK
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Create Task</h3>
            <div className="select-group">
              <label className="floating-label">Task</label>
              <input type="text" placeholder=" " className="date-input" />
            </div>
            <div className="select-group">
              <label className="floating-label">Remark</label>
              <input type="text" placeholder=" " className="date-input" />
            </div>
            <div className="select-group">
              <label className="floating-label">Date</label>
              <input type="date" placeholder=" " className="date-input" />
            </div>
            <div className="select-group">
              <label className="floating-label">Priority</label>
              <select className="date-input">
                <option value="">Select Priority</option>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="very-urgent">Very Urgent</option>
              </select>
            </div>
            <div className="button-group">
              <button className="btn pdf" onClick={() => setShowPopup(false)}>
                Close
              </button>
              <button className="btn pdf" onClick={() => setShowPopup(false)}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
