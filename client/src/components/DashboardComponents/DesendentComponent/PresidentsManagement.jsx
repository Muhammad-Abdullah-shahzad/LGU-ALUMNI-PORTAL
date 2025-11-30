import { useState } from 'react';
import { usePost } from '../../../hooks/usePost';
import AddDescendent from './AddDescendent';
import AllDescendent from './AllDescendents';
import Loader from "../../Loader/Loader"
import Toast from '../../Toast/Toast';


export default function PresidentManagement() {
    const [coordinator, setCoordinator] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "president",
        department: "",
        active: true
    })

    const Base_Url = import.meta.env.VITE_API_URL

    const [errors, setErrors] = useState({});
    const { post, loading, error } = usePost(`${Base_Url}/user/create`);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <AddDescendent title="Fill President Details" descendent={coordinator} setErrors={setErrors} post={post} errors={errors} setDescendent={setCoordinator} />
            <AllDescendent role='president' />
            {error && <Toast type="error" message={error} />}
        </>
    );
}
