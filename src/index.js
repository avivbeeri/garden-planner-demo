import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import store from './store';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

function Square(props) {
  return (
    <button 
      className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}  
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    if (this.props.squares[i]) { 
      this.props.placePlant(null, i);
    } else {
      this.props.placePlant(this.props.current.name[0], i);
    }
  }

  render() {
    const line = Array(this.props.size).fill(null);
    return (
      <div>
        {line.map((a, i) => {
          return (
            <div className="board-row">
              {line.map((b, y) => {
                return this.renderSquare(i + y*this.props.size);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class PlantList extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(plant) {
    this.props.changePlant(plant);
  }

  render() {
    const plants = this.props.plants;
    const current = this.props.current;

    return (
      <ul>
        {plants.map((plant, index) => {
          return (
            <li>
              <a 
                className={"plantName " + (current.name === plant.name ? 'current-plant' : '')} 
                onClick={() => this.handleClick(plant)}>
                {plant.name}
              </a>
            </li>
          );
        })}
      </ul>
    );

  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="board">
          <BoardContainer>
            <Board />
          </BoardContainer>
        </div>
        <div className="info">
          <ListContainer>
            <PlantList />
          </ListContainer>
        </div>
      </div>
    );
  }
}

//  ========================================

function mapStateToProps(state) {
  return {
    plants: state.plants,
    current: state.current,
    squares: state.squares,
    size: state.size
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);
const ListContainer = connect(mapStateToProps, mapDispatchToProps)(PlantList);

//  ========================================

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

