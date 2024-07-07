import React from "react";
import style from "./loader.module.scss";

const Loader = ({ show }) => {
  return (
    show && (
      <section className={style.loader_container}>
        <span className={style.loader}></span>
      </section>
    )
  );
};

export default Loader;
