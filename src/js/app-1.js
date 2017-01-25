// ON LOAD: define the suits and ranks, and their correct order
const suits = ["clubs", "spades", "hearts", "diamonds"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

// ON LOAD: declare an empty deck array, and a boolean to track shuffled status
var deck = [];

// ON LOAD: declare an empty array for drawn cards
var drawn = [];


// ON LOAD: populate the deck array with cards, based on the correct order.
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

// randomise order of deck
var shuffleDeck = function(){
  var newDeck = [];
  var deckNumber = deck.length;

  for (i = 0; i < deckNumber; i++) {
    newDeck.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
  }

  deck = newDeck;
  return deck;
}

// sort the input array into both suit and rank order
var sortCards = function(inputArray){
  var phase1 = [];
  for (i = 0; i < ranks.length; i++) {
    function selectByRank(card) {
      return card.rank == ranks[i];
    }
    var filteredByRank = inputArray.filter(selectByRank);
    phase1.push.apply(phase1, filteredByRank);
  }
  var phase2 = [];
  for (i = 0; i < ranks.length; i++) {
    function selectBySuit(card) {
      return card.suit == suits[i];
    }
    var filteredBySuit = phase1.filter(selectBySuit);
    phase2.push.apply(phase2, filteredBySuit);
  }
  deck = phase2;
  return deck;
}
