import React from "react";

import {
  Components as ComponentsModel,
  RequestBodySchemaProperties,
} from "models/OpenApi";

type PropertiesProps = {
  properties: RequestBodySchemaProperties;
  isArray?: boolean;
  components: ComponentsModel;
};

export default function Properties({
  properties,
  isArray = false,
  components,
}: PropertiesProps) {
  const getComponent = (refPath: string) => {
    const splitPath = refPath.split("/");
    const schemaType = splitPath[2];
    const schemaObject = splitPath[3];
    const component = components[schemaType][schemaObject];
    return component;
  };

  return (
    <div>
      {isArray ? `[` : null}
      <div className={`${isArray ? "ms-2" : null}`}>{`{`}</div>
      <div className={`ms-${isArray ? "4" : "2"}`}>
        {properties &&
          Object.entries(properties).map(([name, p]) => {
            if (p.items) {
              if (p.items.$ref) {
                const component = getComponent(p.items.$ref);
                return (
                  <div key={name}>
                    "{name}":{" "}
                    <Properties
                      properties={component.properties}
                      isArray={p.type === "array"}
                      components={components}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={name}>
                    "{name}":
                    <span style={{ color: "#00da91" }}>
                      &nbsp;
                      {p.type === "array" ? `[` : null}
                      {p.items.type}
                      {p.type === "array" ? `]` : null}
                    </span>
                  </div>
                );
              }
            }
            if (p.$ref) {
              const component = getComponent(p.$ref);
              return (
                <div key={name}>
                  "{name}":
                  <Properties
                    properties={component.properties}
                    isArray={p.type === "array"}
                    components={components}
                  />
                </div>
              );
            }
            return (
              <div key={name}>
                <span>
                  "{name}":&nbsp;
                  <span style={{ color: "#00da91" }}>
                    {p.example || p.format} ({p.type})
                  </span>
                </span>
              </div>
            );
          })}
      </div>
      <div className={`${isArray ? "ms-2" : null}`}>{`}`}</div>
      {isArray ? `]` : null}
    </div>
  );
}
