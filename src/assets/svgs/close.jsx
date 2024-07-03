import React from "react";

const Close = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height={props.height}
      width={props.width}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Menu / Close_MD">
          {" "}
          <path
            id="Vector"
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            stroke="#000000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default Close;
