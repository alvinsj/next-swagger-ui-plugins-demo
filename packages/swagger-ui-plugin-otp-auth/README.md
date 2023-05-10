
# @dsaidgovsg/swagger-ui-plugin-otp-auth

This is a OTP authentication plugin for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/).

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
$ npm install @dsaidgovsg/swagger-ui-plugin-otp-auth
```

## Usage

```javascript
import OtpAuthPlugin from '@dsaidgovsg/swagger-ui-plugin-otp-auth'

// swagger-ui initialization
  SwaggerUI({
    plugins: [
      OtpAuthPlugin,
      ...
    ]
  })
```

## Swagger Configuration

```yaml
components:
  securitySchemes:
    OtpAuth:
      # base config
      type: http
      scheme: bearer
      otp: true
      # token url
      tokenUrl: /api/otp/
      # request path and method
      requestOtpPath: /new
      requestOtpMethod: post 
      requestOtpQuery:
        service: service-name
      # auth path and method
      authPath: /authenticate
      authMethod: post
      authQuery:
        service: service-name
        expiry: 10800

security:
  - OtpAuth: []
```
