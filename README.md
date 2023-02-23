# API Backend Node.js Diagnostic Exam

## Setup

: copy .env.example to .env and edit the environment variables

`cp .env.example  .env`

: install dependencies

`npm install`

: runs creation of database, migrations and seeders

`npm run setup`

: starts the server

`npm start`

OR

: starts the development server on watch mode

`npm run dev`

---

## Testing

: tests api routes

`npm test`

---

## Database

: create database

`npm run database:create`

: run migrations

`npm run migrate:up`

: undo migrations

`npm run migrate:undo`

: run seeders

`npm run seed:up`

: undo seeders

`npm run seed:undo`
