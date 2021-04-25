import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { screen, fireEvent } from '@testing-library/react';

import clearActionsMeta from 'utils/clearActionsMeta';
import testRender from 'utils/testRender';

import Pokedex from './Pokedex';
import { REQUEST_STATUS } from 'app.const';

const mockStore = configureStore([thunk]);

describe('Pokedex', () => {
  test('should render pokedex', async () => {
    const fixture = {
      name: 'testosaur',
      sprites: [],
    };

    const store = mockStore({
      pokedex: {
        status: REQUEST_STATUS.FULFILLED,
        entities: [fixture],
        searchQuery: '',
        count: 100,
        limit: 20,
        offset: 0,
      },
    });

    testRender(<Pokedex />, { store });

    screen.getByText(/testosaur/i);
    screen.getByRole('img', { name: /testosaur/i });
  });

  test('should render error message if fetch request failed', async () => {
    const store = mockStore({
      pokedex: {
        status: REQUEST_STATUS.REJECTED,
        entities: [],
        searchQuery: '',
        count: 100,
        limit: 20,
        offset: 0,
      },
    });

    testRender(<Pokedex />, { store });

    screen.getByText('Failed to load');
  });

  test('should render loading if request is pending', async () => {
    const store = mockStore({
      pokedex: {
        status: REQUEST_STATUS.PENDING,
        entities: [],
        searchQuery: '',
        count: 100,
        limit: 20,
        offset: 0,
      },
    });

    testRender(<Pokedex />, { store });

    screen.getByText('Loading...');
  });

  test('should dispatch "pokedex/fetch" on mount', async () => {
    const store = mockStore({
      pokedex: {
        status: REQUEST_STATUS.IDLE,
        entities: [],
        searchQuery: '',
        count: 100,
        limit: 20,
        offset: 0,
      },
    });

    testRender(<Pokedex />, { store });

    const expectedPayload = {
      type: 'pokedex/fetch/pending',
      payload: undefined,
    };
    const dispatchedActions = clearActionsMeta(store.getActions());

    expect(dispatchedActions).toEqual([expectedPayload]);
  });

  test.only('should dispatch correct actions on prev button click', async () => {
    const store = mockStore({
      pokedex: {
        status: REQUEST_STATUS.IDLE,
        entities: [],
        searchQuery: '',
        count: 100,
        limit: 20,
        offset: 60,
      },
    });

    testRender(<Pokedex />, { store });
    store.clearActions();
    fireEvent.click(
      screen.getByRole('button', {
        name: /previous/i,
      }),
    );

    const expectedActions = [
      { type: 'pokedex/setCurrentPage', payload: 2 },
      {
        type: 'pokedex/fetch/pending',
      },
    ];
    const dispatchedActions = clearActionsMeta(store.getActions());
    expect(dispatchedActions).toEqual(expectedActions);
  });

  test('should dispatch correct actions on next button click', async () => {
    const store = mockStore({
      pokedex: {
        status: REQUEST_STATUS.IDLE,
        entities: [],
        searchQuery: '',
        count: 100,
        limit: 20,
        offset: 0,
      },
    });

    testRender(<Pokedex />, { store });
    store.clearActions();
    fireEvent.click(
      screen.getByRole('button', {
        name: /next/i,
      }),
    );

    const expectedActions = [
      { type: 'pokedex/setCurrentPage', payload: 1 },
      {
        type: 'pokedex/fetch/pending',
      },
    ];
    const dispatchedActions = clearActionsMeta(store.getActions());
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
