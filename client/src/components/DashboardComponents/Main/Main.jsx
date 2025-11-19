import StatsCard from "../StatsCard.jsx/StatsCard";
import CardsWrapper from "../CardsWrapper/CardsWrapper";
import LongCard from "../LongCard/longCard";
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
        </div>
    );
}       
