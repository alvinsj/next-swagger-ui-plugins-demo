
# @dsaid/chain-wrap-components [![npm version](https://badge.fury.io/js/@dsaid%2Fchain-wrap-components.svg)](https://badge.fury.io/js/@dsaid%2Fchain-wrap-components)

This provides a helper function for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/).

- `chainWrapComponents(plugin1, plugin2)` enable chaining for multiple plugins' `wrapComponents` on the same components, e.g. plugins modifying `AuthItem`. 
- Currently not supported by features. e.g. swagger-ui v4.18.3

## Prerequisites

- [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- [react](https://www.npmjs.com/package/react)

## Install

```sh
$ npm install @dsaid/chain-wrap-components
```

## Usage

```javascript
import otpAuthPlugin from '@dsaid/swagger-ui-plugin-otp-auth'
import samlAuthPlugin from '@dsaid/swagger-ui-plugin-saml-auth'
import chainWrapComponents from '@dsaid/chain-wrap-components'

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

