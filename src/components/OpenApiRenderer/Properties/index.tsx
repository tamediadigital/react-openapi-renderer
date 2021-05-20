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

  const getProperties = (p: any) => {
    if (p?.items?.$ref) {
      const component = getComponent(p.items.$ref);
      return component.properties;
    }
    if (p?.$ref) {
      const component = getComponent(p.$ref);
      return component.properties;
    }
    if (p?.items?.properties) {
      return p.items.properties;
    }
  };

  return (
    <div>
      {isArray ? `[` : null}
      <div className={`${isArray ? "ms-2" : null}`}>{`{`}</div>
      <div className={`ms-${isArray ? "4" : "2"}`}>
        {properties &&
          Object.entries(properties).map(([name, p]) => {
            // if (p?.properties) {
            //TODO:
            //   console.log(name, ": ", p.properties);
            // }
            if (p.items || p.$ref) {
              return (
                <div key={name}>
                  "{name}":{" "}
                  <Properties
                    properties={getProperties(p)}
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
                  <span style={{ color: "#00da91", border: "1px solid red" }}>
                    {/* TODO: Format here in this way: 0 for int, "string" for strings */}
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