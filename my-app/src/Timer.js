import React, { Component } from 'react';

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
    if(!this.props.showTimer)
      return null;
    
    return (
      <div className="timer">
        {this.props.remainingTime}
      </div>
    );
  }
}

export default Timer;