(function () {
  function getDesignScale(designRect, previewRect) {
    var horizontalRatio = 0.8 * previewRect.width / designRect.width;
    var verticalRatio = 0.8 * previewRect.height / designRect.height;
    return Math.min(horizontalRatio, verticalRatio);
  }

  INKY.Printer = function (config) {
    config = config || {};

    this.props = {
      design: 0
    };

    this.onSubmit = config.onSubmit || function () {};

    this.element = config.element || document.createElement('div');
    this.element.className = 'inky-interface--printer';

    this.title = document.createElement('h2');
    this.preview = document.createElement('canvas');
    this.stage = new PIXI.Container();
    this.design = new PIXI.Sprite();

    this.designSelector = new INKY.Selector({
      collection: [].concat(INKY.SHIRT_DESIGNS),
      onChange: this.prop.bind(this, 'design'),
      selected: this.props.style,
      title: 'Design'
    });

    this.printButton = document.createElement('button');
    this.printButton.className = 'inky-interface--primary-button';
  };

  INKY.Printer.prototype = {
    activate: function () {
      this.element.className += ' active';
      var boundingRect = this.element.getBoundingClientRect();
      var stage = this.stage;
      var pixi = this.pixi = new PIXI.autoDetectRenderer(
        boundingRect.width * 0.9,
        boundingRect.width * 0.6,
        {
          transparent: true,
          view: this.preview
        }
      );
      this.stage.addChild(this.design);

      this.render();
      this.wire();

      function animate(){
        requestAnimationFrame(animate);
        pixi.render(stage);
      }
      animate();
    },
    render: function () {
      this.element.appendChild(this.title);
      this.element.appendChild(this.preview);
      this.element.appendChild(this.designSelector.element);
      this.element.appendChild(this.printButton);

      this.title.textContent = 'Printer';
      this.printButton.textContent = 'Print It!';

      this.update();
    },
    prop: function (prop, value) {
      this.props[prop] = value;
      this.update();
    },
    update: function () {
      var designId = INKY.SHIRT_DESIGNS[this.props.design];
      this.stage.removeChild(this.design);
      this.design = new PIXI.Sprite(INKY.TextureStash.assets(`${designId}.png`));
      this.stage.addChild(this.design);
      var designScale = getDesignScale(
        this.design.getBounds(),
        this.preview.getBoundingClientRect()
      );
      this.design.scale = {
        x: designScale,
        y: designScale
      }
    },
    wire: function () {
      var onSubmit = this.onSubmit;
      var props = this.props;
      this.printButton.addEventListener('click', function () {
        onSubmit(props);
      });
    }
  };
}());
