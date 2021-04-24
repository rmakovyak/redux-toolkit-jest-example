import React from 'react';
import capitilize from 'lodash.capitalize';

export default function Pokemon({ name, sprites }) {
  return (
    <div className="nes-container with-title is-centered">
      <p className="title">{capitilize(name)}</p>
      <img src={sprites.front_default} alt={name} />
    </div>
  );
}
