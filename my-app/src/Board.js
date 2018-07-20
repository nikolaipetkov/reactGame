import React, { Component } from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(i) {
    this.props.handleClick(i)
  }

  clearCurrent(){
    this.props.clearCurrent();
  }
  
  componentDidUpdate(prevProps) {
   this.props.checkIfWordIsCorrect();
  }

  renderSquare(i) {
    return (
      <Square
        value={i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="points">Points: {this.props.points}</div>
        <div className="current-word">Current Letters: {this.props.letters} </div>
        <button onClick={() => this.clearCurrent()}> Clear </button>
        <div className="board-row">
          {this.renderSquare('a')}
          {this.renderSquare('n')}
          {this.renderSquare('g')}
        </div>
        <div className="board-row">
          {this.renderSquare('e')}
          {this.renderSquare('l')}
          {this.renderSquare('x')}
        </div>
      </div>
    );
  }
}

export default Board;