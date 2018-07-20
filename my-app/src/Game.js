import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
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
  }
  
  componentDidMount(prevProps){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    
    
  }
   
  componentDidUpdate(){
    if(this.props.remainingTime == 0){
      clearInterval(this.timerID);
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onTimerChange = this.onTimerChange.bind(this);
    this.checkIfWordIsCorrect = this.checkIfWordIsCorrect.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.setNickname = this.setNickname.bind(this);
    this.clearCurrent = this.clearCurrent.bind(this);
    this.state = {
      remainingTime: 10, 
      letters: [],
      words: ['angel', 'gel', 'age', 'leg', 'lag', 'gal', 'any'],
      points: 0,
      show: false,
      players: [],
      nickname: null
    };
  }

  getNickname(){
    this.currentPlayerNickname = window.prompt('what is your nickname', 'type it here');
  }

  setNickname(newNickname){
    this.setState({nickname: newNickname})
  }

  handleClick(param){
    const letters = this.state.letters.slice();
    letters.push(param)
    this.setState({letters: letters}); 
  }

  clearCurrent(){
    this.setState({letters: []})
  }

  checkIfWordIsCorrect(){
    const index = this.state.words.indexOf(this.state.letters.join(''));
    if(index > -1){
      console.log('you win2')
      const remainingWords = [...this.state.words.slice(0, index), ...this.state.words.slice(index+1)]
      this.setState({letters: [], points: this.state.points + 1, words: remainingWords})
    }
  }

  compare(player1, player2) {
    //descending
    if (player1.points > player2.points)
      return -1;
    if (player1.points < player2.points)
      return 1;
    return 0;
  }

  onTimerChange(){
    this.setState({remainingTime: this.state.remainingTime - 1})

    if(this.state.remainingTime == 0){
      console.log('THE END')
      this.getNickname()
      this.setNickname(this.currentPlayerNickname)

      const updatedPlayers = this.state.players.slice();
      updatedPlayers.push({id: Date.now(), name: this.state.nickname, points: this.state.points})
      updatedPlayers.sort(this.compare);
      this.setState({players: updatedPlayers});

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
      remainingTime: 10,  
      letters: [],
      words: ['angel', 'gel', 'age', 'leg', 'lag', 'gal', 'any'],
      points: 0,
      show: false,
      nickname: null
    })
  }

  

  render() {
    let gameOn = this.state.remainingTime ? true : false;
    let board, timer;

    if(gameOn){
      board = <Board setNickname={this.setNickname} clearCurrent={this.clearCurrent} handleClick={this.handleClick} checkIfWordIsCorrect={this.checkIfWordIsCorrect} letters={this.state.letters} words={this.state.words} points={this.state.points} />
      timer = <Timer value="8" onTimerChange={this.onTimerChange} remainingTime={this.state.remainingTime}/>
    } else {
      board = <div> "Game ended" </div>
      timer = <div> </div>
    }

    return (
      <div className="game">
        <div className="game-board">
          <div> {timer} </div>
          <div> {board} </div>
          <ResultPopup points={this.state.points} showModal={this.showModal} hideModal={this.hideModal} show={this.state.show} playAgain={this.playAgain} leaderboardItems = {this.state.players}/>
        </div>
      </div>
    );
  }
}



export default Game;

function Leaderboard(props){
  let leaderboardItems = props.leaderboardItems.map((element) =>
    <li key={element.id}>
      Name: {element.name} <br/> 
      Points: {element.points}
    </li>
  );

  return (
    <div>
      <h2> Leaderboard: </h2>
      <ol> 
        {leaderboardItems}
      </ol>
    </div>
  )
}

class ResultPopup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  handleHide() {
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
              Current Player Points: {this.props.points}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Leaderboard leaderboardItems={this.props.leaderboardItems} />
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