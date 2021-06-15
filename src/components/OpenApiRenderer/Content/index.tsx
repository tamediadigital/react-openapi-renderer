import React from "react";

import { getComponent } from "../utils";
import { Components as ComponentsModel, ResponseContent } from "models/OpenApi";

type ContentProps = {
  content: ResponseContent;
  components: ComponentsModel;
};

import Properties from "components/OpenApiRenderer/Properties";

export default function Content({ content, components }: ContentProps) {
  const schema = content?.[Object.keys(content)[0]]?.schema;
  if (!schema) {
    return null;
  }

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
        ? getComponent(schema.items["$ref"], components)
        : schema.items.properties;
      return properties;
    }
  };

  const renderCardContent = () => {
    // Case 1 - $ref
    if (schema["$ref"]) {
      const component = getComponent(schema["$ref"], components);
      const props = getProperties(component);
      const type = schema.type ? schema.type : component.type;
      const subType = component?.items?.type;

      return (
        <Properties
          properties={props}
          type={type}
          subType={subType}
          components={components}
        />
      );
    }
    // Case 2 - items (object / array)
    // TODO: items not ref, but { type:  string }
    else if (schema.items && schema.items["$ref"]) {
      const component = getComponent(schema.items["$ref"], components);
      return (
        <Properties
          properties={component.properties}
          type={schema.type}
          subType={component.type}
          components={components}
        />
      );
    } else if (schema.properties && !schema.items) {
      return (
        <Properties
          properties={schema.properties}
          type='object'
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
