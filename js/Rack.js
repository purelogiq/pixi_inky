(function () {
  INKY.Rack = function (config) {
    config = config || {};

    this.props = {
      style: 0,
      size: 1,
      color: 0
    };

    this.element = config.element || document.createElement('div');
    this.element.className = 'inky-interface--rack';

    this.title = document.createElement('h2');

    this.preview = document.createElement('div');

    this.styleSelector = new INKY.Selector({
      title: 'Style',
      collection: [].concat(INKY.GENDERS),
      onChange: this.update.bind(this, 'style')
    });

    this.sizeSelector = new INKY.Selector({
      title: 'Size',
      collection: [].concat(INKY.SIZES),
      onChange: this.update.bind(this, 'size')
    });

    this.colorSelector = new INKY.Selector({
      title: 'Color',
      collection: [].concat(INKY.SHIRT_COLORS),
      onChange: this.update.bind(this, 'color')
    });

    this.grabButton = document.createElement('button');

    this.render();
  };

  INKY.Rack.prototype = {
    activate: function () {
      this.element.className += ' active';
    },
    render: function () {
      this.title.textContent = 'Clothing Rack';
      this.grabButton.textContent = 'Grab That Shirt!';
      this.preview.textContent = [
        INKY.GENDERS[this.props.style],
        INKY.SIZES[this.props.size],
        INKY.SHIRT_COLORS[this.props.color]
      ].join(', ');

      this.element.appendChild(this.title);
      this.element.appendChild(this.preview);
      this.element.appendChild(this.styleSelector.element);
      this.element.appendChild(this.sizeSelector.element);
      this.element.appendChild(this.colorSelector.element);
      this.element.appendChild(this.grabButton);
    },
    update: function (prop, value) {
      this.props[prop] = value;
      this.render();
    }
  };
}());
