

export default function FallBack() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // or use navigate() if using react-router
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-3">
            <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: '3rem' }}></i>
            <h2 className="my-3">Account Not Activated</h2>
            <p className="mb-4" style={{ maxWidth: '400px' }}>
                Your account has been created but is not activated yet.
                Please wait for us to approve your profile.
            </p>
            <button
                className="btn btn-danger"
                onClick={handleLogout}
            >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
            </button>
        </div>
    );
}
