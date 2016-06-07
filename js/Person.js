
var Person = function(){
  var GENDERS = ['m', 'f'];
  var EYE_COLORS = ['black', 'brown', 'blue', 'pine'];
  var NUM_SKIN_TONES = 6;
  var SIZES = ['s', 'm', 'l'];

  var gender = Utils.selectRandom(GENDERS);
  var tone = Utils.random(1, NUM_SKIN_TONES);
  var eye = Utils.selectRandom(EYE_COLORS);
  var size = Utils.selectRandom(SIZES);

  
};


Person.prototype = Object.create(Sprite.prototype);

