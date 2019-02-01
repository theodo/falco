## Prerequisites

You need to have a node version installed >= 8.x or >= 10.x.
If you have nvm installed, you can just type `nvm use` to use a working node version.

## Frontend architecture

The project is structured as follows:

* `src/components`: React components are reusable pieces of the application (such as a button).

* `src/pages`: React pages correspond to the application pages (such as the home page). Sub-components of these pages should be in sub-folders of each page, if they cannot be reused anywhere else.

* `src/redux`: Redux actions/reducers/sagas/selectors are all grouped by page in this folder (following the [ducks pattern](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)). Learn more about Redux by reading [the documentation](https://redux.js.org/basics).

## Quick start

Useful commands:

* `yarn` to install dependencies

* `yarn start` to start a local dev-server

* `yarn build` to build a minified version of the code, for production use!

* `yarn test` to launch tests in watch mode

* `yarn generate` to generate a new component or a new page. You will be prompted the following questions:

  * Do you want a page or a component?
  * What is the name of the component?
  * What is the type of the component? _Choose between [PureComponents](https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81), Components and stateless functions for your React component._
  * Do you want to connect your component to the Redux store? _Use Redux to handle your global state._
  * Do you want to use react-intl? _Use [react-intl](https://github.com/yahoo/react-intl/wiki/Components) to handle the translations within your application._
  * Do you want to use styled-components? _Use [styled-components](https://github.com/styled-components/styled-components) to easily style your components using a CSS syntax._
  * Do you want snapshot tests? _Snapshot tests allow you to easily lock the comportment of a component._

## Going further

Other useful commands:

* `yarn lint:fix` to automatically fix linting errors

* `yarn test:coverage` to generate the coverage

* `yarn nsp` to spot security breaches in your application

* `yarn analyze` to analyze the production bundle size

For more see [create-react-app documentation](https://github.com/facebookincubator/create-react-app)
