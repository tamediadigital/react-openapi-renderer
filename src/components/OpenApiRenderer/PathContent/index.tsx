import React from "react";

import {
  Responses as ResponsesModel,
  Parameters as ParametersModel,
  Components as ComponentsModel,
  RequestBody as RequestBodyModel,
} from "models/OpenApi";

import Parameters from "./Parameters";
import RequestBody from "./RequestBody";
import Responses from "./Responses";

type PathContentProps = {
  deprecated?: boolean;
  responses: ResponsesModel;
  parameters: ParametersModel;
  requestBody: RequestBodyModel;
  components: ComponentsModel;
};

export default function PathContent({
  deprecated,
  responses,
  parameters,
  requestBody,
  components,
}: PathContentProps) {
  const deprecatedStyle: { opacity: string } = {
    opacity: deprecated ? "0.5" : "1",
  };

  return (
    <div style={deprecatedStyle}>
      <Parameters parameters={parameters} />
      <RequestBody requestBody={requestBody} components={components} />
      <Responses responses={responses} components={components} />
    </div>
  );
}
