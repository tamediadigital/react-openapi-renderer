export default interface OpenApi {
  components: Components;
  info: Info;
  openapi: string;
  paths: Paths;
  servers: Servers;
  tags: Tags;
}

export type Components = {
  schemas: any;
  securitySchemes: any;
};

export type Info = {
  description: string;
  title: string;
  version: string;
};

export interface Paths {
  [key: string]: Path;
}

interface Path {
  [key: string]: Http;
}

type Server = {
  description: string;
  url: string;
};

export type Servers = Server[];

type Parameter = {
  description?: string;
  name: string;
  required?: boolean;
  schema: {
    items?: {
      default?: any;
      enum?: string[];
      type: string;
    };
    default?: any;
    format: string;
    type: string;
  };
  in: "path" | "query" | "header" | "cookie";
  deprecated?: boolean;
  allowEmptyValue?: boolean;
};

export type Parameters = Parameter[];

type Tag = {
  description?: string;
  externalDocs?: {
    description: string;
    url: string;
  };
  name: string;
};

export type Tags = Tag[];

export interface Responses {
  [key: string]: Response;
}

type Response = {
  description: string;
  content: ResponseContent;
};

type Http = {
  description: string;
  parameters: Parameters;
  requestBody: RequestBody;
  responses: Responses;
  summary: string;
  tags: string[];
  deprecated?: boolean;
};

export interface RequestBodySchemaProperties {
  [key: string]: {
    type: string;
    description?: string;
    example?: any;
    format?: string;
    enum?: string[];
    $ref?: string;
    items: any;
  };
}

interface RequestBodyContent {
  [key: string]: {
    schema: {
      items: any; // TODO: items
      type: string;
      $ref?: string;
      properties?: RequestBodySchemaProperties;
    };
  };
}

export interface ResponseContent extends RequestBodyContent {}

export type RequestBody = {
  description: string;
  content: RequestBodyContent;
  required: boolean;
};

// UI
export interface UIHttp extends Http {
  pathname: string;
  method:
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head"
    | "trace";
}

export enum MethodClassnames {
  get = "info",
  post = "success",
  put = "warning",
  delete = "danger",
  patch = "secondary",
}
