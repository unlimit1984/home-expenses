GitHub Pages:
[![Build & Deploy UI on Github Pages](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-ghpages.yml/badge.svg)](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-ghpages.yml)

Railway:
[![Build & Deploy BACKEND NestJs on Railway](https://github.com/unlimit1984/home-expenses/actions/workflows/build-backend-railway.yml/badge.svg)](https://github.com/unlimit1984/home-expenses/actions/workflows/build-backend-railway.yml)

# Home Expenses App

## Table of contents

- [Local Setup](#local-setup)
  - [Backend](#backend)
    - [Install](#install)
    - [DB Migration](#db-migration)
      - [Generate entity diff DB script](#generate-entity-diff-db-script)
      - [Run code DB script and commit to DB](#run-code-db-script-and-commit-to-db)
    - [Test](#test)
  - [Frontend](#frontend)
    - [Install](#install-1)
    - [Unit tests](#unit-tests)
    - [E2E tests](#e2e---playwright-tests)
- [Deployment](#deployment)
  - [Deployment to GitHub pages](#deploy-to-github-pages)
- [Environments](#environments)
- [Architecture](#architecture)
  - [User Signup](#user-signup)
  - [User Signin](#user-signin)

---

## Local Setup

### Backend

#### Install

1. Create file in the root with db credentials
   `.env`

   ```
   PORT=__PORT__
   DB_PORT=__DB_PORT__
   DB_HOST=__DB_HOST__
   DB_NAME=__DB_NAME__
   DB_USERNAME=__DB_USERNAME__
   DB_PASSWORD=__DB_PASSWORD__
   ```

2. Fulfill `code/backend/home-expenses-api/src/datasource.ts` for db and migration
    ```ts
    import { DataSource, DataSourceOptions } from 'typeorm';
    
    export const datasourceOptions: DataSourceOptions = {
      type: 'mssql',
      host: 'DB_HOST',
      username: 'DB_USERNAME',
      password: 'DB_PASSWORD',
      database: 'DB_NAME',
      entities: ['dist/modules/database/**/entity/*.js'],
      migrations: ['dist/migration/*.js']
    };
    const dataSource = new DataSource(datasourceOptions);
    export default dataSource;
    
    ```
3. Install packages
   ```bash
   $ npm i
   ```
4. Running the app:

   ```bash
   # development with watch mode
   $ npm run start:dev

   # production mode
   $ npm run start:prod
   ```

#### DB Migration

##### Generate entity diff DB script

```bash
npm run migration:generate -- src/migration/YouSriptFile
```

##### Run code DB script and commit to DB

```bash
npm run migration:run
```

#### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Frontend

#### Install

1. Install nodejs version 18.14.0 from [here](https://nodejs.org/download/release/v18.14.0/)
   - You can try the latest version, but there is no guaranty that it will work properly
   - This project runs on `node` v18.14.0 and `npm` v9.3.1 and uses `angular-cli` v15
2. Edit your `\etc\hosts` (`C:\Windows\System32\drivers\etc\hosts`) file to include the following line: `127.0.0.1 local.home-expenses.com`
3. For local running open command line and execute following commands:
   - go to `code/frontend/home-expenses-ui` folder
   - Run `npm i`
   - Run `npm start-local` for local UI + local backend
   - Run in a lightweight nodejs mode:
     - `npm i -g http-server`
     - `npm run build-local`
     - `cd docs`
     - `http-server --p 8081`
   - Run `npm start-railway` for local UI + remote backend (railway)
4. Navigate to: `https://local.home-expenses.com:8444`

#### Unit Tests

```bash
cd code/frontend/home-expenses-ui
npm run test
```

#### E2E - Playwright tests
- Configure `.env` file with following content:
  ```
  PLAYWRIGHT_USERNAME=<ASK TEAM>
  PLAYWRIGHT_PASSWORD=<ASK TEAM>
  APP_URL=https://local.home-expenses.com:8444
  ```
- Provide `APP_URL` for the app which you want to test locally
- Run tests locally:
    - start app and run tests
        - `npm run start-local` (with running local backend) or just `npm run start-railway` (with remote backend)
        - `npm run e2e` or `npm run e2e-ui` with UI mode
    - run tests for any real env:
        - `npm run e2e-local:ci`
        - `npm run e2e-dev:ci`

## Deployment

### Deploy to GitHub Pages

1. Locally run `npm run deploy`
2. Do not modify folder `docs` to something else inside angular.json `"outputPath": "docs",`.
   `docs` folder is a requirement for correct GitHub Pages deployment
   (https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#about-publishing-sources)
3. Not every merge to frontend app triggers GitHub Pages deployment. Usually html diff should occur.

## Environments

| Environment | UI                                                       | Backend                                  | Swagger URL                                  |
| ----------- | -------------------------------------------------------- | ---------------------------------------- | -------------------------------------------- |
| dev         | https://unlimit1984.github.io/home-expenses/all-expenses | https://home-expenses-dev.up.railway.app | https://home-expenses-dev.up.railway.app/api |
| prod        | -                                                        | -                                        | -                                            |

## Architecture

### User Signup

![](docs/assets/plantuml/mail-service/user-signup.svg)

### User Signin

![](docs/assets/plantuml/mail-service/user-signin.svg)
