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
    this.designId = config.designId || '';
    this.scale = config.scale || 1;
    this.offset = config.offset || {x: 0, y: 0};

    this.container = new PIXI.Sprite();
    this.container.anchor.x = 0.5;
    this.container.anchor.y = 0.5;

    this.children = [];
    this.update();
  };

  INKY.Shirt.prototype = {
    getNativeSize: function () {
      var armOverlap = getArmOverlap(this.style);
      return {
        width: (2 * this.leftArm._texture.width) + this.torso._texture.width - (2 * armOverlap),
        height: this.torso._texture.height
      };
    },
    update: function () {
      var container = this.container;
      this.children.forEach(function (child) {
        container.removeChild(child);
      });
      this.torso = new PIXI.Sprite(INKY.TextureStash.people(`shirts/${this.color}/${this.style}`));
      this.rightArm = new PIXI.Sprite(INKY.TextureStash.people(`shirts/${this.color}/arm`));
      this.leftArm = new PIXI.Sprite(INKY.TextureStash.people(`shirts/${this.color}/arm`));
      this.leftArm.scale = {
        x: -1,
        y: 1
      };
      this.children = [this.torso, this.rightArm, this.leftArm];

      if (this.designId) {
        this.design = new PIXI.Sprite(INKY.TextureStash.assets(`${this.designId}.png`));
        this.children.push(this.design);
      }

      this.children.forEach(function (child) {
        child.anchor.x = 0.5;
        child.anchor.y = 0.5;
      });

      this.render();
    },
    render: function () {
      var container = this.container;
      var armOverlap = getArmOverlap(this.style) / 2;
      var sizeMap = {
        S: 0.5,
        M: 0.75,
        L: 1
      };

      this.leftArm.x = -1 * (this.leftArm._texture.width - armOverlap);
      this.leftArm.y = (this.leftArm._texture.height / 2) - (this.torso._texture.height / 2);
      this.rightArm.x = this.rightArm._texture.width - armOverlap;
      this.rightArm.y = (this.rightArm._texture.height / 2) - (this.torso._texture.height / 2);

      this.children.forEach(function (child) {
        container.addChild(child);
      });
      this.container.scale = {
        x: this.scale * sizeMap[this.size],
        y: this.scale * sizeMap[this.size],
      };
      this.container.x = this.offset.x;
      this.container.y = this.offset.y;
    }
  };
}());
