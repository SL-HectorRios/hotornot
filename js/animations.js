'use strict';

var hotOrNot = hotOrNot || {};
hotOrNot.animations = (function() {
  var stack,
    cards;

  /**
   * This configures Swing.
   * when throwOutConfidence === Math.abs(1), it moves the card.
   * This allows us to reduce the accuracy.
   */
  var getConfig = function() {
    var config = {
      throwOutConfidence: function(offset, element) {
        return Math.min(Math.abs(offset * 3) / element.offsetWidth, 1);
      }
    };

    return config;
  };

  var init = function () {
    // Prepare the cards
    cards = [].slice.call(document.querySelectorAll('ul li'));

    // An instance of the Stack is used to attach event listeners
    stack = gajus.Swing.Stack(getConfig());

    cards.forEach(function (targetElement) {
      stack.createCard(targetElement);
    });

    // Add an event listener for when a card is moved from the stack
    stack.on('throwout', function(e) {
      var eventType = (e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT) ? 'LISTING_LIKED' : 'LISTING_DISLIKED';

      $(document).trigger({ type: eventType, listing: e.target});

      e.target.remove();
      // remove the card from memory
      var card = stack.getCard(e.target);
      card.destroy();
    });
  };

  return {
    init: init
  };
})();

