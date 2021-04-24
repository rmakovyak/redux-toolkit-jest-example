import { configureStore } from '@reduxjs/toolkit';

import pokedex from './pokedex';

export const buildStore = () =>
  configureStore({
    reducer: {
      pokedex,
    },
  });
