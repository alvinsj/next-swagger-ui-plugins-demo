
# chain-wrap-components [![npm version](https://badge.fury.io/js/@dsaid%2Fchain-wrap-components.svg)](https://badge.fury.io/js/@dsaid%2Fchain-wrap-components)

This provides a helper function for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/), it allows:

- Use of `chainWrapComponents(plugin1, plugin2...)` to enable chaining for multiple plugins with the same components in `wrapComponents`. 
- Add support to e.g. `swagger-ui v4.18.3`, `pluginsOptions: {pluginLoadType: "chain"}` does not support chaining in `wrapComponents`.

## Prerequisites

- [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- [react](https://www.npmjs.com/package/react)

## Install

```sh
$ npm install chain-wrap-components
```

## Usage

```javascript
import otpAuthPlugin from 'swagger-ui-plugin-otp-auth'
import samlAuthPlugin from 'swagger-ui-plugin-saml-auth'
import chainWrapComponents from 'chain-wrap-components'

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

