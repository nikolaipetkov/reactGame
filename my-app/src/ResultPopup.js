import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Leaderboard from './Leaderboard'

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


export default ResultPopup;