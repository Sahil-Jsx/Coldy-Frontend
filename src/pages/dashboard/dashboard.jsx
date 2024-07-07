import { useEffect, useState } from "react";
import Components from "../../components/components";
import Greetings from "../../components/greeting/greetings";
import Speed_Dial from "../../components/speed-dial/speed-dial";
import { get_dashboard } from "../../services/dashboard";

const Dashboard = () => {
  const formatCurrency = (value) => {
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
        console.log(res.data);
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
          <span className="font-semibold text-2xl">Hello, Admin</span>
          <Greetings />
        </div>
        <section>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <Components.Card className="p-4">
              <div>
                <span className="font-semibold text-orange">Today</span>
                <div>
                  <span>
                    {formatCurrency(dashboardData?.today_revenue)}&nbsp;-
                    <span className="text-red-500">
                      &nbsp; ({formatCurrency(dashboardData?.today_pending)}){" "}
                    </span>
                  </span>
                </div>
              </div>
            </Components.Card>
            <Components.Card className="p-4">
              <div>
                <span className="font-semibold text-orange">Pending</span>
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
