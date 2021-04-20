import React from "react";
import { MethodClassnames } from "models/OpenApi";

import styles from "./PathHeader.module.css";

type PathHeaderProps = {
  deprecated?: boolean;
  method: string;
  pathname: string;
  summary: string;
};

export default function PathHeader({
  deprecated,
  method,
  pathname,
  summary,
}: PathHeaderProps) {
  const backgroundClass = deprecated ? "secondary" : MethodClassnames[method];
  return (
    <div
      className={
        deprecated
          ? `text-decoration-line-through text-secondary ${styles.deprecated} `
          : ""
      }
    >
      <span
        className={`fs-6 me-3 badge text-uppercase bg-${backgroundClass} 
        ${styles.methodBadge} ${deprecated ? styles.deprecated : ""}`}
      >
        {method}
      </span>
      <span className='fw-bold font-monospace me-3'>{pathname}</span>
      <small>{summary}</small>
    </div>
  );
}
