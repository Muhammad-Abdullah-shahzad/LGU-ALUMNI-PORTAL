  import { Modal as BootstrapModal } from 'bootstrap';
import ActionBtn from '../ActionBtns/ActionBtn';
import Modal from '../Model/Model';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import {cloudinaryUpload} from "../../../utility/cloudinaryUpload"
import { useState } from 'react';

export default function AddPost({ title, postReq , refetch }) {

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
        imageFile: null, // store raw file
    });

    // Update fields
    const handleChange = (key, value) => {
        setPostData(prev => ({ ...prev, [key]: value }));
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
        await refetch()
        

    } catch (error) {
        console.log("Post create error:", error);
    }
};

    return (
        <>
            {/* Add Button */}
            <ActionBtn
                action="add"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
                icon={<i className="bi bi-person-plus-fill"></i>}
            >
                Add Post
            </ActionBtn>

            {/* Modal */}
            <Modal
                title=""
                id="addUserModal"
                centered={true}
                onSubmit={handleSubmit}
            >
                <div className="p-4 text-center">
                    <h4 className="fw-bold mb-3 text-success">{title || "Add New Post"}</h4>

                    <div className="d-flex flex-column gap-3 text-start">

                        {/* Image Upload */}
                        <InputField
                            type="file"
                            label="Post Image"
                            onChange={(e) =>
                                handleChange("imageFile", e.target.files[0])
                            }
                        />

                        {/* Title */}
                        <InputField
                            type="text"
                            label="Post Title"
                            placeholder="title here"
                            onChange={(e) =>
                                handleChange("postTitle", e.target.value)
                            }
                        />

                        {/* Content */}
                        <label className="form-label">Post Content</label>
                        <textarea
                            className="form-control"
                            placeholder="description here"
                            style={{ boxShadow: "none" }}
                            onChange={(e) =>
                                handleChange("postContent", e.target.value)
                            }
                        ></textarea>

                        {/* Post Link */}
                        <InputField
                            type="text"
                            label="Post Link"
                            placeholder="external link here"
                            onChange={(e) =>
                                handleChange("postLink", e.target.value)
                            }
                        />

                        <div className="d-flex gap-3 justify-content-center mt-4">
                            <button
                                type="button"
                                className="btn btn-light border rounded-pill px-4 py-2"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <Button
                                type="submit"
                                className="btn btn-success rounded-pill px-4 py-2 fw-bold"
                            >
                                Create
                            </Button>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    );
}
