
# @dsaidgovsg/chain-wrap-components

This provides a helper function for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/), it allows:

- Use of `chainWrapComponents(plugin1, plugin2...)` to enable chaining for multiple plugins with the same components in `wrapComponents`. 
- Add support to e.g. `swagger-ui v4.18.3`, `pluginsOptions: {pluginLoadType: "chain"}` does not support chaining in `wrapComponents`.

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
$ npm install @dsaidgovsg/chain-wrap-components
```

## Usage

```javascript
import otpAuthPlugin from '@dsaidgovsg/swagger-ui-plugin-otp-auth'
import samlAuthPlugin from '@dsaidgovsg/swagger-ui-plugin-saml-auth'
import chainWrapComponents from '@dsaidgovsg/chain-wrap-components'

// swagger-ui initialization
  SwaggerUI({
    plugins: [
      // otpAuthPlugin and samlAuthPlugin both overriding wrapComponenrs
      // e.g. wrapComponents: {AuthItem: ...}
      chainWrapComponents(otpAuthPlugin, samlAuthPlugin),
      ...
    ]
  })
```

