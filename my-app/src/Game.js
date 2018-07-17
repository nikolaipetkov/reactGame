import React, { Component } from 'react';
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      remainingTime: this.props.value,
      finish: 0
    }
  }
  
  componentDidMount(prevProps){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    
    
  }
   
  componentDidUpdate(){
    if(this.state.remainingTime == 0){
      clearInterval(this.timerID);
      //this.setState({remainingTime: 0})
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({
      remainingTime: this.state.remainingTime - 1
    });
  }
  
  render(){
    return (
      <div className="timer">
        {this.state.remainingTime}
      </div>
    );
  }
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      words: ['angel', 'gel', 'age', 'leg', 'lag', 'gal'],
      points: 0,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares.push(i)
    this.setState({squares: squares});
  }
  
  componentDidUpdate(prevProps) {
    console.log(this.state.squares.join(''))
    console.log(this.state.words)
    const index = this.state.words.indexOf(this.state.squares.join(''));
    if(index > -1){
      console.log('you win2')
      const remainingWords = [...this.state.words.slice(0, index), ...this.state.words.slice(index+1)]
      //remainingWords.splice(index, 1)
      this.setState({squares: [], points: this.state.points + 1, words: remainingWords})
    }
      
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
        <div className="points">Points: {this.state.points}</div>
        <div className="current-word"> {this.state.squares} </div>
        <div className="board-row">
          {this.renderSquare('a')}
          {this.renderSquare('n')}
          {this.renderSquare('g')}
        </div>
        <div className="board-row">
          {this.renderSquare('e')}
          {this.renderSquare('l')}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
class Game extends React.Component {
  render() {
    return (
      
      <div className="game">
        <div className="game-board">
          <Timer value="3" />
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

export default Game;

/*ReactDOM.render(
  <Game />,
  document.getElementById('root')
);*/

