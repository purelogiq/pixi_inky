(function () {
  INKY.Utils = {
    /**
     * Returns a string denoting a random number in [low, high].
     * Pass in a prefix to prefix the number.
     */
    random: function(low, high, prefix){
      if(!prefix){
        prefix = '';
      }
      return prefix + '' + (Math.floor(Math.random() * (high - low + 1)) + low);
    },

    /**
     * Returns a random element in the array.
     */
    selectRandom: function(arr){
      return arr[Math.floor(Math.random() * arr.length)];
    },

    position: function(sprite, x, y){
      sprite.x = x - sprite.width / 2;
      sprite.y = y - sprite.height / 2;
    }
  };
}());
