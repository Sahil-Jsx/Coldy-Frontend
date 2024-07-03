import React from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import { useForm } from "react-hook-form";
import { add_product } from "../../../services/product";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast/headless";
const Add_Products = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      product_name: "",
      product_price: null,
      quantity: 0,
    },
  });

  const navigate = useNavigate();

  const addProduct = (inputdata) => {
    add_product(inputdata)
      .then((res) => {
        console.log(res.data);
        toast.success("Product Added");
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="p-4 h-screen">
        {/* header */}
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Add Product</span>
          </div>
          <div></div>
        </div>
        {/* main section */}
        <section className="p-4">
          <form onSubmit={handleSubmit(addProduct)}>
            {/* Product name */}
            <div className="w-full">
              <span className="font-semibold">Product Name :</span>
              <div className="mt-1">
                <Components.TextField
                  className="w-full"
                  type="text"
                  variant="outlined"
                  size="small"
                  {...register("product_name", {
                    required: "Product Name is required",
                  })}
                />
                {errors.product_name && (
                  <p className="text-red-500">{errors.product_name.message}</p>
                )}
              </div>
            </div>

            {/* Product Price */}
            <div className="w-full">
              <span className="font-semibold">Product Price :</span>
              <div className="mt-1">
                <Components.TextField
                  className="w-full"
                  type="number"
                  variant="outlined"
                  size="small"
                  {...register("product_price", {
                    required: "Product Price is required",
                  })}
                  InputProps={{
                    startAdornment: (
                      <Components.InputAdornment position="start">
                        <Components.Icons.CurrencyRupeeRounded fontSize="small" />
                      </Components.InputAdornment>
                    ),
                  }}
                />
                {errors.product_price && (
                  <p className="text-red-500">{errors.product_price.message}</p>
                )}
              </div>
            </div>

            {/* add button */}
            <div className="w-full mt-5">
              <Components.Button
                variant="contained"
                className="w-full"
                color="error"
                type="submit"
              >
                Add Product
              </Components.Button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Add_Products;
