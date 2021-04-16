import React from "react";

import { v4 as uuidv4 } from "uuid";
import { Parameters as ParametersModel } from "models/OpenApi";
import Required from "components/OpenApiRenderer/Required";

type ParametersProps = {
  parameters: ParametersModel;
};

export default function Parameters({ parameters }: ParametersProps) {
  if (!parameters) {
    return null;
  }

  return (
    <div>
      <h6>Parameters</h6>
      <table className='table table-bordered mt-3'>
        <thead>
          <tr>
            <td width='150'>
              <small>Name</small>
            </td>
            <td>
              <small>Description</small>
            </td>
          </tr>
        </thead>
        <tbody>
          {parameters?.map((p) => {
            const isArray: boolean = p.schema.type === "array";
            return (
              <tr key={uuidv4()}>
                <td>
                  <span className='fw-bold'>{p.name}</span>
                  <Required required={p.required} />
                  <br />
                  <small
                    className='font-monospace'
                    style={{ letterSpacing: 0.5, fontSize: 12 }}
                  >
                    {p.schema.type}
                    {isArray && p.schema.items
                      ? `[${p.schema.items.type}]`
                      : null}
                  </small>
                  <br />
                  <small className='fst-italic'>({p.in})</small>
                </td>
                <td>
                  <small>{p.description}</small>
                  {p.schema.default != null && (
                    <span>
                      <br />
                      <small className='fst-italic'>
                        Default value: {p.schema.default}
                      </small>
                    </span>
                  )}
                  {isArray && p?.schema?.items?.default && (
                    <span>
                      <br />
                      <small className='fst-italic'>
                        Default value: {p.schema.items.default}
                      </small>
                      <br />
                      <small className='fst-italic'>
                        Available values:&nbsp;
                        {p.schema.items.enum?.map((item) => item).join(", ")}
                      </small>
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
