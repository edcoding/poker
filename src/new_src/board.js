import React, { Component } from 'react';
import Card from './Card';
import TopUI from './Top_UI';
import BottomUI from './Bottom_UI';

class Board extends Component {
	constructor(props) {
		super(props);

		this.state = {
			suits: ["diams", "clubs", "hearts", "spades"],
			ranks: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"],
			deck: [],
			hand: [],
			deal: false,
			pointer: 0,
			chips: 0,
			result: null,
			winnings: null,
			handsPlayed: 0
		};
	}


	//////// HAND & DECK METHODS ////////

	buildDeck () {
		const tempDeck = [];
		let count = 0;

		for ( let x = 0; x < this.state.suits.length; x++) {
			for ( let y = 0; y < this.state.ranks.length; y ++) {
				tempDeck.push({
					index: count,
					suit: this.state.suits[x],
					rank: this.state.ranks[y],
					hold: false
				});
				count += 1;
			}
		}

		this.setState({
			deck: tempDeck
		});
	}

	shuffleDeck () {
		const tempDeck = this.state.deck;

		for (let x = 0; x < tempDeck.length; x++) {
			const tempCard = tempDeck[x];
			const newPos = Math.floor((Math.random() * 52)) ;

			tempDeck[x] = tempDeck[newPos];
			tempDeck[newPos] = tempCard;
		}

		this.setState({
			deck: tempDeck
		});
	}

	fillHand () {
		const tempHand = [];
		let tempPointer = 0;

		for (let x = 0; x < 5; x++) {
			tempHand.push(this.state.deck[tempPointer]);
			tempPointer += 1;
		}

		this.setState({
			hand: tempHand,
			pointer: tempPointer
		});
	}

	updateHand () {
		let tempHand = this.state.hand;
		let tempPointer = this.state.pointer;

		for (let x = 0; x < tempHand.length; x++) {
			if (!tempHand[x].hold) {
				tempHand[x] = this.state.deck[tempPointer];
				tempPointer += 1;
			}
		}

		this.setState({
			hand: tempHand,
			pointer: tempPointer,
			deal: false
		});
	}

	clearHand () {
		this.setState({hand: []});
	}


	//////// GAME METHODS ////////

	resetHold(){
		const tempDeck = this.state.deck;

		for (let x = 0; x < tempDeck.length; x++) {
			tempDeck[x].hold = false;
		}

		this.setState({
			deck: tempDeck
		});
	}

	resetBoard () {
		const newDeal = true
		this.resetHold();
		this.shuffleDeck();
		this.clearHand();
		this.setState({
			deal: newDeal,
			result: null,
			winnings: null
		});
	}

	endGame () {

		const tempHand = this.state.hand.slice();
		const ranks = this.state.ranks;
		let kind2 = 0;
		let kind3 = false;
		let kind4 = false;
		let twoPair = false;
		let fullHouse = false;
		let flush = true;
		let straight = true;
		let straightFlush = false;
		let roaylFlush = false;

		let result = null;
		let winnings = 0;
		let chips = this.state.chips;
		

		// Sort hand to resolve easier
		tempHand.sort(function(a, b) {
			if (ranks.indexOf(a.rank) < ranks.indexOf(b.rank))
				return -1;
			if (ranks.indexOf(a.rank) > ranks.indexOf(b.rank))
				return 1;
			return 0;
		});
		//// Check for winning Conditions

		// Check for straight
		for (let x = 0; x < tempHand.length-1; x++) {
			// Straights can't start with Jack, Queen or King
			if (tempHand[0].suit === "j" || tempHand[0].suit === "q" || tempHand[0].suit === "k" ) {
				straight = false;
				break;
			}

			const thisCardRankIndex = this.state.ranks.indexOf(tempHand[x].rank);
			const nextCardRankIndex = this.state.ranks.indexOf(tempHand[x+1].rank);

			let thisCardRankIndexModify = thisCardRankIndex + 1;

			// Special case because Aces can also count as 1
			if (x === 3 && thisCardRankIndexModify === 4 && nextCardRankIndex === 12) {
				break;
			}

			if (thisCardRankIndexModify !== nextCardRankIndex) {
				straight = false;
				break;
			}
		}

		// Check for flush
		for (let x = 1; x < tempHand.length; x++) {
			if (tempHand[x].suit !== tempHand[x - 1].suit) {
				flush = false;
				break;
			}
		}

		// Check for straight flush
		if (flush === true && straight === true) {
			straightFlush = true;
		}

		// Check for royal flush
		if (flush === true && straight === true && tempHand[0].rank === "10") {
			roaylFlush = true;
		}

		// Check for * of a kind
		for (let x = 0; x < this.state.ranks.length; x++) {
			let rankCount = 0;
			for (let y = 0; y < tempHand.length; y++) {
				if (tempHand[y].rank === this.state.ranks[x]) {
					rankCount += 1;
				}
			}
			if (rankCount === 4) {
				kind4 = true;
			} else if (rankCount === 3) {
				kind3 = true;
			} else if (rankCount === 2) {
				kind2 += 1;
			}
		}

		// Check for 2 pairs
		if (kind2 === 2) {
			twoPair = true;
		}

		// Check for full house
		if (kind2 === 1 && kind3 === true) {
			fullHouse = true;
		}

		//// Resolve Winning Conditions

		if (roaylFlush) {
			result = "Royal Flush";
			winnings = 4000;
		} else if (straightFlush) {
			result = "Straight Flush";
			winnings = 250;
		} else if (kind4) {
			result = "4 of a Kind";
			winnings = 125;
		} else if (fullHouse) {
			result = "Full House";
			winnings = 45;
		} else if (flush) {
			result = "Flush";
			winnings = 30;
		} else if (straight) {
			result = "Straight";
			winnings = 20;
		} else if (kind3) {
			result = "3 of a Kind";
			winnings = 15;
		} else if (twoPair) {
			result = "Two Pairs";
			winnings = 10;
		} else if (kind2 > 0) {
			result = "Pair";
			winnings = 5;
		} else {
			result = "Lose"
			winnings = 0;
		}

		chips += winnings;

		this.setState({
			result: result,
			chips: chips,
			winnings: winnings
		})
	}

