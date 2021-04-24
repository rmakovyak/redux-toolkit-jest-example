import { REQUEST_STATUS } from 'app.const';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokedex } from 'store/pokedex';
import Pokemon from 'components/Pokemon';

import './Pokedex.css';

export default function Pokedex() {
  const dispatch = useDispatch();
  const pokedex = useSelector((state) => state.pokedex);

  useEffect(() => {
    dispatch(fetchPokedex());
  }, []);

  if (pokedex.status === REQUEST_STATUS.REJECTED) {
    return (
      <div className="pokedex-error">
        <span className="nes-text is-error">Failed to load</span>
      </div>
    );
  }

  return (
    <div className="pokedex">
      <div className="pokedex-controls">
        <button
          className="nes-btn"
          onClick={() => dispatch(fetchPokedex('previous'))}
        >
          Previous
        </button>
        <button
          className="nes-btn"
          onClick={() => dispatch(fetchPokedex('next'))}
        >
          Next
        </button>
        {pokedex.status === REQUEST_STATUS.PENDING && 'Loading...'}
      </div>
      <div className="pokedex-container">
        {pokedex.entities.map(({ name, sprites }) => (
          <Pokemon name={name} sprites={sprites} key={name} />
        ))}
      </div>
    </div>
  );
}
