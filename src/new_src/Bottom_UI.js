import React, { Component } from 'react';

class BottomUI extends Component {

	constructor(props) {
		super();
		//result
		//winnings
	}

	render() {
		if (this.props.result){
			if (this.props.result === "Lose") {
				return (
					<div className="result lost">
						<span>{this.props.result}</span>
					</div>
				);
			} else if (this.props.result === "Replenish") {
				return (
					<div className="result replenish">
						<span>Replenishing Chips.</span>
					</div>
				);
			} else if (this.props.result === "Reset") {
				return (
					<div className="result replenish">
						<span>Game Reset.</span>
					</div>
				);
			} else {
				return (
					<div className="result win">
						<span>
							! ! ! {this.props.result} | Won: {this.props.winnings} Chips ! ! !
						</span>
					</div>
				);
			}
		} else {
			return null;
		}
	}
}

export default BottomUI;