	updateLocalStorage() {
		localStorage.setItem('chips', this.state.chips);
		localStorage.setItem('handsPlayed', this.state.handsPlayed);
	}


	//////// HANDLER METHODS ////////

	newGameHandler() {
		let tempChips = this.state.chips;
		let tempHandsPlayed = this.state.handsPlayed;

		this.resetBoard();

		if (tempChips >= 5) {
			tempChips -= 5;
			tempHandsPlayed += 1;

			this.fillHand();

			this.setState({
				chips: tempChips,
				handsPlayed: tempHandsPlayed,
				deal: true
			});
		} else {
			//alert("Replenishing Chips");
			this.setState({
				chips: 100,
				result: "Replenish",
				deal: false
			});
		}
	}

	resetHandler() {
		//eslint-disable-next-line
		if (confirm('You are about to reset all game data.')) {
			this.setState({
				chips: 100,
				handsPlayed: 0,
				result: "Reset"
			});
			this.clearHand ();
		} else {
			// Do nothing!
		}
		
	}

	dealHandler() {
		this.updateHand();

		this.setState({
			deal: false
		});

		this.resetHold();

		this.endGame();
	}

	toggleHoldHandler(x) {
		if (!this.state.deal) return false;

		const tempHand = this.state.hand;
		if (tempHand[x].hold) {
			tempHand[x].hold = false;
		} else {
			tempHand[x].hold = true;
		}
		this.setState({
			hand: tempHand
		})
	}


	//////// COMPONENT LIFECYCLE METHODS ////////

	componentWillMount() {
		this.buildDeck();
		if (this.state.chips === 0) {
			if (localStorage.length > 0){
				let tempChips = parseInt(localStorage.getItem('chips'), 10);
				let tempHandsPlayed = parseInt(localStorage.getItem('handsPlayed'), 10)
				
				this.setState({chips: tempChips});
				this.setState({handsPlayed: tempHandsPlayed});
			} else {
				this.setState({chips: 100});
				this.setState({handsPlayed: 0});
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.chips !== prevState.chips || this.state.handsPlayed !== prevState.handsPlayed) {
			this.updateLocalStorage();
		}
	}

	render() {
		const hand = [];
		for (let x = 0; x < this.state.hand.length; x++) {
			hand.push(
				<Card
					key={x}
					index={this.state.hand[x].index}
					suit={this.state.hand[x].suit}
					rank={this.state.hand[x].rank}
					hold={this.state.hand[x].hold}
					toggleHold={this.toggleHoldHandler.bind(this, x)}
				/>
			);
		}
		return (
			<div id="board">
				<TopUI 
				chips={this.state.chips}
				handsPlayed={this.state.handsPlayed}
				deal={this.state.deal}
				dealHandler={this.dealHandler.bind(this)}
				newGameHandler={this.newGameHandler.bind(this)}
				resetHandler={this.resetHandler.bind(this)}
				/>
				<div className="playingCards">
					{hand}
				</div>
				<BottomUI
				result={this.state.result}
				winnings={this.state.winnings}
				/>
			</div>
		);
	}
}

export default Board;