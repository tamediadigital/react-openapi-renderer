import * as React from "react";

import OpenApiRenderer from "./components/OpenApiRenderer";

interface Props {
  specification: any;
}

export default function ReactOpenApiRenderer({ specification }: Props) {
  return <OpenApiRenderer specification={specification} />;
}
