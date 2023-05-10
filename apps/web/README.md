# next-swagger-ui-plugins-demo

This repo demostrates use of swagger-ui plugins for:
1. @dsaidgovsg/swagger-ui-plugin-otp-auth: [source](/packages/swagger-ui-plugin-otp-auth), [npm](https://github.com/dsaidgovsg/lswagger-ui-preset/pkgs/npm/swagger-ui-plugin-otp-auth)
2. @dsaidgovsg/swagger-ui-plugin-saml-auth: [source](/packages/swagger-ui-plugin-saml-auth), [npm](https://github.com/dsaidgovsg/lswagger-ui-preset/pkgs/npm/swagger-ui-plugin-saml-auth)
3. @dsaidgovsg/swagger-ui-custom-layout: [source](/packages/swagger-ui-custom-layout), [npm](https://github.com/dsaidgovsg/lswagger-ui-preset/pkgs/npm/swagger-ui-custom-layout)
4. @dsaidgovsg/chain-wrap-components: [source](/packages/chain-wrap-components), [npm](https://github.com/dsaidgovsg/lswagger-ui-preset/pkgs/npm/chain-wrap-components)

It also consists the following mock APIs: 
- [Mock SAML API](/apps/web/src/pages/api/auth/saml) implemetation with [MockSaml](https://mocksaml.com/).
- [Mock OTP API](/apps/web/src/pages/api/auth/otp) implemetation.
- [Mock Service API](/apps/web/src/pages/api/service) implementation.

# Prerequisites

- Next.js

# Start server 

```
$ turbo run dev      # open browser and browse to http://localhost:3000
```
