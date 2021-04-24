import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getPokedex } from 'api/pokedex';
import { REQUEST_STATUS } from 'app.const';

const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokedex = createAsyncThunk(
  'pokedex/fetch',
  async (direction, thunkAPI) => {
    const state = thunkAPI.getState();
    const url = direction ? state.pokedex[direction] : DEFAULT_URL;

    const pokedex = await getPokedex(url);
    return pokedex;
  },
);

const initialState = {
  status: REQUEST_STATUS.IDLE,
  entities: [],
  next: null,
  previous: null,
  count: null,
  searchQuery: '',
};

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: {
    [fetchPokedex.pending]: (state) => {
      state.status = REQUEST_STATUS.PENDING;
    },
    [fetchPokedex.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.FULFILLED;
      state.entities = action.payload.results;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.count = action.payload.count;
    },
    [fetchPokedex.rejected]: (state, action) => {
      state.status = REQUEST_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export const { setSearchQuery } = pokedexSlice.actions;
export default pokedexSlice.reducer;
