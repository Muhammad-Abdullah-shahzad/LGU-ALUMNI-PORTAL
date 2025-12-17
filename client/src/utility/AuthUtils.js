// AuthUtility.js
export default class AuthUtility {

    // Validate form fields
    static validateForm(credentials, setFormErrors) {
        const errors = {};

        // Email required
        if (!credentials.email || !credentials.email.trim()) {
            errors.email = "Email is required";
        }
        // Email format
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
            errors.email = "Invalid email format";
        }

        // Password required
        if (!credentials.password || !credentials.password.trim()) {
            errors.password = "Password is required";
        }

        // Fill errors in the form state
        setFormErrors(errors);

        // Return true if no errors
        return Object.keys(errors).length === 0;
    }
    // navigate  user by role after login
    static navigateByRole(user, navigate) {
        if (user.active) {
            if (user.role === "admin") {
                navigate('/admin/dashboard');
            }
            else if (user.role === 'coordinator') {
                navigate('/coordinator/dashboard');
            }
            else if (user.role === "alumni" || user.role === "undergraduate") {
                if (user.formsFilled) {
                    navigate("/alumni/dashboard")
                }
                else {
                    navigate("/register/graduateExitSurvey")
                }
            }
            else if (user.role === "president") {
                navigate("/president/dashboard");
            }

        }
        else {
            navigate("/alumni/pending")
        }

    }

    // Handle login request
    static async handleLogin(credentials, loginRequestFn, setFormErrors) {
        try {
            // Validate before sending request
            if (!AuthUtility.validateForm(credentials, setFormErrors)) {
                return false;
            }

            // Send login request
            const response = await loginRequestFn({
                email: credentials.email,
                password: credentials.password
            });
            console.log("response after login ", response);


            if (response || response.token) {

                // Save token & user
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                return response;
            }


            return false


        } catch (err) {
            console.log(error);

        }
    }
}
