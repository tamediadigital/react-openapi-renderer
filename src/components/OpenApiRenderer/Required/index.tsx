import React from "react";
import styles from "./Required.module.css";

type RequiredProps = {
  required?: boolean;
};

export default function Required({ required }: RequiredProps) {
  if (required) {
    return (
      <span className='text-danger fw-bold'>
        &nbsp;
        <span className={styles.required}>* required</span>
      </span>
    );
  } else return null;
}
