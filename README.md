# redux-toolkit-jest-example

How to structure and write tests for redux with redux-thunk and redux-toolkit

## List of usefull tools and articles for unit testing

- [https://testing-playground.com](testing playground)
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
