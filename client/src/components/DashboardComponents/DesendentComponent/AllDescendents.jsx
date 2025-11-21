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

  const [searchEmail, setSearchEmail] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

   if(loading || deleting) return <Loader/>

  const users = data?.users || [];

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      (user.department?.toLowerCase() || "").includes(searchDept.toLowerCase())
  );

  const handleDelete = async () => {

    
    if (!selectedUser) return;

    console.log("selected user",selectedUser);
    
    try {
      await remove({ id: selectedUser._id });
      console.log("remove executed");
      
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
    <div className="mt-2">
      <h2 className="text-xl font-bold mb-3 capitalize">
        All {role}s ({filteredUsers.length})
      </h2>

      {/* Search Inputs */}
      <div className="mb-4 row g-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search by email"
            value={searchEmail}
            style={{boxShadow:"none"}}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
             style={{boxShadow:"none"}}
            className="form-control"
            placeholder="Search by department"
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
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
                <th>Actions</th>
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
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm rounded-circle"
                      style={{ width: 35, height: 35, padding: 0 }}
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
      <Modal id="deleteModal" title="Confirm Delete"onSubmit={(e)=>{
        e.preventDefault();
        handleDelete()
      }} >
        <FormHeader textStyle="text-danger">
          {selectedUser
            ? `Do you want to delete ${selectedUser.firstName}?`
            : ""}
        </FormHeader>

        <ButtonComponent
          className="btn-danger"
          type="submit"
      >
          Confirm Delete
        </ButtonComponent>
      </Modal>
    </div>
  );
}

export default React.memo(AllDescendent);
