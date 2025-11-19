import StatsCard from "../StatsCard.jsx/StatsCard";
import CardsWrapper from "../CardsWrapper/CardsWrapper";
import LongCard from "../LongCard/longCard";
import DashboardDonut from "../Charts/Donut";
import DashboardBarChart from "../Charts/BarChart";

import {useFetch} from "../../../hooks/useFetch.js";
import Loader from "../../Loader/Loader.jsx";
export default function Main() {
    const Base_URL=`http://localhost:5000`;
   
  const { data, loading, error, refetch: fetchData } = useFetch(`${Base_URL}/dashboard/admin`);
console.log("admin data from /dashboard/admin",data);

  if(loading){
    return <Loader />;
  }

  return (
        <div className="container-fluid p-3">
            <CardsWrapper>
                <StatsCard
                    title="Total Alumni"
                    value={data?data.totalAlumni:"0"}
                    icon="bi bi-people-fill"
                    color="#4e73df"
                />
                <StatsCard
                    title="Total Employeed Alumni"
                    value={data?data.totalEmployedAlumni:"0"}
                    icon="bi bi-people-fill"
                    color="#4e73df"
                />
                <StatsCard
                    title="Total Unemployeed Alumni"
                    value={data?data.totalUnemployedAlumni:"0"}
                    icon="bi bi-people-fill"
                    color="#4e73df"
                />
                <StatsCard
                    title="Total Alumni"
                    value="1,250"
                    icon="bi bi-people-fill"
                    color="#4e73df"
                />

                <LongCard
                    heading="Recent Notifications"
                    headKey='title'
                    bodyKey='message'
                    notifications={data?data.notifications:[]}
                />

            </CardsWrapper>
            <CardsWrapper title="Alumni Distribution by Department">
                <DashboardBarChart
                    className='col-md-6 col-sm-12 mb-4'
                    data={data?data.departmentWiseCount : []}
                    Xkey="department"
                    Ykey="count"
                    heading="Alumni Count Distribution"
                />
                <DashboardDonut
                    data={data?data.departmentWiseEmployed:[]}
                    className='col-md-6 col-sm-12 mb-4'
                    Ykey="employeed"
                    Xkey="department"
                    heading="Alumni Employment Distribution"
                />
            </CardsWrapper>
        </div>
    );
}       
