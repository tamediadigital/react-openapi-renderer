import { Paths, Tags, Tag } from "../../models/OpenApi";

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

// TODO: Styling
export const getPropertyValue = (p: any) => {
  if (p.format === "date-time") {
    return `"${new Date().toISOString()}"`;
  }

  if (p.type === "string") {
    return `"${p.example || "string"}"`;
  }
  if (p.type === "integer" || p.type === "number") {
    return `"${p.example || "0"}"`;
  }
  if (p.type === "boolean") {
    return "true";
  }
  if (p.format) {
    return p.format;
  }
  return `(${p.type})`;
};
