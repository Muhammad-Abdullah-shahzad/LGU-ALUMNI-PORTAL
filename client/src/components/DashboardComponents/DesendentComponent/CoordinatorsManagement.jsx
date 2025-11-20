import React, { useState } from 'react';
import Modal from '../Model/Model';
import ActionBtn from '../ActionBtns/ActionBtn';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import FormHeader from '../../FormHeader/FormHeader';
import { usePost } from '../../../hooks/usePost';
import CoordinatorUtility from '../../../utility/coordinatorUtility';
import FormError from '../../ErrorMessage/ErrorMessage';
import Loader from "../../Loader/Loader"
import Toast from '../../Toast/Toast';

export default function CoordinatorsManagement() {
    const [coordinator, setCoordinator] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "coordinator",
        active:true
    })
    const Base_Url = import.meta.env.VITE_API_URL

    const [errors, setErrors] = useState({});
    const { post, loading, error } = usePost(`${Base_Url}/user/create`);
    
    if (loading) {
        return <Loader />
    }

    return (
        <>
            <ActionBtn
                action="add"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
                icon={<i className="bi bi-person-plus-fill"></i>}
            >
                Add Coordinators
            </ActionBtn>
            <Modal title="Add Coordinators" id="addUserModal" onSubmit={(e) => { CoordinatorUtility.handleSubmit(e, coordinator, setErrors, post) }}>
                <FormHeader>
                    Fill in the details to add a new coordinator
                </FormHeader>

                <InputField type="text" label="First Name" placeholder="Enter First Name" onChange={(e) => { setCoordinator({ ...coordinator, firstName: e.target.value }) }} />
                <FormError errors={errors} errorKey="firstName" />
                <InputField type="text" label="Last Name" placeholder="Enter Last Name" onChange={(e) => setCoordinator({ ...coordinator, lastName: e.target.value })} />
                <FormError errors={errors} errorKey="lastName" />
                <InputField type="email" label="Email" placeholder="Enter Email Address" onChange={(e) => {
                    setCoordinator({ ...coordinator, email: e.target.value })
                }} />
                <FormError errors={errors} errorKey="email" />
                <InputField type="password" label="Password" placeholder="Enter Password" onChange={(e) => setCoordinator({ ...coordinator, password: e.target.value })} />
                <FormError errors={errors} errorKey="password" />
                <Button type="submit">Create</Button>

            </Modal>
            {error && <Toast type="error" message={error} />}
        </>
    );
}
