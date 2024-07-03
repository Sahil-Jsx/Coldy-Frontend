import React, { useEffect, useState } from "react";
import Components from "../../components/components";
import Speed_Dial from "../../components/speed-dial/speed-dial";
import Backbutton from "../../components/back/back";
import LocationIcon from "@svg/location";
import {
  delete_location,
  get_locaions,
  search_location,
} from "../../services/location";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Places = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const getLocations = () => {
    get_locaions()
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const actions = [
    {
      icon: <Components.Icons.AddLocationAltRounded />,
      name: "Add New",
      path: "places/add",
    },
  ];

  const editButtonClick = (id) => {
    console.log(id);
    navigate(`/places/${id}`);
  };

  const deleteButtonClick = (id) => {
    console.log(id);
    delete_location(id).then((res) => {
      console.log(res.data);
      toast.success(res.data.message);
      getLocations();
    });
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <section className="p-4 h-screen">
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Places</span>
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
              search_location(value).then((res) => {
                console.log(res.data); 
                setLocations(res.data);
              });
            }}
          />
        </div>
        {/* main section */}
        <section className="w-full">
          <div className="pb-20">
            {locations.length === 0 ? (
              <p className="text-center mt-5">No locations available</p>
            ) : (
              locations.map((row, index) => (
                <Components.Accordion key={index} className="my-5">
                  <Components.AccordionSummary
                    expandIcon={<Components.Icons.KeyboardArrowDownRounded />}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start">
                        <div>
                          <LocationIcon height="40px" width="40px" />
                        </div>
                        <div className="flex justify-center items-center ms-3">
                          <span className="font-semibold">{row.location}</span>
                        </div>
                      </div>
                    </div>
                  </Components.AccordionSummary>
                  <Components.AccordionDetails>
                    <div>
                      <p className="font-semibold">Name:</p>
                      <p>{row.location}</p>
                    </div>
                  </Components.AccordionDetails>
                  <hr />
                  <Components.AccordionActions>
                    <div className="flex justify-between w-full mx-5">
                      <div onClick={() => editButtonClick(row._id)}>
                        <Components.Icons.Edit fontSize="medium" />
                      </div>
                      <div
                        className="text-red-600"
                        onClick={() => deleteButtonClick(row._id)}
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

export default Places;
