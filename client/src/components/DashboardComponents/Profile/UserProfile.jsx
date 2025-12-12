import React from "react";
import ProfileWrapper from "./ProfileWrapper"
import MainCard from "./MainCard"
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch"
import Loader from "../../Loader/Loader";
import SideCard from "./SideCard";

export default function UserProfile() {
    const { id } = useParams();
    const Base_URL = import.meta.env.VITE_API_URL;

    const { data, loading, error } = useFetch(`${Base_URL}/user/id/${id}`)

    if (loading) return <Loader />
    if (error) return <div className="text-center mt-5">Error loading profile</div>
    if (!data || !data.user) return <div className="text-center mt-5">User not found</div>

    console.log("data of user ", data);

    return (
        <div className="container">
            <ProfileWrapper className=" justify-content-center gap-4">
                <MainCard data={data} className="col-lg-6 col-md-6 col-sm-12" />
                <ProfileWrapper className="flex-column p-0 col-md-12 col-lg-6 align-content-center  gap-4">
                    <SideCard data={{
                        degree: data.user.degree,
                        batch: data.user.batch

                    }} />
                    <SideCard data={{
                        jobTitle: data.user.jobTitle,
                        firstName: data.user.firstName,
                        lastName: data.user.lastName
                    }} />

                    <SideCard data={{
                        companyName: data.user.companyName,
                        graduationYear: data.user.graduationYear,
                        role: data.user.role
                    }} />
                </ProfileWrapper>
            </ProfileWrapper>
        </div>
    )
}
