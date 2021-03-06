import React from "react";

import OpenApiRenderer from "@tx-dts/react-openapi-renderer";
import "@tx-dts/react-openapi-renderer/dist/index.css";
import specificationMock from "./example.json";

const App = () => {
  return (
    <div
      style={{
        padding: "2rem 7rem",
      }}
    >
      <OpenApiRenderer specification={specificationMock} />
    </div>
  );
};

export default App;
