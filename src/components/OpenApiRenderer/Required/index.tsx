import React from "react";
import styles from "./Required.module.css";

type RequiredProps = {
  required?: boolean;
  showTitle?: boolean;
};

export default function Required({
  required,
  showTitle = true,
}: RequiredProps) {
  if (required) {
    return (
      <span className='text-danger fw-bold'>
        &nbsp;
        <span className={styles.required}>
          *{showTitle ? " required" : null}
        </span>
      </span>
    );
  } else return null;
}
