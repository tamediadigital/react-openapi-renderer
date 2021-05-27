import React from "react";
import { Paths, Tags, Tag, Property } from "../../models/OpenApi";

const unifyPaths = (paths: Paths) => {
  const pathsMapped = Object.entries(paths).map(([pathname, https]) => {
    const methods = Object.entries(https).map(([method, details]) => {
      const obj = {
        ...details,
        pathname: pathname,
        method: method,
      };
      return obj;
    });
    return methods;
  });
  return pathsMapped.flat();
};

export const groupPathsByTags = (paths: Paths) => {
  const unifiedPaths = unifyPaths(paths);
  return unifiedPaths.reduce((acc, curr) => {
    if (curr.tags) {
      curr.tags?.forEach((tag) => {
        acc[tag] = acc[tag] || [];
        acc[tag].push(curr);
      });
    } else {
      acc["all"] = acc["all"] || [];
      acc["all"].push(curr);
    }
    return acc;
  }, {});
};

export const getTag = (tagName: string, tags: Tags): Tag | undefined => {
  if (tags) {
    return tags.find((t) => t.name === tagName);
  }
  return undefined;
};

export const getPropertyValue = (p: Property) => {
  const stringStyle = { color: "#00da91" };
  if (p.format === "date-time") {
    return <span style={stringStyle}>"{new Date().toISOString()}"</span>;
  }
  if (p.type === "string") {
    return <span style={stringStyle}>"{p.example || "string"}"</span>;
  }
  if (p.type === "integer" || p.type === "number") {
    return <span className='text-danger'>{p.example || `0`}</span>;
  }
  if (p.type === "boolean") {
    return <span className='text-warning'>true</span>;
  }
  if (p.format) {
    return <span style={stringStyle}>{p.format}</span>;
  }
  return <span style={stringStyle}>{p.type}</span>;
};
