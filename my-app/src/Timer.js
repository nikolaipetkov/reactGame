import React from 'react';

class Timer extends React.Component {
  componentDidMount(prevProps){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
   
  componentDidUpdate(){
    if(this.props.remainingTime === 0){
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

export default Timer;