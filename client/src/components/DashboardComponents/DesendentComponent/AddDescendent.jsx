
import ActionBtn from '../ActionBtns/ActionBtn';
import Modal from '../Model/Model';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import FormHeader from '../../FormHeader/FormHeader';
import DescendentUtility from "../../../utility/descendentUtility"
import FormError from '../../ErrorMessage/ErrorMessage';
import DropDown from "../../DropDown/DropDown"

export default function AddDescendent({ descendent, setErrors, post, errors, setDescendent, title }) {
    return (
        <>
            <ActionBtn
                action="add"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
                icon={<i className="bi bi-person-plus-fill"></i>}
            >
                Add
            </ActionBtn>
            <Modal title={'*fill corect details'} id="addUserModal" onSubmit={(e) => { DescendentUtility.handleSubmit(e, descendent, setErrors, post) }}>
                <FormHeader>
                    {title}
                </FormHeader>

                <InputField type="text" label="First Name" placeholder="Enter First Name" onChange={(e) => { setDescendent({ ...descendent, firstName: e.target.value }) }} />
                <FormError errors={errors} errorKey="firstName" />
                <InputField type="text" label="Last Name" placeholder="Enter Last Name" onChange={(e) => setDescendent({ ...descendent, lastName: e.target.value })} />
                <FormError errors={errors} errorKey="lastName" />
                <InputField type="email" label="Email" placeholder="Enter Email Address" onChange={(e) => {
                    setDescendent({ ...descendent, email: e.target.value })
                }} />
                <FormError errors={errors} errorKey="email" />
                <InputField type="password" label="Password" placeholder="Enter Password" onChange={(e) => setDescendent({ ...descendent, password: e.target.value })} />
                <FormError errors={errors} errorKey="password" />
                <DropDown
                    onChange={e => setDescendent({ ...descendent, department: e.target.value })}
                    value={descendent.department}>
                    <DropDown.Option>Select Department</DropDown.Option>
                    <DropDown.Option>SE</DropDown.Option>
                    <DropDown.Option>CS</DropDown.Option>
                    <DropDown.Option>IT</DropDown.Option>
                </DropDown>
                <FormError errors={errors} errorKey="department" />
                <Button type="submit">Create</Button>

            </Modal>
        </>
    )
}