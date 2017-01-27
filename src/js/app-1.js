document.addEventListener("DOMContentLoaded", function(event) {
  updateDeckView();
  updateDrawnView();
  greyOut("sortdeck");
  /*setTimeout(function() {
    document.getElementById("animatableCards").className = "overlapAnim";
  }, 200);*/
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

// ON LOAD: declare page elements as variables
const shuffleDeckButton = document.getElementById("shuffledeck");
const sortDeckButton = document.getElementById("sortdeck");
const drawCardsButton = document.getElementById("drawcards");
const foldAllCardsButton = document.getElementById("foldallcards");
const drawError = document.getElementById("drawerror");
const drawInput = document.getElementById("drawinput");

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
    drawError.innerHTML = err;
    return "Error flagged";
  }
  else if (num >= 1 && num <= deck.length) {
    reactivate("foldallcards");
    for (i = 0; i < num; i++) {
      drawn.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
    }
    drawn = sortCards(drawn);
    drawError.innerHTML = "";
    updateDeckView();
    updateDrawnView();
    return drawn;
  }
  else {
    var err = ("Please enter a number between 1 and " + deck.length);
    drawError.innerHTML = err;
    return "Error flagged";
  }
}

// move a number of cards from the drawn array back to the deck array
// returnToDeck(0, drawn.length); is used to return ALL cards.
var returnToDeck = function(startAtCard, numberOfCards){
    deck.push.apply(deck, drawn.splice(startAtCard, numberOfCards)); // this will still work if a future function seeks to return individual cards, or x number of cards in a row.
    reactivate("drawcards");
    reactivate("sortdeck");
    updateDeckView();
    updateDrawnView();
}

// declare suit images and boilerplate HTML for cards
const suitImages = ["assets/club.png", "assets/spade.png", "assets/heart.png", "assets/diamond.png"];

const bp1Deck = '<div id="animatableCards" class="card overlap"><div class="card-value-section">';
const bp1Drawn = '<div class="card"><div class="card-value-section">';
const bp2 = '<div class="left-align"><span>'
const bp3 = '</span><img src="'
const bp4 = '"></div></div><div class="card-suit-section"><img src="'
const bp5 = '"></div><div class="card-value-section mirrored">'
const bp6 = '"></div></div></div>'

// update the view to display changes to the deck array
var updateDeckView = function(){
  var deckHTML = "";
  if (deck.length == 0){
    deckHTML = '<div class="card empty"></div>';
    greyOut("drawcards");
  }
  else {
    for (i = 0; i < deck.length; i++) {
      var currentSuit = suits.indexOf(deck[i].suit);
      var image = suitImages[currentSuit];
      var group = (bp2 + deck[i].rank + bp3 + image);
      var cardHTML =
        (bp1Deck +
        group +
        bp4 +
        image +
        bp5 +
        group +
        bp6
        );
      deckHTML += cardHTML;
    }
  }
  document.getElementById("deck").innerHTML = deckHTML;
}

// update the view to display changes to the drawn array
var updateDrawnView = function(){
  var drawnHTML = "";
  if (drawn.length == 0){
    drawnHTML = '<div class="card empty"></div>';
    greyOut("foldallcards");
  }
  else {
    for (i = 0; i < drawn.length; i++) {
      var currentSuit = suits.indexOf(drawn[i].suit);
      var image = suitImages[currentSuit];
      var group = (bp2 + drawn[i].rank + bp3 + image);
      var cardHTML =
        (bp1Drawn +
        group +
        bp4 +
        image +
        bp5 +
        group +
        bp6
        );
      drawnHTML += cardHTML;
    }
  }
  document.getElementById("drawn").innerHTML = drawnHTML;
}

// Greys out / deactivates buttons
var greyOut = function(buttonID){
  document.getElementById(buttonID).className = "greyedOut";
}

// Reactivates buttons
var reactivate = function(buttonID){
  document.getElementById(buttonID).className =
   document.getElementById(buttonID).className.replace
      ( /(?:^|\s)greyedOut(?!\S)/g , '' )
}

// button functions
shuffleDeckButton.onclick = function(){
  reactivate("sortdeck");
  shuffleDeck();
};

sortDeckButton.onclick = function(){
  deck = sortCards(deck);
  updateDeckView();
  greyOut("sortdeck");
};

drawCardsButton.onclick = function(){
  var num = drawInput.value;
  drawCards(num);
  drawInput.value = 1;
};

drawInput.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      var num = drawInput.value;
      drawCards(num);
      drawInput.value = 1;
      return false;
    }
  }

foldAllCardsButton.onclick = function(){
  returnToDeck(0, drawn.length);
};
