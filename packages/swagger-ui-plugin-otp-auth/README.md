
# @dsaid/swagger-ui-plugin-otp-auth [![npm version](https://badge.fury.io/js/@dsaid%2Fswagger-ui-plugin-otp-auth.svg)](https://badge.fury.io/js/@dsaid%2Fswagger-ui-plugin-otp-auth)

This is a OTP authentication plugin for [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/).

## Prerequisites

- [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- [react](https://www.npmjs.com/package/react)

## Install

```sh
$ npm install @dsaid/swagger-ui-plugin-otp-auth
```

## Usage

```javascript
import OtpAuthPlugin from '@dsaid/swagger-ui-plugin-otp-auth'

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
