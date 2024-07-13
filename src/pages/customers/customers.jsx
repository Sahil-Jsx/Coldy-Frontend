import React, { useEffect, useState } from "react";
import Components from "../../components/components";
import Speed_Dial from "../../components/speed-dial/speed-dial";
import UserIcon from "@svg/user";
import Backbutton from "../../components/back/back";
import {
  delete_customer,
  get_customers,
  search_customer,
} from "../../services/customer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDenounce } from "../../hooks/debounce/debounce";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState(null);
  const debouncedSearch = useDenounce(search);

  const actions = [
    {
      icon: <Components.Icons.PersonAddAlt1Rounded />,
      name: "Add New",
      path: "customers/add",
    },
  ];

  const navigate = useNavigate();

  const getCustomers = () => {
    get_customers().then((res) => {
      setCustomers(res.data);
    });
  };

  const editButtonClick = (id) => {
    navigate(`/customers/${id}`);
  };

  const deleteButtonClick = (id) => {
    delete_customer(id)
      .then((res) => {
        toast.success("Customer Deleted");
        getCustomers();
      })
      .catch((err) => {
        toast.error("Error deleting customer");
      });
  };

  const searchCustomer = (value) => {
    search_customer(value)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error searching customer");
      });
  };

  useEffect(() => {
    if (debouncedSearch) {
      searchCustomer(debouncedSearch);
    } else {
      getCustomers();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <section className="p-4 h-screen">
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Customers</span>
          </div>
          <div></div>
        </div>
        {/* search */}
        <div className="w-full mt-3">
          <Components.TextField
            variant="outlined"
            className="w-full"
            size="small"
            placeholder="Search"
            onChange={(event) => {
              const value = event.target.value;
              setSearch(value);
            }}
          />
        </div>
        {/* main section */}
        <section className="w-full">
          <div className="pb-20">
            {customers.length === 0 ? (
              <p className="text-center mt-5">No customers found.</p>
            ) : (
              customers.map((customer, index) => (
                <Components.Accordion key={index} className="my-5">
                  <Components.AccordionSummary
                    expandIcon={<Components.Icons.KeyboardArrowDownRounded />}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start">
                        <div>
                          <UserIcon height="40px" width="40px" />
                        </div>
                        <div className="flex flex-col ms-3">
                          <span className="font-semibold capitalize">
                            {customer.customer_name}
                          </span>
                          <span className="font-semibold text-dull capitalize">
                            {customer.location.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Components.AccordionSummary>
                  <Components.AccordionDetails>
                    <div>
                      <p className="font-semibold mt-2">Shop Name:</p>
                      <p>{customer.shop_name}</p>
                      <p className="font-semibold mt-2">Phone:</p>
                      <p>{customer.phone}</p>
                    </div>
                  </Components.AccordionDetails>
                  <hr />
                  <Components.AccordionActions>
                    <div className="flex justify-between w-full mx-5">
                      <div onClick={() => editButtonClick(customer._id)}>
                        <Components.Icons.Edit fontSize="medium" />
                      </div>
                      <div
                        className="text-red-600"
                        onClick={() => deleteButtonClick(customer._id)}
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

export default Customers;
