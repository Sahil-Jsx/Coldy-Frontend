import { useEffect, useState } from "react";
import Components from "../../components/components";
import Greetings from "../../components/greeting/greetings";
import Speed_Dial from "../../components/speed-dial/speed-dial";
import { get_dashboard } from "../../services/dashboard";

const Dashboard = () => {
  const formatCurrency = (value) => {
    if (!value) {
      return "₹0";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const actions = [
    {
      icon: <Components.Icons.PeopleOutlineOutlined />,
      name: "Customers",
      path: "customers",
    },
    {
      icon: <Components.Icons.LocationOnRounded />,
      name: "Places",
      path: "places",
    },
    {
      icon: <Components.Icons.Inventory2Rounded />,
      name: "Products",
      path: "products",
    },
    {
      icon: <Components.Icons.ChecklistRtlRounded />,
      name: "Orders",
      path: "orders",
    },
  ];

  const [dashboardData, setDashboardData] = useState({});

  const getDashboard = () => {
    get_dashboard()
      .then((res) => {
        // console.log(res.data);
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <>
      <section className="m-3">
        <div>
          <span className="font-semibold text-2xl">Dashboard</span>
          <Greetings />
        </div>
        <section>
          <div className="grid grid-cols-2 gap-8 mt-5">
            <Components.Card className="p-4" style={{ borderRadius: "15px" }}>
              <div>
                <div
                  className="bg-orange w-fit p-3 rounded-2xl"
                  style={{ color: "#fefefe" }}
                >
                  <Components.Icons.CalendarTodayOutlined fontSize="medium" />
                </div>
                <div className="mt-2">
                  <span className="text-orange font-semibold text-lg">
                    Today
                  </span>
                </div>
                <div>
                  <span>{formatCurrency(dashboardData?.today_revenue)}</span>
                </div>
              </div>
            </Components.Card>
            <Components.Card className="p-4" style={{ borderRadius: "15px" }}>
              <div>
                <div
                  className="bg-orange w-fit p-3 rounded-2xl"
                  style={{ color: "#fefefe" }}
                >
                  <Components.Icons.PendingActionsOutlined fontSize="medium" />
                </div>
                <div className="mt-2">
                  <span className="text-orange font-semibold text-lg">
                    Pending
                  </span>
                </div>
                <div>
                  <span>{formatCurrency(dashboardData?.pending)}</span>
                </div>
              </div>
            </Components.Card>
          </div>
        </section>
        <div>
          <Speed_Dial actions={actions} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
