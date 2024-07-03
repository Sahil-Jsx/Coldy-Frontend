import React, { useEffect } from "react";
import Backbutton from "../../../components/back/back";
import Components from "../../../components/components";
import { useForm } from "react-hook-form";
import {
  add_location,
  get_location_by_id,
  update_location,
} from "../../../services/location";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Edit_Place = () => {
  const navigate = useNavigate();
  const id = useParams();
  console.log(id.id);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted, isDirty },
  } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const getLocation = () => {
    get_location_by_id(id.id).then((res) => {
      console.log(res.data);
      setValue("location", res.data.location);
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const onSubmit = (inputdata) => {
    console.log(inputdata);

    update_location(id.id, inputdata)
      .then((res) => {
        console.log(res.data);
        toast.success("Location updated successfully");
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
            <span className="font-semibold text-xl">Update Place</span>
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
                  Update
                </Components.Button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
};

export default Edit_Place;
