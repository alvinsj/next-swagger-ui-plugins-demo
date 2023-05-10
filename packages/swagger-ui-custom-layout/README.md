
# @dsaidgovsg/swagger-ui-custom-layout 

This is a custom layout plugin for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/).

## Prerequisites

- [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- [react](https://www.npmjs.com/package/react)

## Install

Add github npm registry to `.npmrc`,

```sh
# .npmrc
always-auth = true
@dsaidgovsg:registry=https://npm.pkg.github.com
```

Install the package,

```sh
$ npm install @dsaidgovsg/swagger-ui-custom-layout
```

## Usage

```javascript
import customLayoutPlugin from '@dsaidgovsg/swagger-ui-custom-layout'

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

