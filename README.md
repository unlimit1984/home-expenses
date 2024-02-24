GitHub Pages:
[![Build & Deploy UI on Github Pages](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-ghpages.yml/badge.svg)](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-ghpages.yml)

Railway:
[![Build & Deploy BACKEND NestJs on Railway](https://github.com/unlimit1984/home-expenses/actions/workflows/build-backend-railway.yml/badge.svg)](https://github.com/unlimit1984/home-expenses/actions/workflows/build-backend-railway.yml)

# Home Expenses App

## Table of contents

- [Local Setup](#local-setup)
  - [Backend](#backend)
  - [DB Migration](#db-migration)
    - [Generate entity diff DB script](#generate-entity-diff-db-script)
    - [Run code DB script and commit to DB](#run-code-db-script-and-commit-to-db)
  - [Frontend](#frontend)
- [Deployment](#deployment)
  - [Deployment to GitHub pages](#deploy-to-github-pages)
- [Environments](#environments)
- [Architecture](#architecture)
  - [User Signup](#user-signup)
  - [User Signin](#user-signin)

---

## Local Setup

### Backend

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

2. Install packages   
    ```bash
    $ npm i
    ```
3. Running the app:
    ```bash
    # development with watch mode
    $ npm run start:dev
    
    # production mode
    $ npm run start:prod
    ```

### DB Migration

#### Generate entity diff DB script
```bash
npm run migration:generate -- src/migration/YouSriptFile
```

#### Run code DB script and commit to DB
```bash
npm run migration:run
```


### Frontend

1. Install nodejs version 18.14.0 from [here](https://nodejs.org/download/release/v18.14.0/)
   - You can try the latest version, but there is no guaranty that it will work properly
   - This project runs on `node` v18.14.0 and `npm` v9.3.1 and uses `angular-cli` v15
2. Edit your `\etc\hosts` (`C:\Windows\System32\drivers\etc\hosts`) file to include the following line: `127.0.0.1 local.home-expenses.com`
3. For local running open command line and execute following commands:
   - go to `code/frontend/home-expenses-ui` folder
   - Run `npm i`
   - Run `npm start`
4. Navigate to: `https://local.home-expenses.com:8443`


## Deployment

### Deploy to GitHub Pages

1. Locally run `npm run deploy`
2. Do not modify folder `docs` to something else inside angular.json `"outputPath": "docs",`.
   `docs` folder is a requirement for correct GitHub Pages deployment
   (https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#about-publishing-sources)
3. Not every merge to frontend app triggers GitHub Pages deployment. Usually html diff should occur.

## Environments
| Environment | UI     | Backend | Swagger URL | 
|-|-|-|-|
| dev        | https://unlimit1984.github.io/home-expenses/all-expenses | https://home-expenses-dev.up.railway.app | https://home-expenses-dev.up.railway.app/api |
| prod       | - | - | - |

## Architecture

### User Signup

![](docs/assets/plantuml/mail-service/user-signup.svg)

### User Signin

![](docs/assets/plantuml/mail-service/user-signin.svg)
