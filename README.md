#  swagger-ui-plugins-monorepo

This repo consists of an [demo](/apps/web), and the following npm packages:
1. @dsaid/swagger-ui-plugin-otp-auth: [source](/packages/swagger-ui-plugin-otp-auth), [npm](https://www.npmjs.com/package/@dsaid/swagger-ui-plugin-otp-auth)
2. @dsaid/swagger-ui-plugin-saml-auth: [source](/packages/swagger-ui-plugin-saml-auth), [npm](https://www.npmjs.com/package/@dsaid/swagger-ui-plugin-saml-auth)
3. @dsaid/swagger-ui-custom-layout: [source](/packages/swagger-ui-custom-layout), [npm](https://www.npmjs.com/package/@dsaid/swagger-ui-custom-layout)
4. @dsaid/chain-wrap-components: [source](/packages/chain-wrap-components), [npm](https://www.npmjs.com/package/@dsaid/chain-wrap-components)


## Prerequisites

- Node.js v18 

## Setup 

### Install

```
$ npm install 
```

### Scripts

#### Development

Managing the monorepo is done by [turbo](https://turbo.build/repo/docs)

```
$ turbo run dev          # boot up instance, e.g. http://localhost:8090
$ turbo run test         # run tests for all packages
$ turbo run lint         # run lint for all packages
$ turbo run test:watch   # run tests in watch mode
``` 

Change logs is managed by [changesets](https://github.com/changesets/changesets).

```
$ npx changeset          # cli to generate changeset, CI will auto-create a PR
```

## Screenshots

<img width="1464" alt="Screenshot 2023-04-12 at 6 05 19 PM" src="https://user-images.githubusercontent.com/243186/231425969-69d34b59-767d-4146-9851-8c1b4ed09c26.png">

