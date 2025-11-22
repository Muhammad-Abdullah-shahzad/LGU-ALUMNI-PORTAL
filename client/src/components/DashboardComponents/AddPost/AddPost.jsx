// AddPost.jsx
import { Modal as BootstrapModal } from "bootstrap";
import ActionBtn from "../ActionBtns/ActionBtn";
import Modal from "../Model/Model";
import InputField from "../../InputField/InputField";
import Button from "../../Button/Button";
import { cloudinaryUpload } from "../../../utility/cloudinaryUpload";
import { useState } from "react";

export default function AddPost({ title, postReq, refetch }) {
  const [postData, setPostData] = useState({
    headerImageURL: "",
    authorAvatarURL: "",
    authorTitle: "Software Engineer",
    authorId: "",
    authorName: "M.Abdullah",
    likes: 0,
    commentCount: 0,
    postLink: "",
    postTitle: "",
    postContent: "",
    imageFile: null,
  });

  // Update fields
  const handleChange = (key, value) => {
    setPostData((prev) => ({ ...prev, [key]: value }));
  };

  // Utility: cleanup any leftover modal leftovers
  const cleanupModalLeftovers = (modalId = "addUserModal") => {
    try {
      // remove any modal-backdrop elements
      document.querySelectorAll(".modal-backdrop").forEach((n) => n.remove());
      // remove modal-open class
      document.body.classList.remove("modal-open");
      // reset overflow
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";

      // If Bootstrap Modal instance exists, hide it to ensure it triggers events
      const modalEl = document.getElementById(modalId);
      if (modalEl) {
        const inst = BootstrapModal.getInstance(modalEl);
        if (inst) inst.hide();
      }
    } catch (e) {
      console.warn("cleanupModalLeftovers error:", e);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let dataToSend = { ...postData };

      // Upload image first
      if (postData.imageFile) {
        const imageURL = await cloudinaryUpload(postData.imageFile);
        dataToSend.headerImageURL = imageURL;
      }

      // Call API
      await postReq(dataToSend);

      // Force-hide the modal (preferred: use bootstrap instance)
      const modalEl = document.getElementById("addUserModal");
      if (modalEl) {
        // If an instance exists, hide it
        const instance = BootstrapModal.getInstance(modalEl) || new BootstrapModal(modalEl);
        instance.hide();
      }

      // small delay to let bootstrap remove backdrop, then extra cleanup
      setTimeout(() => {
        // Remove any stray backdrops and restore scrolling
        cleanupModalLeftovers("addUserModal");

        // Optionally reset form state
        setPostData({
          headerImageURL: "",
          authorAvatarURL: "",
          authorTitle: "Software Engineer",
          authorId: "",
          authorName: "M.Abdullah",
          likes: 0,
          commentCount: 0,
          postLink: "",
          postTitle: "",
          postContent: "",
          imageFile: null,
        });

        // Refresh posts
        if (typeof refetch === "function") refetch();
      }, 150); // small timeout to let bootstrap do its internal tasks
    } catch (error) {
      console.log("Post create error:", error);
      // In case of error, ensure modal can be closed and page scroll restored
      cleanupModalLeftovers("addUserModal");
    }
  };

  return (
    <div style={{ overflowY: "scroll" }}>
      {/* Add Button */}
      <ActionBtn
        action="add"
        data-bs-toggle="modal"
        data-bs-target="#addUserModal"
        icon={<i className="bi bi-person-plus-fill"></i>}
      >
        Add Post
      </ActionBtn>

      {/* Modal (your existing Modal component is still used for UI) */}
      <Modal title="" id="addUserModal" centered={true} onSubmit={handleSubmit}>
        <div className="p-4 text-center">
          <h4 className="fw-bold mb-3 text-success">{title || "Add New Post"}</h4>

          <div className="d-flex flex-column gap-3 text-start">
            {/* Image Upload */}
            <InputField
              type="file"
              label="Post Image"
              onChange={(e) => handleChange("imageFile", e.target.files[0])}
            />

            {/* Title */}
            <InputField
              type="text"
              label="Post Title"
              placeholder="title here"
              onChange={(e) => handleChange("postTitle", e.target.value)}
              value={postData.postTitle}
            />

            {/* Content */}
            <label className="form-label">Post Content</label>
            <textarea
              className="form-control"
              placeholder="description here"
              style={{ boxShadow: "none" }}
              onChange={(e) => handleChange("postContent", e.target.value)}
              value={postData.postContent}
            ></textarea>

            {/* Post Link */}
            <InputField
              type="text"
              label="Post Link"
              placeholder="external link here"
              onChange={(e) => handleChange("postLink", e.target.value)}
              value={postData.postLink}
            />

            <div className="d-flex gap-3 justify-content-center mt-4">
              <button
                type="button"
                className="btn btn-light border rounded-pill px-4 py-2"
                data-bs-dismiss="modal"
                onClick={() => {
                  // ensure cleanup on manual cancel
                  cleanupModalLeftovers("addUserModal");
                }}
              >
                Cancel
              </button>

              <Button type="submit" className="btn btn-success rounded-pill px-4 py-2 fw-bold">
                Create
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
