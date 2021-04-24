import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

/**
 * Renders given component with provided store and router
 * For test purpose only
 */
export default function testRender(jsx, { store, ...otherOpts }) {
  return render(<Provider store={store}>{jsx}</Provider>, otherOpts);
}
