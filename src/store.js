import { createStore, compose } from 'redux';
import rootReducer from './reducers.js';

const plants = [
  {
    name: 'Daisies',
    icon: 1
  },
  {
    name: 'Roses',
    icon: 2
  }
];

const size = 16;
let squares;
const storedSquares = localStorage.getItem('layout');

if (storedSquares) {
  squares = JSON.parse(storedSquares);
} else {
  squares = Array(size*size).fill(null);
}
// create default data
export const defaultState = {
  current: plants[0],
  squares,
  plants,
  size
};

const store = createStore(rootReducer, defaultState);

export default store;

