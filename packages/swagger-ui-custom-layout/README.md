
# swagger-ui-custom-layout [![npm version](https://badge.fury.io/js/@dsaid%2Fswagger-ui-custom-layout.svg)](https://badge.fury.io/js/@dsaid%2Fswagger-ui-custom-layout)

This is a custom layout plugin for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/).

## Prerequisites

- [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- [react](https://www.npmjs.com/package/react)

## Install

```sh
$ npm install swagger-ui-custom-layout
```

## Usage

```javascript
import customLayoutPlugin from 'swagger-ui-custom-layout'

// swagger-ui initialization
  SwaggerUI({
    plugins: [
      customLayoutPlugin,
      ...
    ],
    // specify layout name
    layout: 'ProductLayout'
  })
```

