# HomeExpenses Auth Service

## Description

Authentication JWT service

## Installation

Create file in the root with db credentials
`.env`
```
PORT=__PORT__
DB_PORT=__DB_PORT__
DB_HOST=__DB_HOST__
DB_NAME=__DB_NAME__
DB_USERNAME=__DB_USERNAME__
DB_PASSWORD=__DB_PASSWORD__
```
```bash
$ npm i
```

## Running the app

```bash
# development with watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DB Migration

### Generate entity diff DB script
```bash
npm run migration:generate -- src/migration/YouSriptFile
```

### Run code DB script and commit to DB
```bash
npm run migration:run
```
