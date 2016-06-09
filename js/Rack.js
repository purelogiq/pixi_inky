(function () {
  function getShirtScale(shirtRect, previewRect) {
    var horizontalRatio = 0.8 * previewRect.width / shirtRect.width;
    var verticalRatio = 0.8 * previewRect.height / shirtRect.height;
    return Math.min(horizontalRatio, verticalRatio);
  }

  function getCenteredShirt(shirtRect, previewRect) {
    return {
      x: (shirtRect.width - previewRect.width) / 2,
      y: (shirtRect.height - previewRect.height) / 2
    };
  }

  INKY.Rack = function (config) {
    config = config || {};

    this.props = {
      style: 0,
      size: 1,
      color: 0
    };

    this.onSubmit = config.onSubmit || function () {};

    this.element = config.element || document.createElement('div');
    this.element.className = 'inky-interface--rack';

    this.title = document.createElement('h2');
    this.preview = document.createElement('canvas');
    this.shirt = new INKY.Shirt();

    this.styleSelector = new INKY.Selector({
      collection: [].concat(INKY.GENDERS),
      onChange: this.prop.bind(this, 'style'),
      selected: this.props.style,
      title: 'Style'
    });

    this.sizeSelector = new INKY.Selector({
      collection: [].concat(INKY.SIZES),
      onChange: this.prop.bind(this, 'size'),
      selected: this.props.size,
      title: 'Size'
    });

    this.colorSelector = new INKY.Selector({
      collection: [].concat(INKY.SHIRT_COLORS),
      onChange: this.prop.bind(this, 'color'),
      selected: this.props.color,
      title: 'Color'
    });

    this.grabButton = document.createElement('button');
    this.grabButton.className = 'inky-interface--primary-button';
  };

  INKY.Rack.prototype = {
    activate: function () {
      this.element.className += ' active';
      var boundingRect = this.element.getBoundingClientRect();
      var pixi = this.pixi = new PIXI.autoDetectRenderer(
        boundingRect.width * 0.9,
        boundingRect.width * 0.6,
        {
          transparent: true,
          view: this.preview
        }
      );
      var stage = this.stage = new PIXI.Container();
      stage.addChild(this.shirt.container);

      var shirtScale = getShirtScale(
        this.shirt.getNativeSize(),
        this.preview.getBoundingClientRect()
      );
      this.shirt.scale = shirtScale;

      this.render();
      function animate(){
        requestAnimationFrame(animate);
        pixi.render(stage);
      }
      animate();
    },
    render: function () {
      this.element.appendChild(this.title);
      this.element.appendChild(this.preview);
      this.element.appendChild(this.styleSelector.element);
      this.element.appendChild(this.sizeSelector.element);
      this.element.appendChild(this.colorSelector.element);
      this.element.appendChild(this.grabButton);

      this.title.textContent = 'T-Shirt Rack';
      this.grabButton.textContent = 'Grab It!';

      this.update();
    },
    prop: function (prop, value) {
      this.props[prop] = value;
      this.update();
    },
    update: function () {
      var previewRect = this.preview.getBoundingClientRect();

      this.shirt.style = INKY.GENDERS[this.props.style];
      this.shirt.color = INKY.SHIRT_COLORS[this.props.color];
      this.shirt.size = INKY.SIZES[this.props.size];

      this.shirt.offset = {
        x: previewRect.width / 2,
        y: previewRect.height / 2
      };

      this.shirt.update();
    },
    wire: function () {
      var onSubmit = this.onSubmit;
      var props = this.props;
      this.grabButton.addEventListener('click', function () {
        onSubmit(props);
      });
    }
  };
}());
