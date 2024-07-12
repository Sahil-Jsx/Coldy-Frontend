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
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-semibold">Dashboard</span>
            <Greetings />
          </div>
          <div>
            <button
              type="button"
              className="bg-background p-2 rounded-full flex justify-center items-center text-offwhite"
            >
              <Components.Icons.PermIdentityOutlined />
            </button>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-2 gap-8 mt-5">
            <Components.Card className="p-4" style={{ borderRadius: "15px" }}>
              <div>
                <div
                  className="bg-background w-fit p-3 rounded-2xl"
                  style={{ color: "#fefefe" }}
                >
                  <Components.Icons.CalendarTodayOutlined fontSize="medium" />
                </div>
                <div className="mt-2">
                  <span className="text-orange font-semibold text-md">
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
                  className="bg-background w-fit p-3 rounded-2xl"
                  style={{ color: "#fefefe" }}
                >
                  <Components.Icons.PendingActionsOutlined fontSize="medium" />
                </div>
                <div className="mt-2">
                  <span className="text-orange font-semibold text-md">
                    Pending
                  </span>
                </div>
                <div>
                  <span>{formatCurrency(dashboardData?.pending)}</span>
                </div>
              </div>
            </Components.Card>
          </div>
          <Components.Card className=" mt-3" style={{ borderRadius: "15px" }}>
            <div className="w-full">
              <Components.BarChart
                className="w-full"
                xAxis={[
                  {
                    colorMap: {
                      type: "ordinal",
                      colors: ["#fa8569"],
                    },
                    scaleType: "band",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    barGapRatio: 0.5,
                    categoryGapRatio: 0.5,
                  },
                ]}
                series={[{ data: [4, 3, 5, 5, 4, 3, 2] }]}
                height={220}
              />
            </div>
          </Components.Card>
        </section>
        <div>
          <Speed_Dial actions={actions} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
