import React, { useEffect, useCallback } from 'react';
import Pagination from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { REQUEST_STATUS } from 'app.const';
import {
  fetchPokedex,
  setSearchQuery,
  setCurrentPage,
  paginationSelector,
} from 'store/pokedex';
import Pokemon from 'components/Pokemon';

import './Pokedex.css';

export default function Pokedex() {
  const dispatch = useDispatch();
  const pokedex = useSelector((state) => state.pokedex);
  const { totalPages, currentPage } = useSelector(paginationSelector);

  useEffect(() => {
    dispatch(fetchPokedex());
  }, []);

  const onChange = useCallback(
    debounce((event) => dispatch(setSearchQuery(event.target.value)), 500),
    [],
  );

  if (pokedex.status === REQUEST_STATUS.REJECTED) {
    return (
      <div className="pokedex-error">
        <span className="nes-text is-error">Failed to load</span>
      </div>
    );
  }

  const displayedItems = pokedex.entities.filter(({ name }) =>
    name.toLowerCase().includes(pokedex.searchQuery.toLowerCase()),
  );

  return (
    <div className="pokedex">
      <div className="pokedex-controls">
        <div className="nes-field">
          <input
            type="text"
            id="name_field"
            className="nes-input"
            placeholder="Search..."
            onChange={onChange}
          />
        </div>
        <Pagination
          pageCount={totalPages}
          pageRangeDisplayed={10}
          initialPage={currentPage}
          onPageChange={(page) => {
            dispatch(setCurrentPage(page.selected));
            dispatch(fetchPokedex());
          }}
          containerClassName="pagination"
          pageClassName="page"
          activeLinkClassName="page--active"
        />
      </div>
      <div className="message-container">
        {pokedex.status === REQUEST_STATUS.PENDING && 'Loading...'}
      </div>
      <div className="pokedex-container">
        {displayedItems.map(({ name, sprites }) => (
          <Pokemon name={name} sprites={sprites} key={name} />
        ))}
      </div>
    </div>
  );
}
