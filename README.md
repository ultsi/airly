# airly

## Project setup

### Requirements

This project requires at least `npm v3.10.3` and `Node v6.7.0`. Rest of the requirements can be installed by running `npm install` in root folder.

### Editor settings

An editor with jshint support is recommended. Project uses a file named `.jshint` to define more strict syntax for writing javascript. 

## Running the project

Run `npm start` to run the website in port 3000.

## Directory hierarchy

`controllers/` contains all controllers which handle traffic. Adding a route (HTTP GET/POST) to a function, is done in routes.js in root folder. Controllers do not communicate with each other. Tasks required by multiple controllers can be put into a service, DBService for example.

`services/` contains all services that need to be accessed by controllers.

`models/` contains definitions of data structures used in the project. These should resemble JSON requests/responses or DB structure.

`public/` contains static assets and scripts used in UI.

`views/` contains UI definitions as EJS templates (HTML with EJS templating).
