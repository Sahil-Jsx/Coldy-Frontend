import Components from "../../components/components";
import Greetings from "../../components/greeting/greetings";
import Speed_Dial from "../../components/speed-dial/speed-dial";

const Dashboard = () => {
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
                <span className="font-semibold text-orange">This Year</span>
                <div>
                  <span>₹ 1,23,456</span>
                </div>
              </div>
            </Components.Card>
            <Components.Card className="p-4">
              <div>
                <span className="font-semibold text-orange">This Month</span>
                <div>
                  <span>₹ 5,750</span>
                </div>
              </div>
            </Components.Card>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <Components.Card className="p-4">
              <div>
                <span className="font-semibold text-orange">Today</span>
                <div>
                  <span>₹ 1,23,456</span>
                </div>
              </div>
            </Components.Card>
            <Components.Card className="p-4">
              <div>
                <span className="font-semibold text-orange">Pending</span>
                <div>
                  <span>₹ 5,750</span>
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
