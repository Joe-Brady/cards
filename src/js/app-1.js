// ON LOAD: define the suits and ranks, and their correct order
const suits = ["clubs", "spades", "hearts", "diamonds"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

// ON LOAD: declare an empty deck array
var deck = [];

// ON LOAD: declare an empty array for drawn cards
var drawn = [];


// ON LOAD: populate the deck array with cards, in the correct order.
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

// randomise the order of the deck
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
    phase1.push.apply(phase1, inputArray.filter(selectByRank));
  }
  var phase2 = [];
  for (i = 0; i < ranks.length; i++) {
    function selectBySuit(card) {
      return card.suit == suits[i];
    }
    phase2.push.apply(phase2, phase1.filter(selectBySuit));
  }
  var sortedCards = phase2;
  return sortedCards;
}

// move x number of random cards from the deck array into the drawn array, then sort them
var drawCards = function(numberOfCards){
  var num = Math.floor(numberOfCards);
  if (num >= 1 && num <= deck.length) {
    for (i = 0; i < num; i++) {
      drawn.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
    }
    drawn = sortCards(drawn);
    document.getElementById("draw-error").innerHTML = "";
    return drawn;
  }
  else {
    var err = ("Please enter a number between 1 and " + deck.length);
    document.getElementById("draw-error").innerHTML = err;
    return "Error flagged";
  }
}

// move x number of cards from the drawn array back to the deck array
var returnToDeck = function(startAtCard, numberOfCards){
    deck.push.apply(deck, drawn.splice(startAtCard, numberOfCards));
}

// button functions
const foldAllCards = document.getElementById("fold-all-cards");

foldAllCards.onclick = function(){
  returnToDeck(0, drawn.length);
};
