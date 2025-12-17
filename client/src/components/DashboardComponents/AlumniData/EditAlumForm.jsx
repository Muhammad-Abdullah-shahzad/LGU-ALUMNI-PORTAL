import React, { useState, useEffect } from "react";

// This component uses the CSS classes defined in your existing CSS file 
// (e.g., survey-modal-overlay, survey-modal-content) for styling.

export default function EditAlumni({ alumniData, onClose, onUpdate, isLoading }) {
  // Use state to hold form data, initialized with props
  const [formData, setFormData] = useState({
    firstName: alumniData.firstName || "",
    lastName: alumniData.lastName || "",
    rollNo: alumniData.rollNo || "",
    batch: alumniData.batch || "",
    degree: alumniData.degree || "",
    employmentStatus: alumniData.employmentStatus || "unemployed",
    companyName: alumniData.companyName || "",
    jobTitle: alumniData.jobTitle || "",
    graduationYear: alumniData.graduationYear || "",
    email: alumniData.email || "",
  });

  // Use a second state to store the original data for comparison
  const [originalData] = useState(alumniData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Build the payload containing only the changed fields
    const updatedFields = {};
    let changesMade = false;

    // Compare current form data against original data (excluding _id)
    Object.keys(formData).forEach(key => {
      if (formData[key] !== originalData[key]) {
        updatedFields[key] = formData[key];
        changesMade = true;
      }
    });

    if (!changesMade) {
      alert("No fields were changed.");
      onClose();
      return;
    }

    // Call the parent update handler with the alumni ID and the changed fields
    onUpdate(alumniData._id, updatedFields);
  };

  return (
    // ⚠️ Check your CSS for .survey-modal-overlay and .survey-modal-content
    <div className="survey-modal-overlay">
      <div className="survey-modal-content glass-card shadow-lg edit-alumni-modal">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0">Edit Alumni: {alumniData.firstName} {alumniData.lastName}</h4>
          <button className="btn-close" onClick={onClose} disabled={isLoading}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Roll No</label>
              <input type="text" className="form-control" name="rollNo" value={formData.rollNo} onChange={handleChange} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label">Batch</label>
              <input type="text" className="form-control" name="batch" value={formData.batch} onChange={handleChange} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label">Degree</label>
              <input type="text" className="form-control" name="degree" value={formData.degree} onChange={handleChange} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label">Graduation Year</label>
              <input type="number" className="form-control" name="graduationYear" value={formData.graduationYear} onChange={handleChange} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Employment Status</label>
              <select className="form-select" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>

              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} disabled={formData.employmentStatus !== 'employed'} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Job Title</label>
              <input type="text" className="form-control" name="jobTitle" value={formData.jobTitle} onChange={handleChange} disabled={formData.employmentStatus !== 'employed'} />
            </div>
          </div>

          <div className="mt-4 pt-3 border-top text-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose} disabled={isLoading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Updating...
                </>
              ) : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}