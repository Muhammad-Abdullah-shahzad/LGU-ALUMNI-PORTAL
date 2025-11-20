import React from 'react';
import Modal from '../Model/Model';
import ActionBtn from '../ActionBtns/ActionBtn';

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
                <div>Coordinators Management</div>
            </Modal>
        </>
    );
}
