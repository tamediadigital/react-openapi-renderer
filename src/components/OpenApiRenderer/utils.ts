import {
  Paths,
  // Tags
} from "../../models/OpenApi";

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

// TODO: Tags
// export const getTagDescription = (tagName: string, tags: Tags): string => {
//   if (tags) {
//     return tags.find((t) => t.name === tagName).description!;
//   } else {
//     return "";
//   }
// };

export const getTagDescription = () => "";
