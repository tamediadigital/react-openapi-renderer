import React from "react";

import {
  Components as ComponentsModel,
  ResponseContent,
  RequestBodySchemaProperties,
} from "models/OpenApi";

type ContentProps = {
  content: ResponseContent;
  components: ComponentsModel;
};

// TODO: Cleanup & recursively render this
export default function Content({ content, components }: ContentProps) {
  const schema = content?.[Object.keys(content)[0]]?.schema;
  if (!schema) {
    return null;
  }

  const renderProperties = (
    properties: RequestBodySchemaProperties,
    isArray: boolean = false
  ) => {
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
                      {renderProperties(
                        component.properties,
                        p.type === "array"
                      )}
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
                    "{name}":{renderProperties(component.properties)}
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
  };

  const getComponent = (refPath: string) => {
    const splitPath = refPath.split("/");
    const schemaType = splitPath[2];
    const schemaObject = splitPath[3];
    const component = components[schemaType][schemaObject];
    return component;
  };

  const getProperties = (schema: {
    type: string;
    properties: any;
    items: any;
  }) => {
    if (schema.properties) {
      return schema.properties;
    }
    if (schema.items) {
      const properties = schema.items["$ref"]
        ? getComponent(schema.items["$ref"])
        : schema.items.properties;
      return properties;
    }
  };

  const renderCardContent = () => {
    // Case 1 - $ref
    if (schema["$ref"]) {
      const component = getComponent(schema["$ref"]);
      const props = getProperties(component);
      return <div>{renderProperties(props, component.type === "array")}</div>;
    }
    // Case 2 - items (object / array)
    // TODO: items not ref, but { type:  string }
    else if (schema.items && schema.items["$ref"]) {
      const component = getComponent(schema.items["$ref"]);
      return (
        <div>
          {renderProperties(component.properties, schema.type === "array")}
        </div>
      );
    } else if (schema.properties && !schema.items) {
      return <div>{renderProperties(schema.properties)}</div>;
    }
    return <p>{schema.type}</p>;
  };

  return (
    <div className='card bg-dark text-light' style={{ fontSize: 12 }}>
      <div className='card-body'>
        <div className='font-monospace'>{renderCardContent()}</div>
      </div>
    </div>
  );
}
