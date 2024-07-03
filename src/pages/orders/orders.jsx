import React, { useEffect, useState } from "react";
import Backbutton from "../../components/back/back";
import Components from "../../components/components";
import Speed_Dial from "../../components/speed-dial/speed-dial";
import { delete_order, get_orders } from "../../services/order";
import OrderPending from "../../assets/svgs/order-pending";
import OrderCompleted from "../../assets/svgs/order-completed";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const actions = [
    {
      icon: <Components.Icons.Add />,
      name: "Add New",
      path: "orders/add",
    },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getOrderDetails = () => {
    get_orders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editButtonClick = (order_id) => {
    navigate(`${order_id}`);
  };

  const deleteButtonClick = (order_id) => {
    delete_order(order_id)
      .then((res) => {
        toast.success("Order Deleted Successfully");
        getOrderDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <section className="p-4 h-screen">
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Orders</span>
          </div>
          <div></div>
        </div>
        {/* main section */}
        <section className="w-full">
          <div className="pb-20">
            {orders.length === 0 ? (
              <p className="text-center mt-5">No Orders Found.</p>
            ) : (
              orders.map((order, index) => (
                <Components.Accordion key={index} className="my-5">
                  <Components.AccordionSummary
                    expandIcon={<Components.Icons.KeyboardArrowDownRounded />}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start">
                        <div className="mt-1">
                          {order?.status === 1 ? (
                            <OrderCompleted height="40px" width="40px" />
                          ) : (
                            <OrderPending height="40px" width="40px" />
                          )}
                        </div>
                        <div className="flex flex-col ms-3">
                          <span className="font-semibold capitalize">
                            {order?.customer_id?.customer_name}
                          </span>
                          <span className="font-semibold text-dull capitalize">
                            {order?.order_no}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Components.AccordionSummary>
                  <Components.AccordionDetails>
                    <div>
                      <p className="font-semibold mt-2">Shop Name</p>
                      <p>{order?.customer_id?.shop_name}</p>
                      <p className="font-semibold mt-2">Phone</p>
                      <p>{order?.customer_id?.phone}</p>
                      <p className="font-semibold mt-2">Item Count</p>
                      <p>
                        {
                          order?.order_details?.filter(
                            (product) => product.quantity > 0
                          ).length
                        }
                      </p>

                      <p className="font-semibold mt-2">Total Amount</p>
                      <p>
                        {formatCurrency(order?.total_amount)}{" "}
                        {order?.status === 0 && (
                          <>
                            <span className="text-green-800">
                              (+
                              {formatCurrency(
                                order?.total_amount - order?.pending
                              )}
                              )
                            </span>
                          </>
                        )}
                      </p>
                      {order?.status === 0 && (
                        <>
                          <p className="font-semibold mt-2">Pending Amount</p>
                          <p className="text-red-500">
                            {formatCurrency(order?.pending)}
                          </p>
                        </>
                      )}
                    </div>
                  </Components.AccordionDetails>
                  <hr />
                  <Components.AccordionActions>
                    <div className="flex justify-between w-full mx-5">
                      <div onClick={() => editButtonClick(order._id)}>
                        <Components.Icons.Edit fontSize="medium" />
                      </div>
                      <div
                        className="text-red-600"
                        onClick={() => deleteButtonClick(order._id)}
                      >
                        <Components.Icons.DeleteOutlineRounded />
                      </div>
                    </div>
                  </Components.AccordionActions>
                </Components.Accordion>
              ))
            )}
          </div>
        </section>
        {/* speed dial */}
        <div>
          <Speed_Dial actions={actions} />
        </div>
      </section>
    </>
  );
};

export default Orders;
