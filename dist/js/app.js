document.addEventListener("DOMContentLoaded", function(event) {
  updateDeckView();
  updateDrawnView();
});

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
  updateDeckView();
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
  if (deck == 0) {
    var err = ("There are no cards left in the deck!");
    document.getElementById("draw-error").innerHTML = err;
    return "Error flagged";
  }
  else if (num >= 1 && num <= deck.length) {
    for (i = 0; i < num; i++) {
      drawn.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
    }
    drawn = sortCards(drawn);
    document.getElementById("draw-error").innerHTML = "";
    updateDeckView();
    updateDrawnView();
    return drawn;
  }
  else {
    var err = ("Please enter a number between 1 and " + deck.length);
    document.getElementById("draw-error").innerHTML = err;
    return "Error flagged";
  }
}

// move a number of cards from the drawn array back to the deck array
// returnToDeck(0, drawn.length); is used to return ALL cards.
var returnToDeck = function(startAtCard, numberOfCards){
    deck.push.apply(deck, drawn.splice(startAtCard, numberOfCards)); // this will still work if a future function seeks to return individual cards, or x number of cards in a row.
    updateDeckView();
    updateDrawnView();
}

// declare suit images and boilerplate HTML for cards
const suitImages = ["assets/club.png", "assets/spade.png", "assets/heart.png", "assets/diamond.png"];

const bp1 = '<div class="card"><div class="card-value-section">';
const bp2 = '<div class="left-align"><span>'
const bp3 = '</span><img src="'
const bp4 = '"></div></div><div class="card-suit-section"><img src="'
const bp5 = '"></div><div class="card-value-section mirrored">'
const bp6 = '"></div></div></div>'

// update the view to display changes to the deck array
var updateDeckView = function(){
  var deckHTML = "";
  for (i = 0; i < deck.length; i++) {
    var currentSuit = suits.indexOf(deck[i].suit);
    var image = suitImages[currentSuit];
    var group = (bp2 + deck[i].rank + bp3 + image);
    var cardHTML =
      (bp1 +
      group +
      bp4 +
      image +
      bp5 +
      group +
      bp6
      );
    deckHTML += cardHTML;
  }
  document.getElementById("deck").innerHTML = deckHTML;
}

// update the view to display changes to the drawn array
var updateDrawnView = function(){
  var drawnHTML = "";
  for (i = 0; i < drawn.length; i++) {
    var currentSuit = suits.indexOf(drawn[i].suit);
    var image = suitImages[currentSuit];
    var group = (bp2 + drawn[i].rank + bp3 + image);
    var cardHTML =
      (bp1 +
      group +
      bp4 +
      image +
      bp5 +
      group +
      bp6
      );
    drawnHTML += cardHTML;
  }
  document.getElementById("drawn").innerHTML = drawnHTML;
}

// button functions
const shuffleDeckButton = document.getElementById("shuffle-deck");
const sortDeckButton = document.getElementById("sort-deck");
const drawCardsButton = document.getElementById("draw-cards");
const foldAllCardsButton = document.getElementById("fold-all-cards");

shuffleDeckButton.onclick = function(){
  shuffleDeck();
};

sortDeckButton.onclick = function(){
  deck = sortCards(deck);
  updateDeckView();
};

drawCardsButton.onclick = function(){
  var num = document.getElementById("draw-input").value;
  drawCards(num);
  document.getElementById("draw-input").value = 1;
};

foldAllCardsButton.onclick = function(){
  returnToDeck(0, drawn.length);
};
