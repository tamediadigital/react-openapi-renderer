import React from "react";
import { Components as ComponentsModel, Schema } from "models/OpenApi";

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
        <div>
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
    </div>
  );
}
