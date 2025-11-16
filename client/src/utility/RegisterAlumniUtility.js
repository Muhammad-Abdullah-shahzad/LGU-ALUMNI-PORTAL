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

    // Roll Number
    if (!formData.rollNo || formData.rollNo.trim() === "") {
      errors.rollNo = "Roll number is required";
    } else if (isNaN(formData.rollNo) || Number(formData.rollNo) <= 0) {
      errors.rollNo = "Roll number must be a positive number";
    }

    return errors;
  }

  static handleSubmit(event, formData, setErrors) {
    event.preventDefault();
    const errors = this.validateForm(formData);
    setErrors(errors);

}

}

export default RegisterAlumniUtils;

