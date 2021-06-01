import React from "react";

import { Components as ComponentsModel, ResponseContent } from "models/OpenApi";

type ContentProps = {
  content: ResponseContent;
  components: ComponentsModel;
};

import Properties from "components/OpenApiRenderer/Properties";

// TODO: Cleanup & recursively render this
export default function Content({ content, components }: ContentProps) {
  const schema = content?.[Object.keys(content)[0]]?.schema;
  if (!schema) {
    return null;
  }

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
      return (
        <Properties
          properties={props}
          isArray={component.type === "array"}
          type={component.type}
          components={components}
        />
      );
    }
    // Case 2 - items (object / array)
    // TODO: items not ref, but { type:  string }
    else if (schema.items && schema.items["$ref"]) {
      const component = getComponent(schema.items["$ref"]);
      return (
        <Properties
          properties={component.properties}
          isArray={schema.type === "array"}
          type={component.type}
          components={components}
        />
      );
    } else if (schema.properties && !schema.items) {
      return (
        <Properties
          properties={schema.properties}
          type={schema.type}
          components={components}
        />
      );
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
