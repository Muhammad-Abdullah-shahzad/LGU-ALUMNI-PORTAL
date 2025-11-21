import React, { useState, useMemo, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";

function AllDescendent({ role }) {
    const Base_URL = import.meta.env.VITE_API_URL;
    const { data, loading, error } = useFetch(`${Base_URL}/user/${role}`);
    console.log("all descendent executed");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchDept, setSearchDept] = useState("");

    if (loading) return <Loader />;

    const users = data?.users ?? [];

    // --- FILTER LOGIC ---
    const filteredUsers = users.filter((user) => {
        const emailMatch = user.email
            .toLowerCase()
            .includes(searchEmail.toLowerCase());

        const deptMatch = user.department?.toLowerCase()
            .includes(searchDept.toLowerCase());

        return emailMatch && deptMatch;
    });


    return (
        <div className="mt-2">
            <h2 className="text-xl font-bold mb-3 capitalize">
                All {role}s ({filteredUsers.length})
            </h2>

            <div className="mb-4 row g-3">
                {/* Email Search */}
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text" id="email-addon">
                            <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                            type="text"
                            style={{ boxShadow: "none" }}
                            className="form-control"
                            placeholder="Search by email..."
                            aria-label="Email"
                            aria-describedby="email-addon"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* Department Search */}
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-building"></i>
                        </span>
                        <input
                            type="text"
                            style={{ boxShadow: "none" }}
                            className="form-control"
                            placeholder="Search by department..."
                            aria-label="Department"
                            aria-describedby="dept-addon"
                            value={searchDept}
                            onChange={(e) => setSearchDept(e.target.value)}
                        />
                    </div>
                </div>
            </div>


            {/* ----- TABLE ----- */}
            {filteredUsers.length === 0 ? (
                <p className="text-gray-500">No matching users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-striped w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Created At</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user, i) => (
                                <tr key={user._id}>
                                    <td>{i + 1}</td>
                                    <td>{`${user.firstName} ${user.lastName}`}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td className="capitalize">{user.department || "—"}</td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default React.memo(AllDescendent)
