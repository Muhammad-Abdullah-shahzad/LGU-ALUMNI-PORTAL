import { Modal } from "bootstrap";

class CoordinatorUtility {
  static validateForm(formData) {
    const errors = {};
    if (!formData.firstName || formData.firstName.trim() === "") {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName || formData.lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password || formData.password.trim() === "") {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  }

  static async handleSubmit(event, formData, setErrors, post, modalId = "addUserModal") {
    event.preventDefault();

    const errors = this.validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      await post(formData); // your async request

    
      setErrors({});
    } catch (err) {
      // Keep modal open, overlay stays, show errors
      setErrors({ form: err.message || "Something went wrong" });
    }
  }
}

export default CoordinatorUtility;
