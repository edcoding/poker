import React, { Component } from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
import logo from '../images/logo.svg';
import Board from './board';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			showRules: false,
			showAbout: false,
			showSource: false
		};
	}

	open(source) {
		if (source === 'rules') {
			this.setState({showRules: true});
		} else if (source === 'about') {
			this.setState({showAbout: true});
		} else if (source === 'source') {
			this.setState({showSource: true});
		}
	}

	close(source) {
		if (source === 'rules') {
			this.setState({showRules: false});
		} else if (source === 'about') {
			this.setState({showAbout: false});
		} else if (source === 'source') {
			this.setState({showSource: false});
		}
	}

	render() {
		return (
			<div id="app">
				<div id="app-header">
					<div id="title">REACT POKER</div>
					<ButtonGroup justified>
							<Button bsClass="btn-outline-secondary" onClick={this.open.bind(this, 'rules')}>Rules</Button>
							<Button bsClass="btn-outline-secondary" onClick={this.open.bind(this, 'about')}>About</Button>
							<Button bsClass="btn-outline-secondary" onClick={this.open.bind(this, 'source')}>Source</Button>
					</ButtonGroup>
				</div>
				<Board />

				<div id="footer">
					 <img src={logo} className="react-logo" alt="logo" />
				</div>

				<Modal show={this.state.showRules} onHide={this.close.bind(this, 'rules')}>
					<Modal.Header>
						<Modal.Title>Rules</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>How to Play</h4>
						<p>You start with 100 chips. Click the 'New Game' button to play. Each game will cost 5 chips. You will get dealt 5 cards. After reviewing your hand you can click on a card to hold it. Then click the 'Deal' button and exchange any cards you did not hold for new cards. If you have a winning hand you will win chips! One deck is used and is shuffled after each game. Chip totals will be saved in your browser so you can always pick up from where you left off.</p>

						<h4>Winning Hands</h4>
						<p>
							Royal Flush - 4000 chips<br />
							Straight Flush - 250 chips<br />
							4 of a Kind - 125 chips<br />
							Full House - 45 chips<br />
							Flush - 30 chips<br />
							Straight - 20 chips<br />
							3 of a Kind - 15 chips<br />
							Two Pairs - 10 chips<br />
							Pair - 5 chips
						</p>

					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close.bind(this, 'rules')}>Close</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.showAbout} onHide={this.close.bind(this, 'about')}>
					<Modal.Header>
						<Modal.Title>About</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Confidential</p>
						<p>ReactJS poker board</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close.bind(this, 'about')}>Close</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.showSource} onHide={this.close.bind(this, 'source')}>
					<Modal.Header>
						<Modal.Title>Source</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p></p>
						<p>Hi</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close.bind(this, 'source')}>Close</Button>
					</Modal.Footer>
				</Modal>

			</div>
		);
	}

}

export default App;
