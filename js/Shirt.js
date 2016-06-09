(function () {
  function getArmOverlap (style) {
    var styleMap = {
      m: 36,
      f: 39
    };
    return styleMap[style] || styleMap.m;
  }

  INKY.Shirt = function (config) {
    config = config || {};
    this.color = config.color || INKY.SHIRT_COLORS[0];
    this.style = config.style || INKY.GENDERS[0];
    this.size = config.size || INKY.SIZES[1];
    this.scale = config.scale || 1;

    this.container = new PIXI.Container();
    this.children = [this.torso, this.rightArm, this.leftArm];
    this.update();
  };

  INKY.Shirt.prototype = {
    update: function () {
      var container = this.container;
      this.children.forEach(function (child) {
        container.removeChild(child);
      });
      this.torso = new PIXI.Sprite(TextureStash.people(`shirts/${this.color}/${this.style}`));
      this.rightArm = new PIXI.Sprite(TextureStash.people(`shirts/${this.color}/arm`));
      this.leftArm = new PIXI.Sprite(TextureStash.people(`shirts/${this.color}/arm`));
      this.leftArm.scale = {
        x: -1,
        y: 1
      };
      this.children = [this.torso, this.rightArm, this.leftArm];
      this.render();
    },
    render: function () {
      var container = this.container;
      var armOverlap = getArmOverlap(this.style);
      var sizeMap = {
        S: 0.5,
        M: 0.75,
        L: 1
      };

      this.leftArm.x = this.leftArm._texture.width;
      this.torso.x = this.leftArm._texture.width - armOverlap;
      this.rightArm.x = this.leftArm._texture.width + this.torso._texture.width - 2 * armOverlap;

      this.children.forEach(function (child) {
        container.addChild(child);
      });
      this.container.scale = {
        x: this.scale * sizeMap[this.size],
        y: this.scale * sizeMap[this.size],
      };
    }
  };
}())
