import React from "react";

import {
  Components as ComponentsModel,
  RequestBodySchemaProperties,
  Property,
} from "models/OpenApi";

import { getPropertyValue } from "../utils";

type PropertiesProps = {
  properties: RequestBodySchemaProperties;
  isArray?: boolean;
  components: ComponentsModel;
  type: string;
};

export default function Properties({
  properties,
  isArray = false,
  components,
  type,
}: PropertiesProps) {
  const getComponent = (refPath: string) => {
    const splitPath = refPath.split("/");
    const schemaType = splitPath[2];
    const schemaObject = splitPath[3];
    const component = components[schemaType][schemaObject];
    return component;
  };

  const getProperties = (property: Property) => {
    if (property?.items?.$ref) {
      const component = getComponent(property.items.$ref);
      return component.properties;
    }
    if (property?.$ref) {
      const component = getComponent(property.$ref);
      return component.properties;
    }
    if (property?.items?.properties) {
      return property.items.properties;
    }
    if (property.properties) {
      return property.properties;
    }
  };
  // TODO:
  // const getType = (property: Property) => {
  //   if (property?.items?.$ref) {
  //     const component = getComponent(property.items.$ref);

  //     return component.type;
  //   }
  //   if (property?.$ref) {
  //     const component = getComponent(property.$ref);
  //     return component.type;
  //   }
  //   if (property?.items?.properties) {
  //     return "array";
  //   }
  //   if (property.properties) {
  //     return "object";
  //   }
  //   return "object";
  // };

  const renderSimpleProperty = (name: string, value: any, isLast: boolean) => {
    return (
      <div key={name}>
        <span>
          "{name}":&nbsp;
          <span>{value}</span>
          {!isLast && ","}
        </span>
      </div>
    );
  };

  const getBracket = (): any => {
    if (type === "object") {
      return {
        start: "{",
        end: "}",
      };
    }
    if (type === "array") {
      return {
        start: "[",
        end: "]",
      };
    }
    return {
      start: "",
      end: "",
    };
  };

  return (
    <div>
      {getBracket().start}
      <div className={`ms-${isArray ? "4" : "2"}`}>
        {properties &&
          Object.entries(properties).map(
            ([name, property]: [string, Property], index) => {
              const isCompositeProperty: boolean =
                property.items || property.$ref || property.properties;
              const isLast = index === Object.keys(properties).length - 1;
              if (isCompositeProperty) {
                const props = getProperties(property);
                // TODO: Use getType() func
                const type = property.type;
                // const type = getType(property);
                return (
                  <div key={name}>
                    "{name}":
                    <Properties
                      properties={props}
                      isArray={property.type === "array"}
                      components={components}
                      type={type}
                    />
                    {!isLast && ","}
                  </div>
                );
              }
              return renderSimpleProperty(
                name,
                getPropertyValue(property),
                isLast
              );
            }
          )}
      </div>
      {getBracket().end}
    </div>
  );
}
