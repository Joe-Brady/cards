// BEGIN VARIABLES //

var expect = chai.expect;
var deckOnLoad = deck;

var testCards = [
  {suit: "diamonds", rank:"4"},
  {suit: "clubs", rank:"2"},
  {suit: "hearts", rank:"J"},
  {suit: "clubs", rank:"K"},
  {suit: "spades", rank:"2"},
  {suit: "hearts", rank:"4"},
  {suit: "spades", rank:"9"},
  {suit: "hearts", rank:"Q"},
  {suit: "diamonds", rank:"A"},
  {suit: "diamonds", rank:"5"}
]

// BEGIN TESTS //

describe('Initial Page Load Tests', function(){
  it('Has suits array', function(){
    expect(suits).to.be.an('array');
    expect(suits).to.have.lengthOf(4);
    expect(suits).to.eql(["clubs", "spades", "hearts", "diamonds"]);
  });

  it('Has ranks array', function(){
    expect(ranks).to.be.an('array');
    expect(ranks).to.have.lengthOf(13);
    expect(ranks).to.eql([2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]);
  });

  it('Has array representing ordered deck of cards', function(){
    expect(deck).to.be.an('array');
    expect(deck).to.have.lengthOf(52);
    expect(deck).to.have.deep.property('[0]').that.deep.equals({suit:"clubs", rank:2});
    expect(deck).to.have.deep.property('[51]').that.deep.equals({suit:"diamonds", rank:"A"});
  });

  it('Has empty array for cards that will be drawn', function(){
    expect(drawn).to.be.an('array');
    expect(drawn).to.have.lengthOf(0);
  });
});


describe('Card Manipulation Tests', function(){
  it('shuffleDeck returns the current deck in a different order', function(){
    expect(shuffleDeck()).to.be.an('array');
    expect(shuffleDeck()).to.not.eql(deckOnLoad);
  });

  it('sortCards(inputArray) returns inputArray in order of suit and rank', function(){
    expect(sortCards(testCards)).to.be.an('array');
    expect(sortCards(testCards)).to.eql([
      {suit: "clubs", rank:"2"},
      {suit: "clubs", rank:"K"},
      {suit: "spades", rank:"2"},
      {suit: "spades", rank:"9"},
      {suit: "hearts", rank:"4"},
      {suit: "hearts", rank:"J"},
      {suit: "hearts", rank:"Q"},
      {suit: "diamonds", rank:"4"},
      {suit: "diamonds", rank:"5"},
      {suit: "diamonds", rank:"A"}
    ]);
  });

  it('drawCards(x) moves x number of ordered cards from deck to drawn array', function(){
    returnToDeck(0, drawn.length); // reset arrays
    expect(drawCards(1)).to.be.an('array');
    var previousDeck = deck.length;
    drawCards(5);
    expect(deck.length).to.equal(previousDeck - 5);
    expect(drawCards(15).length + deck.length).to.equal(52);
    returnToDeck(0, drawn.length);
    expect(drawCards(52.9).length + deck.length).to.equal(52); // tests that a non-integer is rounded down to the nearest integer
    expect(drawCards(1)).to.equal("Error flagged"); // tests that you cannot draw cards from an empty deck
  });

  it('drawCards(invalid) handles invalid inputs correctly', function(){
    returnToDeck(0, drawn.length); // reset arrays
    expect(drawCards(100)).to.equal("Error flagged");
    expect(drawCards("some input")).to.equal("Error flagged");
    expect(drawCards(-5)).to.equal("Error flagged");
  });

  it('returnToDeck(0, drawn.length) moves all drawn cards back to the deck array', function(){
    returnToDeck(0, drawn.length); // reset arrays
    shuffleDeck();
    drawCards(15);
    drawn.reverse();
    var lastDrawnCard = drawn[0]; // makes a note of the card at the end of the drawn array
    drawn.reverse();
    returnToDeck(0, drawn.length); // returns all drawn cards to the end of the deck array
    deck.reverse();
    lastCardInFullDeck = deck[0]; // makes a note of the last card in the deck array
    deck.reverse();
    expect(lastDrawnCard).to.equal(lastCardInFullDeck); // checks that it's the same card
  });

});
