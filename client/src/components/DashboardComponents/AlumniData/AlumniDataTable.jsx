import React, { useState, useCallback, useRef, useEffect } from "react";
import "./alumniDataTable.css";
import { useFetch } from "../../../hooks/useFetch";
import { useUpdate } from "../../../hooks/useUpdate"; 
import Loader from "../../Loader/Loader";

// ⚠️ IMPORTANT: Please ensure this import path is correct for your project
import EditAlumni from "./EditAlumForm";
import { useBeforeUnload } from "react-router-dom";

// =========================================================
// 1. CSV Download Utility (NEW)
// =========================================================

/**
 * Converts data (headers and rows) into a CSV string and triggers a download.
 * @param {string} filename The name for the downloaded file.
 * @param {string[]} headers Array of column headers.
 * @param {string[][]} rows Array of data rows, where each row is an array of strings.
 */
const downloadCSV = (filename, headers, rows) => {
  if (!rows || rows.length === 0) {
    alert("No data available to download.");
    return;
  }
  
  // Quote all values and join with a comma, then join rows with a newline
  const csvContent = [headers, ...rows]
    .map((row) => 
      row.map((value) => 
        `"${String(value || '').replace(/"/g, '""')}"` // Handle null/undefined, convert to string, and escape double quotes
      ).join(",")
    ).join("\n");
    
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // Append to body to ensure it works in all browsers
  a.click();
  document.body.removeChild(a); // Clean up
  URL.revokeObjectURL(url);
};

// =========================================================
// 2. ViewSurveyDetails Component (Existing + Download Button)
// =========================================================
const ViewSurveyDetails = ({ surveyData, onClose, onDownload }) => {
  if (!surveyData) return null;
  const { department, degree, fullName, email, phone, participation, questions = [], alumniId } = surveyData;
  const alumniEmail = alumniId?.email || email;
  const alumniName = alumniId?.fullName || fullName;
  
  return (
    <div className="survey-modal-overlay">
      <div className="survey-modal-content glass-card shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Graduate Exit Survey Details </h4>
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
                  <div><strong>{q.key.toUpperCase()}:</strong> {q.question}</div>
                  <span className="badge bg-primary rounded-pill ms-3 p-2">{q.answer}</span>
                </div>
              ))}
            </div>
          ) : (<p className="text-muted">No PLO assessment questions found.</p>)}
        </div>
        <div className="mt-4 d-flex justify-content-end gap-2"> {/* Modified for download button */}
          <button className="btn btn-primary" onClick={() => onDownload(surveyData)}>
             <i className="bi bi-download me-1"></i> Download CSV
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};


