import * as React from "react";
import styles from "./styles.module.css";

import OpenApiRenderer from "./components/OpenApiRenderer";

interface Props {
  specification: any;
}

export default function ReactOpenApiRenderer({ specification }: Props) {
  return (
    <div className={styles.test}>
      <OpenApiRenderer specification={specification} />
    </div>
  );
}
