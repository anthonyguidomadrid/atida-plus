# Atida Plus

This project has been setup with [Next.js](https://nextjs.org/).

## Set up the project

```bash
git clone git@gitlab.com:atida/frontend/atida-plus.git
cd atida-plus
yarn
```

## Getting Started

First, create a `.env.local` file in the project root. This file is gitignored and should not be committed with any sensitive information.

Find the content for this file in LastPass under the name "Atida Plus FE: Local environment variables"

Then, run the development server and Storybook pattern library:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Storybook instance will be opened automatically at [http://192.168.2.100:6006/](http://192.168.2.100:6006/).

Running either Next.js or Storybook is possible by separately using:

```bash
npm run dev:next
npm run dev:storybook
# or
yarn dev:next
yarn dev:storybook
```

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

To start working on the _Contentful Scripts_, see the specific [README](./contentful-scripts/README.md).

## Base Setup

### Framework

We are using [Next.js](https://nextjs.org/) to build and serve the frontend.

### Styling

This project has been setup to use the [TailwindCSS](https://tailwindcss.com/) framework.

### Localisation

We are using [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/) for managing translations. See [004-use-i18next-for-localisation](/docs/architectural-decisions/0004-use-i18next-for-localisation.md).

Currently we have a bit of a crude way to extract translations from the codebase, this can be run with `yarn extract-translations` - it doesn't produce a definitive list however. Translations that include things like API errors, coupon codes or promotion labels are not possible to statically extract.

### State management and events

We are using [@reduxjs/toolkit](https://redux-toolkit.js.org/) and [react-redux](https://react-redux.js.org/) to manage our data. It can also be used to dispatch events that can trigger other side-effects (for example, analytics tracking).

We are using [redux-saga](https://github.com/redux-saga/redux-saga) to help manage side-effects.

### Logging

We are using [pino](https://github.com/pinojs/pino) for logging. It's similar to [winston](https://github.com/winstonjs/winston) but a lot smaller for front-end bundles.

When logging info/warning/error messages you _should always_ use this logger and not `console`.

You can customise the level of logs you receive in your development environment by adding `LOG_LEVEL=info` (or warn, error, debug, fatal, trace) to your `.env.local`. This can also be customised in deployed environments by updating the `configmap.yml` for that environment.

### Caching

We are using [redis](https://github.com/NodeRedis/node-redis) in conjuction with [axios-cache-adapter](https://github.com/RasCarlito/axios-cache-adapter) to assist with shared caching of Contentful requests across the site.

The Redis GUI can be installed via homebrew and instructions for this can be found here: [installing redis gui](https://gist.github.com/tomysmile/1b8a321e7c58499ef9f9441b2faa0aa8). The `REDIS_HOST` entry value in your `env.local` file can be found in `/usr/local/etc/redis.conf` once you have run the install.

The Redis CLI is also available if prefered and can be found here: [installing redis cli](https://redis.io/topics/rediscli). To access the Redis cache locally, the following command can be run:

```
redis-cli -h "REDIS_HOST" --tls -a "REDIS_AUTH" -p "REDIS_PORT"
```

The `REDIS_HOST`, `REDIS_AUTH` and `REDIS_PORT` values can be found in the `env.local` file.

**Please not that the Redis set up is optional (it is turned off by default), and is only required if you are working on any Redis caching related tickets.**

## Cypress

We use [Cypress](https://www.cypress.io/) for frontend regression and smoke testing. Our Cypress tests are organised by product team and then feature/page, and they use a mix of real and mocked frontend API endpoints to provide a balance of speed and realism. Most tests are designed to emulate common user behaviour, as well as known edge cases.

### Cypress Setup

To run tests on your local machine that depend on the Spryker Postgres DB, you will first need to copy the contents of the `devDatabaseEnvironmentJson` variable from https://gitlab.com/atida/frontend/atida-plus/-/settings/ci_cd into a new `dev.json` file in the `tests/cypress/config/` directory in your local repository. This file is .gitignored, to prevent live database credentials from being leaked. These values are also available in the `Spryker QA AtidaPlus Dev` LastPass entry.

To login to non-production sites via the AWS Cognito login page **and** run tests that use the predefined Cypress Test User, you will also need to copy the contents of the `cypressAuthJson` variable from https://gitlab.com/atida/frontend/atida-plus/-/settings/ci_cd to `auth.json` in the `tests/cypress/fixtures` directory. This file is also .gitignored. These login details are also available in the `PLUS Cypress Test User` and `Cypress (DEV) AWS Cognito` LastPass entries.

Ensure that you do not commit credentials or other sensitive information when adding new tests to this repo - distribute them via LastPass or another secure method such as GitLab CI variables.

### Running Cypress

Cypress can be run on your local machine against the dev environment using `yarn run cypress` (CLI Test Runner) or `yarn run cypress:open` (UI Test Runner).

To run tests against a local Next.js environment, run Cypress using the `yarn run cypress:local` or `yarn run cypress:local:open` commands. The tests will run much more quickly if you build and run your local environment using `yarn build && yarn start`, but for quick checks you can just use `yarn dev:next`.

You can scope your test run to a specific product team by setting the `CYPRESS_TEAM` environment variable, like so:

```
$ CYPRESS_TEAM=core-shopping yarn run cypress:open
$ CYPRESS_TEAM=nav-search-ranking yarn run cypress:local
$ CYPRESS_TEAM=basket-checkout yarn run cypress:local:open
$ CYPRESS_TEAM=account yarn run cypress --env locale='es'
```

Or use one of the shortcuts defined in the `scripts` section of `package.json`:

```
$ yarn run cypress:local:basket-checkout
$ yarn run cypress:open:es
```

## Developer Tooling

### Bundle Analyzer

[Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) has been integrated to help identify large dependencies. You can run this on your local machine with `ANALYZE=true yarn build`.

### Code Generation

We are using GraphQL for some contentful requests, this means that we can automatically generate typescript types for these queries using [graphql-codegen](https://www.graphql-code-generator.com/docs/plugins/typescript).

To make use of this, when you edit a `*.graphql` file or add new GraphQL queries, you should run `yarn generate-graphql` afterwards to update the generated file in `src/generated/graphql.ts`. This is a large file but it is only used server-side so should have no impact on the client-side bundle.

The types are generated from the actual contentful GraphQL schema and the actual queries you write.

## ADRs

We are using ADRs in this repository to keep track of any technical decisions we make and their consequences for the project.

Please find our ADRs [here](/docs/architectural-decisions).

### Creating a new ADR

[adr-tools](https://github.com/npryce/adr-tools) is a useful tool to automate some of the ADR creation process.

In general, you should add a new .md file to /docs/architectural-decisions, making sure to increment the prefixed number.

Please see [our first ADR](/docs/architectural-decisions/0001-record-architecture-decisions.md) for more information about what an ADR is and why we are using them.

## Deployment

[Release Process](./RELEASE_PROCESS.md)
