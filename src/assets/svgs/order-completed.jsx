import React from "react";

function OrderCompleted(props) {
  return (
    <svg
      fill="#000000"
      height={props.height}
      width={props.width}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M256,504C119.033,504,8,392.967,8,256S119.033,8,256,8s248,111.034,248,248 C503.846,392.902,392.902,503.846,256,504z"
          style={{
            fill: "#d1ffda",
          }}
        />{" "}
        <path
          d="M256,16c132.548,0,240,107.452,240,240S388.548,496,256,496S16,388.548,16,256 C16.15,123.513,123.513,16.15,256,16 M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z"
          style={{
            fill: "#0dab59",
          }}
        />{" "}
        <polygon
          points="345.032,137.848 216.896,295.887 163.04,242.728 127.528,281.848 221.056,374.152 384.472,172.608 "
          style={{
            fill: "#2a9e00",
          }}
        />{" "}
      </g>
    </svg>
  );
}

export default OrderCompleted;
