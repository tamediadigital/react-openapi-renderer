# react-openapi-renderer

> React OpenAPI component

[![NPM](https://img.shields.io/npm/v/react-openapi-renderer.svg)](https://www.npmjs.com/package/react-openapi-renderer)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-openapi-renderer
```

or

```bash
yarn add react-openapi-renderer
```

## Usage

```tsx
import React, { Component } from "react";

import ReactOpenApiRenderer from "react-openapi-renderer";
import "react-openapi-renderer/dist/index.css";

class Example extends Component {
  render() {
    const jsonSpecification = {};
    return <ReactOpenApiRenderer specification={jsonSpecification} />;
  }
}
```

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

## License

Apache 2.0 © [tamediadigital](https://github.com/tamediadigital)
