# Interactiveminingv3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

# Import

Import Module

    import {InteractiveMiningModule} from 'interactiveminingv3';

Place these files in your .angular-cli.json

    "styles": [
      "../node_modules/interactiveminingv3/assets/css/interactive-mining.css",
      "../node_modules/interactiveminingv3/assets/css/animations.css"
    ],
    "scripts": [
      "../node_modules/jquery/dist/jquery.min.js",
      "../node_modules/uikit/dist/js/uikit.min.js",
      "../node_modules/uikit/dist/js/uikit-icons.min.js",
      "../node_modules/interactiveminingv3/assets/js/ResizeSensor.js",
      "../node_modules/interactiveminingv3/assets/js/jquery.sticky-sidebar.js"
    ]

Store to LocalStorage the Username and the Backend

    localStorage.setItem('user_id', this._userid);
    localStorage.setItem('mining_backend_address', this._backendserveraddress);

# Usage

Navigate to `http://.../mining` with your project's router

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
