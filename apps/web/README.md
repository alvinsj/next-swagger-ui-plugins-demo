# next-swagger-ui-plugins-demo

This repo demostrates use of swagger-ui plugins for:
1. swagger-ui-plugin-otp-auth: [source](/packages/swagger-ui-plugin-otp-auth), [npm](https://www.npmjs.com/package/swagger-ui-plugin-otp-auth)
2. swagger-ui-plugin-saml-auth: [source](/packages/swagger-ui-plugin-saml-auth), [npm](https://www.npmjs.com/package/swagger-ui-plugin-saml-auth)
3. swagger-ui-custom-layout: [source](/packages/swagger-ui-custom-layout), [npm](https://www.npmjs.com/package/swagger-ui-custom-layout)
4. chain-wrap-components: [source](/packages/chain-wrap-components), [npm](https://www.npmjs.com/package/chain-wrap-components)

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
