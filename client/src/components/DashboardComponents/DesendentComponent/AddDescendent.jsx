import ActionBtn from '../ActionBtns/ActionBtn';
import Modal from '../Model/Model';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import FormHeader from '../../FormHeader/FormHeader';
import DescendentUtility from "../../../utility/descendentUtility";
import FormError from '../../ErrorMessage/ErrorMessage';
import DropDown from "../../DropDown/DropDown";

export default function AddDescendent({ descendent, setErrors, post, errors, setDescendent, title }) {
    return (
        <>
            {/* Add Button */}
            <ActionBtn
                action="add"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
                icon={<i className="bi bi-person-plus-fill"></i>}
            >
                Add
            </ActionBtn>

            {/* Modal */}
            <Modal
            title="" // No top bar
            id="addUserModal"
            centered={true}
            onSubmit={(e) => {
                DescendentUtility.handleSubmit(e, descendent, setErrors, post);
            }}
            >
            <div className="p-4 text-center">

                {/* Modal Heading */}
                <h4 className="fw-bold mb-3 text-success">{title || "Add New User"}</h4>

                {/* Form Fields */}
                <div className="d-flex flex-column gap-3 text-start">

                {/* First Name */}
                <InputField
                    type="text"
                    label="First Name"
                    placeholder="Enter First Name"
                    onChange={(e) =>
                    setDescendent({ ...descendent, firstName: e.target.value })
                    }
                    className="rounded-pill px-3 py-2 shadow-sm border"
                />
                <FormError errors={errors} errorKey="firstName" />

                {/* Last Name */}
                <InputField
                    type="text"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    onChange={(e) =>
                    setDescendent({ ...descendent, lastName: e.target.value })
                    }
                    className="rounded-pill px-3 py-2 shadow-sm border"
                />
                <FormError errors={errors} errorKey="lastName" />

                {/* Email */}
                <InputField
                    type="email"
                    label="Email"
                    placeholder="Enter Email Address"
                    onChange={(e) =>
                    setDescendent({ ...descendent, email: e.target.value })
                    }
                    className="rounded-pill px-3 py-2 shadow-sm border"
                />
                <FormError errors={errors} errorKey="email" />

                {/* Password */}
                <InputField
                    type="password"
                    label="Password"
                    placeholder="Enter Password"
                    onChange={(e) =>
                    setDescendent({ ...descendent, password: e.target.value })
                    }
                    className="rounded-pill px-3 py-2 shadow-sm border"
                />
                <FormError errors={errors} errorKey="password" />

                {/* Department Dropdown */}
                <DropDown
                    onChange={(e) =>
                    setDescendent({ ...descendent, department: e.target.value })
                    }
                    value={descendent.department}
                    className="rounded-pill px-3 py-2 shadow-sm border text-muted"
                >
                    <DropDown.Option value="">Select Department</DropDown.Option>
                    <DropDown.Option value="SE">SE</DropDown.Option>
                    <DropDown.Option value="CS">CS</DropDown.Option>
                    <DropDown.Option value="IT">IT</DropDown.Option>
                </DropDown>
                <FormError errors={errors} errorKey="department" />

                {/* Action Buttons */}
                <div className="d-flex gap-3 justify-content-center mt-4">
                    {/* Cancel Button */}
                    <button
                    type="button"
                    className="btn btn-light border rounded-pill px-4 py-2"
                    data-bs-dismiss="modal"
                    >
                    Cancel
                    </button>

                    {/* Submit Button */}
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
