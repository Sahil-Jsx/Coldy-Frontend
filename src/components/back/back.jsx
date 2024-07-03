import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Components from "../components";
const Backbutton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    const currentPath = location.pathname;
    const segments = currentPath.split("/").filter(Boolean);

    let prevPath = "/";
    if (segments.length > 1) {
      prevPath = "/" + segments.slice(0, -1).join("/");
    }

    const isValidRoute = isValidRoutePath(prevPath);
    if (isValidRoute) {
      if (prevPath === "/") {
        navigate("/");
      } else {
        navigate(prevPath);
      }
    } else {
      navigate("/");
    }
  };

  const isValidRoutePath = (path) => {
    const validRoutes = [
      "/",

      "/customers",
      "/customers/add",

      "/places",
      "/places/add",

      "/orders",

      "/products",
    ];

    return validRoutes.includes(path);
  };
  return (
    <>
      <Components.Tooltip title={"Back"} arrow placement="top">
        <button className="btn " onClick={goBack}>
          <Components.Icons.NavigateBeforeRounded fontSize="large" />
        </button>
      </Components.Tooltip>
    </>
  );
};

export default Backbutton;
