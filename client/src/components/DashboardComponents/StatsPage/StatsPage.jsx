
import StatsCard from "../StatsCard.jsx/StatsCard";
import CardsWrapper from "../CardsWrapper/CardsWrapper";
import LongCard from "../LongCard/longCard";
import DashboardBarChart from "../Charts/BarChart";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import StatsCard1 from "../../../assets/statCard1.jpg";
import StatsCard2 from "../../../assets/statCard2.jpg";
import StatsCard3 from "../../../assets/statCard3.jpg";
import StatsCard4 from "../../../assets/statCard4.jpg";
import { useNavigate } from "react-router-dom";

export default function StatsPage({ data, role }) {
    const navigate = useNavigate()

    return (
        <div>
            <DashboardHeader title={role} onLogout={() => {
                localStorage.removeItem("token");
                navigate('/login')
            }} />
            <div className="container-fluid p-3">
                <CardsWrapper>
                    <StatsCard
                        title="Total Alumni"
                        value={data ? data.totalAlumni : "0"}
                        icon="bi bi-people-fill"
                        bgImage={StatsCard1}
                    />
                    <StatsCard
                        title="Total Employeed Alumni"
                        value={data ? data.totalEmployedAlumni : "0"}
                        icon="bi bi-people-fill"
                        bgImage={StatsCard2}
                    />
                    <StatsCard
                        title="Total Unemployeed Alumni"
                        value={data ? data.totalUnemployedAlumni : "0"}
                        icon="bi bi-people-fill"
                        bgImage={StatsCard3}
                    />

                    <StatsCard
                        title="Total Undergraduates"
                        value={data ? data.totalUndergrad : "0"}
                        icon="bi bi-mortarboard-fill"
                        bgImage={StatsCard1}
                    />
                    <StatsCard
                        title="Employed Undergrads"
                        value={data ? data.totalEmployedUndergrad : "0"}
                        icon="bi bi-briefcase-fill"
                        bgImage={StatsCard2}
                    />
                    <StatsCard
                        title="Unemployed Undergrads"
                        value={data ? data.totalUnemployedUndergrad : "0"}
                        icon="bi bi-person-x-fill"
                        bgImage={StatsCard3}
                    />
                    <StatsCard
                        title="Total Coordinators"
                        value={data?.totalCoordinators}
                        icon="bi bi-people-fill"
                        bgImage={StatsCard4}
                    />

                    <LongCard
                        heading="Recent Notifications"
                        headKey='notificationType'
                        bodyKey='notificationContent'
                        actionBtns={false}
                        notifications={
                            data ? data.notifications : []
                        }
                    />

                </CardsWrapper>
                <CardsWrapper>

                    <DashboardBarChart
                        className='col-md-6 col-sm-12 mb-4'
                        data={data ? data.departmentWiseCount : []}
                        // data={[
                        //     { department: "CS", count: 120 },
                        //     { department: "SE", count: 180 },
                        //     { department: "IT", count: 60 },
                        // ]}
                        Xkey="department"
                        Ykey="count"
                        heading="Alumni Count Distribution"
                        Xtype="category"
                        Ytype="number"
                        BarKey="count"
                        barColor="#053884ff"
                    />

                    <DashboardBarChart
                        className='col-md-6 col-sm-12 mb-4'
                        data={data ? data.departmentWiseEmployed : []}
                        // data={[
                        //     { department: "CS", employed: 120 },
                        //     { department: "SE", employed: 180 },
                        //     { department: "IT", employed: 60 },
                        // ]}
                        Xkey="employed"
                        Ykey="department"
                        heading="Alumni Emplyment Distribution"
                        layout="vertical"
                        Xtype="number"
                        Ytype="category"
                        BarKey="employed"
                        barColor="#d17205ff"
                    />

                </CardsWrapper>
            </div>
        </div>
    );
}