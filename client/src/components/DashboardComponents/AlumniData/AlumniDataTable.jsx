import React, { useState } from "react";
import "./alumniDataTable.css";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";

// =========================================================
// 1. COMPONENT TO VIEW A SINGLE GRADUATE EXIT SURVEY (EXISTING)
// =========================================================
const ViewSurveyDetails = ({ surveyData, onClose }) => {
  if (!surveyData) return null;

  // Destructure top-level fields
  const { 
    department, 
    degree, 
    fullName, 
    email, 
    phone, 
    participation, 
    questions = [],
    alumniId 
  } = surveyData;

  // Use the populated alumni details if available (alumniId is an object here)
  const alumniEmail = alumniId?.email || email;
  const alumniName = alumniId?.fullName || fullName;
  
  return (
    <div className="survey-modal-overlay">
      <div className="survey-modal-content glass-card shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Graduate Exit Survey Details 🎓</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        
        <div className="survey-data-display">
          <h5>Alumni Information (from Survey)</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Name:</strong> {alumniName}</div>
            <div className="col-md-6"><strong>Email:</strong> {alumniEmail}</div>
            <div className="col-md-6"><strong>Department:</strong> {department}</div>
            <div className="col-md-6"><strong>Degree:</strong> {degree}</div>
            <div className="col-md-6"><strong>Phone:</strong> {phone}</div>
            <div className="col-md-6"><strong>Participation:</strong> {participation}</div>
            <div className="col-md-12"><strong>Submitted:</strong> {new Date(surveyData.submittedAt).toLocaleDateString()}</div>
          </div>
          
          <h5>PLO Assessment (Questions)</h5>
          {questions.length > 0 ? (
            <div className="list-group">
              {questions.map((q, index) => (
                <div key={index} className="list-group-item d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{q.key.toUpperCase()}:</strong> {q.question}
                  </div>
                  <span className="badge bg-primary rounded-pill ms-3 p-2">{q.answer}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No PLO assessment questions found.</p>
          )}

        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};


// =========================================================
// 2. COMPONENT TO VIEW EMPLOYER FEEDBACK DETAILS (EXISTING)
// =========================================================
const ViewEmployerFeedbackDetails = ({ feedbackData, onClose }) => {
  if (!feedbackData) return null;

  // Destructure for easy access, including nested objects
  const {
    companyName, employerName, designation, email, phone,
    interneeName, interneeDiscipline, totalInterneeCount, departmentInternCount,
    departmentCounts = {}, ploRatings = {}, comments, submittedAt
  } = feedbackData;

  // Key mappings for displaying Department Counts and PLO Ratings clearly
  const departmentKeys = {
    ai: "AI", devDesign: "Development & Design", marketing: "Digital Marketing",
    graphics: "Graphics Designing", analytics: "Data Analytics", cyber: "Cyber Security",
    technical: "Technical", it: "IT", rnd: "R&D", other: "Other"
  };

  const ploKeys = {
    plo3_problemSolving: "Problem formulation & solving (PLO-3)",
    plo2_dataAnalysis: "Data collection & analysis (PLO-2)",
    plo1_theoryToPractice: "Theory to practice (PLO-1)",
    plo4_judgement: "Judgment & decision-making (PLO-4)",
    plo5_technicalSkills: "Technical / IT Skills (PLO-5)",
    plo6_teamwork: "Teamwork (PLO-6)",
    plo7_communication: "Communication skills (PLO-7)",
    plo8_societalAwareness: "Societal & sustainability awareness (PLO-8)",
    plo9_ethics: "Workplace ethics (PLO-9)",
    plo10_independentThinking: "Independent thinking (PLO-10)",
    plo10_outOfBox: "Out-of-box thinking (PLO-10)"
  };

  return (
    <div className="survey-modal-overlay">
      <div className="survey-modal-content glass-card shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Employer Feedback Details 💼</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="survey-data-display">
          
          {/* Section 1: Internee & Submission Info */}
          <h5 className="mt-3">Internee & Submission Details</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Internee Name:</strong> {interneeName}</div>
            <div className="col-md-6"><strong>Discipline:</strong> {interneeDiscipline}</div>
            <div className="col-md-6"><strong>Total LGU Interns:</strong> {totalInterneeCount}</div>
            <div className="col-md-6"><strong>Dept Intern Count:</strong> {departmentInternCount}</div>
            <div className="col-md-12"><strong>Submitted:</strong> {new Date(submittedAt).toLocaleDateString()}</div>
          </div>
          
          {/* Section 2: Company & Employer Info */}
          <h5 className="mt-3">Company & Employer Information</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Company Name:</strong> {companyName}</div>
            <div className="col-md-6"><strong>Employer Name:</strong> {employerName}</div>
            <div className="col-md-6"><strong>Designation:</strong> {designation}</div>
            <div className="col-md-6"><strong>Email:</strong> {email}</div>
            <div className="col-md-6"><strong>Contact:</strong> {phone}</div>
          </div>

          {/* Section 3: PLO Assessment */}
          <h5 className="mt-3">Performance Evaluation (PLOs)</h5>
          {Object.keys(ploRatings).length > 0 ? (
            <div className="list-group mb-4">
              {Object.entries(ploKeys).map(([key, label]) => {
                if(ploRatings[key]) {
                  return (
                    <div key={key} className="list-group-item d-flex justify-content-between align-items-start">
                      <div>
                        <strong>{label}</strong>
                      </div>
                      {/* Rating options are Excellent, Very Good, Good, Fair, Poor */}
                      <span className="badge bg-primary rounded-pill ms-3 p-2">{ploRatings[key]}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p className="text-muted">No PLO ratings found.</p>
          )}

          {/* Section 4: Department Breakdown */}
          <h5 className="mt-3">Department Breakdown (Intern Count)</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            {Object.entries(departmentKeys).map(([key, label]) => {
              // Only display departments with a count greater than 0
              if (departmentCounts[key] && departmentCounts[key] > 0) {
                return (
                  <div key={key} className="col-md-4">
                    <strong>{label}:</strong> {departmentCounts[key]}
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          {/* Section 5: Comments */}
          <h5 className="mt-3">General Comments</h5>
          <p className="p-2 bg-light rounded text-break">{comments || 'No comments provided.'}</p>

        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// 3. NEW COMPONENT TO VIEW ANNEX 1D SURVEY DETAILS (MODIFIED)
// =========================================================

// Questions extracted from alumniSurvey.jsx
const SELF_ASSESSMENT_LABELS = [
    { id: 1, text: "Ability to design a system component or process (PEO1)" },
    { id: 2, text: "Adaptation to modern technology or tools (PEO1)" },
    { id: 3, text: "Intellectual and technical knowledge of Software Engineering (PEO1)" },
    { id: 4, text: "General professional responsibility (PEO2)" },
    { id: 5, text: "Fulfilling societal/ethical norms (PEO2)" },
    { id: 6, text: "Awareness of sustainability in digital and engineering practices (PEO2)" },
    { id: 7, text: "Computing Core Knowledge (PEO3)" },
    { id: 8, text: "Adaption to new skills (PEO3)" },
    { id: 9, text: "Ability to work effectively in teams (PEO3)" },
    { id: 10, text: "Oral communication (PEO4)" },
    { id: 11, text: "Report writing skills (PEO4)" },
    { id: 12, text: "Ability to conduct research (PEO4)" },
];

const DEPARTMENT_STANDING_LABELS = [
    { id: 1, text: "Infrastructure" },
    { id: 2, text: "Faculty" },
    { id: 3, text: "Repute at the National level" },
    { id: 4, text: "Repute at international level" }
];

// Utility function to get displayable data from the numbered key-value pairs
const formatAssessmentData = (assessment, type) => {
  if (!assessment || Object.keys(assessment).length === 0) return [];
  
  // Determine the correct labels array based on type
  const labelsMap = (type === 'self' ? SELF_ASSESSMENT_LABELS : DEPARTMENT_STANDING_LABELS)
      .reduce((map, item) => {
          map[item.id] = item.text;
          return map;
      }, {}); // Map: {1: "Question Text", 2: "Question Text", ...}

  return Object.entries(assessment)
      .map(([key, value]) => {
          const id = parseInt(key); // The backend data uses 1, 2, 3 as string keys
          const question = labelsMap[id] || `Question ${key} (Label Not Found)`;
          return { key: id, question, answer: value };
      })
      .sort((a, b) => a.key - b.key) // Sort by ID to maintain order
      .filter(item => item.answer); // Only keep answered items
};


const ViewAnnex1DDetails = ({ surveyData, onClose }) => {
  if (!surveyData || !surveyData.surveys || surveyData.surveys.length === 0) return null;

  // Access the first item in the 'surveys' array
  const survey = surveyData.surveys[0];
  
  // Destructure for easy access
  const {
    alumniId, program, department, selfAssessment, generalComments, 
    departmentStanding, careerOpportunities, name, organizationName, 
    position, graduationYear, email, telephone, submittedAt
  } = survey;

  // Format the nested assessment objects for display using the correct labels
  const formattedSelfAssessment = formatAssessmentData(selfAssessment, 'self');
  const formattedDepartmentStanding = formatAssessmentData(departmentStanding, 'department');

  // Use the nested alumniId data if available, otherwise use top-level fields
  const alumniEmail = alumniId?.email || email;
  const alumniDepartment = alumniId?.department || department;
  
  return (
    <div className="survey-modal-overlay">
      <div className="survey-modal-content glass-card shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Alumni Survey (Annex 1D) Details 📄</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="survey-data-display">
          
          {/* Section 1: Personal & Employment Info */}
          <h5 className="mt-3">Personal & Employment Information</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Name:</strong> {name}</div>
            <div className="col-md-6"><strong>Email:</strong> {email}</div>
            <div className="col-md-6"><strong>Telephone:</strong> {telephone}</div>
            <div className="col-md-6"><strong>Organization:</strong> {organizationName}</div>
            <div className="col-md-6"><strong>Position:</strong> {position}</div>
            <div className="col-md-6"><strong>Graduation Year:</strong> {graduationYear}</div>
            <div className="col-md-12"><strong>Submitted:</strong> {new Date(submittedAt).toLocaleDateString()}</div>
          </div>

          {/* Section 2: Academic Program Info */}
          <h5 className="mt-3">Academic Program Information</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Program:</strong> {program}</div>
            <div className="col-md-6"><strong>Department:</strong> {department}</div>
            <div className="col-md-6"><strong>Alumni ID Email:</strong> {alumniEmail}</div>
            <div className="col-md-6"><strong>Alumni ID Dept:</strong> {alumniDepartment}</div>
          </div>

          {/* Section 3: Self Assessment */}
          <h5 className="mt-3">Self Assessment (PEO Alignment)</h5>
          {formattedSelfAssessment.length > 0 ? (
            <div className="list-group mb-4">
              {formattedSelfAssessment.map((q) => (
                <div key={q.key} className="list-group-item d-flex justify-content-between align-items-start">
                  <div>
                    <strong>Q{q.key}:</strong> {q.question}
                  </div>
                  <span className="badge bg-success rounded-pill ms-3 p-2">{q.answer}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No Self Assessment data found.</p>
          )}

          {/* Section 4: Department Standing */}
          <h5 className="mt-3">Department Standing Evaluation</h5>
          {formattedDepartmentStanding.length > 0 ? (
            <div className="list-group mb-4">
              {formattedDepartmentStanding.map((q) => (
                <div key={q.key} className="list-group-item d-flex justify-content-between align-items-start">
                  <div>
                    <strong>Q{q.key}:</strong> {q.question}
                  </div>
                  <span className="badge bg-info rounded-pill ms-3 p-2">{q.answer}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No Department Standing data found.</p>
          )}

          {/* Section 5: Comments */}
          <h5 className="mt-3">General Comments</h5>
          <p className="p-2 bg-light rounded text-break">{generalComments || 'No general comments provided.'}</p>
          
          <h5 className="mt-3">Career Opportunities Comments</h5>
          <p className="p-2 bg-light rounded text-break">{careerOpportunities || 'No career opportunities comments provided.'}</p>

        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};


// =========================================================
// MAIN WRAPPER COMPONENT
// =========================================================
export default function AlumniDataWrapper() {
  const Base_URL = import.meta.env.VITE_API_URL;
  
  // 1. Fetch Alumni Data
  const { data: alumniData, loading: alumniLoading } = useFetch(`${Base_URL}/user/alumni`);
  
  // 2. Fetch Graduate Exit Survey Details
  const { data: surveyDetails, loading: surveyLoading } = useFetch(`${Base_URL}/survey/graduateExitSurvey`);
  
  // 3. Fetch Employer Feedback Data
  const { data: employerFeedbackData, loading: feedbackLoading } = useFetch(`${Base_URL}/survey/employer-feedback`);
  
  // 4. Fetch Annex 1D Survey Details
  const { data: annex1dData, loading: annex1dLoading } = useFetch(`${Base_URL}/survey/annex1D`);
  
  if (employerFeedbackData) {
    console.log("--- Employer Feedback Data Received ---");
    console.log(employerFeedbackData);
    console.log("-------------------------------------");
  }

  // LOGGING FOR ANNEX 1D
  if (annex1dData) {
      console.log("--- Annex 1D Data Received ---");
      console.log(annex1dData);
      console.log("------------------------------");
  }

  
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // State for Graduate Exit Survey Modal
  const [selectedSurvey, setSelectedSurvey] = useState(null); 
  
  // State for Employer Feedback Modal
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  
  // State for Annex 1D Survey Modal (Integrated)
  const [selectedAnnex1D, setSelectedAnnex1D] = useState(null); 

  

  const users = alumniData?.users || [];

  // --- Filtering and State Logic (Kept for table functionality) ---
  const degrees = [...new Set(users.map((u) => u.degree))];
  const batches = [...new Set(users.map((u) => u.batch))];
  const companies = [...new Set(users.map((u) => u.companyName).filter(Boolean))];
  const years = [...new Set(users.map((u) => u.graduationYear))];

  const handleDownloadCSV = () => {
    const listToDownload = filtered.length > 0 ? filtered : users;

    if (!listToDownload || listToDownload.length === 0) {
      alert("No alumni data available to download.");
      return;
    }

    // CSV Header
    const headers = [
      "Name", "Roll No", "Batch", "Degree", "Status", "Company", "Job Title", "Graduation Year"
    ];

    // Convert Alumni Array to CSV Rows
    const rows = listToDownload.map((a) => [
      `${a.firstName || ""} ${a.lastName || ""}`, a.rollNo || "", a.batch || "",
      a.degree || "", a.employmentStatus || "", a.companyName || "",
      a.jobTitle || "", a.graduationYear || ""
    ]);

    // Build CSV String... (omitted for brevity)
    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value?.toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "alumni_list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewSurvey = (alumni) => {
    const surveys = surveyDetails?.data || [];
    const alumniIdToMatch = alumni._id; 
    const foundSurvey = surveys.find(survey => 
        (survey.alumniId && survey.alumniId._id === alumniIdToMatch) || (survey.alumniId === alumniIdToMatch)
    );
    
    if (foundSurvey) {
      setSelectedSurvey(foundSurvey);
    } else {
      alert(`No graduate exit survey found for ${alumni.firstName} ${alumni.lastName}.`);
      setSelectedSurvey(null);
    }
  };

  const handleCloseSurvey = () => {
    setSelectedSurvey(null);
  };
  
  // Handler for Employer Feedback
  const handleViewEmployerFeedback = (alumni) => {
    const feedbackList = employerFeedbackData?.data || [];
    const alumniIdToMatch = alumni._id;
    
    const foundFeedback = feedbackList.find(feedback => 
        (feedback.alumniId && feedback.alumniId._id === alumniIdToMatch) || (feedback.alumniId === alumniIdToMatch)
    );

    if (foundFeedback) {
        setSelectedFeedback(foundFeedback);
    } else {
        alert(`No Employer Feedback found for ${alumni.firstName} ${alumni.lastName}.`);
        setSelectedFeedback(null);
    }
  };

  const handleCloseFeedback = () => {
      setSelectedFeedback(null);
  };
  
  // Handler for Annex 1D Survey (Integrated)
  const handleViewAnnex1D = (alumni) => {
    // Access the surveys array from the fetched data
    const annex1dList = annex1dData?.surveys || []; 
    const alumniIdToMatch = alumni._id;
      
    const foundSurvey = annex1dList.find(survey => 
        (survey.alumniId && survey.alumniId._id === alumniIdToMatch) || (survey.alumniId === alumniIdToMatch)
    );

    if (foundSurvey) {
        // Wrap it back in the 'surveys' structure as expected by the modal
        setSelectedAnnex1D({ surveys: [foundSurvey] }); 
    } else {
        alert(`No Annex 1D Survey found for ${alumni.firstName} ${alumni.lastName}.`);
        setSelectedAnnex1D(null);
    }
  };

  const handleCloseAnnex1D = () => {
      setSelectedAnnex1D(null);
  };
  

  const [filters, setFilters] = useState({
    degree: "", batch: "", status: "", year: "", company: "",
  });


  const filtered = users.filter((alumni) => {
    const matchesSearch =
      (alumni.firstName + " " + alumni.lastName).toLowerCase().includes(search.toLowerCase()) ||
      `${alumni.batch}/${alumni.degree}/${alumni.rollNo}`.toLowerCase().includes(search.toLowerCase());

    const matchesDegree = filters.degree ? alumni.degree === filters.degree : true;
    const matchesBatch = filters.batch ? alumni.batch === filters.batch : true;
    const matchesStatus = filters.status ? alumni.employmentStatus === filters.status : true;
    const matchesYear = filters.year ? alumni.graduationYear == filters.year : true;
    const matchesCompany = filters.company ? alumni.companyName === filters.company : true;

    return (
      matchesSearch && matchesDegree && matchesBatch && matchesStatus && matchesYear && matchesCompany
    );
  });
  // --- End Filtering Logic ---

// Combine loading states
  if (alumniLoading || surveyLoading || feedbackLoading || annex1dLoading) return <Loader />;

  return (
    <div className="container-fluid alumni-wrapper">
      
      {/* Graduate Exit Survey Modal */}
      {selectedSurvey && <ViewSurveyDetails surveyData={selectedSurvey} onClose={handleCloseSurvey} />}
      
      {/* Employer Feedback Modal */}
      {selectedFeedback && <ViewEmployerFeedbackDetails feedbackData={selectedFeedback} onClose={handleCloseFeedback} />}
      
      {/* Annex 1D Survey Modal (Integrated) */}
      {selectedAnnex1D && <ViewAnnex1DDetails surveyData={selectedAnnex1D} onClose={handleCloseAnnex1D} />}
      
      {/* TOP BAR */}
      <div className="top-bar glass-card shadow-sm">

        {/* Search */}
        <div className="search-box full-width">
          <i className="bi bi-search"></i>
          <input
            className="search-input"
            placeholder="Search alumni..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Btn */}
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="bi bi-sliders"></i> Filters
        </button>
        
        {/* Download Btn */}
        <button
          className="filter-toggle-btn"
          onClick={handleDownloadCSV}
        >
          <i className="bi bi-download"></i> Download
        </button>
        
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="filter-panel glass-card shadow-sm mt-3">

          <div className="row g-3">
            
            <div className="col-md-2">
              <label className="filter-label">Degree</label>
              <select
                className="filter-select"
                value={filters.degree}
                onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
              >
                <option value="">All</option>
                {degrees.map((d, i) => (<option key={i} value={d}>{d}</option>))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Batch</label>
              <select
                className="filter-select"
                value={filters.batch}
                onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
              >
                <option value="">All</option>
                {batches.map((b, i) => (<option key={i} value={b}>{b}</option>))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Status</label>
              <select
                className="filter-select"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Year</label>
              <select
                className="filter-select"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              >
                <option value="">All</option>
                {years.map((y, i) => (<option key={i} value={y}>{y}</option>))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Company</label>
              <select
                className="filter-select"
                value={filters.company}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              >
                <option value="">All</option>
                {companies.map((c, i) => (<option key={i} value={c}>{c}</option>))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">&nbsp;</label>
              <button
                className="reset-btn w-100"
                onClick={() => setFilters({ degree: "", batch: "", status: "", year: "", company: "", })}
              >
                Reset
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="table-card glass-card shadow-sm mt-4">
        <table className="table interactive-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Status</th>
              <th>Company</th>
              <th>Job Title</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No alumni found
                </td>
              </tr>
            ) : (
              filtered.map((alumni, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{alumni.firstName + " " + alumni.lastName}</td>
                  <td>{alumni.rollNo}</td>
                  <td>{alumni.batch}</td>
                  <td>{alumni.degree}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        alumni.employmentStatus === "employed"
                          ? "status-employed"
                          : "status-unemployed"
                      }`}
                    >
                      {alumni.employmentStatus}
                    </span>
                  </td>
                  <td>{alumni.companyName || "--"}</td>
                  <td>{alumni.jobTitle || "--"}</td>
                  <td>{alumni.graduationYear}</td>

                  <td className="action-icons">
                    {/* View Annex 1D Survey Button (Integrated) */}
                    <i 
                        className="bi bi-file-earmark-text-fill survey-icon" 
                        onClick={() => handleViewAnnex1D(alumni)}
                        title="View Annex 1D Survey"
                    ></i>

                    {/* View Employer Feedback Button */}
                    <i 
                        className="bi bi-briefcase-fill survey-icon" 
                        onClick={() => handleViewEmployerFeedback(alumni)}
                        title="View Employer Feedback"
                    ></i>
                    {/* View Survey Button */}
                    <i 
                      className="bi bi-list-columns-reverse survey-icon" 
                      onClick={() => handleViewSurvey(alumni)}
                      title="View Graduate Exit Survey"
                    ></i>
                    <i className="bi bi-pencil-square edit-icon"></i>
                    <i className="bi bi-trash delete-icon"></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}