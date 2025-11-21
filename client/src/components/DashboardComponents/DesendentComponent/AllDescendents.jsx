import React, { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useDelete } from "../../../hooks/useDelete";

import Modal from "../Model/Model";
import FormHeader from "../../FormHeader/FormHeader";
import ButtonComponent from "../../Button/Button";
import { Modal as BModal } from "bootstrap";
import Loader from "../../Loader/Loader";

function AllDescendent({ role }) {
  const Base_URL = import.meta.env.VITE_API_URL;
  const { data, loading, refetch } = useFetch(`${Base_URL}/user/${role}`);
  const { remove, loading: deleting } = useDelete(`${Base_URL}/user/delete`);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading || deleting) return <Loader />;

  const users = data?.users || [];

  const filteredUsers = users.filter((user) =>
    `${user.email} ${user.department}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await remove({ id: selectedUser._id });
      await refetch();
      setSelectedUser(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const closeModal = () => {
    const modalEl = document.getElementById("deleteModal");
    if (!modalEl) return;
    const modal = BModal.getInstance(modalEl);
    if (modal) modal.hide();
  };

  return (
    <div className="mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-capitalize m-0">
          All {role}s 
          <span className="text-muted fs-6"> ({filteredUsers.length})</span>
        </h2>
      </div>

      {/* Modern Search Bar */}
    <div className="top-bar glass-card shadow-sm mb-4">
        <div className="search-box full-width">
          <i className="bi bi-search"></i>
          <input
            className="search-input"
            placeholder="Search by email or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Modern Table */}
      {filteredUsers.length === 0 ? (
        <p className="text-muted text-center py-4 fs-5">
          No matching users found.
        </p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="bg-light text-secondary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Created At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={user._id}>
                  <td className="fw-semibold">{i + 1}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td className="text-capitalize">{user.role}</td>
                  <td className="text-capitalize">{user.department || "—"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                  {/* Delete Button */}
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm rounded-circle"
                      style={{ width: 36, height: 36 }}
                      title="Delete"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => setSelectedUser(user)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        id="deleteModal"
        title=""
        centered={true} 
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        <div className="text-center p-4">

          {/* Warning Icon */}
          <div
            className="mb-3"
            style={{
              fontSize: "48px",
              color: "#dc3545",
            }}
          >
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>

          {/* Heading */}
          <h5 className="fw-bold text-danger">Delete Confirmation</h5>

          {/* Text */}
          <p className="text-muted">
            {selectedUser ? (
              <>
                Are you sure you want to delete {selectedUser.firstName} from <br />
                coordinators? This action cannot be undone.
              </>
            ) : (
              "Are you sure you want to delete this item?"
            )}
          </p>

          {/* Buttons */}
          <div className="d-flex gap-3 justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-light border rounded-pill px-4"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <ButtonComponent
              className="btn-danger rounded-pill px-4"
              type="submit"
            >
              Delete
            </ButtonComponent>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(AllDescendent);
