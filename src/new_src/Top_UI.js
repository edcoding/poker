import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class TopUI extends Component {

	constructor(props) {
		super();
		//chips
		//handsPlayed
		//deal
		//dealHandler
		//newGameHandler
		//ResetHandler
	}

	render() {
		if (this.props.deal){
			return (
				<Grid>
					<Row>
						<Col xs={7}>
							<div className="input-group" id="chips-group">
								<span
									className="input-group-addon"
									id="chips-label"
								>
									Chips:
								</span>
								<input
									type="text"
									maxLength="8"
									className="form-control"
									placeholder="seed"
									id="seed-input"
									aria-describedby="chips-label"
									value={this.props.chips}
									disabled
								/>
							</div>
						</Col>
						<Col xs={5}>
							<Button bsClass="btn-primary" onClick={this.props.dealHandler}>Deal</Button>
						</Col>
					</Row>
					<Row>
						<Col xs={7}>
							<div className="input-group" id="handsPlayed-group">
								<span
									className="input-group-addon"
									id="handsPlayed-label"
								>
									Hands:
								</span>
								<input
									type="text"
									maxLength="8"
									className="form-control"
									placeholder="seed"
									id="seed-input"
									aria-describedby="handsPlayed-label"
									value={this.props.handsPlayed}
									disabled
								/>
							</div>
						</Col>
						<Col xs={5}>
							
						</Col>
					</Row>
				</Grid>
			);
		} else {
			return (
				<Grid>
					<Row>
						<Col xs={7}>
							<div className="input-group" id="chips-group">
								<span
									className="input-group-addon"
									id="chips-label"
								>
									Chips:
								</span>
								<input
									type="text"
									maxLength="8"
									className="form-control"
									placeholder="seed"
									id="seed-input"
									aria-describedby="chips-label"
									value={this.props.chips}
									disabled
								/>
							</div>
						</Col>
						<Col xs={5}>
							<Button bsClass="btn-primary" onClick={this.props.newGameHandler}>New Game</Button>
						</Col>
					</Row>
					<Row>
						<Col xs={7}>
							<div className="input-group" id="handsPlayed-group">
								<span
									className="input-group-addon"
									id="handsPlayed-label"
								>
									Hands:
								</span>
								<input
									type="text"
									maxLength="8"
									className="form-control"
									placeholder="seed"
									id="seed-input"
									aria-describedby="handsPlayed-label"
									value={this.props.handsPlayed}
									disabled
								/>
							</div>
						</Col>
						<Col xs={5}>
							<Button bsClass="btn-secondary" onClick={this.props.resetHandler}>Reset</Button>
						</Col>
					</Row>
				</Grid>
			);
		}
	}
}

export default TopUI;