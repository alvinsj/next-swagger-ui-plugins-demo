# otp-jwt-auth swagger-ui plugin

## swagger configuration
```yaml
components:
  securitySchemes:
    OtpJwtAuth:
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
  - OtpJwtAuth: []
```
