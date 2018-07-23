import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './App.css';
import Leaderboard from './Leaderboard';
import Timer from './Timer';
import ResultPopup from './ResultPopup';
import Board from './Board';


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
      remainingTime: 40, 
      letters: [],
      words: ['angel', 'gel', 'age', 'leg', 'lag', 'gal', 'any', 'gale', 'lane', 'all'],
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
      const remainingWords = [...this.state.words.slice(0, index), ...this.state.words.slice(index+1)]
      this.setState({letters: [], points: this.state.points + 5, words: remainingWords})
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
    this.setState((prevState, props) => ({
      remainingTime: prevState.remainingTime - 1
    }));

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
      remainingTime: 40,  
      letters: [],
      words: ['angel', 'gel', 'age', 'leg', 'lag', 'gal', 'any', 'gale', 'lane'],
      points: 0,
      show: false,
      nickname: null
    })
  }

  

  render() {
    let gameOn = this.state.remainingTime ? true : false;
    let board, timer;

    if(gameOn){
      board = <Board showBoard={true} setNickname={this.setNickname} clearCurrent={this.clearCurrent} handleClick={this.handleClick} checkIfWordIsCorrect={this.checkIfWordIsCorrect} letters={this.state.letters} words={this.state.words} points={this.state.points} />
      timer = <Timer showTimer={true} onTimerChange={this.onTimerChange} remainingTime={this.state.remainingTime}/>
    } else {
      board = <Board showBoard={false} setNickname={this.setNickname} clearCurrent={this.clearCurrent} handleClick={this.handleClick} checkIfWordIsCorrect={this.checkIfWordIsCorrect} letters={this.state.letters} words={this.state.words} points={this.state.points} />
      timer = <Timer showTimer={false} onTimerChange={this.onTimerChange} remainingTime={this.state.remainingTime}/>
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

