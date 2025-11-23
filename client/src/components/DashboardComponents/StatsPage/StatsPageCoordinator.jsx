import DashboardLineChart from "../Charts/LineChart";
import StatsCard from "../StatsCard.jsx/StatsCard";
import CardsWrapper from "../CardsWrapper/CardsWrapper";
import LongCard from "../LongCard/longCard";
import DashboardBarChart from "../Charts/BarChart";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import StatsCard1 from "../../../assets/statCard1.jpg";
import StatsCard2 from "../../../assets/statCard2.jpg";
import StatsCard3 from "../../../assets/statCard3.jpg";
import StatsCard4 from "../../../assets/statCard4.jpg";

export default function StatsPage({ data, delNotify, onAccept, rejectFunc , refetch , role }) {
    return (
        <div>
            <DashboardHeader title={role} />
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
                        title="Total Alumni"
                        value="1,250"
                        icon="bi bi-people-fill"
                        bgImage={StatsCard4}
                    />

                    <LongCard
                        heading="Recent Notifications"
                        headKey='notificationType'
                        bodyKey='notificationContent'
                        actionBtns={true}
                        onAccept={onAccept}
                        delNotify={delNotify}
                        rejectFunc={rejectFunc}
                        refetch={refetch}
                        notifications={
                            data ? data.notifications : []
                        }
                    />

                </CardsWrapper>
                <CardsWrapper>
                <DashboardLineChart
                    data={data.employeedBygraduationYear}
                    heading="Final Employment Chart"
                    Xkey="graduationYear"
                    Ykey="count"
                />
                </CardsWrapper>
            </div>
        </div>
    );
}