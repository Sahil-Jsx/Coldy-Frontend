import React, { useEffect, useState } from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import { get_locaions } from "../../../services/location";
import { useForm } from "react-hook-form";
import { add_customer } from "../../../services/customer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Add_Customer = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isSubmitted },
    handleSubmit,
  } = useForm({
    defaultValues: {
      customer_name: "",
      shop_name: "",
      phone: null,
      location: null,
    },
  });
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const getLocationsData = () => {
    get_locaions()
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const onSubmit = (inputdata) => {
    add_customer(inputdata)
      .then((res) => {
        toast.success("Customer Added Successfully");
        navigate("/customers");
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.error);
        }
      });
  };
  useEffect(() => {
    getLocationsData();
  }, []);

  return (
    <>
      <section className="p-4 h-screen">
        {/* header */}
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Add Customer</span>
          </div>
          <div></div>
        </div>
        {/* main section */}
        <section className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* customer name */}
            <div className="w-full">
              <span className="font-semibold">Customer Name :</span>
              <div className="mt-1">
                <Components.TextField
                  className="w-full"
                  type="text"
                  {...register("customer_name", {
                    required: "Customer Name is required",
                  })}
                  variant="outlined"
                  size="small"
                />
                {errors.customer_name && isSubmitted && (
                  <div>
                    <span className="text-red-500">
                      {errors?.customer_name?.message}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* shop name */}
            <div className="w-full mt-3">
              <span className="font-semibold">Shop Name :</span>
              <div className="mt-1">
                <Components.TextField
                  className="w-full"
                  type="text"
                  {...register("shop_name", {
                    required: "Shop Name is required",
                  })}
                  variant="outlined"
                  size="small"
                />
                {errors.shop_name && isSubmitted && (
                  <div>
                    <span className="text-red-500">
                      {errors.shop_name.message}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* customer no */}
            <div className="w-full mt-3">
              <span className="font-semibold">Customer Phone No :</span>
              <div className="mt-1">
                <Components.TextField
                  className="w-full"
                  type="number"
                  variant="outlined"
                  size="small"
                  {...register("phone", {
                    required: "Phone No. is required",
                  })}
                  InputProps={{
                    startAdornment: (
                      <Components.InputAdornment position="start">
                        +91
                      </Components.InputAdornment>
                    ),
                  }}
                />
                {errors.phone && isSubmitted && (
                  <div>
                    <span className="text-red-500">{errors.phone.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* customer location */}
            <div className="w-full mt-3">
              <span className="font-semibold">Village :</span>
              <div className="mt-1">
                <Components.Autocomplete
                  options={locations}
                  getOptionLabel={(option) => option.location}
                  {...register("location", {
                    required: "Location is required",
                  })}
                  onChange={(_, value) => {
                    if (value) {
                      setValue("location", value._id);
                    } else {
                      setValue("location", null);
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  classes={{ option: 'capitalize' }}
                  renderInput={(params) => (
                    <Components.TextField
                      {...params}
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
                {watch("location") === null && isSubmitted && (
                  <div>
                    <span className="text-red-500">Location is required</span>
                  </div>
                )}
              </div>
            </div>

            {/* add button */}
            <div className="w-full mt-5">
              <Components.Button
                variant="contained"
                className="w-full"
                type="submit"
                color="error"
              >
                Add Customer
              </Components.Button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Add_Customer;
