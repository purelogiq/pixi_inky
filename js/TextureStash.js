var TextureStash = new function(){
  'use strict';

  var isInitialized = false;

  this.init = function(setupCallback, loadProgressHandler){
    PIXI.loader
        .add("assets/face.png")
        .add("assets/people_graphics.json")
        .add("assets/platform_graphics.json")
        .on("progress", loadProgressHandler)
        .load(
          function(){
            isInitialized = true;
            setupCallback();
          }
        );
  };

  this.assets = function(textureId){
    checkInitialized();
    return PIXI.loader.resources[textureId].texture;
  };

  this.people = function(textureId){
    return fromAtlas("assets/people_graphics.json", "people/" + textureId);
  };

  this.platform = function(textureId){
    return fromAtlas("assets/platform_graphics.json", textureId);
  };

  var checkInitialized = function(){
    if(!isInitialized){
      throw "Assets are not yet loaded";
    }
  };

  var fromAtlas = function(atlas, textureId){
    checkInitialized();
    return PIXI.loader.resources[atlas].textures[textureId];
  }
};
