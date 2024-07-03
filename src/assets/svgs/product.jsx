import React from "react";

function Product(props) {
  return (
    <svg
      viewBox="0 0 100 100"
      height={props.height}
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#d26060"
          d="M7 22L50 0l43 22-43 21.001L7 22z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#ff7575"
          d="M50.003 42.997L7 22v54.28l43.006 21.714-.003-54.997z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#c34646"
          d="M50 97.994L93.006 76.28V22L50.003 42.997 50 97.994z"
        />
        <path
          opacity=".5"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#ff7575"
          d="M27.036 11.705l42.995 21.498 2.263-1.105-43.047-21.524z"
        />
        <path
          opacity=".5"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#ffffff"
          d="M21.318 14.674L63.3 36.505l15.99-7.809L35.788 7.271z"
        />
        <path
          opacity=".5"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#ffffff"
          d="M63.312 36.505l15.978-7.818v11l-15.978 8.817V36.505z"
        />
      </g>
    </svg>
  );
}

export default Product;
