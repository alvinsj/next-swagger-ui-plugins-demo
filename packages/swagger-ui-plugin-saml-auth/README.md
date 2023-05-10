
# @dsaidgovsg/swagger-ui-plugin-saml-auth 

This is a SAML authentication plugin for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/).

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
$ npm install @dsaidgovsg/swagger-ui-plugin-saml-auth
```

## Usage

```javascript
import samlAuthPlugin from '@dsaidgovsg/swagger-ui-plugin-saml-auth'

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
