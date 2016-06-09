(function () {
  function increment (context, prop, collection) {
    if (context[prop] < collection.length - 1) {
      context[prop] += 1;
    } else {
      context[prop] = 0;
    }
  }

  function decrement (context, prop, collection) {
    if (context[prop] > 0) {
      context[prop] -= 1;
    } else {
      context[prop] = collection.length - 1;
    }
  }

  INKY.Selector = function (config) {
    config = config || {};
    this.element = document.createElement('div');
    this.element.className = 'inky-interface--selector';
    this.onChange = config.onChange || function () {};
    this.collection = config.collection || [];
    this.selected = 'undefined' !== typeof config.selected ? config.selected : 0;
    this.title = config.title || '';
    this.render();
    this.wire();
  };

  INKY.Selector.prototype = {
    handlePreviousClick: function (evt) {
      decrement(this, 'selected', this.collection);
      this.onChange(this.selected);
    },
    handleNextClick: function (evt) {
      increment(this, 'selected', this.collection);
      this.onChange(this.selected);
    },
    render: function () {
      this.label = document.createElement('span');
      this.label.textContent = this.title;
      this.previousButton = document.createElement('button');
      this.previousButton.textContent = '<';
      this.nextButton = document.createElement('button');
      this.nextButton.textContent = '>';
      this.element.appendChild(this.previousButton);
      this.element.appendChild(this.label);
      this.element.appendChild(this.nextButton);
    },
    wire: function () {
      this.previousButton.addEventListener('click', this.handlePreviousClick.bind(this));
      this.nextButton.addEventListener('click', this.handleNextClick.bind(this));
    }
  };

}());
