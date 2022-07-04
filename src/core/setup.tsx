import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root } from './root';

import 'normalize.css';

export const setup = () => {
  ReactDOM.render(<Root />, document.querySelector('#root'));
}
