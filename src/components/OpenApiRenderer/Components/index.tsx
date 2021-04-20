import React from "react";
import {
  Components as ComponentsModel,
  Schema,
  SecuritySchema,
  Flow,
} from "models/OpenApi";

import Accordion from "components/Accordion";
import Required from "../Required";

import styles from "./Components.module.css";

type ComponentsProps = {
  components: ComponentsModel;
};

export default function Components({ components }: ComponentsProps) {
  if (!components) {
    return null;
  }

  return (
    <div>
      {components.schemas && (
        <div className='mb-4 mt-4'>
          <h2>Schemas</h2>
          <Accordion
            items={Object.entries(components.schemas).map(
              ([name, schema]: [string, Schema]) => {
                return {
                  heading: <h6 className='mb-0'>{name}</h6>,
                  content: (
                    <div
                      className={`font-monospace d-block ${styles.property}`}
                    >
                      {`{`}
                      {Object.entries(schema.properties).map(
                        ([propertyName, propertyInfo]) => {
                          return (
                            <div key={propertyName} className='ms-3'>
                              <span className='fw-bold text-dark'>
                                {propertyName}
                              </span>
                              <Required
                                required={schema.required?.includes(
                                  propertyName
                                )}
                                showTitle={false}
                              />
                              &nbsp;
                              <span className='text-primary'>
                                {propertyInfo.type}
                              </span>
                            </div>
                          );
                        }
                      )}
                      {`}`}
                    </div>
                  ),
                };
              }
            )}
          />
        </div>
      )}
      {components.securitySchemes && (
        <div className='mb-4 mt-4'>
          <h2>Security Schemas</h2>
          <Accordion
            items={Object.entries(components.securitySchemes).map(
              ([name, securitySchema]: [string, SecuritySchema]) => {
                return {
                  heading: (
                    <h6 className='mb-0'>
                      {name} {securitySchema && `(${securitySchema.type})`}
                    </h6>
                  ),
                  content: (
                    <div key={name}>
                      {securitySchema.in && (
                        <small className='d-block'>
                          In: {securitySchema.in}
                        </small>
                      )}
                      {securitySchema.description && (
                        <small className='d-block'>
                          Description: {securitySchema.description}
                        </small>
                      )}
                      {securitySchema.name && (
                        <small className='d-block'>
                          Name: {securitySchema.name}
                        </small>
                      )}
                      {securitySchema.flows && (
                        <div>
                          {Object.entries(securitySchema.flows).map(
                            ([flowName, flow]: [string, Flow]) => {
                              return (
                                <div key={flowName}>
                                  <small className='d-block'>
                                    <span className='fw-bold'>Flow:</span>&nbsp;
                                    {flowName}
                                  </small>
                                  {flow.authorizationUrl && (
                                    <small className='d-block'>
                                      <span className='fw-bold'>
                                        Authorization URL:&nbsp;
                                      </span>
                                      {flow.authorizationUrl}
                                    </small>
                                  )}
                                  <hr />
                                  {flow.scopes &&
                                    Object.entries(flow.scopes).map(
                                      ([scopeName, scope]) => {
                                        return (
                                          <div key={scopeName}>
                                            <small className='d-block'>
                                              {scopeName} - {scope}
                                            </small>
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  ),
                };
              }
            )}
          />
        </div>
      )}
    </div>
  );
}
