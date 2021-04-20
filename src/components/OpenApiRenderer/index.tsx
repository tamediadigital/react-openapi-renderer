import React from "react";

import Header from "./Header";
import Paths from "./Paths";
import Components from "./Components";

import OpenApi from "models/OpenApi";

type OpenApiRendererProps = {
  specification: OpenApi;
};

export default function OpenApiRenderer({
  specification,
}: OpenApiRendererProps) {
  const { components, info, openapi, paths, servers, tags } = specification;

  return (
    <div>
      <Header info={info} servers={servers} openApiVersion={openapi} />
      <Paths paths={paths} tags={tags} components={components} />
      <Components components={components} />
    </div>
  );
}
