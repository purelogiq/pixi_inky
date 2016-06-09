(function () {
  var centeredAnchor = {x: 0.5, y: 0.5};

  INKY.Person = function () {
    PIXI.Sprite.call(this);
    this.variation = {
      gender: INKY.Utils.selectRandom(INKY.GENDERS),
      tone: INKY.Utils.random(1, INKY.NUM_SKIN_TONES),
      eye: INKY.Utils.random(1, INKY.NUM_EYES),
      size: INKY.Utils.selectRandom(INKY.SIZES),
      hairColor: INKY.Utils.selectRandom(INKY.HAIR_COLORS),
      hairStyle: INKY.Utils.random(1, INKY.NUM_HAIR_STYLES_PER_GENDER),
      pants: INKY.Utils.selectRandom(INKY.PANT_COLORS)
    };

    this.anchor = centeredAnchor;

    this.createNeck();
    this.createArms();
    this.createPants();
    this.createShirt();
    this.createHead();
    this.createThought();
  };

  INKY.Person.prototype = Object.create(PIXI.Sprite.prototype, {
    createArms: {
      value: function () {
        var distance = {arm: 120, hand: 80};
        var height = {arm: -52, hand: 60};
        var rightArm = new PIXI.Sprite(INKY.TextureStash.people(`skin/${this.variation.tone}/arm`));
        rightArm.anchor = centeredAnchor;
        rightArm.x = distance.arm;
        rightArm.y = height.arm;

        var leftArm = new PIXI.Sprite(INKY.TextureStash.people(`skin/${this.variation.tone}/arm`));
        leftArm.anchor = centeredAnchor;
        leftArm.scale.x = -1;
        leftArm.x = -1 * distance.arm;
        leftArm.y = height.arm;

        var rightHand = new PIXI.Sprite(INKY.TextureStash.people(`skin/${this.variation.tone}/hand`));
        rightHand.anchor = centeredAnchor;
        rightHand.x = distance.hand;
        rightHand.y = height.hand;

        rightArm.addChild(rightHand);

        var leftHand = new PIXI.Sprite(INKY.TextureStash.people(`skin/${this.variation.tone}/hand`));
        leftHand.anchor = centeredAnchor;
        leftHand.x = distance.hand;
        leftHand.y = height.hand;

        leftArm.addChild(leftHand);

        this.rightArm = rightArm;
        this.leftArm = leftArm;

        this.addChild(rightArm);
        this.addChild(leftArm);
      }
    },
    createHead: {
      value: function () {
        var head = new PIXI.Sprite(INKY.TextureStash.people(`skin/${this.variation.tone}/head`));
        head.anchor = centeredAnchor;
        head.y = -200;
        this.head = head;
        this.createEyes();
        this.createEyebrows();
        this.createMouth();
        this.createNose();
        this.createHair();
        this.addChild(head);
      },
    },
    createEyes: {
      value: function () {
        var distance = 25;
        var height = 10;
        var leftEye = new PIXI.Sprite(INKY.TextureStash.people(`faces/eyes/${this.variation.eye}`));
        leftEye.anchor = centeredAnchor;
        leftEye.x = -1 * distance;
        leftEye.y = height;

        var rightEye = new PIXI.Sprite(INKY.TextureStash.people(`faces/eyes/${this.variation.eye}`));
        rightEye.anchor = centeredAnchor;
        rightEye.x = distance;
        rightEye.y = height;

        this.leftEye = leftEye;
        this.rightEye = rightEye;

        this.head.addChild(leftEye);
        this.head.addChild(rightEye);
      }
    },
    createEyebrows: {
      value: function () {
        var distance = 30;
        var height = -10;
        var leftEyebrow = new PIXI.Sprite(INKY.TextureStash.people(`faces/eyebrows/${this.variation.hairColor}`));
        leftEyebrow.anchor = centeredAnchor;
        leftEyebrow.scale.x = -1;
        leftEyebrow.x = distance;
        leftEyebrow.y = height;

        var rightEyebrow = new PIXI.Sprite(INKY.TextureStash.people(`faces/eyebrows/${this.variation.hairColor}`));
        rightEyebrow.anchor = centeredAnchor;
        rightEyebrow.x = -1 * distance;
        rightEyebrow.y = height;

        this.leftEyebrow = leftEyebrow;
        this.rightEyebrow = rightEyebrow;

        this.head.addChild(leftEyebrow);
        this.head.addChild(rightEyebrow);
      }
    },
    createHair: {
      value: function () {
        var hair = new PIXI.Sprite(INKY.TextureStash.people(`hair/${this.variation.hairColor}/${this.variation.gender}2`));
        hair.anchor = {x: 0.5, y: 0};
        hair.y = -100;
        this.hair = hair;
        this.head.addChild(hair);
      }
    },
    createMouth: {
      value: function () {
        var mouth = new PIXI.Sprite(INKY.TextureStash.people(`faces/mouths/glad`));
        mouth.anchor = centeredAnchor;
        mouth.y = 60;
        this.mouth = mouth;
        this.head.addChild(mouth);
      }
    },
    createNeck: {
      value: function () {
        var neck = new PIXI.Sprite(INKY.TextureStash.people(`skin/${this.variation.tone}/neck`));
        neck.anchor = centeredAnchor;
        neck.y = -110;
        this.neck = neck;
        this.addChild(neck);
      },
    },
    createNose: {
      value: function () {
        var nose = new PIXI.Sprite(INKY.TextureStash.people(`faces/noses/${this.variation.tone}/1`));
        nose.anchor = centeredAnchor;
        nose.y = 30;
        this.nose = nose;
        this.head.addChild(nose);
      }
    },
    createPants: {
      value: function () {
        var distance = {leg: 54, shoe: 30};
        var height = {leg: 78, shoe: 90};
        var belt = new PIXI.Sprite(INKY.TextureStash.people(`pants/${this.variation.pants}/belt`));
        belt.anchor = centeredAnchor;
        belt.y = 66;

        var leftLeg = new PIXI.Sprite(INKY.TextureStash.people(`pants/${this.variation.pants}/leg`));
        leftLeg.anchor = centeredAnchor;
        leftLeg.scale.x = -1;
        leftLeg.x = -1 * distance.leg;
        leftLeg.y = height.leg;

        var rightLeg = new PIXI.Sprite(INKY.TextureStash.people(`pants/${this.variation.pants}/leg`));
        rightLeg.anchor = centeredAnchor;
        rightLeg.x = distance.leg;
        rightLeg.y = height.leg;

        belt.addChild(leftLeg);
        belt.addChild(rightLeg);

        this.pants = belt;
        this.leftLeg = leftLeg;
        this.rightLeg = rightLeg;

        var leftShoe = new PIXI.Sprite(INKY.TextureStash.people(`shoes/1`));
        leftShoe.anchor = centeredAnchor;
        leftShoe.x = distance.shoe;
        leftShoe.y = height.shoe;

        var rightShoe = new PIXI.Sprite(INKY.TextureStash.people(`shoes/1`));
        rightShoe.anchor = centeredAnchor;
        rightShoe.x = distance.shoe;
        rightShoe.y = height.shoe;

        leftLeg.addChild(leftShoe);
        rightLeg.addChild(rightShoe);

        this.addChild(belt);
      }
    },
    createShirt: {
      value: function () {
        var shirt = new INKY.Shirt({
          style: this.variation.gender,
          color: INKY.Utils.selectRandom(INKY.SHIRT_COLORS),
          size: INKY.SIZES[2]
        });
        shirt.container.y = -35;
        this.shirt = shirt;
        this.addChild(shirt.container);
      }
    },
    createThought: {
      value: function () {
        var thought = new INKY.Thought();
        thought.x = -200;
        thought.y = -700;
        this.addChild(thought);
      }
    },
    update: {
      value: function (deltaTime) {

      }
    }
  });
}());
