import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import initStore from '../store';

import CarList from './CarList';

const store = initStore();

const App = () => {
  return(
    <Provider store={store}>
        <CarList />
    </Provider>
  )
}

render(
  <App/>,
  document.querySelector('.app-container')
);

export default App