// =========================================================
// 3. ViewEmployerFeedbackDetails Component (Existing + Download Button)
// =========================================================
const ViewEmployerFeedbackDetails = ({ feedbackData, onClose, onDownload }) => {
  if (!feedbackData) return null;
  const { companyName, employerName, designation, email, phone, interneeName, interneeDiscipline, totalInterneeCount, departmentInternCount, departmentCounts = {}, ploRatings = {}, comments, submittedAt } = feedbackData;
  const departmentKeys = { ai: "AI", devDesign: "Development & Design", marketing: "Digital Marketing", graphics: "Graphics Designing", analytics: "Data Analytics", cyber: "Cyber Security", technical: "Technical", it: "IT", rnd: "R&D", other: "Other" };
  const ploKeys = { plo3_problemSolving: "Problem formulation & solving (PLO-3)", plo2_dataAnalysis: "Data collection & analysis (PLO-2)", plo1_theoryToPractice: "Theory to practice (PLO-1)", plo4_judgement: "Judgment & decision-making (PLO-4)", plo5_technicalSkills: "Technical / IT Skills (PLO-5)", plo6_teamwork: "Teamwork (PLO-6)", plo7_communication: "Communication skills (PLO-7)", plo8_societalAwareness: "Societal & sustainability awareness (PLO-8)", plo9_ethics: "Workplace ethics (PLO-9)", plo10_independentThinking: "Independent thinking (PLO-10)", plo10_outOfBox: "Out-of-box thinking (PLO-10)" };

  return (
    <div className="survey-modal-overlay">
      <div className="survey-modal-content glass-card shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Employer Feedback Details </h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="survey-data-display">
          <h5 className="mt-3">Internee & Submission Details</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Internee Name:</strong> {interneeName}</div>
            <div className="col-md-6"><strong>Discipline:</strong> {interneeDiscipline}</div>
            <div className="col-md-6"><strong>Total LGU Interns:</strong> {totalInterneeCount}</div>
            <div className="col-md-6"><strong>Dept Intern Count:</strong> {departmentInternCount}</div>
            <div className="col-md-12"><strong>Submitted:</strong> {new Date(submittedAt).toLocaleDateString()}</div>
          </div>
          <h5 className="mt-3">Company & Employer Information</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Company Name:</strong> {companyName}</div>
            <div className="col-md-6"><strong>Employer Name:</strong> {employerName}</div>
            <div className="col-md-6"><strong>Designation:</strong> {designation}</div>
            <div className="col-md-6"><strong>Email:</strong> {email}</div>
            <div className="col-md-6"><strong>Contact:</strong> {phone}</div>
          </div>
          <h5 className="mt-3">Performance Evaluation (PLOs)</h5>
          {Object.keys(ploRatings).length > 0 ? (
            <div className="list-group mb-4">
              {Object.entries(ploKeys).map(([key, label]) => {
                if (ploRatings[key]) { return (<div key={key} className="list-group-item d-flex justify-content-between align-items-start"><div><strong>{label}</strong></div><span className="badge bg-primary rounded-pill ms-3 p-2">{ploRatings[key]}</span></div>); }
                return null;
              })}
            </div>
          ) : (<p className="text-muted">No PLO ratings found.</p>)}
          <h5 className="mt-3">Department Breakdown (Intern Count)</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            {Object.entries(departmentKeys).map(([key, label]) => {
              if (departmentCounts[key] && departmentCounts[key] > 0) { return (<div key={key} className="col-md-4"><strong>{label}:</strong> {departmentCounts[key]}</div>); }
              return null;
            })}
          </div>
          <h5 className="mt-3">General Comments</h5>
          <p className="p-2 bg-light rounded text-break">{comments || 'No comments provided.'}</p>
        </div>
        <div className="mt-4 d-flex justify-content-end gap-2"> {/* Modified for download button */}
           <button className="btn btn-primary" onClick={() => onDownload(feedbackData)}>
             <i className="bi bi-download me-1"></i> Download CSV
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// 4. ViewAnnex1DDetails Component (Existing + Download Button)
// =========================================================
const SELF_ASSESSMENT_LABELS = [ { id: 1, text: "Ability to design a system component or process (PEO1)" }, { id: 2, text: "Adaptation to modern technology or tools (PEO1)" }, { id: 3, text: "Intellectual and technical knowledge of Software Engineering (PEO1)" }, { id: 4, text: "General professional responsibility (PEO2)" }, { id: 5, text: "Fulfilling societal/ethical norms (PEO2)" }, { id: 6, text: "Awareness of sustainability in digital and engineering practices (PEO2)" }, { id: 7, text: "Computing Core Knowledge (PEO3)" }, { id: 8, text: "Adaption to new skills (PEO3)" }, { id: 9, text: "Ability to work effectively in teams (PEO3)" }, { id: 10, text: "Oral communication (PEO4)" }, { id: 11, text: "Report writing skills (PEO4)" }, { id: 12, text: "Ability to conduct research (PEO4)" }, ];
const DEPARTMENT_STANDING_LABELS = [ { id: 1, text: "Infrastructure" }, { id: 2, text: "Faculty" }, { id: 3, text: "Repute at the National level" }, { id: 4, text: "Repute at international level" } ];

const formatAssessmentData = (assessment, type) => {
  if (!assessment || Object.keys(assessment).length === 0) return [];
  const labelsMap = (type === 'self' ? SELF_ASSESSMENT_LABELS : DEPARTMENT_STANDING_LABELS)
    .reduce((map, item) => { map[item.id] = item.text; return map; }, {}); 

  return Object.entries(assessment)
    .map(([key, value]) => {
      const id = parseInt(key); 
      const question = labelsMap[id] || `Question ${key} (Label Not Found)`;
      return { key: id, question, answer: value };
    })
    .sort((a, b) => a.key - b.key) 
    .filter(item => item.answer); 
};


const ViewAnnex1DDetails = ({ surveyData, onClose, onDownload }) => {
  if (!surveyData || !surveyData.surveys || surveyData.surveys.length === 0) return null;
  const survey = surveyData.surveys[0];
  const { alumniId, program, department, selfAssessment, generalComments, departmentStanding, careerOpportunities, name, organizationName, position, graduationYear, email, telephone, submittedAt } = survey;

  const formattedSelfAssessment = formatAssessmentData(selfAssessment, 'self');
  const formattedDepartmentStanding = formatAssessmentData(departmentStanding, 'department');
  const alumniEmail = alumniId?.email || email;
  const alumniDepartment = alumniId?.department || department;
  

  return (
    <div className="survey-modal-overlay">
      <div className="survey-modal-content glass-card shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Alumni Survey (Annex 1D) Details </h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="survey-data-display">
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
          <h5 className="mt-3">Academic Program Information</h5>
          <div className="row g-2 mb-4 p-2 bg-light rounded">
            <div className="col-md-6"><strong>Program:</strong> {program}</div>
            <div className="col-md-6"><strong>Department:</strong> {department}</div>
            <div className="col-md-6"><strong>Alumni ID Email:</strong> {alumniEmail}</div>
            <div className="col-md-6"><strong>Alumni ID Dept:</strong> {alumniDepartment}</div>
          </div>
          <h5 className="mt-3">Self Assessment (PEO Alignment)</h5>
          {formattedSelfAssessment.length > 0 ? (
            <div className="list-group mb-4">
              {formattedSelfAssessment.map((q) => (
                <div key={q.key} className="list-group-item d-flex justify-content-between align-items-start">
                  <div><strong>Q{q.key}:</strong> {q.question}</div>
                  <span className="badge bg-success rounded-pill ms-3 p-2">{q.answer}</span>
                </div>
              ))}
            </div>
          ) : (<p className="text-muted">No Self Assessment data found.</p>)}
          <h5 className="mt-3">Department Standing Evaluation</h5>
          {formattedDepartmentStanding.length > 0 ? (
            <div className="list-group mb-4">
              {formattedDepartmentStanding.map((q) => (
                <div key={q.key} className="list-group-item d-flex justify-content-between align-items-start">
                  <div><strong>Q{q.key}:</strong> {q.question}</div>
                  <span className="badge bg-info rounded-pill ms-3 p-2">{q.answer}</span>
                </div>
              ))}
            </div>
          ) : (<p className="text-muted">No Department Standing data found.</p>)}
          <h5 className="mt-3">General Comments</h5>
          <p className="p-2 bg-light rounded text-break">{generalComments || 'No general comments provided.'}</p>
          <h5 className="mt-3">Career Opportunities Comments</h5>
          <p className="p-2 bg-light rounded text-break">{careerOpportunities || 'No career opportunities comments provided.'}</p>
        </div>
        <div className="mt-4 d-flex justify-content-end gap-2"> {/* Modified for download button */}
           <button className="btn btn-primary" onClick={() => onDownload(surveyData)}>
             <i className="bi bi-download me-1"></i> Download CSV
          </button>
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

  // 1. Fetch Data
  const { data: alumniData, loading: alumniLoading } = useFetch(`${Base_URL}/user/alumni`);
  const { data: surveyDetails, loading: surveyLoading } = useFetch(`${Base_URL}/survey/graduateExitSurvey`);
  const { data: employerFeedbackData, loading: feedbackLoading } = useFetch(`${Base_URL}/survey/employer-feedback`);
  const { data: annex1dData, loading: annex1dLoading } = useFetch(`${Base_URL}/survey/annex1D`);

  // 2. Setup Update Hook
  const { put , loading: updateLoading} = useUpdate(`${Base_URL}/user/update`) 

  // --- STATE ---
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Modal States
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedAnnex1D, setSelectedAnnex1D] = useState(null);

  // Edit Modal States (Responsible for opening the modal)
  const [editModal, setEditModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState({});

  // Download dropdown state
  const [showDownload, setShowDownload] = useState(false);
  const downloadRef = useRef(null);

  const users = alumniData?.users || [];

  // --- HANDLER FOR UPDATE LOGIC (KEY FIX APPLIED HERE) ---
  const handleUpdateAlumni = useCallback(async (alumniId, updatedFields) => {
    try {
      const payload = {
        id: alumniId, 
        ...updatedFields,
      };

      console.log("Sending PUT Update Payload:", payload);

      const response = await put(payload);
      
      // ✅ FIX: Check for the success message explicitly. 
      // Treat the update as successful if the response contains the 'user updated successfully' message,
      // even if the HTTP status code was non-200, causing useUpdate to flag it otherwise.
      const isSuccess = response && (response.success === true || response.message === "user updated successfully");

      if (isSuccess) {
        alert("Alumni data updated successfully!");
        setEditModal(false); // Close the modal
        
        // 3. Refetch alumni data to show changes on the UI (as requested)
        window.location.reload(); 
      } else {
        // Log the full response for better debugging
        console.error("Update failed response:", response); 
        alert(`Update failed: ${response?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating alumni:", error);
      alert("An error occurred during update.");
    }
  }, [put]); 

  // --- EDIT MODAL HANDLERS ---
  const handleCloseEditModal = () => {
    setEditModal(false);
    setSelectedAlumni({});
  }

  const handleEditAlumni = (alumni) => {
    console.log("handel alumni clicked");
    
    // Set the selected alumni data and open the modal
    setSelectedAlumni(alumni);
    setEditModal(true); 
    console.log("Edit icon clicked. Modal state set to true.");
  }

  // --- DOWNLOAD HANDLERS FOR INDIVIDUAL SURVEYS (NEW) ---
  const handleDownloadAlumniDataCSV = (alumni) => {
    const listToDownload = alumni ? [alumni] : filtered.length > 0 ? filtered : users;
    if (!listToDownload || listToDownload.length === 0) { alert("No alumni data available to download."); return; }
    const headers = ["Name", "Roll No", "Batch", "Degree", "Status", "Company", "Job Title", "Graduation Year"];
    const rows = listToDownload.map((a) => [ `${a.firstName || ""} ${a.lastName || ""}`, a.rollNo || "", a.batch || "", a.degree || "", a.employmentStatus || "", a.companyName || "", a.jobTitle || "", a.graduationYear || "" ]);
    downloadCSV("alumni_list.csv", headers, rows);
  };
  
  // NOTE: Renamed the existing CSV handler to use the new utility
  const handleDownloadCSV = () => {
    handleDownloadAlumniDataCSV();
  };

  const handleDownloadGraduateExitSurveyCSV = useCallback((surveyData) => {
    const { fullName, email, department, degree, phone, participation, questions = [], submittedAt } = surveyData;
    
    const baseHeaders = ["Alumni Name", "Email", "Department", "Degree", "Phone", "Participation", "Submitted Date"];
    const baseRow = [fullName || '', email || '', department || '', degree || '', phone || '', participation || '', new Date(submittedAt).toLocaleDateString()];

    const questionHeaders = questions.map(q => q.key.toUpperCase());
    const questionAnswers = questions.map(q => q.answer);
    
    const headers = [...baseHeaders, ...questionHeaders];
    const rows = [[...baseRow, ...questionAnswers]];

    downloadCSV(`GES_${fullName?.replace(/\s/g, '_') || 'survey'}.csv`, headers, rows);
  }, []);

  const handleDownloadEmployerFeedbackCSV = useCallback((feedbackData) => {
    const { companyName, employerName, designation, email, phone, interneeName, interneeDiscipline, totalInterneeCount, departmentInternCount, departmentCounts = {}, ploRatings = {}, comments, submittedAt } = feedbackData;
    const departmentKeys = { ai: "AI", devDesign: "Development & Design", marketing: "Digital Marketing", graphics: "Graphics Designing", analytics: "Data Analytics", cyber: "Cyber Security", technical: "Technical", it: "IT", rnd: "R&D", other: "Other" };
    const ploKeys = { plo3_problemSolving: "Problem formulation & solving (PLO-3)", plo2_dataAnalysis: "Data collection & analysis (PLO-2)", plo1_theoryToPractice: "Theory to practice (PLO-1)", plo4_judgement: "Judgment & decision-making (PLO-4)", plo5_technicalSkills: "Technical / IT Skills (PLO-5)", plo6_teamwork: "Teamwork (PLO-6)", plo7_communication: "Communication skills (PLO-7)", plo8_societalAwareness: "Societal & sustainability awareness (PLO-8)", plo9_ethics: "Workplace ethics (PLO-9)", plo10_independentThinking: "Independent thinking (PLO-10)", plo10_outOfBox: "Out-of-box thinking (PLO-10)" };

    const baseHeaders = ["Company Name", "Employer Name", "Designation", "Employer Email", "Employer Phone", "Internee Name", "Internee Discipline", "Total LGU Interns", "Dept Intern Count", "Submitted Date", "General Comments"];
    const baseRow = [companyName, employerName, designation, email, phone, interneeName, interneeDiscipline, totalInterneeCount, departmentInternCount, new Date(submittedAt).toLocaleDateString(), comments];

    const ploHeaders = Object.values(ploKeys);
    const ploAnswers = Object.keys(ploKeys).map(key => ploRatings[key] || 'N/A');

    const deptHeaders = Object.values(departmentKeys).filter(label => departmentCounts[Object.keys(departmentKeys).find(k => departmentKeys[k] === label)] > 0);
    const deptAnswers = Object.keys(departmentKeys).filter(key => departmentCounts[key] > 0).map(key => departmentCounts[key]);

    const headers = [...baseHeaders, ...ploHeaders, ...deptHeaders];
    const rows = [[...baseRow, ...ploAnswers, ...deptAnswers]];

    downloadCSV(`EmployerFeedback_${interneeName?.replace(/\s/g, '_') || 'feedback'}.csv`, headers, rows);
  }, []);

  const handleDownloadAnnex1DCSV = useCallback((surveyData) => {
    const survey = surveyData.surveys[0];
    if (!survey) return;

    const { name, organizationName, position, graduationYear, email, telephone, program, department, selfAssessment, generalComments, departmentStanding, careerOpportunities, submittedAt } = survey;
    
    // 1. Basic Info
    const baseHeaders = ["Name", "Email", "Telephone", "Organization", "Position", "Graduation Year", "Program", "Department", "Submitted Date", "General Comments", "Career Opportunities"];
    const baseRow = [name, email, telephone, organizationName, position, graduationYear, program, department, new Date(submittedAt).toLocaleDateString(), generalComments, careerOpportunities];

    // 2. Self Assessment (PEO)
    const formattedSelfAssessment = formatAssessmentData(selfAssessment, 'self');
    const selfHeaders = formattedSelfAssessment.map(q => `SelfAssessment_Q${q.key}: ${q.question}`);
    const selfAnswers = formattedSelfAssessment.map(q => q.answer);
    
    // 3. Department Standing
    const formattedDepartmentStanding = formatAssessmentData(departmentStanding, 'department');
    const deptHeaders = formattedDepartmentStanding.map(q => `DeptStanding_Q${q.key}: ${q.question}`);
    const deptAnswers = formattedDepartmentStanding.map(q => q.answer);

    const headers = [...baseHeaders, ...selfHeaders, ...deptHeaders];
    const rows = [[...baseRow, ...selfAnswers, ...deptAnswers]];

    downloadCSV(`Annex1D_Survey_${name?.replace(/\s/g, '_') || 'survey'}.csv`, headers, rows);
  }, []);


  // --- Other existing handlers (omitted for brevity, assume they are correct) ---
  const handleViewSurvey = (alumni) => {
    const surveys = surveyDetails?.data || [];
    const alumniIdToMatch = alumni._id;
    const foundSurvey = surveys.find(survey => (survey.alumniId && survey.alumniId._id === alumniIdToMatch) || (survey.alumniId === alumniIdToMatch));
    if (foundSurvey) { setSelectedSurvey(foundSurvey); } else { alert(`No graduate exit survey found for ${alumni.firstName} ${alumni.lastName}.`); setSelectedSurvey(null); }
  };
  const handleCloseSurvey = () => { setSelectedSurvey(null); };

  const handleViewEmployerFeedback = (alumni) => {
    const feedbackList = employerFeedbackData?.data || [];
    const alumniIdToMatch = alumni._id;
    const foundFeedback = feedbackList.find(feedback => (feedback.alumniId && feedback.alumniId._id === alumniIdToMatch) || (feedback.alumniId === alumniIdToMatch));
    if (foundFeedback) { setSelectedFeedback(foundFeedback); } else { alert(`No Employer Feedback found for ${alumni.firstName} ${alumni.lastName}.`); setSelectedFeedback(null); }
  };
  const handleCloseFeedback = () => { setSelectedFeedback(null); };

  const handleViewAnnex1D = (alumni) => {
    const annex1dList = annex1dData?.surveys || [];
    const alumniIdToMatch = alumni._id;
    const foundSurvey = annex1dList.find(survey => (survey.alumniId && survey.alumniId._id === alumniIdToMatch) || (survey.alumniId === alumniIdToMatch));
    if (foundSurvey) { setSelectedAnnex1D({ surveys: [foundSurvey] }); } else { alert(`No Annex 1D Survey found for ${alumni.firstName} ${alumni.lastName}.`); setSelectedAnnex1D(null); }
  };
  const handleCloseAnnex1D = () => { setSelectedAnnex1D(null); };


  // --- Filtering Logic (Omitted for brevity, assume correct) ---
  const degrees = [...new Set(users.map((u) => u.degree))];
  const batches = [...new Set(users.map((u) => u.batch))];
  const companies = [...new Set(users.map((u) => u.companyName).filter(Boolean))];
  const years = [...new Set(users.map((u) => u.graduationYear))];

  const [filters, setFilters] = useState({ degree: "", batch: "", status: "", year: "", company: "", });


  const filtered = users.filter((alumni) => {
    const matchesSearch =
      (alumni.firstName + " " + alumni.lastName).toLowerCase().includes(search.toLowerCase()) ||
      `${alumni.batch}/${alumni.degree}/${alumni.rollNo}`.toLowerCase().includes(search.toLowerCase());
    const matchesDegree = filters.degree ? alumni.degree === filters.degree : true;
    const matchesBatch = filters.batch ? alumni.batch === filters.batch : true;
    const matchesStatus = filters.status ? alumni.employmentStatus === filters.status : true;
    const matchesYear = filters.year ? alumni.graduationYear == filters.year : true;
    const matchesCompany = filters.company ? alumni.companyName === filters.company : true;
    return ( matchesSearch && matchesDegree && matchesBatch && matchesStatus && matchesYear && matchesCompany );
  });
  // --- End Filtering Logic ---

  // Click outside to close download panel
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target)) {
        setShowDownload(false);
      }
    };
    if (showDownload) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showDownload]);

  // Helper: get set of filtered alumni IDs
  const getFilteredAlumniIdSet = () => {
    const ids = new Set();
    filtered.forEach(u => {
      if (u._id) ids.add(String(u._id));
    });
    return ids;
  };

  // --- BULK DOWNLOAD HANDLERS (for dropdown buttons) ---
  const handleBulkGraduateExitDownload = () => {
    const surveys = surveyDetails?.data || [];
    const idSet = getFilteredAlumniIdSet();
    const selectedSurveys = surveys.filter(s => {
      const aid = s.alumniId && s.alumniId._id ? String(s.alumniId._id) : String(s.alumniId);
      // Logic: Download if the survey alumni ID is in the filtered list ID set. 
      // If idSet is empty (no filters applied), download all (return true).
      return idSet.size === 0 ? true : idSet.has(aid);
    });

    if (!selectedSurveys || selectedSurveys.length === 0) {
      alert("No Graduate Exit Surveys found for the current filters.");
      return;
    }

    // Collect union of question keys across all selected surveys
    const questionKeySet = new Set();
    selectedSurveys.forEach(s => {
      const qs = s.questions || [];
      qs.forEach(q => questionKeySet.add(q.key.toUpperCase()));
    });
    const questionKeys = Array.from(questionKeySet).sort();

    const baseHeaders = ["Alumni Name", "Email", "Department", "Degree", "Phone", "Participation", "Submitted Date"];
    const headers = [...baseHeaders, ...questionKeys];

    const rows = selectedSurveys.map(s => {
      const name = s.fullName || (s.alumniId && s.alumniId.fullName) || "";
      const email = s.email || (s.alumniId && s.alumniId.email) || "";
      const department = s.department || (s.alumniId && s.alumniId.department) || "";
      const degree = s.degree || "";
      const phone = s.phone || "";
      const participation = s.participation || "";
      const submitted = s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : "";

      const answerMap = {};
      (s.questions || []).forEach(q => {
        answerMap[q.key.toUpperCase()] = q.answer;
      });

      const questionAnswers = questionKeys.map(k => answerMap[k] || "");
      return [name, email, department, degree, phone, participation, submitted, ...questionAnswers];
    });

    downloadCSV("graduate_exit_all.csv", headers, rows);
    setShowDownload(false);
  };

  const handleBulkEmployerFeedbackDownload = () => {
    const feedbacks = employerFeedbackData?.data || [];
    const idSet = getFilteredAlumniIdSet();
    const selectedFeedbacks = feedbacks.filter(f => {
      const aid = f.alumniId && f.alumniId._id ? String(f.alumniId._id) : String(f.alumniId);
      // Logic: Download if the feedback alumni ID is in the filtered list ID set. 
      // If idSet is empty (no filters applied), download all (return true).
      return idSet.size === 0 ? true : idSet.has(aid);
    });

    if (!selectedFeedbacks || selectedFeedbacks.length === 0) {
      alert("No Employer Feedback forms found for the current filters.");
      return;
    }

    // standard PLO keys & department keys (keep consistent)
    const departmentKeys = { ai: "AI", devDesign: "Development & Design", marketing: "Digital Marketing", graphics: "Graphics Designing", analytics: "Data Analytics", cyber: "Cyber Security", technical: "Technical", it: "IT", rnd: "R&D", other: "Other" };
    const ploKeys = { plo3_problemSolving: "Problem formulation & solving (PLO-3)", plo2_dataAnalysis: "Data collection & analysis (PLO-2)", plo1_theoryToPractice: "Theory to practice (PLO-1)", plo4_judgement: "Judgment & decision-making (PLO-4)", plo5_technicalSkills: "Technical / IT Skills (PLO-5)", plo6_teamwork: "Teamwork (PLO-6)", plo7_communication: "Communication skills (PLO-7)", plo8_societalAwareness: "Societal & sustainability awareness (PLO-8)", plo9_ethics: "Workplace ethics (PLO-9)", plo10_independentThinking: "Independent thinking (PLO-10)", plo10_outOfBox: "Out-of-box thinking (PLO-10)" };

    const baseHeaders = ["Company Name", "Employer Name", "Designation", "Employer Email", "Employer Phone", "Internee Name", "Internee Discipline", "Total LGU Interns", "Dept Intern Count", "Submitted Date", "General Comments"];
    const ploHeaders = Object.values(ploKeys);
    // For departments, include all department labels to keep columns consistent
    const deptHeaders = Object.values(departmentKeys);

    const headers = [...baseHeaders, ...ploHeaders, ...deptHeaders];

    const rows = selectedFeedbacks.map(f => {
      const baseRow = [
        f.companyName || "",
        f.employerName || "",
        f.designation || "",
        f.email || "",
        f.phone || "",
        f.interneeName || "",
        f.interneeDiscipline || "",
        f.totalInterneeCount || "",
        f.departmentInternCount || "",
        f.submittedAt ? new Date(f.submittedAt).toLocaleDateString() : "",
        f.comments || ""
      ];

      const ploAnswers = Object.keys(ploKeys).map(k => (f.ploRatings && f.ploRatings[k]) ? f.ploRatings[k] : "");
      const deptAnswers = Object.keys(departmentKeys).map(k => (f.departmentCounts && f.departmentCounts[k]) ? f.departmentCounts[k] : "");

      return [...baseRow, ...ploAnswers, ...deptAnswers];
    });

    downloadCSV("employer_feedback_all.csv", headers, rows);
    setShowDownload(false);
  };

  const handleBulkAnnex1DDownload = () => {
    const annexes = annex1dData?.surveys || [];
    const idSet = getFilteredAlumniIdSet();
    const selectedAnnexes = annexes.filter(s => {
      const aid = s.alumniId && s.alumniId._id ? String(s.alumniId._id) : String(s.alumniId);
      // Logic: Download if the survey alumni ID is in the filtered list ID set. 
      // If idSet is empty (no filters applied), download all (return true).
      return idSet.size === 0 ? true : idSet.has(aid);
    });

    if (!selectedAnnexes || selectedAnnexes.length === 0) {
      alert("No Annex 1D surveys found for the current filters.");
      return;
    }

    // Gather union of self assessment keys and department standing keys across selected surveys
    const selfKeySet = new Set();
    const deptKeySet = new Set();

    selectedAnnexes.forEach(s => {
      if (s.selfAssessment) {
        Object.keys(s.selfAssessment).forEach(k => selfKeySet.add(k));
      }
      if (s.departmentStanding) {
        Object.keys(s.departmentStanding).forEach(k => deptKeySet.add(k));
      }
    });

    const selfKeys = Array.from(selfKeySet).map(k => parseInt(k)).sort((a,b) => a-b);
    const deptKeys = Array.from(deptKeySet).map(k => parseInt(k)).sort((a,b) => a-b);

    const baseHeaders = ["Name", "Email", "Telephone", "Organization", "Position", "Graduation Year", "Program", "Department", "Submitted Date", "General Comments", "Career Opportunities"];
    const selfHeaders = selfKeys.map(k => {
      const label = SELF_ASSESSMENT_LABELS.find(l => l.id === k)?.text || `Self_Q${k}`;
      return `Self_Q${k}: ${label}`;
    });
    const deptHeaders = deptKeys.map(k => {
      const label = DEPARTMENT_STANDING_LABELS.find(l => l.id === k)?.text || `Dept_Q${k}`;
      return `Dept_Q${k}: ${label}`;
    });

    const headers = [...baseHeaders, ...selfHeaders, ...deptHeaders];

    const rows = selectedAnnexes.map(s => {
      const name = s.name || (s.alumniId && s.alumniId.fullName) || "";
      const email = s.email || (s.alumniId && s.alumniId.email) || "";
      const telephone = s.telephone || "";
      const organizationName = s.organizationName || "";
      const position = s.position || "";
      const graduationYear = s.graduationYear || "";
      const program = s.program || "";
      const department = s.department || "";
      const submitted = s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : "";
      const generalComments = s.generalComments || "";
      const careerOpportunities = s.careerOpportunities || "";

      const selfMap = s.selfAssessment || {};
      const deptMap = s.departmentStanding || {};

      const selfAnswers = selfKeys.map(k => selfMap[k] || "");
      const deptAnswers = deptKeys.map(k => deptMap[k] || "");

      return [name, email, telephone, organizationName, position, graduationYear, program, department, submitted, generalComments, careerOpportunities, ...selfAnswers, ...deptAnswers];
    });

    downloadCSV("annex1d_all.csv", headers, rows);
    setShowDownload(false);
  };

  // Combine loading states
  if (alumniLoading || surveyLoading || feedbackLoading || annex1dLoading || updateLoading) return <Loader />;

  return (
    <div className="container-fluid alumni-wrapper">

      {/* MODALS: Added onDownload prop to each view component */}
      {selectedSurvey && <ViewSurveyDetails surveyData={selectedSurvey} onClose={handleCloseSurvey} onDownload={handleDownloadGraduateExitSurveyCSV} />}
      {selectedFeedback && <ViewEmployerFeedbackDetails feedbackData={selectedFeedback} onClose={handleCloseFeedback} onDownload={handleDownloadEmployerFeedbackCSV} />}
      {selectedAnnex1D && <ViewAnnex1DDetails surveyData={selectedAnnex1D} onClose={handleCloseAnnex1D} onDownload={handleDownloadAnnex1DCSV} />}

      {/* EDIT ALUMNI MODAL (Will render only when editModal is true) */}
      {editModal && (
        <EditAlumni 
          alumniData={selectedAlumni}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateAlumni} 
          isLoading={updateLoading}
        />
      )}

       {/* TOP BAR */}
      <div className="top-bar glass-card ">
        <div className="search-box full-width">
          <i className="bi bi-search"></i>
          <input
            className="search-input"
            placeholder="Search alumni..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className=" btn btn-success" onClick={() => setShowFilters(!showFilters)}><i className="bi bi-sliders"></i> Filters</button>
        <button className=" btn btn-success" onClick={() => setShowDownload(!showDownload)}><i className="bi bi-download"></i> Download</button> {/* UPDATED ICON */}
      </div>

      {/* DOwnload PANEL */}
      {showDownload && (
        <div ref={downloadRef} className="filter-panel glass-card shadow-sm mt-3"> {/* ADDED ref={downloadRef} */}
          <div className="row g-3">
            <div className="col-md-3">
                <button className="btn btn-outline-success w-100 mt-2" onClick={() => { handleDownloadAlumniDataCSV(); setShowDownload(false); }}>
                  <i className="bi bi-file-earmark-text me-1"></i> Basic Data
                </button>      
            </div>
            <div className="col-md-3">
                <button className="btn btn-outline-success w-100 mt-2" onClick={() => { handleBulkGraduateExitDownload(); setShowDownload(false); }}>
                  <i className="bi bi-file-earmark-text me-1"></i> Graduate Exit Survey
                </button>      
            </div>
            <div className="col-md-3">
                <button className="btn btn-outline-success w-100 mt-2" onClick={() => { handleBulkAnnex1DDownload(); setShowDownload(false); }}>
                  <i className="bi bi-file-earmark-text me-1"></i> Annex Alumni Survey
                </button>      
            </div>
            {/* <div className="col-md-3"> 
                <button className="btn btn-outline-success w-100 mt-2" onClick={() => { handleBulkEmployerFeedbackDownload(); setShowDownload(false); }}>
                  <i className="bi bi-file-earmark-text me-1"></i> Employer Feedback
                </button>      
            </div> */}
          </div>
        </div>
      )}

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="filter-panel glass-card shadow-sm mt-3">
          <div className="row g-3">
            <div className="col-md-2">
              <select className="filter-select" value={filters.degree} onChange={(e) => setFilters({ ...filters, degree: e.target.value })}><option value="">Degree</option>{degrees.map((d, i) => (<option key={i} value={d}>{d}</option>))}</select>
            </div>
            <div className="col-md-2">
              <select className="filter-select" value={filters.batch} onChange={(e) => setFilters({ ...filters, batch: e.target.value })}><option value="">Batch</option>{batches.map((b, i) => (<option key={i} value={b}>{b}</option>))}</select>
            </div>
            <div className="col-md-2">
              <select className="filter-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="">Status</option><option value="employed">Employed</option><option value="unemployed">Unemployed</option></select>
            </div>
            <div className="col-md-2">
              <select className="filter-select" value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}><option value="">Year</option>{years.map((y, i) => (<option key={i} value={y}>{y}</option>))}</select>
            </div>
            <div className="col-md-2">
              <select className="filter-select" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })}><option value="">Company</option>{companies.map((c, i) => (<option key={i} value={c}>{c}</option>))}</select>
            </div>
            <div className="col-md-2">
              <button className="reset-btn w-100" onClick={() => setFilters({ degree: "", batch: "", status: "", year: "", company: "", })}>Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="table-card glass-card shadow-sm mt-4 z-0">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="10" className="text-center py-4">No alumni found</td></tr>
            ) : (
              filtered.map((alumni, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{alumni.firstName + " " + alumni.lastName}</td>
                  <td>{alumni.rollNo}</td>
                  <td>{alumni.batch}</td>
                  <td>{alumni.degree}</td>
                  <td>
                    <span className={`status-badge ${alumni.employmentStatus === "employed" ? "status-employed" : "status-unemployed"}`}>
                      {alumni.employmentStatus}
                    </span>
                  </td>
                  <td>{alumni.companyName || "--"}</td>
                  <td>{alumni.jobTitle || "--"}</td>
                  <td>{alumni.graduationYear}</td>
                  
<td style={{ position: "relative" }}>
  <div className="action-dropdown">
    <button
      className="dropdown-icon-btn"
      onClick={() => setOpenIndex(openIndex === i ? null : i)}
    >
      <i className="bi bi-three-dots-vertical"></i>
    </button>

    {openIndex === i && (
      <div className="dropdown-menu-horizontal">
        <button onClick={() => handleViewAnnex1D(alumni)}>
          <i className="bi bi-file-earmark-text me-1"></i> Annex 1D
        </button>
        {/* <button onClick={() => handleViewEmployerFeedback(alumni)}>
          <i className="bi bi-briefcase me-1"></i> Employer
        </button> */}
        <button onClick={() => handleViewSurvey(alumni)}>
          <i className="bi bi-list-columns-reverse me-1"></i> Exit Survey
        </button>
        <button onClick={() => handleEditAlumni(alumni)}>
          <i className="bi bi-pencil-square me-1"></i> Edit
        </button>
      </div>
    )}
  </div>
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