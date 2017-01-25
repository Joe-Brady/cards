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

  it('sortCards returns the input array in order of suit and rank', function(){
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
});
