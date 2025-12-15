class RegisterAlumniUtils {
  /**
   * Validates the alumni registration form data
   * @param {Object} formData - form values
   * @returns {Object} errors - object containing validation errors
   */
  static validateForm(formData) {
    const errors = {};

    // First Name
    if (!formData.firstName || formData.firstName.trim() === "") {
      errors.firstName = "First name is required";
    }

    // Last Name
    if (!formData.lastName || formData.lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }

    // Father Name
    if (!formData.FatherName || formData.FatherName.trim() === "") {
      errors.FatherName = "Father name is required";
    }
    // Email
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // CNIC
    if (!formData.cnic || formData.cnic.trim() === "") {
      errors.cnic = "CNIC is required";
    } else if (!/^\d{5}-\d{7}-\d$/.test(formData.cnic)) {
      errors.cnic = "CNIC must be in xxxxx-xxxxxxx-x format";
    }

    // Batch
    if (!formData.batch || formData.batch.trim() === "") {
      errors.batch = "Batch is required";
    }

    // Degree
    if (!formData.degree || formData.degree.trim() === "") {
      errors.degree = "Degree is required";
    }
    // Degree
    if (!formData.department || formData.degree.trim() === "") {
      errors.department = "department is required";
    }

    // Roll Number
    if (!formData.rollNo || formData.rollNo.trim() === "") {
      errors.rollNo = "Roll number is required";
    } else if (isNaN(formData.rollNo) || Number(formData.rollNo) <= 0) {
      errors.rollNo = "Roll number must be a positive number";
    }
    // password
    if (!formData.password || formData.password.trim() === "") {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  }

  static async handleSubmit(event, formData, setErrors, post, navigate) {
    event.preventDefault();
    const errors = this.validateForm(formData);
    if (Object.keys(errors).length === 0) {
      // No validation errors, proceed with form submission
      await post(formData);
      navigate("/login");
    } else {
      // Set validation errors to state to display them     
      setErrors(errors);
    }
  }

}

export default RegisterAlumniUtils;

