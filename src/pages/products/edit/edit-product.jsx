import React, { useEffect } from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import { useForm } from "react-hook-form";
import {
  add_product,
  get_product_by_id,
  update_product,
} from "../../../services/product";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const Edit_Product = () => {
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
    },
  });

  const id = useParams().id;
  const navigate = useNavigate();

  console.log(id);

  const getProductDetails = () => {
    get_product_by_id(id)
      .then((res) => {
        setValue("product_name", res.data.product_name);
        setValue("product_price", res.data.product_price);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateProduct = (inputdata) => {
    update_product(id, inputdata)
      .then((res) => {
        console.log(res.data);
        toast.success("Product Updated Successfully");
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductDetails();
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
            <span className="font-semibold text-xl">Update Product</span>
          </div>
          <div></div>
        </div>
        {/* main section */}
        <section className="p-4">
          <form onSubmit={handleSubmit(UpdateProduct)}>
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
                Update
              </Components.Button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Edit_Product;
