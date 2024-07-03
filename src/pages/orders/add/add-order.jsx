import React, { useEffect, useState } from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import {
  add_order,
  get_customers,
  get_order_no,
  get_products,
} from "../../../services/order";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Add_Orders = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      order_no: "",
      customer_id: null,
      order_details: [],
      total_amount: 0,
      status: 1,
      pending: 0,
    },
  });

  const onQuantityChange = (index, productId, price, quantity) => {
    console.log(products);

    products?.map((product) => {
      if (product._id === productId) {
        product.quantity = parseInt(quantity);
      }
    });

    const orderDetails = products?.map((product) => ({
      product_id: product._id,
      product_name: product.product_name,
      product_price: product.product_price,
      quantity: product.quantity,
    }));

    setValue("order_details", orderDetails);
    console.log(orderDetails);
    calculateTotal(orderDetails);
  };

  const calculateTotal = (orderDetails) => {
    const total = orderDetails.reduce((sum, item) => {
      return sum + item.quantity * item.product_price;
    }, 0);
    setValue("total_amount", total);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getCustomers = () => {
    get_customers().then((res) => {
      // console.log(res.data);
      setCustomers(res.data);
    });
  };

  const getOrderNo = (customer_name) => {
    get_order_no({ customer_name })
      .then((res) => {
        // console.log(res.data);
        setValue("order_no", res.data?.order_no);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = () => {
    get_products()
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddOrder = (inputdata) => {
    
    if (inputdata?.status === "paid") {
      delete inputdata?.pending;
    }

    add_order(inputdata)
      .then((res) => {
        toast.success("Order Added Successfully");
        navigate(`/orders`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCustomers();
    getProducts();
  }, []);

  return (
    <>
      <section className="p-4 h-screen">
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Add Orders</span>
          </div>
          <div></div>
        </div>
        {/* main section */}
        <section className="p-4">
          <form onSubmit={handleSubmit(AddOrder)}>
            {/* Order no */}
            {watch("order_no") !== "" && (
              <div className="w-full">
                <span className="font-semibold">Order No :</span>
                <div className="mt-1">
                  <Components.TextField
                    className="w-full"
                    type="text"
                    value={watch("order_no")}
                    disabled
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
            )}
            {/* Customer name */}
            <div className="w-full mt-3">
              <span className="font-semibold">Customer :</span>
              <div className="mt-1">
                <Components.Autocomplete
                  options={customers}
                  getOptionLabel={(option) => option.customer_name}
                  onChange={(event, value) => {
                    console.log(value);
                    if (value) {
                      setValue("customer_id", value._id);
                      console.log(watch("customer_id"));
                      getOrderNo(value.customer_name);
                    } else {
                      setValue("customer_id", null);
                      setValue("order_no", "");
                    }
                  }}
                  renderInput={(params) => (
                    <Components.TextField
                      {...params}
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-5">
              {console.log(products)}
              {products.map((product, index) => (
                <div key={product._id} className="mt-5">
                  <Components.TextField
                    label={product.product_name}
                    type="number"
                    className="w-full"
                    size="small"
                    variant="outlined"
                    inputRef={register()}
                    onChange={(event) => {
                      const quantity = event.target.value;
                      onQuantityChange(
                        index,
                        product._id,
                        product.product_price,
                        quantity
                      );
                    }}
                    InputProps={{
                      endAdornment: (
                        <Components.InputAdornment position="start">
                          ₹ {product?.product_price}
                        </Components.InputAdornment>
                      ),
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between">
              <div className="w-full">
                <span className="font-semibold">Grand Total:</span>
              </div>
              <div className="flex justify-end w-full">
                <span className="font-semibold">
                  {formatCurrency(watch("total_amount"))}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Components.FormControl>
                <Components.FormLabel
                  id="demo-radio-buttons-group-label"
                  color="error"
                >
                  Payment Staus:
                </Components.FormLabel>
                <Components.RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  value={watch("status")}
                  onChange={(event) => {
                    setValue("status", event.target.value);
                  }}
                  name="radio-buttons-group"
                >
                  <Components.FormControlLabel
                    value="1"
                    control={<Components.Radio />}
                    label="Paid"
                  />
                  <Components.FormControlLabel
                    value="0"
                    control={<Components.Radio />}
                    label="Pending"
                  />
                </Components.RadioGroup>
              </Components.FormControl>
            </div>
            {watch("status") === "0" && (
              <>
                <div className="mt-3">
                  <Components.TextField
                    size="small"
                    variant="outlined"
                    className="w-full"
                    type="number"
                    placeholder="Paid Amount"
                    onChange={(event) => {
                      const paidAmount = event.target.value;
                      setValue("pending", watch("total_amount") - paidAmount);
                    }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span>Remaining Amount :</span>
                  <span className="text-red-500 fw-semibold">
                    {formatCurrency(watch("pending"))}
                  </span>
                </div>
              </>
            )}
            {/* add button */}
            <div className="w-full mt-5">
              <Components.Button
                variant="contained"
                className="w-full"
                color="error"
                type="submit"
              >
                Confirm Order
              </Components.Button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Add_Orders;
