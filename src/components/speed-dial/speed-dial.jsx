import React from "react";
import Components from "../components";
import { useNavigate } from "react-router-dom";
const Speed_Dial = (props) => {
  const navigate = useNavigate();

  const goTo = (value) => {
    if (value) {
      navigate(`/${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="fixed bottom-1 right-1 z-10">
        <Components.Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
          <Components.SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
            icon={<Components.Icons.Menu />}
          >
            {props.actions.map((action, index) => (
              <Components.SpeedDialAction
                key={index}
                icon={action.icon}
                onClick={() => goTo(action.path)}
                tooltipTitle={action.name}
              />
            ))}
          </Components.SpeedDial>
        </Components.Box>
      </div>
    </>
  );
};

export default Speed_Dial;
