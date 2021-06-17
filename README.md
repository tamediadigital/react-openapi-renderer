# react-openapi-renderer

> React OpenAPI component

[![NPM](https://img.shields.io/npm/v/@tx-dts/react-openapi-renderer.svg)](https://www.npmjs.com/package/@tx-dts/react-openapi-renderer)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @tx-dts/react-openapi-renderer
```

or

```bash
yarn add @tx-dts/react-openapi-renderer
```

## UI

<img width="400" alt="react-open-api-renderer" src="https://user-images.githubusercontent.com/76475103/122388617-54261200-cf70-11eb-85a0-f755f6c02963.png">

You can also check out the example and how library works - [here](https://tamediadigital.github.io/react-openapi-renderer/).

## Usage

```tsx
import React, { Component } from "react";

import ReactOpenApiRenderer from "@tx-dts/react-openapi-renderer";
import "@tx-dts/react-openapi-renderer/dist/index.css";

class Example extends Component {
  render() {
    const jsonSpecification = {};
    return <ReactOpenApiRenderer specification={jsonSpecification} />;
  }
}
```

Here is [the link](https://github.com/tamediadigital/react-openapi-renderer/blob/main/example/src/example.json)
to example JSON documentation that you can try out.

## Other notes

Currently you have to manually include Bootstrap CSS and JS files:

CSS - inside head tag

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
  crossorigin="anonymous"
/>
```

Bootstrap JS Scripts - at the bottom of body tag

```html
<script
  src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"
  integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"
  integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc"
  crossorigin="anonymous"
></script>
```

## Contributing

If you want to contribute, please feel free to do so by following our [contribution guideline](https://github.com/tamediadigital/react-openapi-renderer/blob/main/CONTRIBUTING.md).

## License

Apache 2.0 © [tamediadigital](https://github.com/tamediadigital)
