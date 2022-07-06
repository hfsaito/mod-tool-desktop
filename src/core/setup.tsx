import axios from 'axios';
import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root } from './root';

export const setup = () => {
  axios.defaults.adapter = require('axios/lib/adapters/http'); // always use Node.js adapter
  ReactDOM.render(<Root />, document.querySelector('#root'));
}
