import React from "react";

import { v4 as uuidv4 } from "uuid";
import {
  Responses as ResponsesModel,
  Components as ComponentsModel,
} from "models/OpenApi";

import Content from "components/OpenApiRenderer/Content";

type ResponsesProps = {
  responses: ResponsesModel;
  components: ComponentsModel;
};

export default function Responses({ responses, components }: ResponsesProps) {
  if (!responses) {
    return null;
  }

  return (
    <div>
      <h6>Responses</h6>
      <table className='table table-bordered mt-3'>
        <thead>
          <tr>
            <td width='150'>
              <small>Code</small>
            </td>
            <td>
              <small>Description</small>
            </td>
          </tr>
        </thead>
        <tbody>
          {Object.entries(responses).map(
            ([responseCode, response]: [string, any]) => {
              return (
                <tr key={uuidv4()}>
                  <td>
                    <span className='fw-bold'>{responseCode}</span>
                  </td>
                  <td>
                    <small>{response.description}</small>
                    <Content
                      content={response.content}
                      components={components}
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
