import React from "react";

import {
  Components as ComponentsModel,
  RequestBodySchemaProperties,
  Property,
} from "models/OpenApi";

import { getPropertyValue, getComponent } from "../utils";

type PropertiesProps = {
  properties: RequestBodySchemaProperties;
  components: ComponentsModel;
  type: string;
  subType?: string;
};

export default function Properties({
  properties,
  components,
  type,
  subType = "",
}: PropertiesProps) {
  const isArray: boolean = type === "array";

  const getProperties = (property: Property): any => {
    if (property?.items?.$ref) {
      const component = getComponent(property.items.$ref, components);
      return {
        properties: component.properties,
        subType: component.type,
      };
    }
    if (property?.$ref) {
      const component = getComponent(property.$ref, components);
      return {
        properties: component.properties,
        subType: component.type,
      };
    }
    if (property?.items?.properties) {
      return {
        properties: property.items,
      };
    }
    if (property.properties) {
      return {
        properties: property.properties,
      };
    }
  };

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

  const getBracket = (propertyType: string): { start: string; end: string } => {
    if (propertyType === "object") {
      return {
        start: "{",
        end: "}",
      };
    }
    if (propertyType === "array") {
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
    <span>
      {getBracket(type).start}
      {getBracket(subType).start}
      <div className={`ms-${isArray ? "4" : "2"}`}>
        {properties &&
          Object.entries(properties).map(
            ([name, property]: [string, Property], index) => {
              const isCompositeProperty: boolean =
                property.items || property.$ref || property.properties;
              const isLast = index === Object.keys(properties).length - 1;
              if (isCompositeProperty) {
                const props = getProperties(property);
                return (
                  <div key={name}>
                    "{name}":&nbsp;
                    <Properties
                      properties={props?.properties}
                      components={components}
                      type={property.type}
                      subType={props?.subType ? props.subType : ""}
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
      {getBracket(subType).end}
      {getBracket(type).end}
    </span>
  );
}
