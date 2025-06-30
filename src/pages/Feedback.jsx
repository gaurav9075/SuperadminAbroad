import React, { useState } from "react";
import "./Feedback.css";

export default function Feedback() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Search by Name"
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={() => setShowPopup(true)}>
            CREATE Feedback
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3 className="popup-title">Create Feedback</h3>

            <div className="popup-group">
              <label className="popup-label">Name</label>
              <input type="text" placeholder=" " className="popup-input" />
            </div>

            <div className="popup-group">
              <label className="popup-label">Email</label>
              <input type="text" placeholder=" " className="popup-input" />
            </div>

            <div className="popup-group">
              <label className="popup-label">Department</label>
              <select className="popup-input">
                <option value="">Select Department</option>
                
              </select>
            </div>

            <div className="popup-group">
              <label className="popup-label">Remark</label>
              <input type="text" placeholder=" " className="popup-input" />
            </div>

            <div className="popup-group">
              <label CallsName="popup-label">Upload File</label>
              <input type="file" placeholder=" " className="popup-input" />
            </div>


            

            <div className="popup-actions">
              <button className="btn-secondary" onClick={() => setShowPopup(false)}>
                Close
              </button>
              <button className="btn-primary" onClick={() => setShowPopup(false)}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
