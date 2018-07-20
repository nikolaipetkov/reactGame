import React, { Component } from 'react';

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

export default Leaderboard;