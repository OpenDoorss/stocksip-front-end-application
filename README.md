# Stocksip FrontEnd Application

## Summary

This project is a front-end application for Stocksip, a 

## Features

Project features include:

- CRUD operations for warehouses, reports and authentication.
- Domain-Driven Design (DDD) principles.
- Internationalization (i18n) support.
- Integration with JSON Server Fake Api
- In-app Navigation App
- Environment configuration

## Documentation

The documentation is available in the docs' folder. It includes:

- User Stories are available in the [docs/user-stories.md](/docs/user-stories.md) folder.
- PlantUML Class diagram are available in the [docs/class-diagram.puml](/docs/class-diagram.puml) folder.
- C4 Model Software Architecture are available in the [docs/software-architecture](/docs/software-architecture.dsl) folder.

## Frameworks and Libraries

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

It also uses the following dependencies:

- Angular Material (https://material.angular.dev/)
- ngx-translate and ngx-translate/http-loader (https://github.com/ngx-translate/core)
- JSON Server stable version (https://github.com/typicode/json-server/tree/v0)
- JsPDF (https://www.npmjs.com/package/jspdf)

## Fake API start

Run the following commands to start the fake API server:

For windows:
```
 cd server
 cmd start.cmd
 start.cmd
```

For MacOS/Linux:
```
 cd server
 sh start.sh
```

The API endpoints should be access at `http://localhost:3000/api/v1`. The current API resource endpoints are:

- `http://localhost:3000/api/v1/warehouses`
- `http://localhost:3000/api/v1/products`
- `http://localhost:3000/api/v1/reports`
-  `http://localhost:3000/api/v1/zone`
- `http://localhost:3000/api/v1/users`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


