import React, { useEffect, useState } from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import {
  add_order,
  get_customers,
  get_order_by_id,
  get_order_no,
  get_products,
  update_order,
} from "../../../services/order";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Edit_Orders = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const id = useParams()?.id;

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

  const getOrderDetails = () => {
    get_order_by_id(id).then((res) => {
      setValue("order_no", res?.data?.order_no);
      setValue("customer_id", res?.data?.customer_id?._id);
      setValue("order_details", res?.data?.order_details);
      setValue("total_amount", res?.data?.total_amount);
      setValue("status", res?.data?.status);
      setValue("pending", res?.data?.pending);
    });
  };

  const onQuantityChange = (index, productId, price, quantity) => {
    // Check if quantity is an empty string, if so, set it to 0
    const sanitizedQuantity = quantity === "" ? 0 : parseInt(quantity, 10);

    const orderDetails = watch("order_details")?.map((product) => {
      if (product.product_id === productId) {
        return {
          ...product,
          quantity: sanitizedQuantity,
          price: price,
        };
      }
      return product;
    });

    setValue("order_details", orderDetails);
    setValue("pending", 0);
    calculateTotal(orderDetails);
  };

  const calculateTotal = (orderDetails) => {
    const total = orderDetails.reduce((sum, item) => {
      return sum + item?.quantity * item?.product_price;
    }, 0);
    setValue("total_amount", total);
  };

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

  const getCustomers = () => {
    get_customers()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const getProducts = () => {
    get_products()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateOrder = (inputdata) => {
    console.log(inputdata);

    update_order(id, inputdata)
      .then((res) => {
        toast.success("Order Updated Successfully");
        navigate(`/orders`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    getOrderDetails();
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
            <span className="font-semibold text-xl">Update Order</span>
          </div>
          <div></div>
        </div>
        {/* main section */}
        <section className="p-4">
          <form onSubmit={handleSubmit(updateOrder)}>
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
                  readOnly
                  getOptionLabel={(option) => option.customer_name}
                  value={
                    (customers &&
                      customers?.find(
                        (customer) => customer?._id === watch("customer_id")
                      )) ||
                    null
                  }
                  onChange={(event, value) => {
                    if (value) {
                      setValue("customer_id", value._id);
                      // getOrderNo(value.customer_name);
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
              {products.map((product, index) => (
                <div key={product._id} className="mt-5">
                  <Components.TextField
                    label={product.product_name}
                    type="number"
                    className="w-full"
                    size="small"
                    value={watch(`order_details.${index}.quantity`)}
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
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      min: 0,
                    }}
                    InputProps={{
                      endAdornment: (
                        <Components.InputAdornment position="start">
                          ₹ {product.product_price}
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

                    if (parseInt(watch("status")) === 1) {
                      setValue("pending", 0);
                    }
                  }}
                  name="radio-buttons-group"
                >
                  <Components.FormControlLabel
                    value={1}
                    control={<Components.Radio />}
                    label="Paid"
                  />
                  <Components.FormControlLabel
                    value={0}
                    control={<Components.Radio />}
                    label="Pending"
                  />
                </Components.RadioGroup>
              </Components.FormControl>
            </div>
            {parseInt(watch("status")) === 0 && (
              <>
                <div className="mt-3">
                  <Components.TextField
                    size="small"
                    variant="outlined"
                    className="w-full"
                    type="number"
                    value={watch("total_amount") - watch("pending")}
                    placeholder="Paid Amount"
                    onChange={(event) => {
                      const paidAmount = event.target.value;
                      setValue(
                        "pending",
                        watch("total_amount") - parseInt(paidAmount)
                      );
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

export default Edit_Orders;
