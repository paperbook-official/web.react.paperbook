<div align="center">
    <a href="https://reactjs.org/" target="_blank">
        <img
            src="./src/assets/icons/made-with-react.svg"
            alt="Made with React"
            height="80"
        >
    </a>
</div>

<div align="center">
    <a href="http://appliedproject05-paperbook-web.herokuapp.com/" target="_blank">
        <img
            src="./src/assets/icons/paperbook-logo.svg"
            alt="PaperBook Logo"
            height="100"
        >
    </a>
</div>

## Description

The project simulates an e-commerce for buying and selling books and stationery. Made with Typescript and React, it gets data from the [application backend](https://github.com/paperbook-official/api.nestjs.paperbook).

<hr>

## Content Table

<!--ts-->

-   [Description](#description)
-   [Content Table](#content-table)
-   [Getting Started](#getting-started)
-   [Running and Building the App](#running-and-building-the-app)
-   [Heroku](#heroku)
-   [Structure](#structure)
-   [Technologies](#technologies)
-   [License](#license)
<!--te-->

<hr>

## Getting Started

Before continue, be sure to have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed.

To clone the repository, use:

```bash
$ git clone 'https://github.com/paperbook-official/web.react.paperbook.git'
```

Then, install all of it's dependencies:

```bash
$ npm install
```

For VSCode developers, it's also highly recommended to install some extensions:

-   ESLint
-   Prettier - Code formatter
-   vscode-styled-components

<hr>

## Running and Building the App

To run the app in development mode:

```bash
$ npm start
```

Building the app for production:

```bash
$ npm run build
```

<hr>

## Heroku

The project uses Heroku to host it's development version. It can be accessed by [clicking here](http://appliedproject05-paperbook-web.herokuapp.com/).

To send the app to Heroku, first create a file named **.env.local** and put in it the template bellow:

```js
PORT = 3000;
```

> The PORT is not fixed and may be changed

\
Then, add the Heroku repository:

```bash
$ git remote add heroku https://git.heroku.com/heroku-app-name-here.git

$ git checkout master
$ git merge develop

$ git push heroku master
```

<hr>

## Structure

The project uses the [atomic design pattern](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97) to organize it's components, so be sure to select the correct folder according to the pattern's concepts.

Ex.: creating the Button, ListItem and List components:

-   `components`
    -   `atoms`
        -   `Button`
            -   index.tsx
            -   styles.ts
    -   `molecules`
        -   `ListItem`
            -   index.tsx
            -   styles.ts
    -   `organisms`
        -   `List`
            -   index.tsx
            -   styles.ts

<hr>

## Technologies

-   [React](https://reactjs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Styled Components](https://styled-components.com/)

<hr>

## License

The PaperBook project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
