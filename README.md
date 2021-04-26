# redux-toolkit-jest-example

How to structure and write tests for redux with redux-thunk and redux-toolkit

## List of usefull tools and articles for unit testing

- [Testing playground](https://testing-playground.com)
- [Common mistakes with react testing library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library/)

## Testing best practices

When working with redux-toolkit there are a couple of different types of tests we can write:

### React components that are connected to store by useDispatch and useSelector

[Example: components/Pokedex](src/components/Pokedex.js)
[Example: components/Pokedex.test](src/components/Pokedex.test.js)

The best approach for these components is to mock a store with `redux-mock-store`,
wrap components in mocked store, render it, and run assertions.
You can also compare dispatched actions with `redux-mock-store`.
This allows you to test component in isolation and make sure there are no side effects triggered (http request, state mutations, etc).

You can use [utils/testRender](src/utils/testRender.js)

### Store slice

[Example: store/pokedex.test.js](src/store/pokedex.test.js)

Thanks to `createSlice` from `@redux/toolkit` the action types and action creators
are auto-generate based on reducer.

So here, we can test whole flow only once to make sure that dispatched action is creating wanted impact on the store state.

### Selectors

[Example: store/pokedex.test.js](src/store/pokedex.test.js)

Tested with real or mocked store (depends on situation), pure function, so there should be no issues here
