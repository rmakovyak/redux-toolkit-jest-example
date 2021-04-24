import { buildStore } from 'store';

import { setSearchQuery } from './pokedex';

describe('store/pokedex', () => {
  test('setSearchQuery', () => {
    const store = buildStore();
    const query = 'Testosaur';
    store.dispatch(setSearchQuery(query));

    const { searchQuery } = store.getState().pokedex;
    expect(searchQuery).toBe(query);
  });
});
