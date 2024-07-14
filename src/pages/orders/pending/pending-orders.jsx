import React, { useEffect, useState } from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { get_pending_orders } from "../../../services/order";
import UserIcon from "@svg/user";
function Pending_Orders() {
  const [pendingOrders, setPendingOrders] = useState([]);
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
  const getPendingOrders = () => {
    get_pending_orders()
      .then((res) => {
        console.log(res.data);
        setPendingOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error");
      });
  };

  useEffect(() => {
    getPendingOrders();
  }, []);

  return (
    <>
      <section className="p-4 h-screen">
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Pending Orders</span>
          </div>
          <div> </div>
        </div>
        {/* main section */}
        <section className="w-full">
          <div className="pb-20 mt-5">
            {pendingOrders.length === 0 ? (
              <p className="text-center mt-5">No Orders Found.</p>
            ) : (
              pendingOrders.map((row, index) => (
                <Components.Accordion key={index} className="mb-3">
                  <Components.AccordionSummary
                    expandIcon={<Components.Icons.KeyboardArrowDownRounded />}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start">
                        <div className="mt-1">
                          <UserIcon height="40px" width="40px" />
                        </div>
                        <div className="flex flex-col ms-3">
                          <span className="font-semibold capitalize">
                            {row?.customer_name}
                          </span>
                          <span className="font-semibold text-dull capitalize">
                            {row?.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Components.AccordionSummary>
                  <Components.AccordionDetails>
                    <div>
                      <p className="font-semibold mt-2">Shop Name</p>
                      <p>{row?.shop_name}</p>
                      <p className="font-semibold mt-2">Phone</p>
                      <p>{row?.phone}</p>
                      <p className="font-semibold mt-2">Pending Orders</p>
                      <p>{row?.pending_orders.length}</p>
                      <p className="font-semibold mt-2">Total Amount</p>
                      <p>
                        {formatCurrency(
                          row.pending_orders.reduce(
                            (acc, curr) => acc + curr.total_amount,
                            0
                          )
                        )}
                        &nbsp;
                        <span className="text-green-700">
                          (+
                          {formatCurrency(
                            row?.pending_orders &&
                              row.pending_orders.reduce(
                                (acc, curr) => acc + curr.total_amount,
                                0
                              ) -
                                row.pending_orders.reduce(
                                  (acc, curr) => acc + curr.pending,
                                  0
                                )
                          )}
                          )
                        </span>
                      </p>

                      <p className="font-semibold mt-2">Total Pending</p>
                      <p>
                        {formatCurrency(
                          row?.pending_orders.reduce(
                            (acc, curr) => acc + curr.pending,
                            0
                          )
                        )}
                      </p>
                    </div>
                  </Components.AccordionDetails>
                  {/* <hr /> */}
                </Components.Accordion>
              ))
            )}
          </div>
        </section>
      </section>
    </>
  );
}

export default Pending_Orders;
