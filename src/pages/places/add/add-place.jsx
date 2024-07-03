import React from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import { useForm } from "react-hook-form";
import { add_location } from "../../../services/location";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Add_Place = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isDirty },
  } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const onSubmit = (inputdata) => {
    console.log(inputdata);

    add_location(inputdata)
      .then((res) => {
        console.log(res.data);
        toast.success("Location added successfully");
        navigate("/places");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
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
            <span className="font-semibold text-xl">Add Place</span>
          </div>
          <div></div>
        </div>
        {/* main section */}
        <section className="p-4">
          {/* place name */}
          <div className="w-full">
            <span className="font-semibold">Place Name :</span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-1">
                <Components.TextField
                  className="w-full"
                  variant="outlined"
                  size="small"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && isSubmitted && (
                  <div>
                    <span className="text-red-500">
                      {errors.location.message}
                    </span>
                  </div>
                )}
              </div>
              {/* add button */}
              <div className="w-full mt-5">
                <Components.Button
                  variant="contained"
                  className="w-full"
                  color="error"
                  type="submit"
                >
                  Add Place
                </Components.Button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
};

export default Add_Place;
