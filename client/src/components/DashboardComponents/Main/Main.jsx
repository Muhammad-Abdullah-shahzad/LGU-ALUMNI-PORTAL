import StatsCard from "../StatsCard.jsx/StatsCard";
import CardsWrapper from "../CardsWrapper/CardsWrapper";
import LongCard from "../LongCard/longCard";
import DashboardDonut from "../Charts/Donut";
import DashboardBarChart from "../Charts/BarChart";

export default function Main() {
    return (
        <div className="container-fluid p-3">
            <CardsWrapper>
                <StatsCard
                    title="Total Alumni"
                    value="1,250"
                    icon="bi bi-people-fill"
                    color="#4e73df"
                />
                <StatsCard
                    title="Total Alumni"
                    value="1,250"
                    icon="bi bi-people-fill"
                    color="#4e73df"
                />
                <StatsCard
                    title="Total Alumni"
                    value="1,250"
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
                    notifications={[
                        {
                            title: "New User Registered",
                            message: "A new user has signed up using Google."
                        },
                        {
                            title: "Order Pending",
                            message: "Order #2025 needs approval."
                        },
                    ]}
                />
            </CardsWrapper>
            <CardsWrapper title="Alumni Distribution by Department">
                <DashboardBarChart
                    className='col-md-6 col-sm-12 mb-4'
                    data={[
                        { department: 'CS', count: 40 },
                        { department: 'SE', count: 20 },
                        { department: 'IT', count: 35 },
                    ]}
                    Xkey="department"
                    Ykey="count"
                    heading="Alumni Count Distribution"
                />
                <DashboardDonut
                    data={[
                        { department: 'CS', employeed: 40 },
                        { department: 'SE', employeed: 20 },
                        { department: 'IT', employeed: 35 },
                    ]}
                    className='col-md-6 col-sm-12 mb-4'
                    Ykey="employeed"
                    Xkey="department"
                    heading="Alumni Employment Distribution"
                />
            </CardsWrapper>
        </div>
    );
}       
