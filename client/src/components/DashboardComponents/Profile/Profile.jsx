import ProfileWrapper from "./ProfileWrapper"
import MainCard from "./MainCard"

import { useFetch } from "../../../hooks/useFetch"
import Loader from "../../Loader/Loader";
import SideCard from "./SideCard";
export default function ProfileSection() {

    const Base_URL = import.meta.env.VITE_API_URL;
    const loggedInId = JSON.parse(localStorage.user).id
    const { data, loading } = useFetch(`${Base_URL}/user/id/${loggedInId}`)
    if (loading) return <Loader />
    console.log("data of user ", data);

    return (
        <ProfileWrapper className=" justify-content-center gap-4">
            <MainCard data={data} className="col-lg-6 col-md-6 col-sm-12" />
            <ProfileWrapper className="flex-column p-0 col-md-12 col-lg-6 align-content-center  gap-4">
                  <SideCard data={{
                    degree:data.user.degree,
                    batch:data.user.batch
                
              }}/>    
              <SideCard data={{
                jobTitle:data.user.jobTitle,
                firstName:data.user.firstName,
                lastName:data.user.lastName
              }} />            

              <SideCard data={{
                companyName:data.user.companyName,
                graduationYear:data.user.graduationYear,
                role:data.user.role
              }} />            
            </ProfileWrapper>
        </ProfileWrapper>
    )
}