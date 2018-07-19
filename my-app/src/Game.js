import React, { Component } from 'react';
//import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
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
    console.log('time is mounted')
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    
    
  }
   
  componentDidUpdate(){
    if(this.props.remainingTime == 0){
      console.log('end from inside')
      clearInterval(this.timerID);
      //this.setState({remainingTime: 0})
      //this.props.onTimerChange();
    }
  }
  
  componentWillUnmount() {
    console.log('timer is unmounted')
    clearInterval(this.timerID);
  }
  
  tick() {
    /*this.setState({
      remainingTime: this.state.remainingTime - 1
    });*/
    this.props.onTimerChange();
  }
  
  render(){
    return (
      <div className="timer">
        {this.props.remainingTime}
      </div>
    );
  }
}

  
class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(i) {
    this.props.handleClick(i)
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
        <div className="points">Test: {this.props.value}</div>
        <div className="points">Points: {this.props.points}</div>
        <div className="current-word"> {this.props.squares} </div>
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






class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onTimerChange = this.onTimerChange.bind(this);
    this.checkIfWordIsCorrect = this.checkIfWordIsCorrect.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.state = {
      test: 5, 
      remainingTime: 8, 
      squares: [],
      words: ['angel', 'gel', 'age', 'leg', 'lag', 'gal', 'any'],
      points: 0,
      show: false
    };
  }

  handleClick(param){
    const squares = this.state.squares.slice();
    squares.push(param)
    this.setState({squares: squares}); 
  }

  checkIfWordIsCorrect(){
    const index = this.state.words.indexOf(this.state.squares.join(''));
    if(index > -1){
      console.log('you win2')
      const remainingWords = [...this.state.words.slice(0, index), ...this.state.words.slice(index+1)]
      this.setState({squares: [], points: this.state.points + 1, words: remainingWords})
    }
  }

  onTimerChange(){
    console.log('time has changed', this.state.remainingTime)
    this.setState({remainingTime: this.state.remainingTime - 1})
    if(this.state.remainingTime == 0){
      console.log('THE END')
      this.showModal();
    }
  }

  showModal(){
    this.setState({show: true})
  }

  hideModal(){
    this.setState({show: false})
  }

  playAgain(){
    this.setState({
      remainingTime: 8,  
      squares: [],
      words: ['angel', 'gel', 'age', 'leg', 'lag', 'gal', 'any'],
      points: 0,
      show: false
    })
  }

  render() {
    const gameOn = this.state.remainingTime ? true : false;
    let board, timer;

    if(gameOn){
      board = <Board handleClick={this.handleClick} checkIfWordIsCorrect={this.checkIfWordIsCorrect} squares={this.state.squares} words={this.state.words} points={this.state.points} />
      timer = <Timer value="8" onTimerChange={this.onTimerChange} remainingTime={this.state.remainingTime}/>
    } else {
      board = <div> "Game ended" </div>
      timer = <div> </div>
    }

    return (
      
      <div className="game">
        <div className="game-board">
          {/*<Timer value="8" onTimerChange={this.onTimerChange} remainingTime={this.state.remainingTime}/>*/}
          <div> {timer} </div>
          <div> {board} </div>
          {/*<Board handleClick={this.handleClick} checkIfWordIsCorrect={this.checkIfWordIsCorrect} squares={this.state.squares} words={this.state.words} points={this.state.points} />*/}
          <Trigger points={this.state.points} showModal={this.showModal} hideModal={this.hideModal} show={this.state.show} playAgain={this.playAgain}/>
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

class Trigger extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);
    this.playAgain = this.playAgain.bind(this);

    /*this.state = {
      show: false
    };*/
  }

  handleHide() {
    //this.setState({ show: false });
    this.props.hideModal();
  }

  playAgain(){
    this.props.playAgain();
  }
  render() {
    return (
      <div className="modal-container" style={{ height: 500 }}>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.props.showModal()}
        >
          Launch contained modal
        </Button>
        <Modal
          show={this.props.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Player Points: {this.props.points}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            body text
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.playAgain}>Play Again</Button>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}