import { defaultState } from './store';

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case 'PLACE_PLANT': {
      const squares = state.squares.slice();
      squares[action.index] = action.plant;
      state = Object.assign({}, state, {
        squares
      });
      break;
    }
    case 'CHANGE_PLANT': {
      state = Object.assign({}, state, {
        current: action.plant
      });
      break;
    }
  }

  localStorage.setItem('layout', JSON.stringify(state.squares));

  return state;
}

export default rootReducer;

