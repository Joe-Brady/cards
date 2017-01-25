// define the suits and ranks, and their correct order
const suits = ["clubs", "spades", "hearts", "diamonds"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

// declare an empty deck array
var deck = [];

// populate the deck array with cards, based on the correct order.
function card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

var suitCounter = 0;
suits.forEach(function() {

  var rankCounter = 0;
  ranks.forEach(function() {
    var newCard = new card(suits[suitCounter], ranks[rankCounter]);
    deck.push(newCard);
    rankCounter++;
  });

  suitCounter++;
});

console.log(deck);

// declare an empty array for drawn cards
var drawn = [];
