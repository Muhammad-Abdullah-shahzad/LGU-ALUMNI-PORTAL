import React from 'react';
import Modal from '../Model/Model';
import ActionBtn from '../ActionBtns/ActionBtn';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import FormHeader from '../../FormHeader/FormHeader';

export default function CoordinatorsManagement() {
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

            <Modal title="Add Coordinators" id="addUserModal">
                <FormHeader>
                     Fill in the details to add a new coordinator
                </FormHeader>
                <InputField type="text" label="First Name" placeholder="Enter First Name" />
                <InputField type="text" label="Last Name" placeholder="Enter Last Name" />
                <InputField type="email" label="Email" placeholder="Enter Email Address" />
                <InputField type="password" label="Password" placeholder="Enter Password" />
                 <Button type="submit">Create</Button>
            </Modal>
        </>
    );
}
