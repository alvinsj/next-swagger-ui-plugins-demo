
# swagger-ui-plugin-saml-auth [![npm version](https://badge.fury.io/js/@dsaid%2Fswagger-ui-plugin-saml-auth.svg)](https://badge.fury.io/js/@dsaid%2Fswagger-ui-plugin-saml-auth)

This is a SAML authentication plugin for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/).

## Prerequisites

- [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- [react](https://www.npmjs.com/package/react)

## Install

```sh
$ npm install swagger-ui-plugin-saml-auth
```

## Usage

```javascript
import samlAuthPlugin from 'swagger-ui-plugin-saml-auth'

// swagger-ui initialization
  SwaggerUI({
    plugins: [
      samlAuthPlugin,
      ...
    ]
  })
```

## Swagger Configuration

```yaml
components:
  securitySchemes:
    SamlAuth:
      # base config
      type: http
      scheme: bearer
      saml: true
      # urls
      loginUrl: /auth/saml/sso/
      logoutUrl: /auth/saml/slo

security:
  - SamlAuth: []
```
