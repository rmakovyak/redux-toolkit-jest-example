import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getPokedex } from 'api/pokedex';
import { REQUEST_STATUS } from 'app.const';

const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokedex = createAsyncThunk(
  'pokedex/fetch',
  async (direction, thunkAPI) => {
    const state = thunkAPI.getState();
    const url = direction ? state.pokedex[direction] : DEFAULT_URL;

    const pokedex = await getPokedex(
      url,
      state.pokedex.limit,
      state.pokedex.offset,
    );
    return pokedex;
  },
);

export const paginationSelector = (state) => {
  const { count, limit, offset } = state.pokedex;
  const totalPages = Math.floor(count / limit);
  const currentPage = Math.floor(offset / limit);
  return { totalPages, currentPage };
};

const initialState = {
  status: REQUEST_STATUS.IDLE,
  entities: [],
  next: null,
  previous: null,
  count: 0,
  searchQuery: '',
  limit: 20,
  offset: 40,
};

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.offset = action.payload * state.limit;
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

export const { setSearchQuery, setCurrentPage } = pokedexSlice.actions;
export default pokedexSlice.reducer;
