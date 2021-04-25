import { REQUEST_STATUS } from 'app.const';
import { buildStore } from 'store';

import { setSearchQuery, setCurrentPage } from './pokedex';

describe('store/pokedex', () => {
  test('setSearchQuery', () => {
    const store = buildStore();
    const query = 'Testosaur';
    store.dispatch(setSearchQuery(query));

    const { searchQuery } = store.getState().pokedex;
    expect(searchQuery).toBe(query);
  });

  test('setCurrentPage', () => {
    const store = buildStore();
    store.dispatch(setCurrentPage(2));
    const { offset, limit } = store.getState().pokedex;
    expect(offset).toBe(limit * 2);
    store.dispatch(setCurrentPage(0));
    const { offset: offsetZero } = store.getState().pokedex;
    expect(offsetZero).toBe(0);
  });

  test('pokedex/fetch/pending', () => {
    const store = buildStore();
    store.dispatch({ type: 'pokedex/fetch/pending' });

    const { status } = store.getState().pokedex;
    expect(status).toBe(REQUEST_STATUS.PENDING);
  });

  test('pokedex/fetch/rejected', () => {
    const store = buildStore();
    store.dispatch({
      type: 'pokedex/fetch/rejected',
      error: { message: new Error() },
    });

    const { status } = store.getState().pokedex;
    expect(status).toBe(REQUEST_STATUS.REJECTED);
  });

  test('pokedex/fetch/fulfilled', () => {
    const fixture = {
      results: [{ name: 'testosaur', sprites: [] }],
      next: 'next',
      previous: 'previous',
      count: 10,
    };
    const store = buildStore();
    store.dispatch({
      type: 'pokedex/fetch/fulfilled',
      payload: fixture,
    });

    const {
      status,
      entities,
      count,
      next,
      previous,
    } = store.getState().pokedex;
    expect(status).toBe(REQUEST_STATUS.FULFILLED);
    expect(entities).toBe(fixture.results);
    expect(count).toBe(fixture.count);
    expect(next).toBe(fixture.next);
    expect(previous).toBe(fixture.previous);
  });
});
