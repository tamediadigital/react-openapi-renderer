import React from "react";

import {
  RequestBody as RequestBodyModel,
  Components as ComponentsModel,
} from "models/OpenApi";
import Required from "components/OpenApiRenderer/Required";
import Content from "components/OpenApiRenderer/Content";

type RequestBodyProps = {
  requestBody: RequestBodyModel;
  components: ComponentsModel;
};

export default function RequestBody({
  requestBody,
  components,
}: RequestBodyProps) {
  if (!requestBody) {
    return null;
  }

  return (
    <div className='mb-3'>
      <h6>
        Request Body <Required required={requestBody.required} />
      </h6>
      <p>{requestBody.description}</p>
      {/* TODO: Render based on schemas & media types */}
      <select className='form-select mt-3'>
        {Object.entries(requestBody?.content).map(([title]) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
      <div className='card mt-2 mb-2'>
        <div className='card-body'>
          <Content content={requestBody.content} components={components} />
        </div>
      </div>
    </div>
  );
}
